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

## px2rem中1px边框不能显示，添加/\*no\*/表示忽略该语句,/\*px\*/表示不转换成rem
```
.selector {
  border: 1px solid #fff;/*no*/
}
```
## 使用px2rem的方法
```
1、在gulefile.js的px2rem配置中设置remUnit为设计稿的宽度，默认为75
px2rem({
			remUnit: 750
		})
2、把html的字体大小设置成屏幕大小,下面是限制了页面的最大宽度
window.onload = function() {
  let windowWidth = document.documentElement.clientWidth;
  document.documentElement.style.fontSize = (windowWidth > 750 ? 750 : windowWidth) + 'px';
}
3、设计稿是多少px，CSS就多少px
```
