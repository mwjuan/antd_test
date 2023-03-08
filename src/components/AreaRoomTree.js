import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import { formatBuildings } from './helper';
import { rooms as data, getRoom } from './mock';
import _ from 'lodash';

const { TreeNode } = TreeSelect;

function AreaRoomTree(props) {
    return (
        <TreeSelect
            className='treeSelect'
            placeholder='选择空间'
            maxTagCount={3}
            style={props.style}
            treeCheckable={props.treeCheckable}
            showCheckedStrategy={'SHOW_PARENT'}
            allowClear={true}
            value={props.value}
            expandedKeys={props.expandedSpaceKeys}
            onChange={(selecteds) => props.onChange(selecteds)}
            onExpand={(e) => props.onExpand(e)}>
            {props.renderTreeNodes(props.spaces)}
        </TreeSelect>
    );
}

let hoc = WrappedComponent => {
    return class EnhancedComponet extends Component {
        constructor(props) {
            super(props);
            this.state = {
                space: null,
                value: this.props.value,
                buildings: [],
                spaces: [],
                treeRooms: []
            }
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.value !== this.props.value) {
                this.setState({ value: nextProps.value })
            }
        }

        async componentDidMount() {
            if (this.props.selectedSpaces && this.props.selectedSpaces.length > 0) {
                await this.setSelectedBuildings(this.props.selectedSpaces);
            }

            await this.getAllRooms();
        }

        getAllRooms = async () => {
            this.setState({ treeRooms: data });
            this.formatBuildings(data);
        }

        setSelectedBuildings = async (rooms) => {
            let selectedBuildings = [];
            let allRooms = [];

            await Promise.all(_.map(rooms, async item => {
                let room = await getRoom(item.id ? item.id : item);
                selectedBuildings.push(`${room.code}`);
                room.isLeaf = true;
                room.selectable = true
                allRooms.push(room);
            }))

            this.setState({ value: selectedBuildings });
        }

        renderTrees(node) {
            if (node) {
                return (
                    <TreeNode title={node.name} key={node.code} value={node.code} isLeaf={node.isLeaf} selectable={node.selectable ? true : false}>
                        {node.children && node.children.length > 0 &&
                            _.map(node.children, x => {
                                return this.renderTrees(x);
                            })
                        }
                    </TreeNode>
                );
            }
        }

        renderTreeNodes(node) {
            if (node) {
                return (
                    _.map(node, x => {
                        return this.renderTrees(x);
                    })
                );
            }
        }

        formatBuildings = (rooms) => {
            let { spaces, expandedSpaceKeys, buildingGroups } = formatBuildings(rooms);
            this.setState({ spaces, expandedSpaceKeys, buildings: buildingGroups });
        }

        onExpand(expandedSpaceKeys) {
            this.setState({ expandedSpaceKeys });
        }

        onChange = async (spaces) => {
            this.setState({ value: spaces })
            let rooms = await this.getRoomByBuilding(spaces);
            this.props.onChange(rooms)
        }

        getRoomByBuilding = async (spaces) => {
            if (!spaces) return [];
            let rooms = [];

            if (_.isArray(spaces)) {
                _.each(spaces, each => {
                    _.each(this.state.treeRooms, space => {
                        if (each === space.code ||
                            each === space.building.city ||
                            each === space.building.district ||
                            each === `building-${space.building.id}` ||
                            each === `floor-${space.floor}-${space.building.id}`) {
                            rooms.push(space.id);
                        }
                    })
                })
            } else {
                _.each(this.state.treeRooms, space => {
                    if (spaces === space.code ||
                        spaces === space.building.city ||
                        spaces === space.building.district ||
                        spaces === `building-${space.building.id}` ||
                        spaces === `floor-${space.floor}-${space.building.id}`) {
                        rooms.push(space.id);
                    }
                })
            }

            return rooms;
        }

        render() {
            return <WrappedComponent
                treeCheckable={this.props.treeCheckable}
                spaces={this.state.spaces}
                renderTreeNodes={this.renderTreeNodes}
                expandedSpaceKeys={this.state.expandedSpaceKeys}
                onChange={this.onChange}
                onExpand={this.onExpand}
                value={this.state.value}
                style={this.props.style}
            />
        }
    }
}

export default hoc(AreaRoomTree);