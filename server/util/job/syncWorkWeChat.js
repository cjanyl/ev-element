/**
 * Created by wangshuyi on 2017/1/18.
 */
'use strict';
const logger = require('log4js').getLogger("sys");
const moment = require('moment');
const WorkWeChat = require('../WorkWeChat');
const tool = require('../tool');
const curUser = undefined;

function syncWorkWeChat(param){
    let deptCount = {total: 0, update: 0, add: 0}, staffCount = {total: 0, update: 0, add: 0},
        deptParentMap = {}, rootDeptList = [];
    return WorkWeChat.getDepartment().then(({department}) => {
        deptCount.total = department.length;
        department.sort((a,b) => a.id - b.id);
        return department.__asyncForEach((dept, index) => {
            let deptData = {
                _id: dept.id,
                name: dept.name,
                sort: dept.order
            };
            if(deptParentMap[dept.parentid]){
                deptData.parent = dept.parentid;
                deptParentMap[dept.id] = deptParentMap[dept.parentid].concat([dept.id]);
            }else{
                rootDeptList.push(dept.id);
                deptParentMap[dept.id] = [dept.id];
            }
            return $ServiceMap.system.auth.OrgService.saveOrUpdate(curUser, deptData).then(({type}) => {
                logger.info('syncWorkWeChat', 'sync org process', index, deptCount.total);
                deptCount[type]++;
                return true;
            });
        })
    }).then(() => {
        return rootDeptList.__asyncForEach(rootDeptId => {
            return WorkWeChat.getStaffList(rootDeptId, 1).then(({userlist}) => {
                staffCount.total = userlist.length;

                return userlist.__asyncForEach((user, index) => {
                    let userData = {
                        code: user.userid,
                        name: user.name,
                        org: deptParentMap[user.department],
                        type: 'staff'
                    };

                    return $ServiceMap.system.auth.UserService.saveOrUpdate(curUser, userData, 'code').then(({type}) => {
                        logger.info('syncWorkWeChat', 'sync staff process', index, staffCount.total);
                        staffCount[type]++;
                        return true;
                    });
                });
            });
        })
    }).then(() => {
        let message = '';
        message += `共同步${deptCount.total}个部门，新增${deptCount.add}个。`;
        message += `${staffCount.total}名员工，新增${staffCount.add}个。`;
        return {message};
    })
}


module.exports = syncWorkWeChat;