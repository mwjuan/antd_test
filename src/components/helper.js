import _ from 'lodash';

export const formatBuildings = (rooms, needSelectFirstRoom) => {
    let buildings = _.unionBy(_.map(rooms, 'building'), 'id');
    let buildingGroups = _.groupBy(rooms, 'building.id');
    let spaces = [];
    let countrys = _.groupBy(_.orderBy(buildings, 'weight', 'desc'), 'city');
    let firstRoom = null;
    let cityCount = 0, buildingCount = 0, floorCount = 0, roomCount = rooms.length;

    for (var city in countrys) {
        let districts = _.groupBy(countrys[city], 'district');

        let children = [];

        for (var district in districts) {
            let treeDistricts = [];

            _.each(districts[district], d => {
                d.code = d.id;
                treeDistricts.push(_.omit(d, ['children']));

                d.children = [];
                d.code = `building-${d.id}`;
                d.floors = _.sortBy(d.floors);
                _.each(d.floors, floor => {
                    let fchildren = _.filter(rooms, room => {
                        if (room.building === d.id && room.floor === floor) {
                            room.building = { name: d.name, city: d.city, district: d.district, id: d.id, floors: d.floors }
                            return true;
                        }

                        if (room.building.id === d.id && room.floor === floor) return true;

                        return false;
                    })

                    _.each(fchildren, room => { room.selectable = true; })
                    if (needSelectFirstRoom && !firstRoom) {
                        firstRoom = _.first(fchildren);
                    }

                    d.children.push({ name: floor, code: `floor-${floor}-${d.id}`, hasRoom: true, children: fchildren, parent: d })
                    floorCount++;
                })
                buildingCount++;
            })

            cityCount++;
            children.push({ name: district, code: district, children: districts[district] })
        }

        spaces.push({ name: city, code: city, children })
    }

    return { spaces, firstRoom, buildingGroups, cityCount, buildingCount, floorCount, roomCount }
}

export const compareZhNumberStr = (preZhNumberStr, nextZhNumberStr, index = 0) => {
    try {
        if (preZhNumberStr.length === 1 && nextZhNumberStr.length === 1) {
            return zhNumberWeight[preZhNumberStr].weight - zhNumberWeight[nextZhNumberStr].weight
        }
        if (preZhNumberStr.length === 1 || nextZhNumberStr.length === 1) {
            if (preZhNumberStr.length === 1) {
                return -1
            } else {
                return 1
            }
        } else {
            if (preZhNumberStr[index] === nextZhNumberStr[index]) {
                if (preZhNumberStr[index + 1] !== nextZhNumberStr[index + 1]) {
                    return zhNumberWeight[preZhNumberStr[index + 1]].weight - zhNumberWeight[nextZhNumberStr[index + 1]].weight
                } else {
                    return compareZhNumberStr(preZhNumberStr, nextZhNumberStr, index + 1)
                }
            } else {
                if (preZhNumberStr[index + 1] === nextZhNumberStr[index + 1]) {
                    return zhNumberWeight[preZhNumberStr[index]].weight - zhNumberWeight[nextZhNumberStr[index]].weight
                } else {
                    return zhNumberWeight[preZhNumberStr[index + 1]].weight - zhNumberWeight[nextZhNumberStr[index + 1]].weight
                }
            }
        }
    } catch (error) {
        return 0
    }
}

export const zhNumberWeight = {
    '一': { weight: 1 },
    '二': { weight: 2 },
    '三': { weight: 3 },
    '四': { weight: 4 },
    '五': { weight: 5 },
    '六': { weight: 6 },
    '七': { weight: 7 },
    '八': { weight: 8 },
    '九': { weight: 9 },
    '十': { weight: 10 },
    '百': { weight: 11 },
    '千': { weight: 12 },
    '万': { weight: 13 },
    '亿': { weight: 14 },
    undefined: { weight: 0 }
}