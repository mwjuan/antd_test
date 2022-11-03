
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Example from './Example'

describe('Enzyme shallow', function () {
    let app;

    beforeEach(() => {
        app = mount(<Example />)
        app.debug();
    })

    afterEach(() => {
        app.unmount();
    })

    it('1. life cycle', () => {
        let wrapper = shallow(<Example />)
        const wrapperInstance = wrapper.instance();
        expect(wrapperInstance).toBeInstanceOf(Example);
        wrapperInstance.componentDidMount();
        expect(app.state('all').length).toBe(3); // 判断state值变化
    })

    it('2. function no param', () => {
        let wrapper = shallow(<Example />)
        let ins = wrapper.instance();
        let spy = jest.spyOn(ins, 'save');
        ins.save();
        wrapper.update()
        ins.forceUpdate()
        expect(spy).toBeCalledTimes(1)  // 判断方法调用次数是否为1
    })

    it('3. function with select change param', () => {
        let wrapper = shallow(<Example />)
        let ins = wrapper.instance();
        let onSelected = jest.spyOn(ins, 'onSelected');
        onSelected(true);
        ins.save();
        wrapper.update()
        ins.forceUpdate()
        expect(wrapper.state('users').length).toBe(2)
    })

    it('4. function with text search param', () => {
        let wrapper = shallow(<Example />)
        let ins = wrapper.instance();
        let onSearch = jest.spyOn(ins, 'onSearch');
        onSearch('Black');
        ins.save();
        wrapper.update()
        ins.forceUpdate()
        expect(wrapper.state('users').length).toBe(1)
    })

    it('5. setState text', () => {
        let wrapper = shallow(<Example />)
        wrapper.setState({ text: 'John', status: true })

        let ins = wrapper.instance();
        jest.spyOn(ins, 'load');
        ins.save();
        wrapper.update()
        ins.forceUpdate()
        expect(wrapper.state('users').length).toBe(1);
    })

    it('6. search onchange', () => {
        let wrapper = mount(<Example />)
        let input = wrapper.find('.example-search');
        input.at(0).simulate('change', { target: { value: 'J' } });
        wrapper.update();
        expect(wrapper.state('users').length).toBe(3)
    })

    it('7. async function has return value', async () => {
        let wrapper = shallow(<Example />)
        let ins = wrapper.instance();
        let getMessage = jest.spyOn(ins, 'getMessage').mockResolvedValue({
            "code": 0,
            "data": "MeetingPadService works! start at Sat Oct 29 2022 16:06:46 GMT+0800 (China Standard Time) [111]",
            "msg": null
        });
        let res = await getMessage();
        expect(res.code).toBe(0)
    })
})