(function () {
    /**
     * 这里的逻辑大概是：
     * 1、判定是否点击了设置按钮
     * 1.1 点击了则更换页面组件,
     * 1.2 axios获取当前用户所有信息，
     * 1.3 生成可编辑表格供用户编写
     * 1.4 用户编写完毕进行提交
     * 1.5 信息检查，符合规范后向数据库发送
     * 1.6 返回个人信息页面（重新渲染数据）
     */
    var vm = new Vue({
        el: '#app',
        data: {
            table: false,/*弹窗是否显示*/
            updateInfo: false,/*修改个人信息*/
            login: true,/*注册、登录*/
            UserName: null,
            PassWord: null,
            UserGender: null,
            UserSayHi: null,
        },
        methods: {
            /**登录 */
            login_axios: function () {
                var formdata = new FormData();
                formdata.append('UserName', this.UserName);
                formdata.append('PassWord', this.PassWord);
                axios
                    .post('https://www.xipengheng.cn/AAA/login.php', formdata)
                    .then(res => {
                        /**验证账号和密码
                           * 成功时返回1
                           * 错误时返回2
                           * 数据库连接失败时返回0
                           */
                        res.data.infoCode == 1 ? (() => {
                            this.table = false;
                            console.log('登录成功');
                            window.localStorage.setItem('UserName', JSON.stringify(this.UserName));
                            window.localStorage.setItem('PassWord', JSON.stringify(this.PassWord));
                            history.go(0)
                        })()
                            : (res.data.infoCode == 2 ? alert('账号密码错误或不存在')
                                : alert('数据库连接失败，请稍后再试或联系管理员'))
                    })
            },
            /**注册 */
            createLogin_axios: function () {
                var formdata = new FormData();
                formdata.append('UserName', this.UserName);
                formdata.append('PassWord', this.PassWord);
                axios
                    .post('https://www.xipengheng.cn/AAA/createLogin.php', formdata)
                    .then(res => {
                        console.log(res);
                        /**验证注册用的账号和密码
                           * 账号已存在返回1
                           * 账号注册成功返回2
                           * 数据库连接失败时返回0
                           */
                        res.data.infoCode == 1 ? (() => {
                            console.log('当前账号已被注册');
                            this.UserName='';
                            alert('当前账号已被注册，请更换账号名')
                        })()
                            : (res.data.infoCode == 2 ? alert('注册成功，请登录')
                                : alert('数据库连接失败，请稍后再试或联系管理员'))
                    })
            },
            /**修改个人信息 */
            updateInfo_axios:function(){
                var formdata=new FormData();
                formdata.append('UserName', this.UserName);
                formdata.append('PassWord', this.PassWord);
                formdata.append('UserGender', this.UserGender);
                formdata.append('UserSayHi', this.UserSayHi);
                axios
                .post('https://www.xipengheng.cn/AAA/updateInfo.php', formdata)
                .then(res=>{
                    console.log(res);
                    this.table = false;
                })
            },
            loginfun: function () {
                this.login = true;
                this.updateInfo = false;
            },
            updatefun: function () {
                this.updateInfo = true;
                this.login = false;
            },
            close: function () {
                this.table = false;
            },
            setting: function () {
                this.table = true;
            }
        },
        mounted() {
            this.UserName = JSON.parse(localStorage.getItem('UserName'));
            var formdata=new FormData();
            formdata.append('UserName',this.UserName);
            axios
                .post('https://www.xipengheng.cn/AAA/myInfo.php', formdata)
                .then(res => {
                    this.UserName = res.data.message[0].UserName;
                    this.UserGender = res.data.message[0].UserGender;
                    this.UserSayHi = res.data.message[0].UserSayHi;
                })
        },
    })
})();