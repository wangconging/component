<template>
  <div>
    <div>
      <codeShow :code2="code2" />
    </div>
  </div>
</template>

<script>
import codeShow from "@/components/myComponents/codeShow/codeShow";
import { getUserInfo } from "@/api/loginApi";
export default {
  components: {
    codeShow,
  },
  data() {
    return {
      code2: `{
    "code":200,
    "str":"wangcongwangcongwangcongwangcong",
    "name":"wangcongwangcongwangcongwangcong",
    "age":18,
    "num":3,
    "float":8.0685,
    "bool1":false,
    "bool2":false,
    "obj":{
        "a":"aa",
        "b":"bb"
    },
    "arr1":[
        1,
        2,
        3,
        1,
        2,
        3,
        1,
        2,
        3
    ],
    "arr2":[
        1,
        2,
        3,
        1,
        2,
        3
    ],
    "arr3":[
        {
            "name":"wangcongwangcongwangcongwangcong",
            "age":18,
            "num":2
        },
        {
            "name":"wangcongwangcongwangcongwangcong",
            "age":20,
            "num":0
        }
    ],
    "reg":"9 c",
    "email1":"e.pvd@mlxrsp.bg",
    "email2":"e.oklxqqsp@khijdvfwe.ly",
    "date":"1992-12-22",
    "time":"02:51",
    "now":"2021-07-04 pm 03:00",
    "datetime":"2016-03-20 03:53",
    "image":"http://dummyimage.com/200x200/aef279/ffffff.jpg&text=wangcong",
    "image1":"http://dummyimage.com/200x200/00ff00",
    "dataImage_base64":"data:image/png;base64,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",
    "range":[
        3,
        5,
        7,
        9
    ],
    "color":"#f279d2",
    "cword":"前前",
    "cname":"方敏",
    "cfirst":"郭",
    "clast":"刚",
    "province":"北京",
    "city":"西藏自治区 山南地区",
    "county":"湖北省 黄石市 下陆区",
    "zip":"943687",
    "upperFirstLetter":"Wangcong",
    "pick":2,
    "shuffle":[
        1,
        2,
        4,
        3
    ],
    "guid":"55ef975E-9381-F963-f0f4-DBa89eb2E22A",
    "id":"360000199112315895",
    "increment":1,
    "frult":"peach",
    "func":"hello world"
}`,
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      getUserInfo()
        .then((response) => {
          this.dataList = response;
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>