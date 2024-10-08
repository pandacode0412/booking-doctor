export const adminMenu = [

    { //quản lý người dùng
        name: 'menu.admin.mange-user', 
        menus: [
            {
                name: 'menu.admin.crud', link:'/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link:'/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor', link:'/system/manage-doctor',
            },
            // {
            //     name: 'menu.admin.manage-admin', link:'/system/user-admin',
            // },
            {
                name: 'menu.doctor.manage-schedule', link:'/doctor/manage-schedule',
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //quản lý phòng khám
        name:'menu.admin.clinic',
        menus: [
            {
                name:'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
        
    },
    { //quản lý chuyên khoa
        name:'menu.admin.specialty',
        menus: [
            {
                name:'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
        
    },
    { //quản lý cẩm nang
        name:'menu.admin.handbook',
        menus: [
            {
                name:'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
        
    },
]
//     { //hệ thống
//         name: 'menu.system.header', menus: [
//             {
//                 name: 'menu.system.system-administrator.header',
//                 subMenus: [
//                     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//                     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                
//                 ]
//             },
//             // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
//         ]
//     },
// ]

export const doctorMenu = [
    {
        name : 'menu.admin.manage-user',
        menus: [
            {
                //quản lý kế hoạch khám bệnh bác sĩ
                name:'menu.doctor.manage-schedule',link:'/doctor/manage-schedule'
            }
        ]
    }
]