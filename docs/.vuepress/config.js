module.exports = {
    title: "AXIA's Blog",
    description: "简单VueExpress项目尝试",
    dest:'./public',
    themeConfig: {
        logo:"/roxy_crying.jpg",
        nav: [
            {text: "首页", link: "/"},
            {text: "分栏", link: "/md/guide/" },
            {text: "生活", link: "/md/acg/"}
        ],
        sidebar: {
            // 侧边栏在 /guide/ 上
            '/md/acg/':[
              "/md/acg/",
                {
                    title: "二次元评论",
                    children:[
                        'article0'
                    ]
                }
            ],
            '/md/guide/': [
                "/md/guide/",
                {
                    title:'面试没答上的题目',
                    children:[
                        'test1',
                        'test2',
                        'test3'
                    ]
                },{
                    title:'常见面经整理',
                    children:[
                        'computer-web'
                    ]
                },{
                    title: '面试总结',
                    children:[
                        'huawei-interview-web.md'
                    ]
                }
            ]
        },
    },
    lastUpdated: 'Last Updated',
    // markdown: {
    //     // options for markdown-it-anchor
    //     anchor: { permalink: false },
    //     config: md => {
    //         md.use(require("markdown-it-katex"));
    //     }
    // }
};