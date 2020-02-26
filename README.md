## 解决gulp-px3rem插件生成的css文件命名带有.debug.css
```
(1)找到node_modules依赖包文件夹中的gulp-px3rem文件夹
(2)修改index.js中第46行和第60行的代码

46  path: file.path.replace(/(.debug)?.css$/, dpr + 'x.debug.css'), 改成 path: file.path.replace(/(.debug)?.css$/, dpr + '.css'),

60  path: file.path.replace(/(.debug)?.css$/, '.debug.css') 改成 path: file.path.replace(/(.debug)?.css$/, '.css')
(3)重启服务
```

## 防止autoprefixer删除-webkit-box-orient: vertical
```
  /*! autoprefixer:innore next */
	-webkit-box-orient: vertical;
```

## px2rem中1px边框不能显示，添加/*no*/防止转换
```
.selector {
  border: 1px solid #fff;/*no*/
}
```

