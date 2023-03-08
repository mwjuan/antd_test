import _ from 'lodash';

export const rooms = [
    {
        "name": "A1-101",
        "code": "A1-101",
        "building": {
            "floors": ["F1", "F2"],
            "name": "教学中心1",
            "city": "上海",
            "district": "行健",
            "weight": 99,
            "id": "61cc19d52a30c4e4593b8093"
        },
        "floor": "F1",
        "disable": false,
        "id": "61cc26302a30c413953b816d"
    },
    {
        "name": "A1-203",
        "code": "A1-203",
        "building": {
            "floors": ["F1", "F2"],
            "name": "教学中心1",
            "city": "上海",
            "district": "行健",
            "weight": 99,
            "id": "61cc19d52a30c4e4593b8093"
        },
        "floor": "F2",
        "disable": false,
        "id": "61cc26302a30c413953b819d"
    },
    {
        "name": "B1-103",
        "code": "B1-103",
        "building": {
            "floors": ["F1", "F2", "F3"],
            "name": "教学中心1",
            "city": "北京",
            "district": "中欧",
            "weight": 4,
            "id": "61cc19d52a30c4e4593b8094"
        },
        "floor": "F1",
        "disable": false,
        "id": "61cc26302a30c413953b836d"
    },
    {
        "name": "B1-201",
        "code": "B1-201",
        "building": {
            "floors": ["F1", "F2", "F3"],
            "name": "教学中心1",
            "city": "北京",
            "district": "中欧",
            "weight": 5,
            "id": "61cc19d52a30c4e4593b8094"
        },
        "floor": "F2",
        "disable": false,
        "id": "61cc26302a30c413953b846d"
    },
    {
        "name": "B1-302",
        "code": "B1-302",
        "building": {
            "floors": ["F1", "F2", "F3"],
            "name": "教学中心1",
            "city": "北京",
            "district": "中欧",
            "weight": 1,
            "id": "61cc19d52a30c4e4593b8094"
        },
        "floor": "F3",
        "disable": false,
        "id": "61cc26302a30c413953b856d"
    },
    {
        "name": "B1-305",
        "code": "B1-305",
        "building": {
            "floors": ["F1", "F2", "F3"],
            "name": "教学中心1",
            "city": "北京",
            "district": "中欧",
            "weight": 1,
            "id": "61cc19d52a30c4e4593b8094"
        },
        "floor": "F3",
        "disable": false,
        "id": "61cc26302a30c413653b856d"
    }
]

export const getRoom = (value) => {
    return _.find(rooms, p => p.id === value || p.code === value);
}