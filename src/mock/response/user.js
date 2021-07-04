import Mock from 'mockjs'

const Random = Mock.Random
console.log(Random)

export const getUserInfo =(options) => {
    const template = {
        code: 200,
        'str|2-4': 'wangcong',
        'name|4':'wangcong',
        'age|+2': 18,
        'num|4-0': 0,
        'float|3-10.2-5': 0,
        'bool1|1': true, // 概率: 1/2
        'bool2|1-9': true, // 概率: min/(min-max)
        'obj|2': { // 随机抽取两个属性
            a: 'aa',
            b: 'bb',
            c: 'cc'
        },
        'obj|1-2': { // 随机抽取1-2个属性
            a: 'aa',
            b: 'bb',
            c: 'cc'
        },
        'arr1|2-4': [ // 数组重复2-4次
            1,2,3
        ],
        'arr2|2': [ // 数组重复2次
            1,2,3
        ],
        'arr3|2': [ // 数组重复2次
            {
                'name|4':'wangcong',
                'age|+2': 18,
                'num|4-0': 0
            }
        ],
        'func': ()=>{
            return 'hello world'
        },
        'reg': /[1-9] [a-z]/,
        email1: Random.email(),
        email2: Mock.mock('@email'),
        date: Random.date('yyyy-MM-dd'),
        time: Random.time('hh:mm'),
        now: Random.now('hour',  'yyyy-MM-dd a hh:mm'),
        datetime: Random.datetime('yyyy-MM-dd hh:mm'),
        image: Random.image('200x200', Random.color(), '#ffffff', 'jpg', 'wangcong'),
        image1: Random.image('200x200','#00ff00'),
        dataImage_base64: Random.dataImage('200x200', 'wangcong'),
        range: Random.range(3,10,2), // 生成一个3-10, 间隔为2的数组
        color: Random.color(),
        cword: Random.cword('床前明月光', 2, 5),
        cname: Random.cname(),
        cfirst: Random.cfirst(),
        clast: Random.clast(),
        province: Random.province(), // 省
        city: Random.city(true), // 城市
        county: Random.county(true), // 乡镇
        zip: Random.zip(), // 邮政编码
        upperFirstLetter: Random.capitalize('wangcong'), // 首字母大写
        pick: Random.pick([1,2,3,4]), // 随机取一个数字
        shuffle: Random.shuffle([1,2,3,4]), // 打乱数组
        guid: Random.guid(), // 随机字符串
        id: Random.id(), // 18位身份证号
        increment: Random.increment(), // 自增加id
        frult: Random.frult()

    }
    let obj = {
        code: 200,
        arr: []
    }
    let arr = [];
    let i = 3;
    while (i--) {
        obj.arr.push(template)
    }
    return Mock.mock(template)
}