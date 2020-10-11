var express = require('express');
var router = express.Router();
var fs = require('fs'); //文件模块
var path = require('path'); // 路径模块
var pageMethod = require('./page');

router.all('*', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    //跨域的类型json数据格式
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

// 根据名字或者年龄筛选
function filterByName(aim, name, sex) {
    if(name && sex){
        return aim.filter(item => item.name == name && item.sex == sex)
    }else{
        return aim.filter(item => item.name == name || item.sex == sex)
    }
}

//查询接口
router.get('/list', function (req, res, next) {
    var query = req.query;
    var pageNum = req.query.page || 1;
    var pageSize = req.query.size || 5;

    //读取文件数据
    fs.readFile(path.resolve(__dirname, '../data/customer.json'), 'utf8', function (err, data) {
        if (err) {
            res.send("Error");
        } else {
            var oldData = JSON.parse(data).list;
            var newData = [];
            if(query.name || query.sex){
                newData = filterByName(oldData, query.name, query.sex);
            }else{
                newData = oldData;
            }
            
            var dataList = pageMethod(pageNum, pageSize, newData);
            res.send({
                title: "客户数据",
                list: dataList,
                total: newData.length
            });
        }
    });
});

//新增客户接口
router.get('/add', function (req, res, next) {
    var query = req.query;
    var addData = {
        name: query.name,
        sex: query.sex,
        age: query.age,
        phone: query.phone,
        memo: query.memo
    }
    if (query) {
        //读取文件数据
        fs.readFile(path.resolve(__dirname, '../data/customer.json'), 'utf8', function (err, data) {
            if (err) {
                res.send("Error");
            } else {
                var oldData = JSON.parse(data).list;
                //新增客户及id
                if (oldData.length > 0) {
                    addData.id = Number(oldData[oldData.length - 1].id) + 1
                } else {
                    addData.id = 1;
                }
                oldData.push(addData);
                var newObj = {
                    title: "客户数据",
                    list: oldData
                }
                var str = JSON.stringify(newObj);
                //写入文件数据
                fs.writeFile(path.resolve(__dirname, "../data/customer.json"), str, function (err, data) {
                    if (err) {
                        res.send("Error");
                    } else {
                        res.send(newObj);
                    }
                })
            }
        })
    }
});

//删除客户
router.get('/delete', function (req, res, next) {
    var query = req.query;
    if (query) {
        fs.readFile(path.resolve(__dirname, "../data/customer.json"), "utf8", function (err, data) {
            if (err) {
                res.send("Error");
            } else {
                var oldData = JSON.parse(data).list;
                for (var i = 0; i < oldData.length; i++) {
                    if (query.id == oldData[i].id) {
                        oldData.splice(i, 1);
                    }
                }
                var newObj = {
                    title: "客户数据",
                    list: oldData
                }
                var str = JSON.stringify(newObj);
                fs.writeFile(path.resolve(__dirname, "../data/customer.json"), str, function (err, data) {
                    if (err) {
                        res.send("Error");
                    } else {
                        res.send(newObj);
                    }
                })
            }
        })

    }
});

//编辑客户接口
router.get('/edit', function (req, res, next) {
    var query = req.query;
    var editData = {
        id: query.id,
        name: query.name,
        sex: query.sex,
        age: query.age,
        phone: query.phone,
        memo: query.memo
    }
    if (query) {
        //读取文件数据
        fs.readFile(path.resolve(__dirname, '../data/customer.json'), 'utf8', function (err, data) {
            if (err) {
                res.send("Error");
            } else {
                var oldData = JSON.parse(data).list;
                //编辑修改客户信息
                for (var i = 0; i < oldData.length; i++) {
                    if (query.id == oldData[i].id) {
                        oldData[i] = editData;
                    }
                }
                var newObj = {
                    title: "客户数据",
                    list: oldData
                }
                var str = JSON.stringify(newObj);
                //写入文件数据
                fs.writeFile(path.resolve(__dirname, "../data/customer.json"), str, function (err, data) {
                    if (err) {
                        res.send("Error");
                    } else {
                        res.send(newObj);
                    }
                })
            }
        })
    }
});

//查询当前客户
router.get('/search', function (req, res, next) {
    var query = req.query;
    if (query) {
        fs.readFile(path.resolve(__dirname, "../data/customer.json"), "utf8", function (err, data) {
            if (err) {
                res.send("Error");
            } else {
                var oldData = JSON.parse(data).list;
                var obj = {};
                for (var i = 0; i < oldData.length; i++) {
                    if (query.id == oldData[i].id) {
                        obj = oldData[i];
                    }
                }
                var newObj = {
                    title: "客户数据",
                    obj: obj
                }
                res.send(newObj);
            }
        })

    }
});


module.exports = router;