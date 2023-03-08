import React from 'react';
import { mount, shallow, render } from 'enzyme';
import AreaRoomTree from './AreaRoomTree';
import { act } from "react-dom/test-utils";
import { getRoom, rooms } from './mock';
import _, { delay } from 'lodash';

describe('AreaRoomTree 组件测试', () => {
    let wrapper;

    beforeEach(async () => {
        await act(async () => {
            wrapper = shallow(<AreaRoomTree />)
        })
    })

    afterEach(() => {
        wrapper = null;
    })

    it('1. componentDidMount', () => {
        let ins = wrapper.instance();
        wrapper.setProps({ selectedSpaces: [_.first(rooms)] });  // 设置props
        ins.componentDidMount();
        expect(wrapper.state('spaces').length).toBe(2);
    })

    it('2. componentWillReceiveProps', () => {
        let ins = wrapper.instance();
        ins.componentWillReceiveProps({ value: 'A1-203' });
        expect(wrapper.state('value')).toBe('A1-203');
    })

    it('3. onChange', async () => {
        let result;
        let ins = wrapper.instance();
        let onChange = jest.spyOn(ins, 'onChange'); // 触发点击事件
        let value = 'B1-305'
        let room = getRoom(value);
        wrapper.setProps({
            onChange: (e) => {
                result = e;
            }
        })
        await onChange(value);  // 模拟点击事件选择参数
        expect(_.first(result)).toBe(room.id)
    })

    it('4. function', async () => {
        let ins = wrapper.instance();
        let result = await ins.getRoomByBuilding(_.map(rooms, 'code'));
        expect(result.length).toBe(rooms.length);
    })

    it('5. function', async () => {
        let ins = wrapper.instance();
        await ins.onExpand(_.map(rooms, 'code'));
        expect(wrapper.state('expandedSpaceKeys').length).toBe(_.map(rooms, 'code').length);
    })

    it('6. 异步测试', async () => {
        // console.log(1, new Date())
        // jest.useFakeTimers()
        // delay(() => {
        //     //等待定时器一定时间后调用delay函数执行
        //     // done()
        //     console.log(2, new Date())
        // })
        // //.runAllTimers()在调用完成后，拨快时钟
        // jest.runAllTimers()
        // console.log(3, new Date())

        let mockFn = jest.fn()
        console.log(mockFn)
        jest.useFakeTimers()
        delay(() => {
            mockFn()
            // done()
        })
        jest.runAllTimers()
        expect(true).toBe(true)
        //断言mockFn是否被断言
        expect(mockFn).toBeCalled()
    })
})