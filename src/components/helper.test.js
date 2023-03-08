import { formatBuildings, compareZhNumberStr } from './helper';
import _ from 'lodash';
import { rooms, getRoom } from './mock';

describe('测试逻辑函数', () => {
    it('1. 格式化会议室建筑结构', () => {
        let { cityCount, buildingCount, floorCount, roomCount } = formatBuildings(rooms, true);
        expect({ cityCount, buildingCount, floorCount, roomCount }).toEqual({ cityCount: 2, buildingCount: 2, floorCount: 5, roomCount: 6 })
    })

    it('2. 比较中文数字大小', () => {
        let zhNumber = ['十六次人民代表大会', '五次通知', '二次议程文件', '一百亿大补贴', '十六次通告', '十二次会议', '二十五次会议', '三十六次会议'];
        zhNumber.sort((preFile, nextFile) => {
            const pre = preFile.match(/^[一二三四五六七八九十][一二三四五六七八九十百千万亿]*/)
            const next = nextFile.match(/^[一二三四五六七八九十][一二三四五六七八九十百千万亿]*/)
            return compareZhNumberStr(pre[0], next[0])
        })

        expect(zhNumber).toEqual(['二次议程文件', '五次通知', '十二次会议', '十六次人民代表大会', '十六次通告', '二十五次会议', '三十六次会议', '一百亿大补贴'])
    })

    it('3. mock文件根据id获取会议室函数测试', () => {
        let room = getRoom('61cc26302a30c413953b816d');
        expect(room.name).toBe('A1-101');
    })
})