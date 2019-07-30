+(function (doc, win) {

	function setDpr() {
		// 获取dpr
		var dpr = win.devicePixelRatio,
			scale = 0,
			useragent = win.navigator.userAgent,
			meta = document.querySelector("meta[name='viewport']");
		doc.documentElement.dataset.dpr = dpr;
		// 判断安卓还是苹果设备
		var isAndroid = useragent.match(/android/ig);
		var isApple = useragent.match(/iPhone|iPad|iPod/ig);

		if (isAndroid) {
			scale = 1;
		}
		if (isApple) {
			scale = 1 / dpr;
		}

		// 判断页面是否存在meta标签，并对其进行设置
		if (meta) {
			meta.setAttribute("content", "width=device-width, initial-scale=" + scale + ", maximum-scale=" + scale + ", user-scalable=no");
		} else {
			meta = doc.createElement("meta");
			meta.setAttribute("name", "viewport");
			meta.setAttribute("content", "width=device-width, initial-scale=" + scale + ", maximum-scale=" + scale + ", user-scalable=no");
		}

		// 插入meta标签
		var head = doc.documentElement.firstChild;
		head.insertBefore(meta, head.firstChild);
	}

	function setFontSize() {
		// 判断屏幕大小
		var html = doc.documentElement;
		var width = win.innerWidth ? win.innerWidth : html.clientWidth;
		if (width >= 1500) {
			html.style.fontSize = 100 + 'px';
		} else {
			html.style.fontSize = 100 / 750 * width + "px";
		}
	}

	var evt = "onorientationchang" in win ? "orientationchange" : "resize",
		timer = null;

	win.addEventListener(evt, function () {
		clearTimeout(timer);
		setDpr();
		timer = setTimeout(setFontSize, 300);
	}, false);

	// 重载页面时判断是否缓存，如果是则执行setFontSize
	win.addEventListener("pageshow", function (event) {
		if (event.persisted) {
			clearTimeout(timer);
			setDpr();
			setTimeout(setFontSize, 300);
		}
	}, false);

	setDpr();
	setFontSize();

})(document, window)