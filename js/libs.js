function zmMatrix() {}
!function(a, b, c, d) {
    "use strict";
    var e = b.module("ngDragDrop", []).service("ngDragDropService", ["$timeout", "$parse", function(f, g) {
        this.draggableScope = null,
        this.droppableScope = null,
        this.callEventCallback = function(a, b, d, e) {
            function f(b) {
                var d = -1 !== b.indexOf("(") ? b.indexOf("(") : b.length
                  , e = -1 !== b.lastIndexOf(")") ? b.lastIndexOf(")") : b.length
                  , f = b.substring(d + 1, e)
                  , h = b.match(/^[^.]+.\s*/)[0].slice(0, -1);
                return h = a[h] && "function" == typeof a[h].constructor ? h : null,
                {
                    callback: b.substring(h && h.length + 1 || 0, d),
                    args: c.map(f && f.split(",") || [], function(b) {
                        return [g(b)(a)]
                    }),
                    constructor: h
                }
            }
            if (b) {
                var h = f(b)
                  , i = h.callback
                  , j = h.constructor
                  , k = [d, e].concat(h.args);
                return (a[i] || a[j][i]).apply(a, k)
            }
        }
        ,
        this.invokeDrop = function(a, c, g, h) {
            var i, j, k = "", l = "", m = {}, n = {}, o = null, p = {}, q = {}, r = null, s = this.droppableScope, t = this.draggableScope;
            k = a.ngattr("ng-model"),
            l = c.ngattr("ng-model"),
            i = t.$eval(k),
            j = s.$eval(l),
            r = c.find("[jqyoui-draggable]:last,[data-jqyoui-draggable]:last"),
            n = s.$eval(c.attr("jqyoui-droppable") || c.attr("data-jqyoui-droppable")) || [],
            m = t.$eval(a.attr("jqyoui-draggable") || a.attr("data-jqyoui-draggable")) || [],
            m.index = this.fixIndex(t, m, i),
            n.index = this.fixIndex(s, n, j),
            o = b.isArray(i) ? m.index : null,
            p = b.isArray(i) ? i[o] : i,
            m.deepCopy && (p = b.copy(p)),
            q = b.isArray(j) && n && n.index !== d ? j[n.index] : b.isArray(j) ? {} : j,
            n.deepCopy && (q = b.copy(q)),
            m.animate === !0 ? (this.move(a, r.length > 0 ? r : c, null, "fast", n, null),
            this.move(r.length > 0 && !n.multiple ? r : [], a.parent("[jqyoui-droppable],[data-jqyoui-droppable]"), e.startXY, "fast", n, b.bind(this, function() {
                f(b.bind(this, function() {
                    a.css({
                        position: "relative",
                        left: "",
                        top: ""
                    }),
                    r.css({
                        position: "relative",
                        left: "",
                        top: "",
                        display: "none" === r.css("display") ? "" : r.css("display")
                    }),
                    this.mutateDraggable(t, n, m, k, l, q, a),
                    this.mutateDroppable(s, n, m, l, p, o),
                    this.callEventCallback(s, n.onDrop, g, h)
                }))
            }))) : f(b.bind(this, function() {
                this.mutateDraggable(t, n, m, k, l, q, a),
                this.mutateDroppable(s, n, m, l, p, o),
                this.callEventCallback(s, n.onDrop, g, h)
            }))
        }
        ,
        this.move = function(b, c, e, f, g, h) {
            if (0 === b.length)
                return h && a.setTimeout(function() {
                    h()
                }, 300),
                !1;
            var i = b.css("z-index")
              , j = b[g.containment || "offset"]()
              , k = c.css("display")
              , l = c.hasClass("ng-hide");
            null === e && c.length > 0 && ((c.attr("jqyoui-draggable") || c.attr("data-jqyoui-draggable")) !== d && c.ngattr("ng-model") !== d && c.is(":visible") && g && g.multiple ? (e = c[g.containment || "offset"](),
            g.stack === !1 ? e.left += c.outerWidth(!0) : e.top += c.outerHeight(!0)) : (l && c.removeClass("ng-hide"),
            e = c.css({
                visibility: "hidden",
                display: "block"
            })[g.containment || "offset"](),
            c.css({
                visibility: "",
                display: k
            }))),
            b.css({
                position: "absolute",
                "z-index": 9999
            }).css(j).animate(e, f, function() {
                l && c.addClass("ng-hide"),
                b.css("z-index", i),
                h && h()
            })
        }
        ,
        this.mutateDroppable = function(a, c, d, e, f, h) {
            var i = a.$eval(e);
            a.dndDragItem = f,
            b.isArray(i) ? (c && c.index >= 0 ? d.insertInline ? i.splice(c.index, 0, f) : i[c.index] = f : i.push(f),
            d && d.placeholder === !0 && (i[i.length - 1].jqyoui_pos = h)) : (g(e + " = dndDragItem")(a),
            d && d.placeholder === !0 && (i.jqyoui_pos = h))
        }
        ,
        this.mutateDraggable = function(a, c, e, f, h, i, j) {
            var k = b.equals(i, {}) || !i
              , l = a.$eval(f);
            a.dndDropItem = i,
            e && e.placeholder ? "keep" != e.placeholder && (b.isArray(l) && e.index !== d ? e.swapPositions ? l[e.index] = i : l.splice(e.index, 1) : g(f + " = dndDropItem")(a)) : b.isArray(l) ? k ? e && e.placeholder !== !0 && "keep" !== e.placeholder && l.splice(e.index, 1) : e.insertInline ? l.splice(e.index, 1) : l[e.index] = i : (g(f + " = dndDropItem")(a),
            a.$parent && g(f + " = dndDropItem")(a.$parent)),
            j.css({
                "z-index": "",
                left: "",
                top: ""
            })
        }
        ,
        this.fixIndex = function(a, c, e) {
            if (c.applyFilter && b.isArray(e) && e.length > 0) {
                var f = a[c.applyFilter]()
                  , g = f[c.index]
                  , h = d;
                return e.forEach(function(a, c) {
                    b.equals(a, g) && (h = c)
                }),
                h
            }
            return c.index
        }
    }
    ]).directive("jqyouiDraggable", ["ngDragDropService", function(a) {
        return {
            require: "?jqyouiDroppable",
            restrict: "A",
            link: function(c, d, f) {
                var g, h, i, j = function(j, k) {
                    j ? (g = c.$eval(d.attr("jqyoui-draggable") || d.attr("data-jqyoui-draggable")) || {},
                    h = c.$eval(f.jqyouiOptions) || {},
                    d.draggable({
                        disabled: !1
                    }).draggable(h).draggable({
                        start: function(d, f) {
                            a.draggableScope = c,
                            i = b.element(h.helper ? f.helper : this).css("z-index"),
                            b.element(h.helper ? f.helper : this).css("z-index", 9999),
                            e.startXY = b.element(this)[g.containment || "offset"](),
                            a.callEventCallback(c, g.onStart, d, f)
                        },
                        stop: function(d, e) {
                            b.element(h.helper ? e.helper : this).css("z-index", i),
                            a.callEventCallback(c, g.onStop, d, e)
                        },
                        drag: function(b, d) {
                            a.callEventCallback(c, g.onDrag, b, d)
                        }
                    })) : d.draggable && d.draggable({
                        disabled: !0
                    })
                };
                c.$watch(function() {
                    return c.$eval(f.drag)
                }, j),
                j(),
                d.on("$destroy", function() {
                    d.draggable({
                        disabled: !0
                    }).draggable("destroy")
                })
            }
        }
    }
    ]).directive("jqyouiDroppable", ["ngDragDropService", "$q", function(a, c) {
        return {
            restrict: "A",
            priority: 1,
            link: function(d, e, f) {
                var g, h = function(h, i) {
                    h ? (g = d.$eval(b.element(e).attr("jqyoui-droppable") || b.element(e).attr("data-jqyoui-droppable")) || {},
                    e.droppable({
                        disabled: !1
                    }).droppable(d.$eval(f.jqyouiOptions) || {}).droppable({
                        over: function(b, c) {
                            a.callEventCallback(d, g.onOver, b, c)
                        },
                        out: function(b, c) {
                            a.callEventCallback(d, g.onOut, b, c)
                        },
                        drop: function(e, h) {
                            var i = null;
                            i = g.beforeDrop ? a.callEventCallback(d, g.beforeDrop, e, h) : function() {
                                var a = c.defer();
                                return a.resolve(),
                                a.promise
                            }(),
                            i.then(b.bind(this, function() {
                                b.element(h.draggable).ngattr("ng-model") && f.ngModel ? (a.droppableScope = d,
                                a.invokeDrop(b.element(h.draggable), b.element(this), e, h)) : a.callEventCallback(d, g.onDrop, e, h)
                            }), function() {
                                h.draggable.css({
                                    left: "",
                                    top: ""
                                })
                            })
                        }
                    })) : e.droppable && e.droppable({
                        disabled: !0
                    })
                };
                d.$watch(function() {
                    return d.$eval(f.drop)
                }, h),
                h(),
                e.on("$destroy", function() {
                    e.droppable({
                        disabled: !0
                    }).droppable("destroy")
                })
            }
        }
    }
    ]);
    b.element.prototype.ngattr = function(a, c) {
        var d = b.element(this).get(0);
        return d.getAttribute(a) || d.getAttribute("data-" + a)
    }
}(window, window.angular, window.jQuery),
function(a) {
    a.fn.dragCheck = function(b) {
        window.dragCheck_state = null,
        window.dragCheck_origin = null,
        this.mousedown(function() {
            window.dragCheck_state = !this.checked,
            window.dragCheck_origin = this,
            angular.element(this).controller("ngModel").$setViewValue(window.dragCheck_state),
            angular.element(this).controller("ngModel").$render(),
            angular.element(this).scope().$digest()
        }).mouseup(function() {
            this === window.dragCheck_origin && (angular.element(this).controller("ngModel").$setViewValue(!window.dragCheck_state),
            angular.element(this).controller("ngModel").$render(),
            angular.element(this).scope().$digest()),
            window.dragCheck_state = null,
            window.dragCheck_origin = null
        }).mouseenter(function(c) {
            null !== window.dragCheck_state && (a(this).add(window.dragCheck_origin).prop("checked", window.dragCheck_state).trigger("change", c),
            b.callback(a(this), window.dragCheck_state))
        }),
        a(document.body).mouseup(function() {
            window.dragCheck_state = null,
            window.dragCheck_origin = null
        })
    }
}(jQuery),
function(a) {
    a.color = {},
    a.color.make = function(b, c, d, e) {
        var f = {};
        return f.r = b || 0,
        f.g = c || 0,
        f.b = d || 0,
        f.a = null != e ? e : 1,
        f.add = function(a, b) {
            for (var c = 0; c < a.length; ++c)
                f[a.charAt(c)] += b;
            return f.normalize()
        }
        ,
        f.scale = function(a, b) {
            for (var c = 0; c < a.length; ++c)
                f[a.charAt(c)] *= b;
            return f.normalize()
        }
        ,
        f.toString = function() {
            return f.a >= 1 ? "rgb(" + [f.r, f.g, f.b].join(",") + ")" : "rgba(" + [f.r, f.g, f.b, f.a].join(",") + ")"
        }
        ,
        f.normalize = function() {
            function a(a, b, c) {
                return a > b ? a : b > c ? c : b
            }
            return f.r = a(0, parseInt(f.r), 255),
            f.g = a(0, parseInt(f.g), 255),
            f.b = a(0, parseInt(f.b), 255),
            f.a = a(0, f.a, 1),
            f
        }
        ,
        f.clone = function() {
            return a.color.make(f.r, f.b, f.g, f.a)
        }
        ,
        f.normalize()
    }
    ,
    a.color.extract = function(b, c) {
        var d;
        do {
            if (d = b.css(c).toLowerCase(),
            "" != d && "transparent" != d)
                break;
            b = b.parent()
        } while (b.length && !a.nodeName(b.get(0), "body"));
        return "rgba(0, 0, 0, 0)" == d && (d = "transparent"),
        a.color.parse(d)
    }
    ,
    a.color.parse = function(c) {
        var d, e = a.color.make;
        if (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))
            return e(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10));
        if (d = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c))
            return e(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10), parseFloat(d[4]));
        if (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))
            return e(2.55 * parseFloat(d[1]), 2.55 * parseFloat(d[2]), 2.55 * parseFloat(d[3]));
        if (d = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c))
            return e(2.55 * parseFloat(d[1]), 2.55 * parseFloat(d[2]), 2.55 * parseFloat(d[3]), parseFloat(d[4]));
        if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))
            return e(parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16));
        if (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))
            return e(parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16));
        var f = a.trim(c).toLowerCase();
        return "transparent" == f ? e(255, 255, 255, 0) : (d = b[f] || [0, 0, 0],
        e(d[0], d[1], d[2]))
    }
    ;
    var b = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
}(jQuery),
function(a) {
    function b(b, c) {
        var d = c.children("." + b)[0];
        if (null == d && (d = document.createElement("canvas"),
        d.className = b,
        a(d).css({
            direction: "ltr",
            position: "absolute",
            left: 0,
            top: 0
        }).appendTo(c),
        !d.getContext)) {
            if (!window.G_vmlCanvasManager)
                throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
            d = window.G_vmlCanvasManager.initElement(d)
        }
        this.element = d;
        var e = this.context = d.getContext("2d")
          , f = window.devicePixelRatio || 1
          , g = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
        this.pixelRatio = f / g,
        this.resize(c.width(), c.height()),
        this.textContainer = null,
        this.text = {},
        this._textCache = {}
    }
    function c(c, e, f, g) {
        function h(a, b) {
            b = [qa].concat(b);
            for (var c = 0; c < a.length; ++c)
                a[c].apply(this, b)
        }
        function i() {
            for (var c = {
                Canvas: b
            }, d = 0; d < g.length; ++d) {
                var e = g[d];
                e.init(qa, c),
                e.options && a.extend(!0, ea, e.options)
            }
        }
        function j(b) {
            a.extend(!0, ea, b),
            b && b.colors && (ea.colors = b.colors),
            null == ea.xaxis.color && (ea.xaxis.color = a.color.parse(ea.grid.color).scale("a", .22).toString()),
            null == ea.yaxis.color && (ea.yaxis.color = a.color.parse(ea.grid.color).scale("a", .22).toString()),
            null == ea.xaxis.tickColor && (ea.xaxis.tickColor = ea.grid.tickColor || ea.xaxis.color),
            null == ea.yaxis.tickColor && (ea.yaxis.tickColor = ea.grid.tickColor || ea.yaxis.color),
            null == ea.grid.borderColor && (ea.grid.borderColor = ea.grid.color),
            null == ea.grid.tickColor && (ea.grid.tickColor = a.color.parse(ea.grid.color).scale("a", .22).toString());
            var d, e, f, g = c.css("font-size"), i = g ? +g.replace("px", "") : 13, j = {
                style: c.css("font-style"),
                size: Math.round(.8 * i),
                variant: c.css("font-variant"),
                weight: c.css("font-weight"),
                family: c.css("font-family")
            };
            for (f = ea.xaxes.length || 1,
            d = 0; f > d; ++d)
                e = ea.xaxes[d],
                e && !e.tickColor && (e.tickColor = e.color),
                e = a.extend(!0, {}, ea.xaxis, e),
                ea.xaxes[d] = e,
                e.font && (e.font = a.extend({}, j, e.font),
                e.font.color || (e.font.color = e.color),
                e.font.lineHeight || (e.font.lineHeight = Math.round(1.15 * e.font.size)));
            for (f = ea.yaxes.length || 1,
            d = 0; f > d; ++d)
                e = ea.yaxes[d],
                e && !e.tickColor && (e.tickColor = e.color),
                e = a.extend(!0, {}, ea.yaxis, e),
                ea.yaxes[d] = e,
                e.font && (e.font = a.extend({}, j, e.font),
                e.font.color || (e.font.color = e.color),
                e.font.lineHeight || (e.font.lineHeight = Math.round(1.15 * e.font.size)));
            for (ea.xaxis.noTicks && null == ea.xaxis.ticks && (ea.xaxis.ticks = ea.xaxis.noTicks),
            ea.yaxis.noTicks && null == ea.yaxis.ticks && (ea.yaxis.ticks = ea.yaxis.noTicks),
            ea.x2axis && (ea.xaxes[1] = a.extend(!0, {}, ea.xaxis, ea.x2axis),
            ea.xaxes[1].position = "top",
            null == ea.x2axis.min && (ea.xaxes[1].min = null),
            null == ea.x2axis.max && (ea.xaxes[1].max = null)),
            ea.y2axis && (ea.yaxes[1] = a.extend(!0, {}, ea.yaxis, ea.y2axis),
            ea.yaxes[1].position = "right",
            null == ea.y2axis.min && (ea.yaxes[1].min = null),
            null == ea.y2axis.max && (ea.yaxes[1].max = null)),
            ea.grid.coloredAreas && (ea.grid.markings = ea.grid.coloredAreas),
            ea.grid.coloredAreasColor && (ea.grid.markingsColor = ea.grid.coloredAreasColor),
            ea.lines && a.extend(!0, ea.series.lines, ea.lines),
            ea.points && a.extend(!0, ea.series.points, ea.points),
            ea.bars && a.extend(!0, ea.series.bars, ea.bars),
            null != ea.shadowSize && (ea.series.shadowSize = ea.shadowSize),
            null != ea.highlightColor && (ea.series.highlightColor = ea.highlightColor),
            d = 0; d < ea.xaxes.length; ++d)
                q(ka, d + 1).options = ea.xaxes[d];
            for (d = 0; d < ea.yaxes.length; ++d)
                q(la, d + 1).options = ea.yaxes[d];
            for (var k in pa)
                ea.hooks[k] && ea.hooks[k].length && (pa[k] = pa[k].concat(ea.hooks[k]));
            h(pa.processOptions, [ea])
        }
        function k(a) {
            da = l(a),
            r(),
            s()
        }
        function l(b) {
            for (var c = [], d = 0; d < b.length; ++d) {
                var e = a.extend(!0, {}, ea.series);
                null != b[d].data ? (e.data = b[d].data,
                delete b[d].data,
                a.extend(!0, e, b[d]),
                b[d].data = e.data) : e.data = b[d],
                c.push(e)
            }
            return c
        }
        function m(a, b) {
            var c = a[b + "axis"];
            return "object" == typeof c && (c = c.n),
            "number" != typeof c && (c = 1),
            c
        }
        function n() {
            return a.grep(ka.concat(la), function(a) {
                return a
            })
        }
        function o(a) {
            var b, c, d = {};
            for (b = 0; b < ka.length; ++b)
                c = ka[b],
                c && c.used && (d["x" + c.n] = c.c2p(a.left));
            for (b = 0; b < la.length; ++b)
                c = la[b],
                c && c.used && (d["y" + c.n] = c.c2p(a.top));
            return void 0 !== d.x1 && (d.x = d.x1),
            void 0 !== d.y1 && (d.y = d.y1),
            d
        }
        function p(a) {
            var b, c, d, e = {};
            for (b = 0; b < ka.length; ++b)
                if (c = ka[b],
                c && c.used && (d = "x" + c.n,
                null == a[d] && 1 == c.n && (d = "x"),
                null != a[d])) {
                    e.left = c.p2c(a[d]);
                    break
                }
            for (b = 0; b < la.length; ++b)
                if (c = la[b],
                c && c.used && (d = "y" + c.n,
                null == a[d] && 1 == c.n && (d = "y"),
                null != a[d])) {
                    e.top = c.p2c(a[d]);
                    break
                }
            return e
        }
        function q(b, c) {
            return b[c - 1] || (b[c - 1] = {
                n: c,
                direction: b == ka ? "x" : "y",
                options: a.extend(!0, {}, b == ka ? ea.xaxis : ea.yaxis)
            }),
            b[c - 1]
        }
        function r() {
            var b, c = da.length, d = -1;
            for (b = 0; b < da.length; ++b) {
                var e = da[b].color;
                null != e && (c--,
                "number" == typeof e && e > d && (d = e))
            }
            d >= c && (c = d + 1);
            var f, g = [], h = ea.colors, i = h.length, j = 0;
            for (b = 0; c > b; b++)
                f = a.color.parse(h[b % i] || "#666"),
                b % i == 0 && b && (j = j >= 0 ? .5 > j ? -j - .2 : 0 : -j),
                g[b] = f.scale("rgb", 1 + j);
            var k, l = 0;
            for (b = 0; b < da.length; ++b) {
                if (k = da[b],
                null == k.color ? (k.color = g[l].toString(),
                ++l) : "number" == typeof k.color && (k.color = g[k.color].toString()),
                null == k.lines.show) {
                    var n, o = !0;
                    for (n in k)
                        if (k[n] && k[n].show) {
                            o = !1;
                            break
                        }
                    o && (k.lines.show = !0)
                }
                null == k.lines.zero && (k.lines.zero = !!k.lines.fill),
                k.xaxis = q(ka, m(k, "x")),
                k.yaxis = q(la, m(k, "y"))
            }
        }
        function s() {
            function b(a, b, c) {
                b < a.datamin && b != -s && (a.datamin = b),
                c > a.datamax && c != s && (a.datamax = c)
            }
            var c, d, e, f, g, i, j, k, l, m, o, p, q = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, s = Number.MAX_VALUE;
            for (a.each(n(), function(a, b) {
                b.datamin = q,
                b.datamax = r,
                b.used = !1
            }),
            c = 0; c < da.length; ++c)
                g = da[c],
                g.datapoints = {
                    points: []
                },
                h(pa.processRawData, [g, g.data, g.datapoints]);
            for (c = 0; c < da.length; ++c) {
                if (g = da[c],
                o = g.data,
                p = g.datapoints.format,
                !p) {
                    if (p = [],
                    p.push({
                        x: !0,
                        number: !0,
                        required: !0
                    }),
                    p.push({
                        y: !0,
                        number: !0,
                        required: !0
                    }),
                    g.bars.show || g.lines.show && g.lines.fill) {
                        var t = !!(g.bars.show && g.bars.zero || g.lines.show && g.lines.zero);
                        p.push({
                            y: !0,
                            number: !0,
                            required: !1,
                            defaultValue: 0,
                            autoscale: t
                        }),
                        g.bars.horizontal && (delete p[p.length - 1].y,
                        p[p.length - 1].x = !0)
                    }
                    g.datapoints.format = p
                }
                if (null == g.datapoints.pointsize) {
                    g.datapoints.pointsize = p.length,
                    j = g.datapoints.pointsize,
                    i = g.datapoints.points;
                    var u = g.lines.show && g.lines.steps;
                    for (g.xaxis.used = g.yaxis.used = !0,
                    d = e = 0; d < o.length; ++d,
                    e += j) {
                        m = o[d];
                        var v = null == m;
                        if (!v)
                            for (f = 0; j > f; ++f)
                                k = m[f],
                                l = p[f],
                                l && (l.number && null != k && (k = +k,
                                isNaN(k) ? k = null : k == 1 / 0 ? k = s : k == -(1 / 0) && (k = -s)),
                                null == k && (l.required && (v = !0),
                                null != l.defaultValue && (k = l.defaultValue))),
                                i[e + f] = k;
                        if (v)
                            for (f = 0; j > f; ++f)
                                k = i[e + f],
                                null != k && (l = p[f],
                                l.autoscale !== !1 && (l.x && b(g.xaxis, k, k),
                                l.y && b(g.yaxis, k, k))),
                                i[e + f] = null;
                        else if (u && e > 0 && null != i[e - j] && i[e - j] != i[e] && i[e - j + 1] != i[e + 1]) {
                            for (f = 0; j > f; ++f)
                                i[e + j + f] = i[e + f];
                            i[e + 1] = i[e - j + 1],
                            e += j
                        }
                    }
                }
            }
            for (c = 0; c < da.length; ++c)
                g = da[c],
                h(pa.processDatapoints, [g, g.datapoints]);
            for (c = 0; c < da.length; ++c) {
                g = da[c],
                i = g.datapoints.points,
                j = g.datapoints.pointsize,
                p = g.datapoints.format;
                var w = q
                  , x = q
                  , y = r
                  , z = r;
                for (d = 0; d < i.length; d += j)
                    if (null != i[d])
                        for (f = 0; j > f; ++f)
                            k = i[d + f],
                            l = p[f],
                            l && l.autoscale !== !1 && k != s && k != -s && (l.x && (w > k && (w = k),
                            k > y && (y = k)),
                            l.y && (x > k && (x = k),
                            k > z && (z = k)));
                if (g.bars.show) {
                    var A;
                    switch (g.bars.align) {
                    case "left":
                        A = 0;
                        break;
                    case "right":
                        A = -g.bars.barWidth;
                        break;
                    default:
                        A = -g.bars.barWidth / 2
                    }
                    g.bars.horizontal ? (x += A,
                    z += A + g.bars.barWidth) : (w += A,
                    y += A + g.bars.barWidth)
                }
                b(g.xaxis, w, y),
                b(g.yaxis, x, z)
            }
            a.each(n(), function(a, b) {
                b.datamin == q && (b.datamin = null),
                b.datamax == r && (b.datamax = null)
            })
        }
        function t() {
            c.css("padding", 0).children().filter(function() {
                return !a(this).hasClass("flot-overlay") && !a(this).hasClass("flot-base")
            }).remove(),
            "static" == c.css("position") && c.css("position", "relative"),
            fa = new b("flot-base",c),
            ga = new b("flot-overlay",c),
            ia = fa.context,
            ja = ga.context,
            ha = a(ga.element).unbind();
            var d = c.data("plot");
            d && (d.shutdown(),
            ga.clear()),
            c.data("plot", qa)
        }
        function u() {
            ea.grid.hoverable && (ha.mousemove(T),
            ha.bind("mouseleave", U)),
            ea.grid.clickable && ha.click(V),
            h(pa.bindEvents, [ha])
        }
        function v() {
            sa && clearTimeout(sa),
            ha.unbind("mousemove", T),
            ha.unbind("mouseleave", U),
            ha.unbind("click", V),
            h(pa.shutdown, [ha])
        }
        function w(a) {
            function b(a) {
                return a
            }
            var c, d, e = a.options.transform || b, f = a.options.inverseTransform;
            "x" == a.direction ? (c = a.scale = na / Math.abs(e(a.max) - e(a.min)),
            d = Math.min(e(a.max), e(a.min))) : (c = a.scale = oa / Math.abs(e(a.max) - e(a.min)),
            c = -c,
            d = Math.max(e(a.max), e(a.min))),
            e == b ? a.p2c = function(a) {
                return (a - d) * c
            }
            : a.p2c = function(a) {
                return (e(a) - d) * c
            }
            ,
            f ? a.c2p = function(a) {
                return f(d + a / c)
            }
            : a.c2p = function(a) {
                return d + a / c
            }
        }
        function x(a) {
            for (var b = a.options, c = a.ticks || [], d = b.labelWidth || 0, e = b.labelHeight || 0, f = d || ("x" == a.direction ? Math.floor(fa.width / (c.length || 1)) : null), g = a.direction + "Axis " + a.direction + a.n + "Axis", h = "flot-" + a.direction + "-axis flot-" + a.direction + a.n + "-axis " + g, i = b.font || "flot-tick-label tickLabel", j = 0; j < c.length; ++j) {
                var k = c[j];
                if (k.label) {
                    var l = fa.getTextInfo(h, k.label, i, null, f);
                    d = Math.max(d, l.width),
                    e = Math.max(e, l.height)
                }
            }
            a.labelWidth = b.labelWidth || d,
            a.labelHeight = b.labelHeight || e
        }
        function y(b) {
            var c = b.labelWidth
              , d = b.labelHeight
              , e = b.options.position
              , f = "x" === b.direction
              , g = b.options.tickLength
              , h = ea.grid.axisMargin
              , i = ea.grid.labelMargin
              , j = !0
              , k = !0
              , l = !0
              , m = !1;
            a.each(f ? ka : la, function(a, c) {
                c && (c.show || c.reserveSpace) && (c === b ? m = !0 : c.options.position === e && (m ? k = !1 : j = !1),
                m || (l = !1))
            }),
            k && (h = 0),
            null == g && (g = l ? "full" : 5),
            isNaN(+g) || (i += +g),
            f ? (d += i,
            "bottom" == e ? (ma.bottom += d + h,
            b.box = {
                top: fa.height - ma.bottom,
                height: d
            }) : (b.box = {
                top: ma.top + h,
                height: d
            },
            ma.top += d + h)) : (c += i,
            "left" == e ? (b.box = {
                left: ma.left + h,
                width: c
            },
            ma.left += c + h) : (ma.right += c + h,
            b.box = {
                left: fa.width - ma.right,
                width: c
            })),
            b.position = e,
            b.tickLength = g,
            b.box.padding = i,
            b.innermost = j
        }
        function z(a) {
            "x" == a.direction ? (a.box.left = ma.left - a.labelWidth / 2,
            a.box.width = fa.width - ma.left - ma.right + a.labelWidth) : (a.box.top = ma.top - a.labelHeight / 2,
            a.box.height = fa.height - ma.bottom - ma.top + a.labelHeight)
        }
        function A() {
            var b, c = ea.grid.minBorderMargin;
            if (null == c)
                for (c = 0,
                b = 0; b < da.length; ++b)
                    c = Math.max(c, 2 * (da[b].points.radius + da[b].points.lineWidth / 2));
            var d = {
                left: c,
                right: c,
                top: c,
                bottom: c
            };
            a.each(n(), function(a, b) {
                b.reserveSpace && b.ticks && b.ticks.length && ("x" === b.direction ? (d.left = Math.max(d.left, b.labelWidth / 2),
                d.right = Math.max(d.right, b.labelWidth / 2)) : (d.bottom = Math.max(d.bottom, b.labelHeight / 2),
                d.top = Math.max(d.top, b.labelHeight / 2)))
            }),
            ma.left = Math.ceil(Math.max(d.left, ma.left)),
            ma.right = Math.ceil(Math.max(d.right, ma.right)),
            ma.top = Math.ceil(Math.max(d.top, ma.top)),
            ma.bottom = Math.ceil(Math.max(d.bottom, ma.bottom))
        }
        function B() {
            var b, c = n(), d = ea.grid.show;
            for (var e in ma) {
                var f = ea.grid.margin || 0;
                ma[e] = "number" == typeof f ? f : f[e] || 0
            }
            h(pa.processOffset, [ma]);
            for (var e in ma)
                "object" == typeof ea.grid.borderWidth ? ma[e] += d ? ea.grid.borderWidth[e] : 0 : ma[e] += d ? ea.grid.borderWidth : 0;
            if (a.each(c, function(a, b) {
                var c = b.options;
                b.show = null == c.show ? b.used : c.show,
                b.reserveSpace = null == c.reserveSpace ? b.show : c.reserveSpace,
                C(b)
            }),
            d) {
                var g = a.grep(c, function(a) {
                    return a.show || a.reserveSpace
                });
                for (a.each(g, function(a, b) {
                    D(b),
                    E(b),
                    F(b, b.ticks),
                    x(b)
                }),
                b = g.length - 1; b >= 0; --b)
                    y(g[b]);
                A(),
                a.each(g, function(a, b) {
                    z(b)
                })
            }
            na = fa.width - ma.left - ma.right,
            oa = fa.height - ma.bottom - ma.top,
            a.each(c, function(a, b) {
                w(b)
            }),
            d && K(),
            R()
        }
        function C(a) {
            var b = a.options
              , c = +(null != b.min ? b.min : a.datamin)
              , d = +(null != b.max ? b.max : a.datamax)
              , e = d - c;
            if (0 == e) {
                var f = 0 == d ? 1 : .01;
                null == b.min && (c -= f),
                (null == b.max || null != b.min) && (d += f)
            } else {
                var g = b.autoscaleMargin;
                null != g && (null == b.min && (c -= e * g,
                0 > c && null != a.datamin && a.datamin >= 0 && (c = 0)),
                null == b.max && (d += e * g,
                d > 0 && null != a.datamax && a.datamax <= 0 && (d = 0)))
            }
            a.min = c,
            a.max = d
        }
        function D(b) {
            var c, e = b.options;
            c = "number" == typeof e.ticks && e.ticks > 0 ? e.ticks : .3 * Math.sqrt("x" == b.direction ? fa.width : fa.height);
            var f = (b.max - b.min) / c
              , g = -Math.floor(Math.log(f) / Math.LN10)
              , h = e.tickDecimals;
            null != h && g > h && (g = h);
            var i, j = Math.pow(10, -g), k = f / j;
            if (1.5 > k ? i = 1 : 3 > k ? (i = 2,
            k > 2.25 && (null == h || h >= g + 1) && (i = 2.5,
            ++g)) : i = 7.5 > k ? 5 : 10,
            i *= j,
            null != e.minTickSize && i < e.minTickSize && (i = e.minTickSize),
            b.delta = f,
            b.tickDecimals = Math.max(0, null != h ? h : g),
            b.tickSize = e.tickSize || i,
            "time" == e.mode && !b.tickGenerator)
                throw new Error("Time mode requires the flot.time plugin.");
            if (b.tickGenerator || (b.tickGenerator = function(a) {
                var b, c = [], e = d(a.min, a.tickSize), f = 0, g = Number.NaN;
                do
                    b = g,
                    g = e + f * a.tickSize,
                    c.push(g),
                    ++f;
                while (g < a.max && g != b);
                return c
            }
            ,
            b.tickFormatter = function(a, b) {
                var c = b.tickDecimals ? Math.pow(10, b.tickDecimals) : 1
                  , d = "" + Math.round(a * c) / c;
                if (null != b.tickDecimals) {
                    var e = d.indexOf(".")
                      , f = -1 == e ? 0 : d.length - e - 1;
                    if (f < b.tickDecimals)
                        return (f ? d : d + ".") + ("" + c).substr(1, b.tickDecimals - f)
                }
                return d
            }
            ),
            a.isFunction(e.tickFormatter) && (b.tickFormatter = function(a, b) {
                return "" + e.tickFormatter(a, b)
            }
            ),
            null != e.alignTicksWithAxis) {
                var l = ("x" == b.direction ? ka : la)[e.alignTicksWithAxis - 1];
                if (l && l.used && l != b) {
                    var m = b.tickGenerator(b);
                    if (m.length > 0 && (null == e.min && (b.min = Math.min(b.min, m[0])),
                    null == e.max && m.length > 1 && (b.max = Math.max(b.max, m[m.length - 1]))),
                    b.tickGenerator = function(a) {
                        var b, c, d = [];
                        for (c = 0; c < l.ticks.length; ++c)
                            b = (l.ticks[c].v - l.min) / (l.max - l.min),
                            b = a.min + b * (a.max - a.min),
                            d.push(b);
                        return d
                    }
                    ,
                    !b.mode && null == e.tickDecimals) {
                        var n = Math.max(0, -Math.floor(Math.log(b.delta) / Math.LN10) + 1)
                          , o = b.tickGenerator(b);
                        o.length > 1 && /\..*0$/.test((o[1] - o[0]).toFixed(n)) || (b.tickDecimals = n)
                    }
                }
            }
        }
        function E(b) {
            var c = b.options.ticks
              , d = [];
            null == c || "number" == typeof c && c > 0 ? d = b.tickGenerator(b) : c && (d = a.isFunction(c) ? c(b) : c);
            var e, f;
            for (b.ticks = [],
            e = 0; e < d.length; ++e) {
                var g = null
                  , h = d[e];
                "object" == typeof h ? (f = +h[0],
                h.length > 1 && (g = h[1])) : f = +h,
                null == g && (g = b.tickFormatter(f, b)),
                isNaN(f) || b.ticks.push({
                    v: f,
                    label: g
                })
            }
        }
        function F(a, b) {
            a.options.autoscaleMargin && b.length > 0 && (null == a.options.min && (a.min = Math.min(a.min, b[0].v)),
            null == a.options.max && b.length > 1 && (a.max = Math.max(a.max, b[b.length - 1].v)))
        }
        function G() {
            fa.clear(),
            h(pa.drawBackground, [ia]);
            var a = ea.grid;
            a.show && a.backgroundColor && I(),
            a.show && !a.aboveData && J();
            for (var b = 0; b < da.length; ++b)
                h(pa.drawSeries, [ia, da[b]]),
                L(da[b]);
            h(pa.draw, [ia]),
            a.show && a.aboveData && J(),
            fa.render(),
            X()
        }
        function H(a, b) {
            for (var c, d, e, f, g = n(), h = 0; h < g.length; ++h)
                if (c = g[h],
                c.direction == b && (f = b + c.n + "axis",
                a[f] || 1 != c.n || (f = b + "axis"),
                a[f])) {
                    d = a[f].from,
                    e = a[f].to;
                    break
                }
            if (a[f] || (c = "x" == b ? ka[0] : la[0],
            d = a[b + "1"],
            e = a[b + "2"]),
            null != d && null != e && d > e) {
                var i = d;
                d = e,
                e = i
            }
            return {
                from: d,
                to: e,
                axis: c
            }
        }
        function I() {
            ia.save(),
            ia.translate(ma.left, ma.top),
            ia.fillStyle = ca(ea.grid.backgroundColor, oa, 0, "rgba(255, 255, 255, 0)"),
            ia.fillRect(0, 0, na, oa),
            ia.restore()
        }
        function J() {
            var b, c, d, e;
            ia.save(),
            ia.translate(ma.left, ma.top);
            var f = ea.grid.markings;
            if (f)
                for (a.isFunction(f) && (c = qa.getAxes(),
                c.xmin = c.xaxis.min,
                c.xmax = c.xaxis.max,
                c.ymin = c.yaxis.min,
                c.ymax = c.yaxis.max,
                f = f(c)),
                b = 0; b < f.length; ++b) {
                    var g = f[b]
                      , h = H(g, "x")
                      , i = H(g, "y");
                    if (null == h.from && (h.from = h.axis.min),
                    null == h.to && (h.to = h.axis.max),
                    null == i.from && (i.from = i.axis.min),
                    null == i.to && (i.to = i.axis.max),
                    !(h.to < h.axis.min || h.from > h.axis.max || i.to < i.axis.min || i.from > i.axis.max)) {
                        h.from = Math.max(h.from, h.axis.min),
                        h.to = Math.min(h.to, h.axis.max),
                        i.from = Math.max(i.from, i.axis.min),
                        i.to = Math.min(i.to, i.axis.max);
                        var j = h.from === h.to
                          , k = i.from === i.to;
                        if (!j || !k)
                            if (h.from = Math.floor(h.axis.p2c(h.from)),
                            h.to = Math.floor(h.axis.p2c(h.to)),
                            i.from = Math.floor(i.axis.p2c(i.from)),
                            i.to = Math.floor(i.axis.p2c(i.to)),
                            j || k) {
                                var l = g.lineWidth || ea.grid.markingsLineWidth
                                  , m = l % 2 ? .5 : 0;
                                ia.beginPath(),
                                ia.strokeStyle = g.color || ea.grid.markingsColor,
                                ia.lineWidth = l,
                                j ? (ia.moveTo(h.to + m, i.from),
                                ia.lineTo(h.to + m, i.to)) : (ia.moveTo(h.from, i.to + m),
                                ia.lineTo(h.to, i.to + m)),
                                ia.stroke()
                            } else
                                ia.fillStyle = g.color || ea.grid.markingsColor,
                                ia.fillRect(h.from, i.to, h.to - h.from, i.from - i.to)
                    }
                }
            c = n(),
            d = ea.grid.borderWidth;
            for (var o = 0; o < c.length; ++o) {
                var p, q, r, s, t = c[o], u = t.box, v = t.tickLength;
                if (t.show && 0 != t.ticks.length) {
                    for (ia.lineWidth = 1,
                    "x" == t.direction ? (p = 0,
                    q = "full" == v ? "top" == t.position ? 0 : oa : u.top - ma.top + ("top" == t.position ? u.height : 0)) : (q = 0,
                    p = "full" == v ? "left" == t.position ? 0 : na : u.left - ma.left + ("left" == t.position ? u.width : 0)),
                    t.innermost || (ia.strokeStyle = t.options.color,
                    ia.beginPath(),
                    r = s = 0,
                    "x" == t.direction ? r = na + 1 : s = oa + 1,
                    1 == ia.lineWidth && ("x" == t.direction ? q = Math.floor(q) + .5 : p = Math.floor(p) + .5),
                    ia.moveTo(p, q),
                    ia.lineTo(p + r, q + s),
                    ia.stroke()),
                    ia.strokeStyle = t.options.tickColor,
                    ia.beginPath(),
                    b = 0; b < t.ticks.length; ++b) {
                        var w = t.ticks[b].v;
                        r = s = 0,
                        isNaN(w) || w < t.min || w > t.max || "full" == v && ("object" == typeof d && d[t.position] > 0 || d > 0) && (w == t.min || w == t.max) || ("x" == t.direction ? (p = t.p2c(w),
                        s = "full" == v ? -oa : v,
                        "top" == t.position && (s = -s)) : (q = t.p2c(w),
                        r = "full" == v ? -na : v,
                        "left" == t.position && (r = -r)),
                        1 == ia.lineWidth && ("x" == t.direction ? p = Math.floor(p) + .5 : q = Math.floor(q) + .5),
                        ia.moveTo(p, q),
                        ia.lineTo(p + r, q + s))
                    }
                    ia.stroke()
                }
            }
            d && (e = ea.grid.borderColor,
            "object" == typeof d || "object" == typeof e ? ("object" != typeof d && (d = {
                top: d,
                right: d,
                bottom: d,
                left: d
            }),
            "object" != typeof e && (e = {
                top: e,
                right: e,
                bottom: e,
                left: e
            }),
            d.top > 0 && (ia.strokeStyle = e.top,
            ia.lineWidth = d.top,
            ia.beginPath(),
            ia.moveTo(0 - d.left, 0 - d.top / 2),
            ia.lineTo(na, 0 - d.top / 2),
            ia.stroke()),
            d.right > 0 && (ia.strokeStyle = e.right,
            ia.lineWidth = d.right,
            ia.beginPath(),
            ia.moveTo(na + d.right / 2, 0 - d.top),
            ia.lineTo(na + d.right / 2, oa),
            ia.stroke()),
            d.bottom > 0 && (ia.strokeStyle = e.bottom,
            ia.lineWidth = d.bottom,
            ia.beginPath(),
            ia.moveTo(na + d.right, oa + d.bottom / 2),
            ia.lineTo(0, oa + d.bottom / 2),
            ia.stroke()),
            d.left > 0 && (ia.strokeStyle = e.left,
            ia.lineWidth = d.left,
            ia.beginPath(),
            ia.moveTo(0 - d.left / 2, oa + d.bottom),
            ia.lineTo(0 - d.left / 2, 0),
            ia.stroke())) : (ia.lineWidth = d,
            ia.strokeStyle = ea.grid.borderColor,
            ia.strokeRect(-d / 2, -d / 2, na + d, oa + d))),
            ia.restore()
        }
        function K() {
            a.each(n(), function(a, b) {
                var c, d, e, f, g, h = b.box, i = b.direction + "Axis " + b.direction + b.n + "Axis", j = "flot-" + b.direction + "-axis flot-" + b.direction + b.n + "-axis " + i, k = b.options.font || "flot-tick-label tickLabel";
                if (fa.removeText(j),
                b.show && 0 != b.ticks.length)
                    for (var l = 0; l < b.ticks.length; ++l)
                        c = b.ticks[l],
                        !c.label || c.v < b.min || c.v > b.max || ("x" == b.direction ? (f = "center",
                        d = ma.left + b.p2c(c.v),
                        "bottom" == b.position ? e = h.top + h.padding : (e = h.top + h.height - h.padding,
                        g = "bottom")) : (g = "middle",
                        e = ma.top + b.p2c(c.v),
                        "left" == b.position ? (d = h.left + h.width - h.padding,
                        f = "right") : d = h.left + h.padding),
                        fa.addText(j, d, e, c.label, k, null, null, f, g))
            })
        }
        function L(a) {
            a.lines.show && M(a),
            a.bars.show && P(a),
            a.points.show && N(a)
        }
        function M(a) {
            function b(a, b, c, d, e) {
                var f = a.points
                  , g = a.pointsize
                  , h = null
                  , i = null;
                ia.beginPath();
                for (var j = g; j < f.length; j += g) {
                    var k = f[j - g]
                      , l = f[j - g + 1]
                      , m = f[j]
                      , n = f[j + 1];
                    if (null != k && null != m) {
                        if (n >= l && l < e.min) {
                            if (n < e.min)
                                continue;
                            k = (e.min - l) / (n - l) * (m - k) + k,
                            l = e.min
                        } else if (l >= n && n < e.min) {
                            if (l < e.min)
                                continue;
                            m = (e.min - l) / (n - l) * (m - k) + k,
                            n = e.min
                        }
                        if (l >= n && l > e.max) {
                            if (n > e.max)
                                continue;
                            k = (e.max - l) / (n - l) * (m - k) + k,
                            l = e.max
                        } else if (n >= l && n > e.max) {
                            if (l > e.max)
                                continue;
                            m = (e.max - l) / (n - l) * (m - k) + k,
                            n = e.max
                        }
                        if (m >= k && k < d.min) {
                            if (m < d.min)
                                continue;
                            l = (d.min - k) / (m - k) * (n - l) + l,
                            k = d.min
                        } else if (k >= m && m < d.min) {
                            if (k < d.min)
                                continue;
                            n = (d.min - k) / (m - k) * (n - l) + l,
                            m = d.min
                        }
                        if (k >= m && k > d.max) {
                            if (m > d.max)
                                continue;
                            l = (d.max - k) / (m - k) * (n - l) + l,
                            k = d.max
                        } else if (m >= k && m > d.max) {
                            if (k > d.max)
                                continue;
                            n = (d.max - k) / (m - k) * (n - l) + l,
                            m = d.max
                        }
                        (k != h || l != i) && ia.moveTo(d.p2c(k) + b, e.p2c(l) + c),
                        h = m,
                        i = n,
                        ia.lineTo(d.p2c(m) + b, e.p2c(n) + c)
                    }
                }
                ia.stroke()
            }
            function c(a, b, c) {
                for (var d = a.points, e = a.pointsize, f = Math.min(Math.max(0, c.min), c.max), g = 0, h = !1, i = 1, j = 0, k = 0; ; ) {
                    if (e > 0 && g > d.length + e)
                        break;
                    g += e;
                    var l = d[g - e]
                      , m = d[g - e + i]
                      , n = d[g]
                      , o = d[g + i];
                    if (h) {
                        if (e > 0 && null != l && null == n) {
                            k = g,
                            e = -e,
                            i = 2;
                            continue
                        }
                        if (0 > e && g == j + e) {
                            ia.fill(),
                            h = !1,
                            e = -e,
                            i = 1,
                            g = j = k + e;
                            continue
                        }
                    }
                    if (null != l && null != n) {
                        if (n >= l && l < b.min) {
                            if (n < b.min)
                                continue;
                            m = (b.min - l) / (n - l) * (o - m) + m,
                            l = b.min
                        } else if (l >= n && n < b.min) {
                            if (l < b.min)
                                continue;
                            o = (b.min - l) / (n - l) * (o - m) + m,
                            n = b.min
                        }
                        if (l >= n && l > b.max) {
                            if (n > b.max)
                                continue;
                            m = (b.max - l) / (n - l) * (o - m) + m,
                            l = b.max
                        } else if (n >= l && n > b.max) {
                            if (l > b.max)
                                continue;
                            o = (b.max - l) / (n - l) * (o - m) + m,
                            n = b.max
                        }
                        if (h || (ia.beginPath(),
                        ia.moveTo(b.p2c(l), c.p2c(f)),
                        h = !0),
                        m >= c.max && o >= c.max)
                            ia.lineTo(b.p2c(l), c.p2c(c.max)),
                            ia.lineTo(b.p2c(n), c.p2c(c.max));
                        else if (m <= c.min && o <= c.min)
                            ia.lineTo(b.p2c(l), c.p2c(c.min)),
                            ia.lineTo(b.p2c(n), c.p2c(c.min));
                        else {
                            var p = l
                              , q = n;
                            o >= m && m < c.min && o >= c.min ? (l = (c.min - m) / (o - m) * (n - l) + l,
                            m = c.min) : m >= o && o < c.min && m >= c.min && (n = (c.min - m) / (o - m) * (n - l) + l,
                            o = c.min),
                            m >= o && m > c.max && o <= c.max ? (l = (c.max - m) / (o - m) * (n - l) + l,
                            m = c.max) : o >= m && o > c.max && m <= c.max && (n = (c.max - m) / (o - m) * (n - l) + l,
                            o = c.max),
                            l != p && ia.lineTo(b.p2c(p), c.p2c(m)),
                            ia.lineTo(b.p2c(l), c.p2c(m)),
                            ia.lineTo(b.p2c(n), c.p2c(o)),
                            n != q && (ia.lineTo(b.p2c(n), c.p2c(o)),
                            ia.lineTo(b.p2c(q), c.p2c(o)))
                        }
                    }
                }
            }
            ia.save(),
            ia.translate(ma.left, ma.top),
            ia.lineJoin = "round";
            var d = a.lines.lineWidth
              , e = a.shadowSize;
            if (d > 0 && e > 0) {
                ia.lineWidth = e,
                ia.strokeStyle = "rgba(0,0,0,0.1)";
                var f = Math.PI / 18;
                b(a.datapoints, Math.sin(f) * (d / 2 + e / 2), Math.cos(f) * (d / 2 + e / 2), a.xaxis, a.yaxis),
                ia.lineWidth = e / 2,
                b(a.datapoints, Math.sin(f) * (d / 2 + e / 4), Math.cos(f) * (d / 2 + e / 4), a.xaxis, a.yaxis)
            }
            ia.lineWidth = d,
            ia.strokeStyle = a.color;
            var g = Q(a.lines, a.color, 0, oa);
            g && (ia.fillStyle = g,
            c(a.datapoints, a.xaxis, a.yaxis)),
            d > 0 && b(a.datapoints, 0, 0, a.xaxis, a.yaxis),
            ia.restore()
        }
        function N(a) {
            function b(a, b, c, d, e, f, g, h) {
                for (var i = a.points, j = a.pointsize, k = 0; k < i.length; k += j) {
                    var l = i[k]
                      , m = i[k + 1];
                    null == l || l < f.min || l > f.max || m < g.min || m > g.max || (ia.beginPath(),
                    l = f.p2c(l),
                    m = g.p2c(m) + d,
                    "circle" == h ? ia.arc(l, m, b, 0, e ? Math.PI : 2 * Math.PI, !1) : h(ia, l, m, b, e),
                    ia.closePath(),
                    c && (ia.fillStyle = c,
                    ia.fill()),
                    ia.stroke())
                }
            }
            ia.save(),
            ia.translate(ma.left, ma.top);
            var c = a.points.lineWidth
              , d = a.shadowSize
              , e = a.points.radius
              , f = a.points.symbol;
            if (0 == c && (c = 1e-4),
            c > 0 && d > 0) {
                var g = d / 2;
                ia.lineWidth = g,
                ia.strokeStyle = "rgba(0,0,0,0.1)",
                b(a.datapoints, e, null, g + g / 2, !0, a.xaxis, a.yaxis, f),
                ia.strokeStyle = "rgba(0,0,0,0.2)",
                b(a.datapoints, e, null, g / 2, !0, a.xaxis, a.yaxis, f)
            }
            ia.lineWidth = c,
            ia.strokeStyle = a.color,
            b(a.datapoints, e, Q(a.points, a.color), 0, !1, a.xaxis, a.yaxis, f),
            ia.restore()
        }
        function O(a, b, c, d, e, f, g, h, i, j, k) {
            var l, m, n, o, p, q, r, s, t;
            j ? (s = q = r = !0,
            p = !1,
            l = c,
            m = a,
            o = b + d,
            n = b + e,
            l > m && (t = m,
            m = l,
            l = t,
            p = !0,
            q = !1)) : (p = q = r = !0,
            s = !1,
            l = a + d,
            m = a + e,
            n = c,
            o = b,
            n > o && (t = o,
            o = n,
            n = t,
            s = !0,
            r = !1)),
            m < g.min || l > g.max || o < h.min || n > h.max || (l < g.min && (l = g.min,
            p = !1),
            m > g.max && (m = g.max,
            q = !1),
            n < h.min && (n = h.min,
            s = !1),
            o > h.max && (o = h.max,
            r = !1),
            l = g.p2c(l),
            n = h.p2c(n),
            m = g.p2c(m),
            o = h.p2c(o),
            f && (i.fillStyle = f(n, o),
            i.fillRect(l, o, m - l, n - o)),
            k > 0 && (p || q || r || s) && (i.beginPath(),
            i.moveTo(l, n),
            p ? i.lineTo(l, o) : i.moveTo(l, o),
            r ? i.lineTo(m, o) : i.moveTo(m, o),
            q ? i.lineTo(m, n) : i.moveTo(m, n),
            s ? i.lineTo(l, n) : i.moveTo(l, n),
            i.stroke()))
        }
        function P(a) {
            function b(b, c, d, e, f, g) {
                for (var h = b.points, i = b.pointsize, j = 0; j < h.length; j += i)
                    null != h[j] && O(h[j], h[j + 1], h[j + 2], c, d, e, f, g, ia, a.bars.horizontal, a.bars.lineWidth)
            }
            ia.save(),
            ia.translate(ma.left, ma.top),
            ia.lineWidth = a.bars.lineWidth,
            ia.strokeStyle = a.color;
            var c;
            switch (a.bars.align) {
            case "left":
                c = 0;
                break;
            case "right":
                c = -a.bars.barWidth;
                break;
            default:
                c = -a.bars.barWidth / 2
            }
            var d = a.bars.fill ? function(b, c) {
                return Q(a.bars, a.color, b, c)
            }
            : null;
            b(a.datapoints, c, c + a.bars.barWidth, d, a.xaxis, a.yaxis),
            ia.restore()
        }
        function Q(b, c, d, e) {
            var f = b.fill;
            if (!f)
                return null;
            if (b.fillColor)
                return ca(b.fillColor, d, e, c);
            var g = a.color.parse(c);
            return g.a = "number" == typeof f ? f : .4,
            g.normalize(),
            g.toString()
        }
        function R() {
            if (null != ea.legend.container ? a(ea.legend.container).html("") : c.find(".legend").remove(),
            ea.legend.show) {
                for (var b, d, e = [], f = [], g = !1, h = ea.legend.labelFormatter, i = 0; i < da.length; ++i)
                    b = da[i],
                    b.label && (d = h ? h(b.label, b) : b.label,
                    d && f.push({
                        label: d,
                        color: b.color
                    }));
                if (ea.legend.sorted)
                    if (a.isFunction(ea.legend.sorted))
                        f.sort(ea.legend.sorted);
                    else if ("reverse" == ea.legend.sorted)
                        f.reverse();
                    else {
                        var j = "descending" != ea.legend.sorted;
                        f.sort(function(a, b) {
                            return a.label == b.label ? 0 : a.label < b.label != j ? 1 : -1
                        })
                    }
                for (var i = 0; i < f.length; ++i) {
                    var k = f[i];
                    i % ea.legend.noColumns == 0 && (g && e.push("</tr>"),
                    e.push("<tr>"),
                    g = !0),
                    e.push('<td class="legendColorBox"><div style="border:1px solid ' + ea.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + k.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + k.label + "</td>")
                }
                if (g && e.push("</tr>"),
                0 != e.length) {
                    var l = '<table style="font-size:smaller;color:' + ea.grid.color + '">' + e.join("") + "</table>";
                    if (null != ea.legend.container)
                        a(ea.legend.container).html(l);
                    else {
                        var m = ""
                          , n = ea.legend.position
                          , o = ea.legend.margin;
                        null == o[0] && (o = [o, o]),
                        "n" == n.charAt(0) ? m += "top:" + (o[1] + ma.top) + "px;" : "s" == n.charAt(0) && (m += "bottom:" + (o[1] + ma.bottom) + "px;"),
                        "e" == n.charAt(1) ? m += "right:" + (o[0] + ma.right) + "px;" : "w" == n.charAt(1) && (m += "left:" + (o[0] + ma.left) + "px;");
                        var p = a('<div class="legend">' + l.replace('style="', 'style="position:absolute;' + m + ";") + "</div>").appendTo(c);
                        if (0 != ea.legend.backgroundOpacity) {
                            var q = ea.legend.backgroundColor;
                            null == q && (q = ea.grid.backgroundColor,
                            q = q && "string" == typeof q ? a.color.parse(q) : a.color.extract(p, "background-color"),
                            q.a = 1,
                            q = q.toString());
                            var r = p.children();
                            a('<div style="position:absolute;width:' + r.width() + "px;height:" + r.height() + "px;" + m + "background-color:" + q + ';"> </div>').prependTo(p).css("opacity", ea.legend.backgroundOpacity)
                        }
                    }
                }
            }
        }
        function S(a, b, c) {
            var d, e, f, g = ea.grid.mouseActiveRadius, h = g * g + 1, i = null;
            for (d = da.length - 1; d >= 0; --d)
                if (c(da[d])) {
                    var j = da[d]
                      , k = j.xaxis
                      , l = j.yaxis
                      , m = j.datapoints.points
                      , n = k.c2p(a)
                      , o = l.c2p(b)
                      , p = g / k.scale
                      , q = g / l.scale;
                    if (f = j.datapoints.pointsize,
                    k.options.inverseTransform && (p = Number.MAX_VALUE),
                    l.options.inverseTransform && (q = Number.MAX_VALUE),
                    j.lines.show || j.points.show)
                        for (e = 0; e < m.length; e += f) {
                            var r = m[e]
                              , s = m[e + 1];
                            if (null != r && !(r - n > p || -p > r - n || s - o > q || -q > s - o)) {
                                var t = Math.abs(k.p2c(r) - a)
                                  , u = Math.abs(l.p2c(s) - b)
                                  , v = t * t + u * u;
                                h > v && (h = v,
                                i = [d, e / f])
                            }
                        }
                    if (j.bars.show && !i) {
                        var w, x;
                        switch (j.bars.align) {
                        case "left":
                            w = 0;
                            break;
                        case "right":
                            w = -j.bars.barWidth;
                            break;
                        default:
                            w = -j.bars.barWidth / 2
                        }
                        for (x = w + j.bars.barWidth,
                        e = 0; e < m.length; e += f) {
                            var r = m[e]
                              , s = m[e + 1]
                              , y = m[e + 2];
                            null != r && (da[d].bars.horizontal ? n <= Math.max(y, r) && n >= Math.min(y, r) && o >= s + w && s + x >= o : n >= r + w && r + x >= n && o >= Math.min(y, s) && o <= Math.max(y, s)) && (i = [d, e / f])
                        }
                    }
                }
            return i ? (d = i[0],
            e = i[1],
            f = da[d].datapoints.pointsize,
            {
                datapoint: da[d].datapoints.points.slice(e * f, (e + 1) * f),
                dataIndex: e,
                series: da[d],
                seriesIndex: d
            }) : null
        }
        function T(a) {
            ea.grid.hoverable && W("plothover", a, function(a) {
                return 0 != a.hoverable
            })
        }
        function U(a) {
            ea.grid.hoverable && W("plothover", a, function(a) {
                return !1
            })
        }
        function V(a) {
            W("plotclick", a, function(a) {
                return 0 != a.clickable
            })
        }
        function W(a, b, d) {
            var e = ha.offset()
              , f = b.pageX - e.left - ma.left
              , g = b.pageY - e.top - ma.top
              , h = o({
                left: f,
                top: g
            });
            h.pageX = b.pageX,
            h.pageY = b.pageY;
            var i = S(f, g, d);
            if (i && (i.pageX = parseInt(i.series.xaxis.p2c(i.datapoint[0]) + e.left + ma.left, 10),
            i.pageY = parseInt(i.series.yaxis.p2c(i.datapoint[1]) + e.top + ma.top, 10)),
            ea.grid.autoHighlight) {
                for (var j = 0; j < ra.length; ++j) {
                    var k = ra[j];
                    k.auto != a || i && k.series == i.series && k.point[0] == i.datapoint[0] && k.point[1] == i.datapoint[1] || $(k.series, k.point)
                }
                i && Z(i.series, i.datapoint, a)
            }
            c.trigger(a, [h, i])
        }
        function X() {
            var a = ea.interaction.redrawOverlayInterval;
            return -1 == a ? void Y() : void (sa || (sa = setTimeout(Y, a)))
        }
        function Y() {
            sa = null,
            ja.save(),
            ga.clear(),
            ja.translate(ma.left, ma.top);
            var a, b;
            for (a = 0; a < ra.length; ++a)
                b = ra[a],
                b.series.bars.show ? ba(b.series, b.point) : aa(b.series, b.point);
            ja.restore(),
            h(pa.drawOverlay, [ja])
        }
        function Z(a, b, c) {
            if ("number" == typeof a && (a = da[a]),
            "number" == typeof b) {
                var d = a.datapoints.pointsize;
                b = a.datapoints.points.slice(d * b, d * (b + 1))
            }
            var e = _(a, b);
            -1 == e ? (ra.push({
                series: a,
                point: b,
                auto: c
            }),
            X()) : c || (ra[e].auto = !1)
        }
        function $(a, b) {
            if (null == a && null == b)
                return ra = [],
                void X();
            if ("number" == typeof a && (a = da[a]),
            "number" == typeof b) {
                var c = a.datapoints.pointsize;
                b = a.datapoints.points.slice(c * b, c * (b + 1))
            }
            var d = _(a, b);
            -1 != d && (ra.splice(d, 1),
            X())
        }
        function _(a, b) {
            for (var c = 0; c < ra.length; ++c) {
                var d = ra[c];
                if (d.series == a && d.point[0] == b[0] && d.point[1] == b[1])
                    return c
            }
            return -1
        }
        function aa(b, c) {
            var d = c[0]
              , e = c[1]
              , f = b.xaxis
              , g = b.yaxis
              , h = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString();
            if (!(d < f.min || d > f.max || e < g.min || e > g.max)) {
                var i = b.points.radius + b.points.lineWidth / 2;
                ja.lineWidth = i,
                ja.strokeStyle = h;
                var j = 1.5 * i;
                d = f.p2c(d),
                e = g.p2c(e),
                ja.beginPath(),
                "circle" == b.points.symbol ? ja.arc(d, e, j, 0, 2 * Math.PI, !1) : b.points.symbol(ja, d, e, j, !1),
                ja.closePath(),
                ja.stroke()
            }
        }
        function ba(b, c) {
            var d, e = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString(), f = e;
            switch (b.bars.align) {
            case "left":
                d = 0;
                break;
            case "right":
                d = -b.bars.barWidth;
                break;
            default:
                d = -b.bars.barWidth / 2
            }
            ja.lineWidth = b.bars.lineWidth,
            ja.strokeStyle = e,
            O(c[0], c[1], c[2] || 0, d, d + b.bars.barWidth, function() {
                return f
            }, b.xaxis, b.yaxis, ja, b.bars.horizontal, b.bars.lineWidth)
        }
        function ca(b, c, d, e) {
            if ("string" == typeof b)
                return b;
            for (var f = ia.createLinearGradient(0, d, 0, c), g = 0, h = b.colors.length; h > g; ++g) {
                var i = b.colors[g];
                if ("string" != typeof i) {
                    var j = a.color.parse(e);
                    null != i.brightness && (j = j.scale("rgb", i.brightness)),
                    null != i.opacity && (j.a *= i.opacity),
                    i = j.toString()
                }
                f.addColorStop(g / (h - 1), i)
            }
            return f
        }
        var da = []
          , ea = {
            colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
            legend: {
                show: !0,
                noColumns: 1,
                labelFormatter: null,
                labelBoxBorderColor: "#ccc",
                container: null,
                position: "ne",
                margin: 5,
                backgroundColor: null,
                backgroundOpacity: .85,
                sorted: null
            },
            xaxis: {
                show: null,
                position: "bottom",
                mode: null,
                font: null,
                color: null,
                tickColor: null,
                transform: null,
                inverseTransform: null,
                min: null,
                max: null,
                autoscaleMargin: null,
                ticks: null,
                tickFormatter: null,
                labelWidth: null,
                labelHeight: null,
                reserveSpace: null,
                tickLength: null,
                alignTicksWithAxis: null,
                tickDecimals: null,
                tickSize: null,
                minTickSize: null
            },
            yaxis: {
                autoscaleMargin: .02,
                position: "left"
            },
            xaxes: [],
            yaxes: [],
            series: {
                points: {
                    show: !1,
                    radius: 3,
                    lineWidth: 2,
                    fill: !0,
                    fillColor: "#ffffff",
                    symbol: "circle"
                },
                lines: {
                    lineWidth: 2,
                    fill: !1,
                    fillColor: null,
                    steps: !1
                },
                bars: {
                    show: !1,
                    lineWidth: 2,
                    barWidth: 1,
                    fill: !0,
                    fillColor: null,
                    align: "left",
                    horizontal: !1,
                    zero: !0
                },
                shadowSize: 3,
                highlightColor: null
            },
            grid: {
                show: !0,
                aboveData: !1,
                color: "#545454",
                backgroundColor: null,
                borderColor: null,
                tickColor: null,
                margin: 0,
                labelMargin: 5,
                axisMargin: 8,
                borderWidth: 2,
                minBorderMargin: null,
                markings: null,
                markingsColor: "#f4f4f4",
                markingsLineWidth: 2,
                clickable: !1,
                hoverable: !1,
                autoHighlight: !0,
                mouseActiveRadius: 10
            },
            interaction: {
                redrawOverlayInterval: 1e3 / 60
            },
            hooks: {}
        }
          , fa = null
          , ga = null
          , ha = null
          , ia = null
          , ja = null
          , ka = []
          , la = []
          , ma = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
          , na = 0
          , oa = 0
          , pa = {
            processOptions: [],
            processRawData: [],
            processDatapoints: [],
            processOffset: [],
            drawBackground: [],
            drawSeries: [],
            draw: [],
            bindEvents: [],
            drawOverlay: [],
            shutdown: []
        }
          , qa = this;
        qa.setData = k,
        qa.setupGrid = B,
        qa.draw = G,
        qa.getPlaceholder = function() {
            return c
        }
        ,
        qa.getCanvas = function() {
            return fa.element
        }
        ,
        qa.getPlotOffset = function() {
            return ma
        }
        ,
        qa.width = function() {
            return na
        }
        ,
        qa.height = function() {
            return oa
        }
        ,
        qa.offset = function() {
            var a = ha.offset();
            return a.left += ma.left,
            a.top += ma.top,
            a
        }
        ,
        qa.getData = function() {
            return da
        }
        ,
        qa.getAxes = function() {
            var b = {};
            return a.each(ka.concat(la), function(a, c) {
                c && (b[c.direction + (1 != c.n ? c.n : "") + "axis"] = c)
            }),
            b
        }
        ,
        qa.getXAxes = function() {
            return ka
        }
        ,
        qa.getYAxes = function() {
            return la
        }
        ,
        qa.c2p = o,
        qa.p2c = p,
        qa.getOptions = function() {
            return ea
        }
        ,
        qa.highlight = Z,
        qa.unhighlight = $,
        qa.triggerRedrawOverlay = X,
        qa.pointOffset = function(a) {
            return {
                left: parseInt(ka[m(a, "x") - 1].p2c(+a.x) + ma.left, 10),
                top: parseInt(la[m(a, "y") - 1].p2c(+a.y) + ma.top, 10)
            }
        }
        ,
        qa.shutdown = v,
        qa.destroy = function() {
            v(),
            c.removeData("plot").empty(),
            da = [],
            ea = null,
            fa = null,
            ga = null,
            ha = null,
            ia = null,
            ja = null,
            ka = [],
            la = [],
            pa = null,
            ra = [],
            qa = null
        }
        ,
        qa.resize = function() {
            var a = c.width()
              , b = c.height();
            fa.resize(a, b),
            ga.resize(a, b)
        }
        ,
        qa.hooks = pa,
        i(qa),
        j(f),
        t(),
        k(e),
        B(),
        G(),
        u();
        var ra = []
          , sa = null
    }
    function d(a, b) {
        return b * Math.floor(a / b)
    }
    var e = Object.prototype.hasOwnProperty;
    a.fn.detach || (a.fn.detach = function() {
        return this.each(function() {
            this.parentNode && this.parentNode.removeChild(this)
        })
    }
    ),
    b.prototype.resize = function(a, b) {
        if (0 >= a || 0 >= b)
            throw new Error("Invalid dimensions for plot, width = " + a + ", height = " + b);
        var c = this.element
          , d = this.context
          , e = this.pixelRatio;
        this.width != a && (c.width = a * e,
        c.style.width = a + "px",
        this.width = a),
        this.height != b && (c.height = b * e,
        c.style.height = b + "px",
        this.height = b),
        d.restore(),
        d.save(),
        d.scale(e, e)
    }
    ,
    b.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height)
    }
    ,
    b.prototype.render = function() {
        var a = this._textCache;
        for (var b in a)
            if (e.call(a, b)) {
                var c = this.getTextLayer(b)
                  , d = a[b];
                c.hide();
                for (var f in d)
                    if (e.call(d, f)) {
                        var g = d[f];
                        for (var h in g)
                            if (e.call(g, h)) {
                                for (var i, j = g[h].positions, k = 0; i = j[k]; k++)
                                    i.active ? i.rendered || (c.append(i.element),
                                    i.rendered = !0) : (j.splice(k--, 1),
                                    i.rendered && i.element.detach());
                                0 == j.length && delete g[h]
                            }
                    }
                c.show()
            }
    }
    ,
    b.prototype.getTextLayer = function(b) {
        var c = this.text[b];
        return null == c && (null == this.textContainer && (this.textContainer = a("<div class='flot-text'></div>").css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            "font-size": "smaller",
            color: "#545454"
        }).insertAfter(this.element)),
        c = this.text[b] = a("<div></div>").addClass(b).css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }).appendTo(this.textContainer)),
        c
    }
    ,
    b.prototype.getTextInfo = function(b, c, d, e, f) {
        var g, h, i, j;
        if (c = "" + c,
        g = "object" == typeof d ? d.style + " " + d.variant + " " + d.weight + " " + d.size + "px/" + d.lineHeight + "px " + d.family : d,
        h = this._textCache[b],
        null == h && (h = this._textCache[b] = {}),
        i = h[g],
        null == i && (i = h[g] = {}),
        j = i[c],
        null == j) {
            var k = a("<div></div>").html(c).css({
                position: "absolute",
                "max-width": f,
                top: -9999
            }).appendTo(this.getTextLayer(b));
            "object" == typeof d ? k.css({
                font: g,
                color: d.color
            }) : "string" == typeof d && k.addClass(d),
            j = i[c] = {
                width: k.outerWidth(!0),
                height: k.outerHeight(!0),
                element: k,
                positions: []
            },
            k.detach()
        }
        return j
    }
    ,
    b.prototype.addText = function(a, b, c, d, e, f, g, h, i) {
        var j = this.getTextInfo(a, d, e, f, g)
          , k = j.positions;
        "center" == h ? b -= j.width / 2 : "right" == h && (b -= j.width),
        "middle" == i ? c -= j.height / 2 : "bottom" == i && (c -= j.height);
        for (var l, m = 0; l = k[m]; m++)
            if (l.x == b && l.y == c)
                return void (l.active = !0);
        l = {
            active: !0,
            rendered: !1,
            element: k.length ? j.element.clone() : j.element,
            x: b,
            y: c
        },
        k.push(l),
        l.element.css({
            top: Math.round(c),
            left: Math.round(b),
            "text-align": h
        })
    }
    ,
    b.prototype.removeText = function(a, b, c, d, f, g) {
        if (null == d) {
            var h = this._textCache[a];
            if (null != h)
                for (var i in h)
                    if (e.call(h, i)) {
                        var j = h[i];
                        for (var k in j)
                            if (e.call(j, k))
                                for (var l, m = j[k].positions, n = 0; l = m[n]; n++)
                                    l.active = !1
                    }
        } else
            for (var l, m = this.getTextInfo(a, d, f, g).positions, n = 0; l = m[n]; n++)
                l.x == b && l.y == c && (l.active = !1)
    }
    ,
    a.plot = function(b, d, e) {
        var f = new c(a(b),d,e,a.plot.plugins);
        return f
    }
    ,
    a.plot.version = "0.8.3",
    a.plot.plugins = [],
    a.fn.plot = function(b, c) {
        return this.each(function() {
            a.plot(this, b, c)
        })
    }
}(jQuery),
function(a, b, c) {
    "$:nomunge";
    function d(c) {
        h === !0 && (h = c || 1);
        for (var i = f.length - 1; i >= 0; i--) {
            var m = a(f[i]);
            if (m[0] == b || m.is(":visible")) {
                var n = m.width()
                  , o = m.height()
                  , p = m.data(k);
                !p || n === p.w && o === p.h || (m.trigger(j, [p.w = n, p.h = o]),
                h = c || !0)
            } else
                p = m.data(k),
                p.w = 0,
                p.h = 0
        }
        null !== e && (h && (null == c || 1e3 > c - h) ? e = b.requestAnimationFrame(d) : (e = setTimeout(d, g[l]),
        h = !1))
    }
    var e, f = [], g = a.resize = a.extend(a.resize, {}), h = !1, i = "setTimeout", j = "resize", k = j + "-special-event", l = "pendingDelay", m = "activeDelay", n = "throttleWindow";
    g[l] = 200,
    g[m] = 20,
    g[n] = !0,
    a.event.special[j] = {
        setup: function() {
            if (!g[n] && this[i])
                return !1;
            var b = a(this);
            f.push(this),
            b.data(k, {
                w: b.width(),
                h: b.height()
            }),
            1 === f.length && (e = c,
            d())
        },
        teardown: function() {
            if (!g[n] && this[i])
                return !1;
            for (var b = a(this), c = f.length - 1; c >= 0; c--)
                if (f[c] == this) {
                    f.splice(c, 1);
                    break
                }
            b.removeData(k),
            f.length || (h ? cancelAnimationFrame(e) : clearTimeout(e),
            e = null)
        },
        add: function(b) {
            function d(b, d, f) {
                var g = a(this)
                  , h = g.data(k) || {};
                h.w = d !== c ? d : g.width(),
                h.h = f !== c ? f : g.height(),
                e.apply(this, arguments)
            }
            if (!g[n] && this[i])
                return !1;
            var e;
            return a.isFunction(b) ? (e = b,
            d) : (e = b.handler,
            void (b.handler = d))
        }
    },
    b.requestAnimationFrame || (b.requestAnimationFrame = function() {
        return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function(a, c) {
            return b.setTimeout(function() {
                a((new Date).getTime())
            }, g[m])
        }
    }()),
    b.cancelAnimationFrame || (b.cancelAnimationFrame = function() {
        return b.webkitCancelRequestAnimationFrame || b.mozCancelRequestAnimationFrame || b.oCancelRequestAnimationFrame || b.msCancelRequestAnimationFrame || clearTimeout
    }())
}(jQuery, this),
function(a) {
    function b(a) {
        function b() {
            var b = a.getPlaceholder();
            0 != b.width() && 0 != b.height() && (a.resize(),
            a.setupGrid(),
            a.draw())
        }
        function c(a, c) {
            a.getPlaceholder().resize(b)
        }
        function d(a, c) {
            a.getPlaceholder().unbind("resize", b)
        }
        a.hooks.bindEvents.push(c),
        a.hooks.shutdown.push(d)
    }
    var c = {};
    a.plot.plugins.push({
        init: b,
        options: c,
        name: "resize",
        version: "1.0"
    })
}(jQuery),
function(a) {
    function b(b) {
        function c(a, b) {
            b.series.curvedLines.active && a.hooks.processDatapoints.push(d)
        }
        function d(b, c, d) {
            if (1 == c.curvedLines.apply)
                if (c.lines.fill) {
                    var f = e(d, c.curvedLines, 1)
                      , g = e(d, c.curvedLines, 2);
                    d.pointsize = 3,
                    d.points = [];
                    for (var h = 0, i = 0, j = 0, k = 2; j < f.length || h < g.length; )
                        f[j] == g[h] ? (d.points[i] = f[j],
                        d.points[i + 1] = f[j + 1],
                        d.points[i + 2] = g[h + 1],
                        h += k,
                        j += k) : f[j] < g[h] ? (d.points[i] = f[j],
                        d.points[i + 1] = f[j + 1],
                        d.points[i + 2] = i > 0 ? d.points[i - 1] : null,
                        j += k) : (d.points[i] = g[h],
                        d.points[i + 1] = i > 1 ? d.points[i - 2] : null,
                        d.points[i + 2] = g[h + 1],
                        h += k),
                        i += 3;
                    if (c.lines.lineWidth > 0) {
                        var l = a.extend({}, c);
                        l.lines = a.extend({}, c.lines),
                        l.lines.fill = void 0,
                        l.label = void 0,
                        l.datapoints = {},
                        l.datapoints.points = f,
                        l.datapoints.pointsize = 2,
                        l.curvedLines.apply = !1;
                        var m = b.getData();
                        for (j = 0; j < m.length; j++)
                            if (m[j] == c) {
                                b.getData().splice(j + 1, 0, l);
                                break
                            }
                        c.lines.lineWidth = 0
                    }
                } else
                    c.lines.lineWidth > 0 && (d.points = e(d, c.curvedLines, 1),
                    d.pointsize = 2)
        }
        function e(a, b, c) {
            var d = a.points
              , e = a.pointsize
              , f = b.curvePointFactor * (d.length / e)
              , g = new Array
              , h = new Array
              , i = 0
              , j = c
              , k = -1
              , l = -1
              , m = 0;
            if (b.fit)
                for (var n = b.fitPointDist, o = 0; o < d.length; o += e) {
                    var p = new Array
                      , q = new Array;
                    k = o,
                    l = o + c,
                    p[i] = d[k] - n,
                    p[j] = d[l],
                    q[i] = d[k] + n,
                    q[j] = d[l];
                    var r = d[l]
                      , s = d[l];
                    o >= e && (r = d[l - e]),
                    o + e < d.length && (s = d[l + e]),
                    r <= d[l] && s <= d[l] || r >= d[l] && s >= d[l] ? (g[m] = p[i],
                    h[m] = p[j],
                    m++,
                    g[m] = d[k],
                    h[m] = d[l],
                    m++,
                    g[m] = q[i],
                    h[m] = q[j],
                    m++) : (g[m] = d[k],
                    h[m] = d[l],
                    m++)
                }
            else
                for (var o = 0; o < d.length; o += e)
                    k = o,
                    l = o + c,
                    g[m] = d[k],
                    h[m] = d[l],
                    m++;
            var t = g.length
              , u = new Array
              , v = new Array;
            u[0] = 0,
            u[t - 1] = 0,
            v[0] = 0;
            for (var o = 1; t - 1 > o; ++o) {
                var w = g[o + 1] - g[o - 1];
                if (0 == w)
                    return null;
                var x = (g[o] - g[o - 1]) / w
                  , y = x * u[o - 1] + 2;
                u[o] = (x - 1) / y,
                v[o] = (h[o + 1] - h[o]) / (g[o + 1] - g[o]) - (h[o] - h[o - 1]) / (g[o] - g[o - 1]),
                v[o] = (6 * v[o] / (g[o + 1] - g[o - 1]) - x * v[o - 1]) / y
            }
            for (var m = t - 2; m >= 0; --m)
                u[m] = u[m] * u[m + 1] + v[m];
            var z = (g[t - 1] - g[0]) / (f - 1)
              , A = new Array
              , B = new Array
              , C = new Array;
            for (A[0] = g[0],
            B[0] = h[0],
            C.push(A[0]),
            C.push(B[0]),
            m = 1; f > m; ++m) {
                A[m] = A[0] + m * z;
                for (var D = t - 1, E = 0; D - E > 1; ) {
                    var F = Math.round((D + E) / 2);
                    g[F] > A[m] ? D = F : E = F
                }
                var G = g[D] - g[E];
                if (0 == G)
                    return null;
                var H = (g[D] - A[m]) / G
                  , I = (A[m] - g[E]) / G;
                B[m] = H * h[E] + I * h[D] + ((H * H * H - H) * u[E] + (I * I * I - I) * u[D]) * (G * G) / 6,
                C.push(A[m]),
                C.push(B[m])
            }
            return C
        }
        b.hooks.processOptions.push(c)
    }
    var c = {
        series: {
            curvedLines: {
                active: !1,
                apply: !1,
                fit: !1,
                curvePointFactor: 20,
                fitPointDist: 1e-4
            }
        }
    };
    a.plot.plugins.push({
        init: b,
        options: c,
        name: "curvedLines",
        version: "0.5"
    })
}(jQuery),
function(a) {
    function b(a, b, c, d) {
        var e = "categories" == b.xaxis.options.mode
          , f = "categories" == b.yaxis.options.mode;
        if (e || f) {
            var g = d.format;
            if (!g) {
                var h = b;
                if (g = [],
                g.push({
                    x: !0,
                    number: !0,
                    required: !0
                }),
                g.push({
                    y: !0,
                    number: !0,
                    required: !0
                }),
                h.bars.show || h.lines.show && h.lines.fill) {
                    var i = !!(h.bars.show && h.bars.zero || h.lines.show && h.lines.zero);
                    g.push({
                        y: !0,
                        number: !0,
                        required: !1,
                        defaultValue: 0,
                        autoscale: i
                    }),
                    h.bars.horizontal && (delete g[g.length - 1].y,
                    g[g.length - 1].x = !0)
                }
                d.format = g
            }
            for (var j = 0; j < g.length; ++j)
                g[j].x && e && (g[j].number = !1),
                g[j].y && f && (g[j].number = !1)
        }
    }
    function c(a) {
        var b = -1;
        for (var c in a)
            a[c] > b && (b = a[c]);
        return b + 1
    }
    function d(a) {
        var b = [];
        for (var c in a.categories) {
            var d = a.categories[c];
            d >= a.min && d <= a.max && b.push([d, c])
        }
        return b.sort(function(a, b) {
            return a[0] - b[0]
        }),
        b
    }
    function e(b, c, e) {
        if ("categories" == b[c].options.mode) {
            if (!b[c].categories) {
                var g = {}
                  , h = b[c].options.categories || {};
                if (a.isArray(h))
                    for (var i = 0; i < h.length; ++i)
                        g[h[i]] = i;
                else
                    for (var j in h)
                        g[j] = h[j];
                b[c].categories = g
            }
            b[c].options.ticks || (b[c].options.ticks = d),
            f(e, c, b[c].categories)
        }
    }
    function f(a, b, d) {
        for (var e = a.points, f = a.pointsize, g = a.format, h = b.charAt(0), i = c(d), j = 0; j < e.length; j += f)
            if (null != e[j])
                for (var k = 0; f > k; ++k) {
                    var l = e[j + k];
                    null != l && g[k][h] && (l in d || (d[l] = i,
                    ++i),
                    e[j + k] = d[l])
                }
    }
    function g(a, b, c) {
        e(b, "xaxis", c),
        e(b, "yaxis", c)
    }
    function h(a) {
        a.hooks.processRawData.push(b),
        a.hooks.processDatapoints.push(g)
    }
    var i = {
        xaxis: {
            categories: null
        },
        yaxis: {
            categories: null
        }
    };
    a.plot.plugins.push({
        init: h,
        options: i,
        name: "categories",
        version: "1.0"
    })
}(jQuery),
function(a) {
    function b(a) {
        a.hooks.drawSeries.push(d),
        a.hooks.shutdown.push(e),
        a.hooks.processOffset && a.hooks.processOffset.push(c)
    }
    function c(a, b) {
        for (var c = a.getData(), d = 0; d < c.length; d++)
            c[d].canvasRender || !c[d].showLabels || c[d].labelClass || (c[d].labelClass = "seriesLabel" + (d + 1))
    }
    function d(b, c, d) {
        function e(e, f, g) {
            var h = d.points.radius;
            if (d.canvasRender) {
                var i = c.measureText(e).width;
                switch (d.labelPlacement) {
                case "above":
                    f -= i / 2,
                    g -= d.cPadding + h,
                    c.textBaseline = "bottom";
                    break;
                case "left":
                    f -= i + d.cPadding + h,
                    c.textBaseline = "middle";
                    break;
                case "right":
                    f += d.cPadding + h,
                    c.textBaseline = "middle";
                    break;
                default:
                    c.textBaseline = "top",
                    g += d.cPadding + h,
                    f -= i / 2
                }
                c.fillText(e, f, g)
            } else {
                var j = a('<div class="' + d.labelClass + '">' + e + "</div>").css({
                    position: "absolute"
                }).appendTo(b.getPlaceholder());
                switch (d.labelPlacement) {
                case "above":
                    j.css({
                        top: g - (j.height() + h),
                        left: f - j.width() / 2
                    });
                    break;
                case "left":
                    j.css({
                        top: g - j.height() / 2,
                        left: f - (j.width() + h)
                    });
                    break;
                case "right":
                    j.css({
                        top: g - j.height() / 2,
                        left: f + h
                    });
                    break;
                default:
                    j.css({
                        top: g + h,
                        left: f - j.width() / 2
                    })
                }
            }
        }
        if (d.showLabels && (d.labelClass || d.canvasRender) && d.labels && 0 != d.labels.length) {
            for (c.save(),
            d.canvasRender && (c.fillStyle = d.cColor,
            c.font = d.cFont),
            i = 0; i < d.data.length; i++)
                if (d.labels[i]) {
                    var f = b.pointOffset({
                        x: d.data[i][0],
                        y: d.data[i][1]
                    });
                    b.getPlotOffset();
                    f.left > 0 && f.left < b.width() && f.top > 0 && f.top < b.height() && e(d.labels[i], f.left, f.top)
                }
            c.restore()
        }
    }
    function e(b, c) {
        for (var d = b.getData(), e = 0; e < d.length; e++)
            !d[e].canvasRender && d[e].labelClass && a("." + d[e].labelClass).remove()
    }
    var f = {
        series: {
            showLabels: !1,
            labels: [],
            labelClass: null,
            labelPlacement: "below",
            canvasRender: !1,
            cColor: "#000",
            cFont: "9px, san-serif",
            cPadding: 4
        }
    };
    a.plot.plugins.push({
        init: b,
        options: f,
        name: "seriesLabels",
        version: "0.2"
    })
}(jQuery),
function(a) {
    function b(b) {
        function e(b, c, d) {
            x || (x = !0,
            r = b.getCanvas(),
            s = a(r).parent(),
            t = b.getOptions(),
            b.setData(f(b.getData())))
        }
        function f(b) {
            for (var c = 0, d = 0, e = 0, f = t.series.pie.combine.color, g = [], h = 0; h < b.length; ++h) {
                var i = b[h].data;
                a.isArray(i) && 1 == i.length && (i = i[0]),
                a.isArray(i) ? !isNaN(parseFloat(i[1])) && isFinite(i[1]) ? i[1] = +i[1] : i[1] = 0 : i = !isNaN(parseFloat(i)) && isFinite(i) ? [1, +i] : [1, 0],
                b[h].data = [i]
            }
            for (var h = 0; h < b.length; ++h)
                c += b[h].data[0][1];
            for (var h = 0; h < b.length; ++h) {
                var i = b[h].data[0][1];
                i / c <= t.series.pie.combine.threshold && (d += i,
                e++,
                f || (f = b[h].color))
            }
            for (var h = 0; h < b.length; ++h) {
                var i = b[h].data[0][1];
                (2 > e || i / c > t.series.pie.combine.threshold) && g.push(a.extend(b[h], {
                    data: [[1, i]],
                    color: b[h].color,
                    label: b[h].label,
                    angle: i * Math.PI * 2 / c,
                    percent: i / (c / 100)
                }))
            }
            return e > 1 && g.push({
                data: [[1, d]],
                color: f,
                label: t.series.pie.combine.label,
                angle: d * Math.PI * 2 / c,
                percent: d / (c / 100)
            }),
            g
        }
        function g(b, e) {
            function f() {
                y.clearRect(0, 0, j, k),
                s.children().filter(".pieLabel, .pieLabelBackground").remove()
            }
            function g() {
                var a = t.series.pie.shadow.left
                  , b = t.series.pie.shadow.top
                  , c = 10
                  , d = t.series.pie.shadow.alpha
                  , e = t.series.pie.radius > 1 ? t.series.pie.radius : u * t.series.pie.radius;
                if (!(e >= j / 2 - a || e * t.series.pie.tilt >= k / 2 - b || c >= e)) {
                    y.save(),
                    y.translate(a, b),
                    y.globalAlpha = d,
                    y.fillStyle = "#000",
                    y.translate(v, w),
                    y.scale(1, t.series.pie.tilt);
                    for (var f = 1; c >= f; f++)
                        y.beginPath(),
                        y.arc(0, 0, e, 0, 2 * Math.PI, !1),
                        y.fill(),
                        e -= f;
                    y.restore()
                }
            }
            function i() {
                function b(a, b, c) {
                    0 >= a || isNaN(a) || (c ? y.fillStyle = b : (y.strokeStyle = b,
                    y.lineJoin = "round"),
                    y.beginPath(),
                    Math.abs(a - 2 * Math.PI) > 1e-9 && y.moveTo(0, 0),
                    y.arc(0, 0, e, f, f + a / 2, !1),
                    y.arc(0, 0, e, f + a / 2, f + a, !1),
                    y.closePath(),
                    f += a,
                    c ? y.fill() : y.stroke())
                }
                function c() {
                    function b(b, c, d) {
                        if (0 == b.data[0][1])
                            return !0;
                        var f, g = t.legend.labelFormatter, h = t.series.pie.label.formatter;
                        f = g ? g(b.label, b) : b.label,
                        h && (f = h(f, b));
                        var i = (c + b.angle + c) / 2
                          , l = v + Math.round(Math.cos(i) * e)
                          , m = w + Math.round(Math.sin(i) * e) * t.series.pie.tilt
                          , n = "<span class='pieLabel' id='pieLabel" + d + "' style='position:absolute;top:" + m + "px;left:" + l + "px;'>" + f + "</span>";
                        s.append(n);
                        var o = s.children("#pieLabel" + d)
                          , p = m - o.height() / 2
                          , q = l - o.width() / 2;
                        if (o.css("top", p),
                        o.css("left", q),
                        0 - p > 0 || 0 - q > 0 || k - (p + o.height()) < 0 || j - (q + o.width()) < 0)
                            return !1;
                        if (0 != t.series.pie.label.background.opacity) {
                            var r = t.series.pie.label.background.color;
                            null == r && (r = b.color);
                            var u = "top:" + p + "px;left:" + q + "px;";
                            a("<div class='pieLabelBackground' style='position:absolute;width:" + o.width() + "px;height:" + o.height() + "px;" + u + "background-color:" + r + ";'></div>").css("opacity", t.series.pie.label.background.opacity).insertBefore(o)
                        }
                        return !0
                    }
                    for (var c = d, e = t.series.pie.label.radius > 1 ? t.series.pie.label.radius : u * t.series.pie.label.radius, f = 0; f < m.length; ++f) {
                        if (m[f].percent >= 100 * t.series.pie.label.threshold && !b(m[f], c, f))
                            return !1;
                        c += m[f].angle
                    }
                    return !0
                }
                var d = Math.PI * t.series.pie.startAngle
                  , e = t.series.pie.radius > 1 ? t.series.pie.radius : u * t.series.pie.radius;
                y.save(),
                y.translate(v, w),
                y.scale(1, t.series.pie.tilt),
                y.save();
                for (var f = d, g = 0; g < m.length; ++g)
                    m[g].startAngle = f,
                    b(m[g].angle, m[g].color, !0);
                if (y.restore(),
                t.series.pie.stroke.width > 0) {
                    y.save(),
                    y.lineWidth = t.series.pie.stroke.width,
                    f = d;
                    for (var g = 0; g < m.length; ++g)
                        b(m[g].angle, t.series.pie.stroke.color, !1);
                    y.restore()
                }
                return h(y),
                y.restore(),
                t.series.pie.label.show ? c() : !0
            }
            if (s) {
                var j = b.getPlaceholder().width()
                  , k = b.getPlaceholder().height()
                  , l = s.children().filter(".legend").children().width() || 0;
                y = e,
                x = !1,
                u = Math.min(j, k / t.series.pie.tilt) / 2,
                w = k / 2 + t.series.pie.offset.top,
                v = j / 2,
                "auto" == t.series.pie.offset.left ? (t.legend.position.match("w") ? v += l / 2 : v -= l / 2,
                u > v ? v = u : v > j - u && (v = j - u)) : v += t.series.pie.offset.left;
                var m = b.getData()
                  , n = 0;
                do
                    n > 0 && (u *= d),
                    n += 1,
                    f(),
                    t.series.pie.tilt <= .8 && g();
                while (!i() && c > n);
                n >= c && (f(),
                s.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")),
                b.setSeries && b.insertLegend && (b.setSeries(m),
                b.insertLegend())
            }
        }
        function h(a) {
            if (t.series.pie.innerRadius > 0) {
                a.save();
                var b = t.series.pie.innerRadius > 1 ? t.series.pie.innerRadius : u * t.series.pie.innerRadius;
                a.globalCompositeOperation = "destination-out",
                a.beginPath(),
                a.fillStyle = t.series.pie.stroke.color,
                a.arc(0, 0, b, 0, 2 * Math.PI, !1),
                a.fill(),
                a.closePath(),
                a.restore(),
                a.save(),
                a.beginPath(),
                a.strokeStyle = t.series.pie.stroke.color,
                a.arc(0, 0, b, 0, 2 * Math.PI, !1),
                a.stroke(),
                a.closePath(),
                a.restore()
            }
        }
        function i(a, b) {
            for (var c = !1, d = -1, e = a.length, f = e - 1; ++d < e; f = d)
                (a[d][1] <= b[1] && b[1] < a[f][1] || a[f][1] <= b[1] && b[1] < a[d][1]) && b[0] < (a[f][0] - a[d][0]) * (b[1] - a[d][1]) / (a[f][1] - a[d][1]) + a[d][0] && (c = !c);
            return c
        }
        function j(a, c) {
            for (var d, e, f = b.getData(), g = b.getOptions(), h = g.series.pie.radius > 1 ? g.series.pie.radius : u * g.series.pie.radius, j = 0; j < f.length; ++j) {
                var k = f[j];
                if (k.pie.show) {
                    if (y.save(),
                    y.beginPath(),
                    y.moveTo(0, 0),
                    y.arc(0, 0, h, k.startAngle, k.startAngle + k.angle / 2, !1),
                    y.arc(0, 0, h, k.startAngle + k.angle / 2, k.startAngle + k.angle, !1),
                    y.closePath(),
                    d = a - v,
                    e = c - w,
                    y.isPointInPath) {
                        if (y.isPointInPath(a - v, c - w))
                            return y.restore(),
                            {
                                datapoint: [k.percent, k.data],
                                dataIndex: 0,
                                series: k,
                                seriesIndex: j
                            }
                    } else {
                        var l = h * Math.cos(k.startAngle)
                          , m = h * Math.sin(k.startAngle)
                          , n = h * Math.cos(k.startAngle + k.angle / 4)
                          , o = h * Math.sin(k.startAngle + k.angle / 4)
                          , p = h * Math.cos(k.startAngle + k.angle / 2)
                          , q = h * Math.sin(k.startAngle + k.angle / 2)
                          , r = h * Math.cos(k.startAngle + k.angle / 1.5)
                          , s = h * Math.sin(k.startAngle + k.angle / 1.5)
                          , t = h * Math.cos(k.startAngle + k.angle)
                          , x = h * Math.sin(k.startAngle + k.angle)
                          , z = [[0, 0], [l, m], [n, o], [p, q], [r, s], [t, x]]
                          , A = [d, e];
                        if (i(z, A))
                            return y.restore(),
                            {
                                datapoint: [k.percent, k.data],
                                dataIndex: 0,
                                series: k,
                                seriesIndex: j
                            }
                    }
                    y.restore()
                }
            }
            return null
        }
        function k(a) {
            m("plothover", a)
        }
        function l(a) {
            m("plotclick", a)
        }
        function m(a, c) {
            var d = b.offset()
              , e = parseInt(c.pageX - d.left)
              , f = parseInt(c.pageY - d.top)
              , g = j(e, f);
            if (t.grid.autoHighlight)
                for (var h = 0; h < z.length; ++h) {
                    var i = z[h];
                    i.auto != a || g && i.series == g.series || o(i.series)
                }
            g && n(g.series, a);
            var k = {
                pageX: c.pageX,
                pageY: c.pageY
            };
            s.trigger(a, [k, g])
        }
        function n(a, c) {
            var d = p(a);
            -1 == d ? (z.push({
                series: a,
                auto: c
            }),
            b.triggerRedrawOverlay()) : c || (z[d].auto = !1)
        }
        function o(a) {
            null == a && (z = [],
            b.triggerRedrawOverlay());
            var c = p(a);
            -1 != c && (z.splice(c, 1),
            b.triggerRedrawOverlay())
        }
        function p(a) {
            for (var b = 0; b < z.length; ++b) {
                var c = z[b];
                if (c.series == a)
                    return b
            }
            return -1
        }
        function q(a, b) {
            function c(a) {
                a.angle <= 0 || isNaN(a.angle) || (b.fillStyle = "rgba(255, 255, 255, " + d.series.pie.highlight.opacity + ")",
                b.beginPath(),
                Math.abs(a.angle - 2 * Math.PI) > 1e-9 && b.moveTo(0, 0),
                b.arc(0, 0, e, a.startAngle, a.startAngle + a.angle / 2, !1),
                b.arc(0, 0, e, a.startAngle + a.angle / 2, a.startAngle + a.angle, !1),
                b.closePath(),
                b.fill())
            }
            var d = a.getOptions()
              , e = d.series.pie.radius > 1 ? d.series.pie.radius : u * d.series.pie.radius;
            b.save(),
            b.translate(v, w),
            b.scale(1, d.series.pie.tilt);
            for (var f = 0; f < z.length; ++f)
                c(z[f].series);
            h(b),
            b.restore()
        }
        var r = null
          , s = null
          , t = null
          , u = null
          , v = null
          , w = null
          , x = !1
          , y = null
          , z = [];
        b.hooks.processOptions.push(function(a, b) {
            b.series.pie.show && (b.grid.show = !1,
            "auto" == b.series.pie.label.show && (b.legend.show ? b.series.pie.label.show = !1 : b.series.pie.label.show = !0),
            "auto" == b.series.pie.radius && (b.series.pie.label.show ? b.series.pie.radius = .75 : b.series.pie.radius = 1),
            b.series.pie.tilt > 1 ? b.series.pie.tilt = 1 : b.series.pie.tilt < 0 && (b.series.pie.tilt = 0))
        }),
        b.hooks.bindEvents.push(function(a, b) {
            var c = a.getOptions();
            c.series.pie.show && (c.grid.hoverable && b.unbind("mousemove").mousemove(k),
            c.grid.clickable && b.unbind("click").click(l))
        }),
        b.hooks.processDatapoints.push(function(a, b, c, d) {
            var f = a.getOptions();
            f.series.pie.show && e(a, b, c, d)
        }),
        b.hooks.drawOverlay.push(function(a, b) {
            var c = a.getOptions();
            c.series.pie.show && q(a, b)
        }),
        b.hooks.draw.push(function(a, b) {
            var c = a.getOptions();
            c.series.pie.show && g(a, b)
        })
    }
    var c = 10
      , d = .95
      , e = {
        series: {
            pie: {
                show: !1,
                radius: "auto",
                innerRadius: 0,
                startAngle: 1.5,
                tilt: 1,
                shadow: {
                    left: 5,
                    top: 15,
                    alpha: .02
                },
                offset: {
                    top: 0,
                    left: "auto"
                },
                stroke: {
                    color: "#fff",
                    width: 1
                },
                label: {
                    show: "auto",
                    formatter: function(a, b) {
                        return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + b.color + ";'>" + a + "<br/>" + Math.round(b.percent) + "%</div>"
                    },
                    radius: 1,
                    background: {
                        color: null,
                        opacity: 0
                    },
                    threshold: 0
                },
                combine: {
                    threshold: -1,
                    color: null,
                    label: "Other"
                },
                highlight: {
                    opacity: .5
                }
            }
        }
    };
    a.plot.plugins.push({
        init: b,
        options: e,
        name: "pie",
        version: "1.1"
    })
}(jQuery),
function(a) {
    function b(a, b) {
        return b * Math.floor(a / b)
    }
    function c(a, b, c, d) {
        if ("function" == typeof a.strftime)
            return a.strftime(b);
        var e = function(a, b) {
            return a = "" + a,
            b = "" + (null == b ? "0" : b),
            1 == a.length ? b + a : a
        }
          , f = []
          , g = !1
          , h = a.getHours()
          , i = 12 > h;
        null == c && (c = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]),
        null == d && (d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        var j;
        j = h > 12 ? h - 12 : 0 == h ? 12 : h;
        for (var k = 0; k < b.length; ++k) {
            var l = b.charAt(k);
            if (g) {
                switch (l) {
                case "a":
                    l = "" + d[a.getDay()];
                    break;
                case "b":
                    l = "" + c[a.getMonth()];
                    break;
                case "d":
                    l = e(a.getDate());
                    break;
                case "e":
                    l = e(a.getDate(), " ");
                    break;
                case "h":
                case "H":
                    l = e(h);
                    break;
                case "I":
                    l = e(j);
                    break;
                case "l":
                    l = e(j, " ");
                    break;
                case "m":
                    l = e(a.getMonth() + 1);
                    break;
                case "M":
                    l = e(a.getMinutes());
                    break;
                case "q":
                    l = "" + (Math.floor(a.getMonth() / 3) + 1);
                    break;
                case "S":
                    l = e(a.getSeconds());
                    break;
                case "y":
                    l = e(a.getFullYear() % 100);
                    break;
                case "Y":
                    l = "" + a.getFullYear();
                    break;
                case "p":
                    l = i ? "am" : "pm";
                    break;
                case "P":
                    l = i ? "AM" : "PM";
                    break;
                case "w":
                    l = "" + a.getDay()
                }
                f.push(l),
                g = !1
            } else
                "%" == l ? g = !0 : f.push(l)
        }
        return f.join("")
    }
    function d(a) {
        function b(a, b, c, d) {
            a[b] = function() {
                return c[d].apply(c, arguments)
            }
        }
        var c = {
            date: a
        };
        void 0 != a.strftime && b(c, "strftime", a, "strftime"),
        b(c, "getTime", a, "getTime"),
        b(c, "setTime", a, "setTime");
        for (var d = ["Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"], e = 0; e < d.length; e++)
            b(c, "get" + d[e], a, "getUTC" + d[e]),
            b(c, "set" + d[e], a, "setUTC" + d[e]);
        return c
    }
    function e(a, b) {
        if ("browser" == b.timezone)
            return new Date(a);
        if (b.timezone && "utc" != b.timezone) {
            if ("undefined" != typeof timezoneJS && "undefined" != typeof timezoneJS.Date) {
                var c = new timezoneJS.Date;
                return c.setTimezone(b.timezone),
                c.setTime(a),
                c
            }
            return d(new Date(a))
        }
        return d(new Date(a))
    }
    function f(d) {
        d.hooks.processOptions.push(function(d, f) {
            a.each(d.getAxes(), function(a, d) {
                var f = d.options;
                "time" == f.mode && (d.tickGenerator = function(a) {
                    var c = []
                      , d = e(a.min, f)
                      , g = 0
                      , i = f.tickSize && "quarter" === f.tickSize[1] || f.minTickSize && "quarter" === f.minTickSize[1] ? k : j;
                    null != f.minTickSize && (g = "number" == typeof f.tickSize ? f.tickSize : f.minTickSize[0] * h[f.minTickSize[1]]);
                    for (var l = 0; l < i.length - 1 && !(a.delta < (i[l][0] * h[i[l][1]] + i[l + 1][0] * h[i[l + 1][1]]) / 2 && i[l][0] * h[i[l][1]] >= g); ++l)
                        ;
                    var m = i[l][0]
                      , n = i[l][1];
                    if ("year" == n) {
                        if (null != f.minTickSize && "year" == f.minTickSize[1])
                            m = Math.floor(f.minTickSize[0]);
                        else {
                            var o = Math.pow(10, Math.floor(Math.log(a.delta / h.year) / Math.LN10))
                              , p = a.delta / h.year / o;
                            m = 1.5 > p ? 1 : 3 > p ? 2 : 7.5 > p ? 5 : 10,
                            m *= o
                        }
                        1 > m && (m = 1)
                    }
                    a.tickSize = f.tickSize || [m, n];
                    var q = a.tickSize[0];
                    n = a.tickSize[1];
                    var r = q * h[n];
                    "second" == n ? d.setSeconds(b(d.getSeconds(), q)) : "minute" == n ? d.setMinutes(b(d.getMinutes(), q)) : "hour" == n ? d.setHours(b(d.getHours(), q)) : "month" == n ? d.setMonth(b(d.getMonth(), q)) : "quarter" == n ? d.setMonth(3 * b(d.getMonth() / 3, q)) : "year" == n && d.setFullYear(b(d.getFullYear(), q)),
                    d.setMilliseconds(0),
                    r >= h.minute && d.setSeconds(0),
                    r >= h.hour && d.setMinutes(0),
                    r >= h.day && d.setHours(0),
                    r >= 4 * h.day && d.setDate(1),
                    r >= 2 * h.month && d.setMonth(b(d.getMonth(), 3)),
                    r >= 2 * h.quarter && d.setMonth(b(d.getMonth(), 6)),
                    r >= h.year && d.setMonth(0);
                    var s, t = 0, u = Number.NaN;
                    do
                        if (s = u,
                        u = d.getTime(),
                        c.push(u),
                        "month" == n || "quarter" == n)
                            if (1 > q) {
                                d.setDate(1);
                                var v = d.getTime();
                                d.setMonth(d.getMonth() + ("quarter" == n ? 3 : 1));
                                var w = d.getTime();
                                d.setTime(u + t * h.hour + (w - v) * q),
                                t = d.getHours(),
                                d.setHours(0)
                            } else
                                d.setMonth(d.getMonth() + q * ("quarter" == n ? 3 : 1));
                        else
                            "year" == n ? d.setFullYear(d.getFullYear() + q) : d.setTime(u + r);
                    while (u < a.max && u != s);
                    return c
                }
                ,
                d.tickFormatter = function(a, b) {
                    var d = e(a, b.options);
                    if (null != f.timeformat)
                        return c(d, f.timeformat, f.monthNames, f.dayNames);
                    var g, i = b.options.tickSize && "quarter" == b.options.tickSize[1] || b.options.minTickSize && "quarter" == b.options.minTickSize[1], j = b.tickSize[0] * h[b.tickSize[1]], k = b.max - b.min, l = f.twelveHourClock ? " %p" : "", m = f.twelveHourClock ? "%I" : "%H";
                    g = j < h.minute ? m + ":%M:%S" + l : j < h.day ? k < 2 * h.day ? m + ":%M" + l : "%b %d " + m + ":%M" + l : j < h.month ? "%b %d" : i && j < h.quarter || !i && j < h.year ? k < h.year ? "%b" : "%b %Y" : i && j < h.year ? k < h.year ? "Q%q" : "Q%q %Y" : "%Y";
                    var n = c(d, g, f.monthNames, f.dayNames);
                    return n
                }
                )
            })
        })
    }
    var g = {
        xaxis: {
            timezone: null,
            timeformat: null,
            twelveHourClock: !1,
            monthNames: null
        }
    }
      , h = {
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        month: 2592e6,
        quarter: 7776e6,
        year: 525949.2 * 60 * 1e3
    }
      , i = [[1, "second"], [2, "second"], [5, "second"], [10, "second"], [30, "second"], [1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"], [30, "minute"], [1, "hour"], [2, "hour"], [4, "hour"], [8, "hour"], [12, "hour"], [1, "day"], [2, "day"], [3, "day"], [.25, "month"], [.5, "month"], [1, "month"], [2, "month"]]
      , j = i.concat([[3, "month"], [6, "month"], [1, "year"]])
      , k = i.concat([[1, "quarter"], [2, "quarter"], [1, "year"]]);
    a.plot.plugins.push({
        init: f,
        options: g,
        name: "time",
        version: "1.0"
    }),
    a.plot.formatDate = c,
    a.plot.dateGenerator = e
}(jQuery),
function(a) {
    function b(b) {
        a.jqplot.ElemContainer.call(this),
        this.name = b,
        this._series = [],
        this.show = !1,
        this.tickRenderer = a.jqplot.AxisTickRenderer,
        this.tickOptions = {},
        this.labelRenderer = a.jqplot.AxisLabelRenderer,
        this.labelOptions = {},
        this.label = null,
        this.showLabel = !0,
        this.min = null,
        this.max = null,
        this.autoscale = !1,
        this.pad = 1.2,
        this.padMax = null,
        this.padMin = null,
        this.ticks = [],
        this.numberTicks,
        this.tickInterval,
        this.renderer = a.jqplot.LinearAxisRenderer,
        this.rendererOptions = {},
        this.showTicks = !0,
        this.showTickMarks = !0,
        this.showMinorTicks = !0,
        this.drawMajorGridlines = !0,
        this.drawMinorGridlines = !1,
        this.drawMajorTickMarks = !0,
        this.drawMinorTickMarks = !0,
        this.useSeriesColor = !1,
        this.borderWidth = null,
        this.borderColor = null,
        this.scaleToHiddenSeries = !1,
        this._dataBounds = {
            min: null,
            max: null
        },
        this._intervalStats = [],
        this._offsets = {
            min: null,
            max: null
        },
        this._ticks = [],
        this._label = null,
        this.syncTicks = null,
        this.tickSpacing = 75,
        this._min = null,
        this._max = null,
        this._tickInterval = null,
        this._numberTicks = null,
        this.__ticks = null,
        this._options = {}
    }
    function c(b) {
        a.jqplot.ElemContainer.call(this),
        this.show = !1,
        this.location = "ne",
        this.labels = [],
        this.showLabels = !0,
        this.showSwatches = !0,
        this.placement = "insideGrid",
        this.xoffset = 0,
        this.yoffset = 0,
        this.border,
        this.background,
        this.textColor,
        this.fontFamily,
        this.fontSize,
        this.rowSpacing = "0.5em",
        this.renderer = a.jqplot.TableLegendRenderer,
        this.rendererOptions = {},
        this.preDraw = !1,
        this.marginTop = null,
        this.marginRight = null,
        this.marginBottom = null,
        this.marginLeft = null,
        this.escapeHtml = !1,
        this._series = [],
        a.extend(!0, this, b)
    }
    function d(b) {
        a.jqplot.ElemContainer.call(this),
        this.text = b,
        this.show = !0,
        this.fontFamily,
        this.fontSize,
        this.textAlign,
        this.textColor,
        this.renderer = a.jqplot.DivTitleRenderer,
        this.rendererOptions = {},
        this.escapeHtml = !1
    }
    function e(b) {
        b = b || {},
        a.jqplot.ElemContainer.call(this),
        this.show = !0,
        this.xaxis = "xaxis",
        this._xaxis,
        this.yaxis = "yaxis",
        this._yaxis,
        this.gridBorderWidth = 2,
        this.renderer = a.jqplot.LineRenderer,
        this.rendererOptions = {},
        this.data = [],
        this.gridData = [],
        this.label = "",
        this.showLabel = !0,
        this.color,
        this.negativeColor,
        this.lineWidth = 2.5,
        this.lineJoin = "round",
        this.lineCap = "round",
        this.linePattern = "solid",
        this.shadow = !0,
        this.shadowAngle = 45,
        this.shadowOffset = 1.25,
        this.shadowDepth = 3,
        this.shadowAlpha = "0.1",
        this.breakOnNull = !1,
        this.markerRenderer = a.jqplot.MarkerRenderer,
        this.markerOptions = {},
        this.showLine = !0,
        this.showMarker = !0,
        this.index,
        this.fill = !1,
        this.fillColor,
        this.fillAlpha,
        this.fillAndStroke = !1,
        this.disableStack = !1,
        this._stack = !1,
        this.neighborThreshold = 4,
        this.fillToZero = !1,
        this.fillToValue = 0,
        this.fillAxis = "y",
        this.useNegativeColors = !0,
        this._stackData = [],
        this._plotData = [],
        this._plotValues = {
            x: [],
            y: []
        },
        this._intervals = {
            x: {},
            y: {}
        },
        this._prevPlotData = [],
        this._prevGridData = [],
        this._stackAxis = "y",
        this._primaryAxis = "_xaxis",
        this.canvas = new a.jqplot.GenericCanvas,
        this.shadowCanvas = new a.jqplot.GenericCanvas,
        this.plugins = {},
        this._sumy = 0,
        this._sumx = 0,
        this._type = ""
    }
    function f() {
        a.jqplot.ElemContainer.call(this),
        this.drawGridlines = !0,
        this.gridLineColor = "#cccccc",
        this.gridLineWidth = 1,
        this.background = "#fffdf6",
        this.borderColor = "#999999",
        this.borderWidth = 2,
        this.drawBorder = !0,
        this.shadow = !0,
        this.shadowAngle = 45,
        this.shadowOffset = 1.5,
        this.shadowWidth = 3,
        this.shadowDepth = 3,
        this.shadowColor = null,
        this.shadowAlpha = "0.07",
        this._left,
        this._top,
        this._right,
        this._bottom,
        this._width,
        this._height,
        this._axes = [],
        this.renderer = a.jqplot.CanvasGridRenderer,
        this.rendererOptions = {},
        this._offsets = {
            top: null,
            bottom: null,
            left: null,
            right: null
        }
    }
    function g() {
        function h(a) {
            for (var b, c = 0; c < a.length; c++)
                for (var d, e = [a[c].data, a[c]._stackData, a[c]._plotData, a[c]._prevPlotData], f = 0; 4 > f; f++)
                    if (d = !0,
                    b = e[f],
                    "x" == a[c]._stackAxis) {
                        for (var g = 0; g < b.length; g++)
                            if ("number" != typeof b[g][1]) {
                                d = !1;
                                break
                            }
                        d && b.sort(function(a, b) {
                            return a[1] - b[1]
                        })
                    } else {
                        for (var g = 0; g < b.length; g++)
                            if ("number" != typeof b[g][0]) {
                                d = !1;
                                break
                            }
                        d && b.sort(function(a, b) {
                            return a[0] - b[0]
                        })
                    }
        }
        function i(a) {
            var b, c, d = a.data.plot, e = d.eventCanvas._elem.offset(), f = {
                x: a.pageX - e.left,
                y: a.pageY - e.top
            }, g = {
                xaxis: null,
                yaxis: null,
                x2axis: null,
                y2axis: null,
                y3axis: null,
                y4axis: null,
                y5axis: null,
                y6axis: null,
                y7axis: null,
                y8axis: null,
                y9axis: null,
                yMidAxis: null
            }, h = ["xaxis", "yaxis", "x2axis", "y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis", "yMidAxis"], i = d.axes;
            for (b = 11; b > 0; b--)
                c = h[b - 1],
                i[c].show && (g[c] = i[c].series_p2u(f[c.charAt(0)]));
            return {
                offsets: e,
                gridPos: f,
                dataPos: g
            }
        }
        function j(b, c) {
            function d(a, b, c) {
                var d = (b[1] - c[1]) / (b[0] - c[0])
                  , e = b[1] - d * b[0]
                  , f = a + b[1];
                return [(f - e) / d, f]
            }
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x = c.series;
            for (g = c.seriesStack.length - 1; g >= 0; g--)
                switch (e = c.seriesStack[g],
                h = x[e],
                u = h._highlightThreshold,
                h.renderer.constructor) {
                case a.jqplot.BarRenderer:
                    for (j = b.x,
                    k = b.y,
                    f = 0; f < h._barPoints.length; f++)
                        if (t = h._barPoints[f],
                        s = h.gridData[f],
                        j > t[0][0] && j < t[2][0] && k > t[2][1] && k < t[0][1])
                            return {
                                seriesIndex: h.index,
                                pointIndex: f,
                                gridData: s,
                                data: h.data[f],
                                points: h._barPoints[f]
                            };
                    break;
                case a.jqplot.PyramidRenderer:
                    for (j = b.x,
                    k = b.y,
                    f = 0; f < h._barPoints.length; f++)
                        if (t = h._barPoints[f],
                        s = h.gridData[f],
                        j > t[0][0] + u[0][0] && j < t[2][0] + u[2][0] && k > t[2][1] && k < t[0][1])
                            return {
                                seriesIndex: h.index,
                                pointIndex: f,
                                gridData: s,
                                data: h.data[f],
                                points: h._barPoints[f]
                            };
                    break;
                case a.jqplot.DonutRenderer:
                    if (n = h.startAngle / 180 * Math.PI,
                    j = b.x - h._center[0],
                    k = b.y - h._center[1],
                    i = Math.sqrt(Math.pow(j, 2) + Math.pow(k, 2)),
                    j > 0 && -k >= 0 ? l = 2 * Math.PI - Math.atan(-k / j) : j > 0 && 0 > -k ? l = -Math.atan(-k / j) : 0 > j ? l = Math.PI - Math.atan(-k / j) : 0 == j && -k > 0 ? l = 3 * Math.PI / 2 : 0 == j && 0 > -k ? l = Math.PI / 2 : 0 == j && 0 == k && (l = 0),
                    n && (l -= n,
                    0 > l ? l += 2 * Math.PI : l > 2 * Math.PI && (l -= 2 * Math.PI)),
                    m = h.sliceMargin / 180 * Math.PI,
                    i < h._radius && i > h._innerRadius)
                        for (f = 0; f < h.gridData.length; f++)
                            if (o = f > 0 ? h.gridData[f - 1][1] + m : m,
                            p = h.gridData[f][1],
                            l > o && p > l)
                                return {
                                    seriesIndex: h.index,
                                    pointIndex: f,
                                    gridData: [b.x, b.y],
                                    data: h.data[f]
                                };
                    break;
                case a.jqplot.PieRenderer:
                    if (n = h.startAngle / 180 * Math.PI,
                    j = b.x - h._center[0],
                    k = b.y - h._center[1],
                    i = Math.sqrt(Math.pow(j, 2) + Math.pow(k, 2)),
                    j > 0 && -k >= 0 ? l = 2 * Math.PI - Math.atan(-k / j) : j > 0 && 0 > -k ? l = -Math.atan(-k / j) : 0 > j ? l = Math.PI - Math.atan(-k / j) : 0 == j && -k > 0 ? l = 3 * Math.PI / 2 : 0 == j && 0 > -k ? l = Math.PI / 2 : 0 == j && 0 == k && (l = 0),
                    n && (l -= n,
                    0 > l ? l += 2 * Math.PI : l > 2 * Math.PI && (l -= 2 * Math.PI)),
                    m = h.sliceMargin / 180 * Math.PI,
                    i < h._radius)
                        for (f = 0; f < h.gridData.length; f++)
                            if (o = f > 0 ? h.gridData[f - 1][1] + m : m,
                            p = h.gridData[f][1],
                            l > o && p > l)
                                return {
                                    seriesIndex: h.index,
                                    pointIndex: f,
                                    gridData: [b.x, b.y],
                                    data: h.data[f]
                                };
                    break;
                case a.jqplot.BubbleRenderer:
                    j = b.x,
                    k = b.y;
                    var y = null;
                    if (h.show) {
                        for (var f = 0; f < h.gridData.length; f++)
                            s = h.gridData[f],
                            r = Math.sqrt((j - s[0]) * (j - s[0]) + (k - s[1]) * (k - s[1])),
                            r <= s[2] && (q >= r || null == q) && (q = r,
                            y = {
                                seriesIndex: e,
                                pointIndex: f,
                                gridData: s,
                                data: h.data[f]
                            });
                        if (null != y)
                            return y
                    }
                    break;
                case a.jqplot.FunnelRenderer:
                    j = b.x,
                    k = b.y;
                    var z, A, B, C = h._vertices, D = C[0], E = C[C.length - 1];
                    for (z = d(k, D[0], E[3]),
                    A = d(k, D[1], E[2]),
                    f = 0; f < C.length; f++)
                        if (B = C[f],
                        k >= B[0][1] && k <= B[3][1] && j >= z[0] && j <= A[0])
                            return {
                                seriesIndex: h.index,
                                pointIndex: f,
                                gridData: null,
                                data: h.data[f]
                            };
                    break;
                case a.jqplot.LineRenderer:
                    if (j = b.x,
                    k = b.y,
                    i = h.renderer,
                    h.show) {
                        if (!(!(h.fill || h.renderer.bands.show && h.renderer.bands.fill) || c.plugins.highlighter && c.plugins.highlighter.show)) {
                            var F = !1;
                            if (j > h._boundingBox[0][0] && j < h._boundingBox[1][0] && k > h._boundingBox[1][1] && k < h._boundingBox[0][1])
                                for (var G, H = h._areaPoints.length, f = H - 1, G = 0; H > G; G++) {
                                    var I = [h._areaPoints[G][0], h._areaPoints[G][1]]
                                      , J = [h._areaPoints[f][0], h._areaPoints[f][1]];
                                    (I[1] < k && J[1] >= k || J[1] < k && I[1] >= k) && I[0] + (k - I[1]) / (J[1] - I[1]) * (J[0] - I[0]) < j && (F = !F),
                                    f = G
                                }
                            if (F)
                                return {
                                    seriesIndex: e,
                                    pointIndex: null,
                                    gridData: h.gridData,
                                    data: h.data,
                                    points: h._areaPoints
                                };
                            break
                        }
                        w = h.markerRenderer.size / 2 + h.neighborThreshold,
                        v = w > 0 ? w : 0;
                        for (var f = 0; f < h.gridData.length; f++)
                            if (s = h.gridData[f],
                            i.constructor == a.jqplot.OHLCRenderer)
                                if (i.candleStick) {
                                    var K = h._yaxis.series_u2p;
                                    if (j >= s[0] - i._bodyWidth / 2 && j <= s[0] + i._bodyWidth / 2 && k >= K(h.data[f][2]) && k <= K(h.data[f][3]))
                                        return {
                                            seriesIndex: e,
                                            pointIndex: f,
                                            gridData: s,
                                            data: h.data[f]
                                        }
                                } else if (i.hlc) {
                                    var K = h._yaxis.series_u2p;
                                    if (j >= s[0] - i._tickLength && j <= s[0] + i._tickLength && k >= K(h.data[f][1]) && k <= K(h.data[f][2]))
                                        return {
                                            seriesIndex: e,
                                            pointIndex: f,
                                            gridData: s,
                                            data: h.data[f]
                                        }
                                } else {
                                    var K = h._yaxis.series_u2p;
                                    if (j >= s[0] - i._tickLength && j <= s[0] + i._tickLength && k >= K(h.data[f][2]) && k <= K(h.data[f][3]))
                                        return {
                                            seriesIndex: e,
                                            pointIndex: f,
                                            gridData: s,
                                            data: h.data[f]
                                        }
                                }
                            else if (null != s[0] && null != s[1] && (r = Math.sqrt((j - s[0]) * (j - s[0]) + (k - s[1]) * (k - s[1])),
                            v >= r && (q >= r || null == q)))
                                return q = r,
                                {
                                    seriesIndex: e,
                                    pointIndex: f,
                                    gridData: s,
                                    data: h.data[f]
                                }
                    }
                    break;
                default:
                    if (j = b.x,
                    k = b.y,
                    i = h.renderer,
                    h.show) {
                        w = h.markerRenderer.size / 2 + h.neighborThreshold,
                        v = w > 0 ? w : 0;
                        for (var f = 0; f < h.gridData.length; f++)
                            if (s = h.gridData[f],
                            i.constructor == a.jqplot.OHLCRenderer)
                                if (i.candleStick) {
                                    var K = h._yaxis.series_u2p;
                                    if (j >= s[0] - i._bodyWidth / 2 && j <= s[0] + i._bodyWidth / 2 && k >= K(h.data[f][2]) && k <= K(h.data[f][3]))
                                        return {
                                            seriesIndex: e,
                                            pointIndex: f,
                                            gridData: s,
                                            data: h.data[f]
                                        }
                                } else if (i.hlc) {
                                    var K = h._yaxis.series_u2p;
                                    if (j >= s[0] - i._tickLength && j <= s[0] + i._tickLength && k >= K(h.data[f][1]) && k <= K(h.data[f][2]))
                                        return {
                                            seriesIndex: e,
                                            pointIndex: f,
                                            gridData: s,
                                            data: h.data[f]
                                        }
                                } else {
                                    var K = h._yaxis.series_u2p;
                                    if (j >= s[0] - i._tickLength && j <= s[0] + i._tickLength && k >= K(h.data[f][2]) && k <= K(h.data[f][3]))
                                        return {
                                            seriesIndex: e,
                                            pointIndex: f,
                                            gridData: s,
                                            data: h.data[f]
                                        }
                                }
                            else if (r = Math.sqrt((j - s[0]) * (j - s[0]) + (k - s[1]) * (k - s[1])),
                            v >= r && (q >= r || null == q))
                                return q = r,
                                {
                                    seriesIndex: e,
                                    pointIndex: f,
                                    gridData: s,
                                    data: h.data[f]
                                }
                    }
                }
            return null
        }
        this.animate = !1,
        this.animateReplot = !1,
        this.axes = {
            xaxis: new b("xaxis"),
            yaxis: new b("yaxis"),
            x2axis: new b("x2axis"),
            y2axis: new b("y2axis"),
            y3axis: new b("y3axis"),
            y4axis: new b("y4axis"),
            y5axis: new b("y5axis"),
            y6axis: new b("y6axis"),
            y7axis: new b("y7axis"),
            y8axis: new b("y8axis"),
            y9axis: new b("y9axis"),
            yMidAxis: new b("yMidAxis")
        },
        this.baseCanvas = new a.jqplot.GenericCanvas,
        this.captureRightClick = !1,
        this.data = [],
        this.dataRenderer,
        this.dataRendererOptions,
        this.defaults = {
            axesDefaults: {},
            axes: {
                xaxis: {},
                yaxis: {},
                x2axis: {},
                y2axis: {},
                y3axis: {},
                y4axis: {},
                y5axis: {},
                y6axis: {},
                y7axis: {},
                y8axis: {},
                y9axis: {},
                yMidAxis: {}
            },
            seriesDefaults: {},
            series: []
        },
        this.defaultAxisStart = 1,
        this.drawIfHidden = !1,
        this.eventCanvas = new a.jqplot.GenericCanvas,
        this.fillBetween = {
            series1: null,
            series2: null,
            color: null,
            baseSeries: 0,
            fill: !0
        },
        this.fontFamily,
        this.fontSize,
        this.grid = new f,
        this.legend = new c,
        this.noDataIndicator = {
            show: !1,
            indicator: "Loading Data...",
            axes: {
                xaxis: {
                    min: 0,
                    max: 10,
                    tickInterval: 2,
                    show: !0
                },
                yaxis: {
                    min: 0,
                    max: 12,
                    tickInterval: 3,
                    show: !0
                }
            }
        },
        this.negativeSeriesColors = a.jqplot.config.defaultNegativeColors,
        this.options = {},
        this.previousSeriesStack = [],
        this.plugins = {},
        this.series = [],
        this.seriesStack = [],
        this.seriesColors = a.jqplot.config.defaultColors,
        this.sortData = !0,
        this.stackSeries = !1,
        this.syncXTicks = !0,
        this.syncYTicks = !0,
        this.target = null,
        this.targetId = null,
        this.textColor,
        this.title = new d,
        this._drawCount = 0,
        this._sumy = 0,
        this._sumx = 0,
        this._stackData = [],
        this._plotData = [],
        this._width = null,
        this._height = null,
        this._plotDimensions = {
            height: null,
            width: null
        },
        this._gridPadding = {
            top: null,
            right: null,
            bottom: null,
            left: null
        },
        this._defaultGridPadding = {
            top: 10,
            right: 10,
            bottom: 23,
            left: 10
        },
        this._addDomReference = a.jqplot.config.addDomReference,
        this.preInitHooks = new a.jqplot.HooksManager,
        this.postInitHooks = new a.jqplot.HooksManager,
        this.preParseOptionsHooks = new a.jqplot.HooksManager,
        this.postParseOptionsHooks = new a.jqplot.HooksManager,
        this.preDrawHooks = new a.jqplot.HooksManager,
        this.postDrawHooks = new a.jqplot.HooksManager,
        this.preDrawSeriesHooks = new a.jqplot.HooksManager,
        this.postDrawSeriesHooks = new a.jqplot.HooksManager,
        this.preDrawLegendHooks = new a.jqplot.HooksManager,
        this.addLegendRowHooks = new a.jqplot.HooksManager,
        this.preSeriesInitHooks = new a.jqplot.HooksManager,
        this.postSeriesInitHooks = new a.jqplot.HooksManager,
        this.preParseSeriesOptionsHooks = new a.jqplot.HooksManager,
        this.postParseSeriesOptionsHooks = new a.jqplot.HooksManager,
        this.eventListenerHooks = new a.jqplot.EventListenerManager,
        this.preDrawSeriesShadowHooks = new a.jqplot.HooksManager,
        this.postDrawSeriesShadowHooks = new a.jqplot.HooksManager,
        this.colorGenerator = new a.jqplot.ColorGenerator,
        this.negativeColorGenerator = new a.jqplot.ColorGenerator,
        this.canvasManager = new a.jqplot.CanvasManager,
        this.themeEngine = new a.jqplot.ThemeEngine;
        this.init = function(c, d, e) {
            e = e || {};
            for (var f = 0; f < a.jqplot.preInitHooks.length; f++)
                a.jqplot.preInitHooks[f].call(this, c, d, e);
            for (var f = 0; f < this.preInitHooks.hooks.length; f++)
                this.preInitHooks.hooks[f].call(this, c, d, e);
            if (this.targetId = "#" + c,
            this.target = a("#" + c),
            this._addDomReference && this.target.data("jqplot", this),
            this.target.removeClass("jqplot-error"),
            !this.target.get(0))
                throw new Error("No plot target specified");
            if ("static" == this.target.css("position") && this.target.css("position", "relative"),
            this.target.hasClass("jqplot-target") || this.target.addClass("jqplot-target"),
            this.target.height())
                this._height = g = this.target.height();
            else {
                var g;
                g = e && e.height ? parseInt(e.height, 10) : this.target.attr("data-height") ? parseInt(this.target.attr("data-height"), 10) : parseInt(a.jqplot.config.defaultHeight, 10),
                this._height = g,
                this.target.css("height", g + "px")
            }
            if (this.target.width())
                this._width = i = this.target.width();
            else {
                var i;
                i = e && e.width ? parseInt(e.width, 10) : this.target.attr("data-width") ? parseInt(this.target.attr("data-width"), 10) : parseInt(a.jqplot.config.defaultWidth, 10),
                this._width = i,
                this.target.css("width", i + "px")
            }
            for (var f = 0, j = G.length; j > f; f++)
                this.axes[G[f]] = new b(G[f]);
            if (this._plotDimensions.height = this._height,
            this._plotDimensions.width = this._width,
            this.grid._plotDimensions = this._plotDimensions,
            this.title._plotDimensions = this._plotDimensions,
            this.baseCanvas._plotDimensions = this._plotDimensions,
            this.eventCanvas._plotDimensions = this._plotDimensions,
            this.legend._plotDimensions = this._plotDimensions,
            this._height <= 0 || this._width <= 0 || !this._height || !this._width)
                throw new Error("Canvas dimension not set");
            if (e.dataRenderer && a.isFunction(e.dataRenderer) && (e.dataRendererOptions && (this.dataRendererOptions = e.dataRendererOptions),
            this.dataRenderer = e.dataRenderer,
            d = this.dataRenderer(d, this, this.dataRendererOptions)),
            e.noDataIndicator && a.isPlainObject(e.noDataIndicator) && a.extend(!0, this.noDataIndicator, e.noDataIndicator),
            null == d || 0 == a.isArray(d) || 0 == d.length || 0 == a.isArray(d[0]) || 0 == d[0].length) {
                if (0 == this.noDataIndicator.show)
                    throw new Error("No data specified");
                for (var k in this.noDataIndicator.axes)
                    for (var l in this.noDataIndicator.axes[k])
                        this.axes[k][l] = this.noDataIndicator.axes[k][l];
                this.postDrawHooks.add(function() {
                    var b = this.eventCanvas.getHeight()
                      , c = this.eventCanvas.getWidth()
                      , d = a('<div class="jqplot-noData-container" style="position:absolute;"></div>');
                    this.target.append(d),
                    d.height(b),
                    d.width(c),
                    d.css("top", this.eventCanvas._offsets.top),
                    d.css("left", this.eventCanvas._offsets.left);
                    var e = a('<div class="jqplot-noData-contents" style="text-align:center; position:relative; margin-left:auto; margin-right:auto;"></div>');
                    d.append(e),
                    e.html(this.noDataIndicator.indicator);
                    var f = e.height()
                      , g = e.width();
                    e.height(f),
                    e.width(g),
                    e.css("top", (b - f) / 2 + "px")
                })
            }
            this.data = a.extend(!0, [], d),
            this.parseOptions(e),
            this.textColor && this.target.css("color", this.textColor),
            this.fontFamily && this.target.css("font-family", this.fontFamily),
            this.fontSize && this.target.css("font-size", this.fontSize),
            this.title.init(),
            this.legend.init(),
            this._sumy = 0,
            this._sumx = 0,
            this.computePlotData();
            for (var f = 0; f < this.series.length; f++) {
                this.seriesStack.push(f),
                this.previousSeriesStack.push(f),
                this.series[f].shadowCanvas._plotDimensions = this._plotDimensions,
                this.series[f].canvas._plotDimensions = this._plotDimensions;
                for (var m = 0; m < a.jqplot.preSeriesInitHooks.length; m++)
                    a.jqplot.preSeriesInitHooks[m].call(this.series[f], c, this.data, this.options.seriesDefaults, this.options.series[f], this);
                for (var m = 0; m < this.preSeriesInitHooks.hooks.length; m++)
                    this.preSeriesInitHooks.hooks[m].call(this.series[f], c, this.data, this.options.seriesDefaults, this.options.series[f], this);
                this.series[f]._plotDimensions = this._plotDimensions,
                this.series[f].init(f, this.grid.borderWidth, this);
                for (var m = 0; m < a.jqplot.postSeriesInitHooks.length; m++)
                    a.jqplot.postSeriesInitHooks[m].call(this.series[f], c, this.data, this.options.seriesDefaults, this.options.series[f], this);
                for (var m = 0; m < this.postSeriesInitHooks.hooks.length; m++)
                    this.postSeriesInitHooks.hooks[m].call(this.series[f], c, this.data, this.options.seriesDefaults, this.options.series[f], this);
                this._sumy += this.series[f]._sumy,
                this._sumx += this.series[f]._sumx
            }
            for (var n, o, f = 0, j = G.length; j > f; f++)
                n = G[f],
                o = this.axes[n],
                o._plotDimensions = this._plotDimensions,
                o.init(),
                null == this.axes[n].borderColor && ("x" !== n.charAt(0) && o.useSeriesColor === !0 && o.show ? o.borderColor = o._series[0].color : o.borderColor = this.grid.borderColor);
            this.sortData && h(this.series),
            this.grid.init(),
            this.grid._axes = this.axes,
            this.legend._series = this.series;
            for (var f = 0; f < a.jqplot.postInitHooks.length; f++)
                a.jqplot.postInitHooks[f].call(this, c, this.data, e);
            for (var f = 0; f < this.postInitHooks.hooks.length; f++)
                this.postInitHooks.hooks[f].call(this, c, this.data, e)
        }
        ,
        this.resetAxesScale = function(b, c) {
            var d = c || {}
              , e = b || this.axes;
            if (e === !0 && (e = this.axes),
            a.isArray(e))
                for (var f = 0; f < e.length; f++)
                    this.axes[e[f]].resetScale(d[e[f]]);
            else if ("object" == typeof e)
                for (var g in e)
                    this.axes[g].resetScale(d[g])
        }
        ,
        this.reInitialize = function(c, d) {
            for (var e = a.extend(!0, {}, this.options, d), f = this.targetId.substr(1), g = null == c ? this.data : c, i = 0; i < a.jqplot.preInitHooks.length; i++)
                a.jqplot.preInitHooks[i].call(this, f, g, e);
            for (var i = 0; i < this.preInitHooks.hooks.length; i++)
                this.preInitHooks.hooks[i].call(this, f, g, e);
            if (this._height = this.target.height(),
            this._width = this.target.width(),
            this._height <= 0 || this._width <= 0 || !this._height || !this._width)
                throw new Error("Target dimension not set");
            this._plotDimensions.height = this._height,
            this._plotDimensions.width = this._width,
            this.grid._plotDimensions = this._plotDimensions,
            this.title._plotDimensions = this._plotDimensions,
            this.baseCanvas._plotDimensions = this._plotDimensions,
            this.eventCanvas._plotDimensions = this._plotDimensions,
            this.legend._plotDimensions = this._plotDimensions;
            for (var j, k, l, m, i = 0, n = G.length; n > i; i++) {
                j = G[i],
                m = this.axes[j],
                k = m._ticks;
                for (var l = 0, o = k.length; o > l; l++) {
                    var p = k[l]._elem;
                    p && (a.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== F && window.G_vmlCanvasManager.uninitElement(p.get(0)),
                    p.emptyForce(),
                    p = null,
                    k._elem = null)
                }
                k = null,
                delete m.ticks,
                delete m._ticks,
                this.axes[j] = new b(j),
                this.axes[j]._plotWidth = this._width,
                this.axes[j]._plotHeight = this._height
            }
            c && (e.dataRenderer && a.isFunction(e.dataRenderer) && (e.dataRendererOptions && (this.dataRendererOptions = e.dataRendererOptions),
            this.dataRenderer = e.dataRenderer,
            c = this.dataRenderer(c, this, this.dataRendererOptions)),
            this.data = a.extend(!0, [], c)),
            d && this.parseOptions(e),
            this.title._plotWidth = this._width,
            this.textColor && this.target.css("color", this.textColor),
            this.fontFamily && this.target.css("font-family", this.fontFamily),
            this.fontSize && this.target.css("font-size", this.fontSize),
            this.title.init(),
            this.legend.init(),
            this._sumy = 0,
            this._sumx = 0,
            this.seriesStack = [],
            this.previousSeriesStack = [],
            this.computePlotData();
            for (var i = 0, n = this.series.length; n > i; i++) {
                this.seriesStack.push(i),
                this.previousSeriesStack.push(i),
                this.series[i].shadowCanvas._plotDimensions = this._plotDimensions,
                this.series[i].canvas._plotDimensions = this._plotDimensions;
                for (var l = 0; l < a.jqplot.preSeriesInitHooks.length; l++)
                    a.jqplot.preSeriesInitHooks[l].call(this.series[i], f, this.data, this.options.seriesDefaults, this.options.series[i], this);
                for (var l = 0; l < this.preSeriesInitHooks.hooks.length; l++)
                    this.preSeriesInitHooks.hooks[l].call(this.series[i], f, this.data, this.options.seriesDefaults, this.options.series[i], this);
                this.series[i]._plotDimensions = this._plotDimensions,
                this.series[i].init(i, this.grid.borderWidth, this);
                for (var l = 0; l < a.jqplot.postSeriesInitHooks.length; l++)
                    a.jqplot.postSeriesInitHooks[l].call(this.series[i], f, this.data, this.options.seriesDefaults, this.options.series[i], this);
                for (var l = 0; l < this.postSeriesInitHooks.hooks.length; l++)
                    this.postSeriesInitHooks.hooks[l].call(this.series[i], f, this.data, this.options.seriesDefaults, this.options.series[i], this);
                this._sumy += this.series[i]._sumy,
                this._sumx += this.series[i]._sumx
            }
            for (var i = 0, n = G.length; n > i; i++)
                j = G[i],
                m = this.axes[j],
                m._plotDimensions = this._plotDimensions,
                m.init(),
                null == m.borderColor && ("x" !== j.charAt(0) && m.useSeriesColor === !0 && m.show ? m.borderColor = m._series[0].color : m.borderColor = this.grid.borderColor);
            this.sortData && h(this.series),
            this.grid.init(),
            this.grid._axes = this.axes,
            this.legend._series = this.series;
            for (var i = 0, n = a.jqplot.postInitHooks.length; n > i; i++)
                a.jqplot.postInitHooks[i].call(this, f, this.data, e);
            for (var i = 0, n = this.postInitHooks.hooks.length; n > i; i++)
                this.postInitHooks.hooks[i].call(this, f, this.data, e)
        }
        ,
        this.quickInit = function() {
            if (this._height = this.target.height(),
            this._width = this.target.width(),
            this._height <= 0 || this._width <= 0 || !this._height || !this._width)
                throw new Error("Target dimension not set");
            this._plotDimensions.height = this._height,
            this._plotDimensions.width = this._width,
            this.grid._plotDimensions = this._plotDimensions,
            this.title._plotDimensions = this._plotDimensions,
            this.baseCanvas._plotDimensions = this._plotDimensions,
            this.eventCanvas._plotDimensions = this._plotDimensions,
            this.legend._plotDimensions = this._plotDimensions;
            for (var b in this.axes)
                this.axes[b]._plotWidth = this._width,
                this.axes[b]._plotHeight = this._height;
            this.title._plotWidth = this._width,
            this.textColor && this.target.css("color", this.textColor),
            this.fontFamily && this.target.css("font-family", this.fontFamily),
            this.fontSize && this.target.css("font-size", this.fontSize),
            this._sumy = 0,
            this._sumx = 0,
            this.computePlotData();
            for (var c = 0; c < this.series.length; c++)
                "line" === this.series[c]._type && this.series[c].renderer.bands.show && this.series[c].renderer.initBands.call(this.series[c], this.series[c].renderer.options, this),
                this.series[c]._plotDimensions = this._plotDimensions,
                this.series[c].canvas._plotDimensions = this._plotDimensions,
                this._sumy += this.series[c]._sumy,
                this._sumx += this.series[c]._sumx;
            for (var d, e = 0; 12 > e; e++) {
                d = G[e];
                for (var f = this.axes[d]._ticks, c = 0; c < f.length; c++) {
                    var g = f[c]._elem;
                    g && (a.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== F && window.G_vmlCanvasManager.uninitElement(g.get(0)),
                    g.emptyForce(),
                    g = null,
                    f._elem = null)
                }
                f = null,
                this.axes[d]._plotDimensions = this._plotDimensions,
                this.axes[d]._ticks = []
            }
            this.sortData && h(this.series),
            this.grid._axes = this.axes,
            this.legend._series = this.series
        }
        ,
        this.computePlotData = function() {
            this._plotData = [],
            this._stackData = [];
            var b, c, d;
            for (c = 0,
            d = this.series.length; d > c; c++) {
                b = this.series[c],
                this._plotData.push([]),
                this._stackData.push([]);
                var e = b.data;
                this._plotData[c] = a.extend(!0, [], e),
                this._stackData[c] = a.extend(!0, [], e),
                b._plotData = this._plotData[c],
                b._stackData = this._stackData[c];
                var f = {
                    x: [],
                    y: []
                };
                if (this.stackSeries && !b.disableStack) {
                    b._stack = !0;
                    for (var g = "x" === b._stackAxis ? 0 : 1, h = 0, i = e.length; i > h; h++) {
                        var j = e[h][g];
                        if (null == j && (j = 0),
                        this._plotData[c][h][g] = j,
                        this._stackData[c][h][g] = j,
                        c > 0)
                            for (var k = c; k--; ) {
                                var l = this._plotData[k][h][g];
                                if (j * l >= 0) {
                                    this._plotData[c][h][g] += l,
                                    this._stackData[c][h][g] += l;
                                    break
                                }
                            }
                    }
                } else {
                    for (var m = 0; m < b.data.length; m++)
                        f.x.push(b.data[m][0]),
                        f.y.push(b.data[m][1]);
                    this._stackData.push(b.data),
                    this.series[c]._stackData = b.data,
                    this._plotData.push(b.data),
                    b._plotData = b.data,
                    b._plotValues = f
                }
                for (c > 0 && (b._prevPlotData = this.series[c - 1]._plotData),
                b._sumy = 0,
                b._sumx = 0,
                m = b.data.length - 1; m > -1; m--)
                    b._sumy += b.data[m][1],
                    b._sumx += b.data[m][0]
            }
        }
        ,
        this.populatePlotData = function(b, c) {
            this._plotData = [],
            this._stackData = [],
            b._stackData = [],
            b._plotData = [];
            var d = {
                x: [],
                y: []
            };
            if (this.stackSeries && !b.disableStack) {
                b._stack = !0;
                for (var e, f, g, h, i = "x" === b._stackAxis ? 0 : 1, j = a.extend(!0, [], b.data), k = a.extend(!0, [], b.data), l = 0; c > l; l++)
                    for (var m = this.series[l].data, n = 0; n < m.length; n++)
                        g = m[n],
                        e = null != g[0] ? g[0] : 0,
                        f = null != g[1] ? g[1] : 0,
                        j[n][0] += e,
                        j[n][1] += f,
                        h = i ? f : e,
                        b.data[n][i] * h >= 0 && (k[n][i] += h);
                for (var o = 0; o < k.length; o++)
                    d.x.push(k[o][0]),
                    d.y.push(k[o][1]);
                this._plotData.push(k),
                this._stackData.push(j),
                b._stackData = j,
                b._plotData = k,
                b._plotValues = d
            } else {
                for (var o = 0; o < b.data.length; o++)
                    d.x.push(b.data[o][0]),
                    d.y.push(b.data[o][1]);
                this._stackData.push(b.data),
                this.series[c]._stackData = b.data,
                this._plotData.push(b.data),
                b._plotData = b.data,
                b._plotValues = d
            }
            for (c > 0 && (b._prevPlotData = this.series[c - 1]._plotData),
            b._sumy = 0,
            b._sumx = 0,
            o = b.data.length - 1; o > -1; o--)
                b._sumy += b.data[o][1],
                b._sumx += b.data[o][0]
        }
        ,
        this.getNextSeriesColor = function(a) {
            var b = 0
              , c = a.seriesColors;
            return function() {
                return b < c.length ? c[b++] : (b = 0,
                c[b++])
            }
        }(this),
        this.parseOptions = function(b) {
            for (var c = 0; c < this.preParseOptionsHooks.hooks.length; c++)
                this.preParseOptionsHooks.hooks[c].call(this, b);
            for (var c = 0; c < a.jqplot.preParseOptionsHooks.length; c++)
                a.jqplot.preParseOptionsHooks[c].call(this, b);
            this.options = a.extend(!0, {}, this.defaults, b);
            var d = this.options;
            if (this.animate = d.animate,
            this.animateReplot = d.animateReplot,
            this.stackSeries = d.stackSeries,
            a.isPlainObject(d.fillBetween))
                for (var f, g = ["series1", "series2", "color", "baseSeries", "fill"], c = 0, h = g.length; h > c; c++)
                    f = g[c],
                    null != d.fillBetween[f] && (this.fillBetween[f] = d.fillBetween[f]);
            d.seriesColors && (this.seriesColors = d.seriesColors),
            d.negativeSeriesColors && (this.negativeSeriesColors = d.negativeSeriesColors),
            d.captureRightClick && (this.captureRightClick = d.captureRightClick),
            this.defaultAxisStart = b && null != b.defaultAxisStart ? b.defaultAxisStart : this.defaultAxisStart,
            this.colorGenerator.setColors(this.seriesColors),
            this.negativeColorGenerator.setColors(this.negativeSeriesColors),
            a.extend(!0, this._gridPadding, d.gridPadding),
            this.sortData = null != d.sortData ? d.sortData : this.sortData;
            for (var c = 0; 12 > c; c++) {
                var i = G[c]
                  , j = this.axes[i];
                j._options = a.extend(!0, {}, d.axesDefaults, d.axes[i]),
                a.extend(!0, j, d.axesDefaults, d.axes[i]),
                j._plotWidth = this._width,
                j._plotHeight = this._height
            }
            var k = function(b, c, d) {
                var e, f, g = [];
                if (c = c || "vertical",
                a.isArray(b[0]))
                    a.extend(!0, g, b);
                else
                    for (e = 0,
                    f = b.length; f > e; e++)
                        "vertical" == c ? g.push([d + e, b[e]]) : g.push([b[e], d + e]);
                return g
            };
            this.series = [];
            for (var c = 0; c < this.data.length; c++) {
                for (var l = a.extend(!0, {
                    index: c
                }, {
                    seriesColors: this.seriesColors,
                    negativeSeriesColors: this.negativeSeriesColors
                }, this.options.seriesDefaults, this.options.series[c], {
                    rendererOptions: {
                        animation: {
                            show: this.animate
                        }
                    }
                }), g = new e(l), m = 0; m < a.jqplot.preParseSeriesOptionsHooks.length; m++)
                    a.jqplot.preParseSeriesOptionsHooks[m].call(g, this.options.seriesDefaults, this.options.series[c]);
                for (var m = 0; m < this.preParseSeriesOptionsHooks.hooks.length; m++)
                    this.preParseSeriesOptionsHooks.hooks[m].call(g, this.options.seriesDefaults, this.options.series[c]);
                a.extend(!0, g, l);
                var n = "vertical";
                switch (g.renderer === a.jqplot.BarRenderer && g.rendererOptions && "horizontal" == g.rendererOptions.barDirection && (n = "horizontal",
                g._stackAxis = "x",
                g._primaryAxis = "_yaxis"),
                g.data = k(this.data[c], n, this.defaultAxisStart),
                g.xaxis) {
                case "xaxis":
                    g._xaxis = this.axes.xaxis;
                    break;
                case "x2axis":
                    g._xaxis = this.axes.x2axis
                }
                g._yaxis = this.axes[g.yaxis],
                g._xaxis._series.push(g),
                g._yaxis._series.push(g),
                g.show ? (g._xaxis.show = !0,
                g._yaxis.show = !0) : (g._xaxis.scaleToHiddenSeries && (g._xaxis.show = !0),
                g._yaxis.scaleToHiddenSeries && (g._yaxis.show = !0)),
                g.label || (g.label = "Series " + (c + 1).toString()),
                this.series.push(g);
                for (var m = 0; m < a.jqplot.postParseSeriesOptionsHooks.length; m++)
                    a.jqplot.postParseSeriesOptionsHooks[m].call(this.series[c], this.options.seriesDefaults, this.options.series[c]);
                for (var m = 0; m < this.postParseSeriesOptionsHooks.hooks.length; m++)
                    this.postParseSeriesOptionsHooks.hooks[m].call(this.series[c], this.options.seriesDefaults, this.options.series[c])
            }
            a.extend(!0, this.grid, this.options.grid);
            for (var c = 0, h = G.length; h > c; c++) {
                var i = G[c]
                  , j = this.axes[i];
                null == j.borderWidth && (j.borderWidth = this.grid.borderWidth)
            }
            "string" == typeof this.options.title ? this.title.text = this.options.title : "object" == typeof this.options.title && a.extend(!0, this.title, this.options.title),
            this.title._plotWidth = this._width,
            this.legend.setOptions(this.options.legend);
            for (var c = 0; c < a.jqplot.postParseOptionsHooks.length; c++)
                a.jqplot.postParseOptionsHooks[c].call(this, b);
            for (var c = 0; c < this.postParseOptionsHooks.hooks.length; c++)
                this.postParseOptionsHooks.hooks[c].call(this, b)
        }
        ,
        this.destroy = function() {
            this.canvasManager.freeAllCanvases(),
            this.eventCanvas && this.eventCanvas._elem && this.eventCanvas._elem.unbind(),
            this.target.empty(),
            this.target[0].innerHTML = ""
        }
        ,
        this.replot = function(b) {
            var c = b || {}
              , d = c.data || null
              , e = c.clear === !1 ? !1 : !0
              , f = c.resetAxes || !1;
            delete c.data,
            delete c.clear,
            delete c.resetAxes,
            this.target.trigger("jqplotPreReplot"),
            e && this.destroy(),
            d || !a.isEmptyObject(c) ? this.reInitialize(d, c) : this.quickInit(),
            f && this.resetAxesScale(f, c.axes),
            this.draw(),
            this.target.trigger("jqplotPostReplot")
        }
        ,
        this.redraw = function(a) {
            a = null != a ? a : !0,
            this.target.trigger("jqplotPreRedraw"),
            a && (this.canvasManager.freeAllCanvases(),
            this.eventCanvas._elem.unbind(),
            this.target.empty());
            for (var b in this.axes)
                this.axes[b]._ticks = [];
            this.computePlotData(),
            this._sumy = 0,
            this._sumx = 0;
            for (var c = 0, d = this.series.length; d > c; c++)
                this._sumy += this.series[c]._sumy,
                this._sumx += this.series[c]._sumx;
            this.draw(),
            this.target.trigger("jqplotPostRedraw")
        }
        ,
        this.draw = function() {
            if (this.drawIfHidden || this.target.is(":visible")) {
                this.target.trigger("jqplotPreDraw");
                var b, c, d;
                for (b = 0,
                d = a.jqplot.preDrawHooks.length; d > b; b++)
                    a.jqplot.preDrawHooks[b].call(this);
                for (b = 0,
                d = this.preDrawHooks.hooks.length; d > b; b++)
                    this.preDrawHooks.hooks[b].apply(this, this.preDrawSeriesHooks.args[b]);
                this.target.append(this.baseCanvas.createElement({
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, "jqplot-base-canvas", null, this)),
                this.baseCanvas.setContext(),
                this.target.append(this.title.draw()),
                this.title.pack({
                    top: 0,
                    left: 0
                });
                var e = this.legend.draw({}, this)
                  , f = {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                };
                if ("outsideGrid" == this.legend.placement) {
                    switch (this.target.append(e),
                    this.legend.location) {
                    case "n":
                        f.top += this.legend.getHeight();
                        break;
                    case "s":
                        f.bottom += this.legend.getHeight();
                        break;
                    case "ne":
                    case "e":
                    case "se":
                        f.right += this.legend.getWidth();
                        break;
                    case "nw":
                    case "w":
                    case "sw":
                        f.left += this.legend.getWidth();
                        break;
                    default:
                        f.right += this.legend.getWidth()
                    }
                    e = e.detach()
                }
                var g, h = this.axes;
                for (b = 0; 12 > b; b++)
                    g = G[b],
                    this.target.append(h[g].draw(this.baseCanvas._ctx, this)),
                    h[g].set();
                h.yaxis.show && (f.left += h.yaxis.getWidth());
                var i, j = ["y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis"], k = [0, 0, 0, 0, 0, 0, 0, 0], l = 0;
                for (i = 0; 8 > i; i++)
                    h[j[i]].show && (l += h[j[i]].getWidth(),
                    k[i] = l);
                if (f.right += l,
                h.x2axis.show && (f.top += h.x2axis.getHeight()),
                this.title.show && (f.top += this.title.getHeight()),
                h.xaxis.show && (f.bottom += h.xaxis.getHeight()),
                this.options.gridDimensions && a.isPlainObject(this.options.gridDimensions)) {
                    var m = parseInt(this.options.gridDimensions.width, 10) || 0
                      , n = parseInt(this.options.gridDimensions.height, 10) || 0
                      , o = (this._width - f.left - f.right - m) / 2
                      , p = (this._height - f.top - f.bottom - n) / 2;
                    p >= 0 && o >= 0 && (f.top += p,
                    f.bottom += p,
                    f.left += o,
                    f.right += o)
                }
                var q = ["top", "bottom", "left", "right"];
                for (var i in q)
                    null == this._gridPadding[q[i]] && f[q[i]] > 0 ? this._gridPadding[q[i]] = f[q[i]] : null == this._gridPadding[q[i]] && (this._gridPadding[q[i]] = this._defaultGridPadding[q[i]]);
                var r = this._gridPadding;
                for ("outsideGrid" === this.legend.placement && (r = {
                    top: this.title.getHeight(),
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                "s" === this.legend.location && (r.left = this._gridPadding.left,
                r.right = this._gridPadding.right)),
                h.xaxis.pack({
                    position: "absolute",
                    bottom: this._gridPadding.bottom - h.xaxis.getHeight(),
                    left: 0,
                    width: this._width
                }, {
                    min: this._gridPadding.left,
                    max: this._width - this._gridPadding.right
                }),
                h.yaxis.pack({
                    position: "absolute",
                    top: 0,
                    left: this._gridPadding.left - h.yaxis.getWidth(),
                    height: this._height
                }, {
                    min: this._height - this._gridPadding.bottom,
                    max: this._gridPadding.top
                }),
                h.x2axis.pack({
                    position: "absolute",
                    top: this._gridPadding.top - h.x2axis.getHeight(),
                    left: 0,
                    width: this._width
                }, {
                    min: this._gridPadding.left,
                    max: this._width - this._gridPadding.right
                }),
                b = 8; b > 0; b--)
                    h[j[b - 1]].pack({
                        position: "absolute",
                        top: 0,
                        right: this._gridPadding.right - k[b - 1]
                    }, {
                        min: this._height - this._gridPadding.bottom,
                        max: this._gridPadding.top
                    });
                var s = (this._width - this._gridPadding.left - this._gridPadding.right) / 2 + this._gridPadding.left - h.yMidAxis.getWidth() / 2;
                h.yMidAxis.pack({
                    position: "absolute",
                    top: 0,
                    left: s,
                    zIndex: 9,
                    textAlign: "center"
                }, {
                    min: this._height - this._gridPadding.bottom,
                    max: this._gridPadding.top
                }),
                this.target.append(this.grid.createElement(this._gridPadding, this)),
                this.grid.draw();
                var t = this.series
                  , u = t.length;
                for (b = 0,
                d = u; d > b; b++)
                    c = this.seriesStack[b],
                    this.target.append(t[c].shadowCanvas.createElement(this._gridPadding, "jqplot-series-shadowCanvas", null, this)),
                    t[c].shadowCanvas.setContext(),
                    t[c].shadowCanvas._elem.data("seriesIndex", c);
                for (b = 0,
                d = u; d > b; b++)
                    c = this.seriesStack[b],
                    this.target.append(t[c].canvas.createElement(this._gridPadding, "jqplot-series-canvas", null, this)),
                    t[c].canvas.setContext(),
                    t[c].canvas._elem.data("seriesIndex", c);
                this.target.append(this.eventCanvas.createElement(this._gridPadding, "jqplot-event-canvas", null, this)),
                this.eventCanvas.setContext(),
                this.eventCanvas._ctx.fillStyle = "rgba(0,0,0,0)",
                this.eventCanvas._ctx.fillRect(0, 0, this.eventCanvas._ctx.canvas.width, this.eventCanvas._ctx.canvas.height),
                this.bindCustomEvents(),
                this.legend.preDraw ? (this.eventCanvas._elem.before(e),
                this.legend.pack(r),
                this.legend._elem ? this.drawSeries({
                    legendInfo: {
                        location: this.legend.location,
                        placement: this.legend.placement,
                        width: this.legend.getWidth(),
                        height: this.legend.getHeight(),
                        xoffset: this.legend.xoffset,
                        yoffset: this.legend.yoffset
                    }
                }) : this.drawSeries()) : (this.drawSeries(),
                u && a(t[u - 1].canvas._elem).after(e),
                this.legend.pack(r));
                for (var b = 0, d = a.jqplot.eventListenerHooks.length; d > b; b++)
                    this.eventCanvas._elem.bind(a.jqplot.eventListenerHooks[b][0], {
                        plot: this
                    }, a.jqplot.eventListenerHooks[b][1]);
                for (var b = 0, d = this.eventListenerHooks.hooks.length; d > b; b++)
                    this.eventCanvas._elem.bind(this.eventListenerHooks.hooks[b][0], {
                        plot: this
                    }, this.eventListenerHooks.hooks[b][1]);
                var v = this.fillBetween;
                v.fill && v.series1 !== v.series2 && v.series1 < u && v.series2 < u && "line" === t[v.series1]._type && "line" === t[v.series2]._type && this.doFillBetweenLines();
                for (var b = 0, d = a.jqplot.postDrawHooks.length; d > b; b++)
                    a.jqplot.postDrawHooks[b].call(this);
                for (var b = 0, d = this.postDrawHooks.hooks.length; d > b; b++)
                    this.postDrawHooks.hooks[b].apply(this, this.postDrawHooks.args[b]);
                this.target.is(":visible") && (this._drawCount += 1);
                var w, x, y, z;
                for (b = 0,
                d = u; d > b; b++)
                    w = t[b],
                    x = w.renderer,
                    y = ".jqplot-point-label.jqplot-series-" + b,
                    x.animation && x.animation._supported && x.animation.show && (this._drawCount < 2 || this.animateReplot) && (z = this.target.find(y),
                    z.stop(!0, !0).hide(),
                    w.canvas._elem.stop(!0, !0).hide(),
                    w.shadowCanvas._elem.stop(!0, !0).hide(),
                    w.canvas._elem.jqplotEffect("blind", {
                        mode: "show",
                        direction: x.animation.direction
                    }, x.animation.speed),
                    w.shadowCanvas._elem.jqplotEffect("blind", {
                        mode: "show",
                        direction: x.animation.direction
                    }, x.animation.speed),
                    z.fadeIn(.8 * x.animation.speed));
                z = null,
                this.target.trigger("jqplotPostDraw", [this])
            }
        }
        ,
        g.prototype.doFillBetweenLines = function() {
            var a = this.fillBetween
              , b = a.series1
              , c = a.series2
              , d = c > b ? b : c
              , e = c > b ? c : b
              , f = this.series[d]
              , g = this.series[e];
            if (g.renderer.smooth)
                var h = g.renderer._smoothedData.slice(0).reverse();
            else
                var h = g.gridData.slice(0).reverse();
            if (f.renderer.smooth)
                var i = f.renderer._smoothedData.concat(h);
            else
                var i = f.gridData.concat(h);
            var j = null !== a.color ? a.color : this.series[b].fillColor
              , k = null !== a.baseSeries ? a.baseSeries : d
              , l = this.series[k].renderer.shapeRenderer
              , m = {
                fillStyle: j,
                fill: !0,
                closePath: !0
            };
            l.draw(f.shadowCanvas._ctx, i, m)
        }
        ,
        this.bindCustomEvents = function() {
            this.eventCanvas._elem.bind("click", {
                plot: this
            }, this.onClick),
            this.eventCanvas._elem.bind("dblclick", {
                plot: this
            }, this.onDblClick),
            this.eventCanvas._elem.bind("mousedown", {
                plot: this
            }, this.onMouseDown),
            this.eventCanvas._elem.bind("mousemove", {
                plot: this
            }, this.onMouseMove),
            this.eventCanvas._elem.bind("mouseenter", {
                plot: this
            }, this.onMouseEnter),
            this.eventCanvas._elem.bind("mouseleave", {
                plot: this
            }, this.onMouseLeave),
            this.captureRightClick ? (this.eventCanvas._elem.bind("mouseup", {
                plot: this
            }, this.onRightClick),
            this.eventCanvas._elem.get(0).oncontextmenu = function() {
                return !1
            }
            ) : this.eventCanvas._elem.bind("mouseup", {
                plot: this
            }, this.onMouseUp)
        }
        ,
        this.onClick = function(b) {
            var c = i(b)
              , d = b.data.plot
              , e = j(c.gridPos, d)
              , f = a.Event("jqplotClick");
            f.pageX = b.pageX,
            f.pageY = b.pageY,
            a(this).trigger(f, [c.gridPos, c.dataPos, e, d])
        }
        ,
        this.onDblClick = function(b) {
            var c = i(b)
              , d = b.data.plot
              , e = j(c.gridPos, d)
              , f = a.Event("jqplotDblClick");
            f.pageX = b.pageX,
            f.pageY = b.pageY,
            a(this).trigger(f, [c.gridPos, c.dataPos, e, d])
        }
        ,
        this.onMouseDown = function(b) {
            var c = i(b)
              , d = b.data.plot
              , e = j(c.gridPos, d)
              , f = a.Event("jqplotMouseDown");
            f.pageX = b.pageX,
            f.pageY = b.pageY,
            a(this).trigger(f, [c.gridPos, c.dataPos, e, d])
        }
        ,
        this.onMouseUp = function(b) {
            var c = i(b)
              , d = a.Event("jqplotMouseUp");
            d.pageX = b.pageX,
            d.pageY = b.pageY,
            a(this).trigger(d, [c.gridPos, c.dataPos, null, b.data.plot])
        }
        ,
        this.onRightClick = function(b) {
            var c = i(b)
              , d = b.data.plot
              , e = j(c.gridPos, d);
            if (d.captureRightClick)
                if (3 == b.which) {
                    var f = a.Event("jqplotRightClick");
                    f.pageX = b.pageX,
                    f.pageY = b.pageY,
                    a(this).trigger(f, [c.gridPos, c.dataPos, e, d])
                } else {
                    var f = a.Event("jqplotMouseUp");
                    f.pageX = b.pageX,
                    f.pageY = b.pageY,
                    a(this).trigger(f, [c.gridPos, c.dataPos, e, d])
                }
        }
        ,
        this.onMouseMove = function(b) {
            var c = i(b)
              , d = b.data.plot
              , e = j(c.gridPos, d)
              , f = a.Event("jqplotMouseMove");
            f.pageX = b.pageX,
            f.pageY = b.pageY,
            a(this).trigger(f, [c.gridPos, c.dataPos, e, d])
        }
        ,
        this.onMouseEnter = function(b) {
            var c = i(b)
              , d = b.data.plot
              , e = a.Event("jqplotMouseEnter");
            e.pageX = b.pageX,
            e.pageY = b.pageY,
            e.relatedTarget = b.relatedTarget,
            a(this).trigger(e, [c.gridPos, c.dataPos, null, d])
        }
        ,
        this.onMouseLeave = function(b) {
            var c = i(b)
              , d = b.data.plot
              , e = a.Event("jqplotMouseLeave");
            e.pageX = b.pageX,
            e.pageY = b.pageY,
            e.relatedTarget = b.relatedTarget,
            a(this).trigger(e, [c.gridPos, c.dataPos, null, d])
        }
        ,
        this.drawSeries = function(b, c) {
            var d, e, f;
            if (c = "number" == typeof b && null == c ? b : c,
            b = "object" == typeof b ? b : {},
            c != F)
                e = this.series[c],
                f = e.shadowCanvas._ctx,
                f.clearRect(0, 0, f.canvas.width, f.canvas.height),
                e.drawShadow(f, b, this),
                f = e.canvas._ctx,
                f.clearRect(0, 0, f.canvas.width, f.canvas.height),
                e.draw(f, b, this),
                e.renderer.constructor == a.jqplot.BezierCurveRenderer && c < this.series.length - 1 && this.drawSeries(c + 1);
            else
                for (d = 0; d < this.series.length; d++)
                    e = this.series[d],
                    f = e.shadowCanvas._ctx,
                    f.clearRect(0, 0, f.canvas.width, f.canvas.height),
                    e.drawShadow(f, b, this),
                    f = e.canvas._ctx,
                    f.clearRect(0, 0, f.canvas.width, f.canvas.height),
                    e.draw(f, b, this);
            b = c = d = e = f = null
        }
        ,
        this.moveSeriesToFront = function(b) {
            b = parseInt(b, 10);
            var c = a.inArray(b, this.seriesStack);
            if (-1 != c) {
                if (c == this.seriesStack.length - 1)
                    return void (this.previousSeriesStack = this.seriesStack.slice(0));
                var d = this.seriesStack[this.seriesStack.length - 1]
                  , e = this.series[b].canvas._elem.detach()
                  , f = this.series[b].shadowCanvas._elem.detach();
                this.series[d].shadowCanvas._elem.after(f),
                this.series[d].canvas._elem.after(e),
                this.previousSeriesStack = this.seriesStack.slice(0),
                this.seriesStack.splice(c, 1),
                this.seriesStack.push(b)
            }
        }
        ,
        this.moveSeriesToBack = function(b) {
            b = parseInt(b, 10);
            var c = a.inArray(b, this.seriesStack);
            if (0 != c && -1 != c) {
                var d = this.seriesStack[0]
                  , e = this.series[b].canvas._elem.detach()
                  , f = this.series[b].shadowCanvas._elem.detach();
                this.series[d].shadowCanvas._elem.before(f),
                this.series[d].canvas._elem.before(e),
                this.previousSeriesStack = this.seriesStack.slice(0),
                this.seriesStack.splice(c, 1),
                this.seriesStack.unshift(b)
            }
        }
        ,
        this.restorePreviousSeriesOrder = function() {
            var a, b, c, d, e, f;
            if (this.seriesStack != this.previousSeriesStack) {
                for (a = 1; a < this.previousSeriesStack.length; a++)
                    e = this.previousSeriesStack[a],
                    f = this.previousSeriesStack[a - 1],
                    b = this.series[e].canvas._elem.detach(),
                    c = this.series[e].shadowCanvas._elem.detach(),
                    this.series[f].shadowCanvas._elem.after(c),
                    this.series[f].canvas._elem.after(b);
                d = this.seriesStack.slice(0),
                this.seriesStack = this.previousSeriesStack.slice(0),
                this.previousSeriesStack = d
            }
        }
        ,
        this.restoreOriginalSeriesOrder = function() {
            var a, b, c, d = [];
            for (a = 0; a < this.series.length; a++)
                d.push(a);
            if (this.seriesStack != d)
                for (this.previousSeriesStack = this.seriesStack.slice(0),
                this.seriesStack = d,
                a = 1; a < this.seriesStack.length; a++)
                    b = this.series[a].canvas._elem.detach(),
                    c = this.series[a].shadowCanvas._elem.detach(),
                    this.series[a - 1].shadowCanvas._elem.after(c),
                    this.series[a - 1].canvas._elem.after(b)
        }
        ,
        this.activateTheme = function(a) {
            this.themeEngine.activate(this, a)
        }
    }
    function h(a, b) {
        return (3.4182054 + b) * Math.pow(a, -.3534992)
    }
    function i(a) {
        var b = (Math.exp(2 * a) - 1) / (Math.exp(2 * a) + 1);
        return b
    }
    function j(a) {
        function b(a, b) {
            return a - b == 0 ? Math.pow(10, 10) : a - b
        }
        var c = this.renderer.smooth
          , d = this.canvas.getWidth()
          , e = this._xaxis.series_p2u
          , f = this._yaxis.series_p2u
          , g = null
          , i = a.length / d
          , j = []
          , k = [];
        g = isNaN(parseFloat(c)) ? h(i, .5) : parseFloat(c);
        for (var l = [], m = [], n = 0, o = a.length; o > n; n++)
            l.push(a[n][1]),
            m.push(a[n][0]);
        for (var p, q, r, s, t = a.length - 1, u = 1, v = a.length; v > u; u++) {
            for (var w = [], x = [], y = 0; 2 > y; y++) {
                var n = u - 1 + y;
                0 == n || n == t ? w[y] = Math.pow(10, 10) : l[n + 1] - l[n] == 0 || l[n] - l[n - 1] == 0 ? w[y] = 0 : (m[n + 1] - m[n]) / (l[n + 1] - l[n]) + (m[n] - m[n - 1]) / (l[n] - l[n - 1]) == 0 ? w[y] = 0 : (l[n + 1] - l[n]) * (l[n] - l[n - 1]) < 0 ? w[y] = 0 : w[y] = 2 / (b(m[n + 1], m[n]) / (l[n + 1] - l[n]) + b(m[n], m[n - 1]) / (l[n] - l[n - 1]))
            }
            1 == u ? w[0] = 1.5 * (l[1] - l[0]) / b(m[1], m[0]) - w[1] / 2 : u == t && (w[1] = 1.5 * (l[t] - l[t - 1]) / b(m[t], m[t - 1]) - w[0] / 2),
            x[0] = -2 * (w[1] + 2 * w[0]) / b(m[u], m[u - 1]) + 6 * (l[u] - l[u - 1]) / Math.pow(b(m[u], m[u - 1]), 2),
            x[1] = 2 * (2 * w[1] + w[0]) / b(m[u], m[u - 1]) - 6 * (l[u] - l[u - 1]) / Math.pow(b(m[u], m[u - 1]), 2),
            s = 1 / 6 * (x[1] - x[0]) / b(m[u], m[u - 1]),
            r = .5 * (m[u] * x[0] - m[u - 1] * x[1]) / b(m[u], m[u - 1]),
            q = (l[u] - l[u - 1] - r * (Math.pow(m[u], 2) - Math.pow(m[u - 1], 2)) - s * (Math.pow(m[u], 3) - Math.pow(m[u - 1], 3))) / b(m[u], m[u - 1]),
            p = l[u - 1] - q * m[u - 1] - r * Math.pow(m[u - 1], 2) - s * Math.pow(m[u - 1], 3);
            for (var z, A, B = (m[u] - m[u - 1]) / g, y = 0, o = g; o > y; y++)
                z = [],
                A = m[u - 1] + y * B,
                z.push(A),
                z.push(p + q * A + r * Math.pow(A, 2) + s * Math.pow(A, 3)),
                j.push(z),
                k.push([e(z[0]), f(z[1])])
        }
        return j.push(a[n]),
        k.push([e(a[n][0]), f(a[n][1])]),
        [j, k]
    }
    function k(a) {
        var b, c, d, e, f, g, j, k, l, m, n, o, p, q, r, s, t, u, v = this.renderer.smooth, w = this.renderer.tension, x = this.canvas.getWidth(), y = this._xaxis.series_p2u, z = this._yaxis.series_p2u, A = null, B = null, C = null, D = null, E = null, F = null, G = null, H = a.length / x, I = [], J = [];
        A = isNaN(parseFloat(v)) ? h(H, .5) : parseFloat(v),
        isNaN(parseFloat(w)) || (w = parseFloat(w));
        for (var K = 0, L = a.length - 1; L > K; K++)
            for (null === w ? (E = Math.abs((a[K + 1][1] - a[K][1]) / (a[K + 1][0] - a[K][0])),
            q = .3,
            r = .6,
            s = (r - q) / 2,
            t = 2.5,
            u = -1.4,
            G = E / t + u,
            C = s * i(G) - s * i(u) + q,
            K > 0 && (F = Math.abs((a[K][1] - a[K - 1][1]) / (a[K][0] - a[K - 1][0]))),
            G = F / t + u,
            D = s * i(G) - s * i(u) + q,
            B = (C + D) / 2) : B = w,
            b = 0; A > b; b++)
                c = b / A,
                d = (1 + 2 * c) * Math.pow(1 - c, 2),
                e = c * Math.pow(1 - c, 2),
                f = Math.pow(c, 2) * (3 - 2 * c),
                g = Math.pow(c, 2) * (c - 1),
                a[K - 1] ? (j = B * (a[K + 1][0] - a[K - 1][0]),
                k = B * (a[K + 1][1] - a[K - 1][1])) : (j = B * (a[K + 1][0] - a[K][0]),
                k = B * (a[K + 1][1] - a[K][1])),
                a[K + 2] ? (l = B * (a[K + 2][0] - a[K][0]),
                m = B * (a[K + 2][1] - a[K][1])) : (l = B * (a[K + 1][0] - a[K][0]),
                m = B * (a[K + 1][1] - a[K][1])),
                n = d * a[K][0] + f * a[K + 1][0] + e * j + g * l,
                o = d * a[K][1] + f * a[K + 1][1] + e * k + g * m,
                p = [n, o],
                I.push(p),
                J.push([y(n), z(o)]);
        return I.push(a[L]),
        J.push([y(a[L][0]), z(a[L][1])]),
        [I, J]
    }
    function l(b, c, d) {
        for (var e = 0; e < this.series.length; e++)
            this.series[e].renderer.constructor == a.jqplot.LineRenderer && this.series[e].highlightMouseOver && (this.series[e].highlightMouseDown = !1)
    }
    function m() {
        this.plugins.lineRenderer && this.plugins.lineRenderer.highlightCanvas && (this.plugins.lineRenderer.highlightCanvas.resetCanvas(),
        this.plugins.lineRenderer.highlightCanvas = null),
        this.plugins.lineRenderer.highlightedSeriesIndex = null,
        this.plugins.lineRenderer.highlightCanvas = new a.jqplot.GenericCanvas,
        this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-lineRenderer-highlight-canvas", this._plotDimensions, this)),
        this.plugins.lineRenderer.highlightCanvas.setContext(),
        this.eventCanvas._elem.bind("mouseleave", {
            plot: this
        }, function(a) {
            o(a.data.plot)
        })
    }
    function n(a, b, c, d) {
        var e = a.series[b]
          , f = a.plugins.lineRenderer.highlightCanvas;
        f._ctx.clearRect(0, 0, f._ctx.canvas.width, f._ctx.canvas.height),
        e._highlightedPoint = c,
        a.plugins.lineRenderer.highlightedSeriesIndex = b;
        var g = {
            fillStyle: e.highlightColor
        };
        "line" === e.type && e.renderer.bands.show && (g.fill = !0,
        g.closePath = !0),
        e.renderer.shapeRenderer.draw(f._ctx, d, g),
        f = null
    }
    function o(a) {
        var b = a.plugins.lineRenderer.highlightCanvas;
        b._ctx.clearRect(0, 0, b._ctx.canvas.width, b._ctx.canvas.height);
        for (var c = 0; c < a.series.length; c++)
            a.series[c]._highlightedPoint = null;
        a.plugins.lineRenderer.highlightedSeriesIndex = null,
        a.target.trigger("jqplotDataUnhighlight"),
        b = null
    }
    function p(a, b, c, d, e) {
        if (d) {
            var f = [d.seriesIndex, d.pointIndex, d.data]
              , g = jQuery.Event("jqplotDataMouseOver");
            if (g.pageX = a.pageX,
            g.pageY = a.pageY,
            e.target.trigger(g, f),
            e.series[f[0]].highlightMouseOver && f[0] != e.plugins.lineRenderer.highlightedSeriesIndex) {
                var h = jQuery.Event("jqplotDataHighlight");
                h.which = a.which,
                h.pageX = a.pageX,
                h.pageY = a.pageY,
                e.target.trigger(h, f),
                n(e, d.seriesIndex, d.pointIndex, d.points)
            }
        } else
            null == d && o(e)
    }
    function q(a, b, c, d, e) {
        if (d) {
            var f = [d.seriesIndex, d.pointIndex, d.data];
            if (e.series[f[0]].highlightMouseDown && f[0] != e.plugins.lineRenderer.highlightedSeriesIndex) {
                var g = jQuery.Event("jqplotDataHighlight");
                g.which = a.which,
                g.pageX = a.pageX,
                g.pageY = a.pageY,
                e.target.trigger(g, f),
                n(e, d.seriesIndex, d.pointIndex, d.points)
            }
        } else
            null == d && o(e)
    }
    function r(a, b, c, d, e) {
        var f = e.plugins.lineRenderer.highlightedSeriesIndex;
        null != f && e.series[f].highlightMouseDown && o(e)
    }
    function s(a, b, c, d, e) {
        if (d) {
            var f = [d.seriesIndex, d.pointIndex, d.data]
              , g = jQuery.Event("jqplotDataClick");
            g.which = a.which,
            g.pageX = a.pageX,
            g.pageY = a.pageY,
            e.target.trigger(g, f)
        }
    }
    function t(a, b, c, d, e) {
        if (d) {
            var f = [d.seriesIndex, d.pointIndex, d.data]
              , g = e.plugins.lineRenderer.highlightedSeriesIndex;
            null != g && e.series[g].highlightMouseDown && o(e);
            var h = jQuery.Event("jqplotDataRightClick");
            h.which = a.which,
            h.pageX = a.pageX,
            h.pageY = a.pageY,
            e.target.trigger(h, f)
        }
    }
    function u(a) {
        var b;
        if (a = Math.abs(a),
        a >= 10)
            b = "%d";
        else if (a > 1)
            b = a === parseInt(a, 10) ? "%d" : "%.1f";
        else {
            var c = -Math.floor(Math.log(a) / Math.LN10);
            b = "%." + c + "f"
        }
        return b
    }
    function v(b, c, d) {
        for (var e, f, g, h, i, j, k, l = Math.floor(d / 2), m = Math.ceil(1.5 * d), n = Number.MAX_VALUE, o = c - b, p = a.jqplot.getSignificantFigures, q = 0, r = m - l + 1; r > q; q++)
            j = l + q,
            e = o / (j - 1),
            f = p(e),
            e = Math.abs(d - j) + f.digitsRight,
            n > e ? (n = e,
            g = j,
            k = f.digitsRight) : e === n && f.digitsRight < k && (g = j,
            k = f.digitsRight);
        return h = Math.max(k, Math.max(p(b).digitsRight, p(c).digitsRight)),
        i = 0 === h ? "%d" : "%." + h + "f",
        e = o / (g - 1),
        [b, c, g, i, e]
    }
    function w(a, b) {
        b = b || 7;
        var c, d = a / (b - 1), e = Math.pow(10, Math.floor(Math.log(d) / Math.LN10)), f = d / e;
        return c = 1 > e ? f > 5 ? 10 * e : f > 2 ? 5 * e : f > 1 ? 2 * e : e : f > 5 ? 10 * e : f > 4 ? 5 * e : f > 3 ? 4 * e : f > 2 ? 3 * e : f > 1 ? 2 * e : e
    }
    function x(a, b) {
        b = b || 1;
        var c, d = Math.floor(Math.log(a) / Math.LN10), e = Math.pow(10, d), f = a / e;
        return f /= b,
        c = .38 >= f ? .1 : 1.6 >= f ? .2 : 4 >= f ? .5 : 8 >= f ? 1 : 16 >= f ? 2 : 5,
        c * e
    }
    function y(a, b) {
        var c, d, e = Math.floor(Math.log(a) / Math.LN10), f = Math.pow(10, e), g = a / f;
        return g /= b,
        d = .38 >= g ? .1 : 1.6 >= g ? .2 : 4 >= g ? .5 : 8 >= g ? 1 : 16 >= g ? 2 : 5,
        c = d * f,
        [c, d, f]
    }
    function z(a, b) {
        return a - b
    }
    function A(a) {
        if (null == a || "object" != typeof a)
            return a;
        var b = new a.constructor;
        for (var c in a)
            b[c] = A(a[c]);
        return b
    }
    function B(a, b) {
        if (null != b && "object" == typeof b)
            for (var c in b)
                "highlightColors" == c && (a[c] = A(b[c])),
                null != b[c] && "object" == typeof b[c] ? (a.hasOwnProperty(c) || (a[c] = {}),
                B(a[c], b[c])) : a[c] = b[c]
    }
    function C(a, b) {
        if (b.indexOf)
            return b.indexOf(a);
        for (var c = 0, d = b.length; d > c; c++)
            if (b[c] === a)
                return c;
        return -1
    }
    function D(a) {
        return null === a ? "[object Null]" : Object.prototype.toString.call(a)
    }
    function E(b, c, d, e) {
        return a.isPlainObject(b) ? b : (b = {
            effect: b
        },
        c === F && (c = {}),
        a.isFunction(c) && (e = c,
        d = null,
        c = {}),
        ("number" === a.type(c) || a.fx.speeds[c]) && (e = d,
        d = c,
        c = {}),
        a.isFunction(d) && (e = d,
        d = null),
        c && a.extend(b, c),
        d = d || c.duration,
        b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default,
        b.complete = e || c.complete,
        b)
    }
    var F;
    a.fn.emptyForce = function() {
        for (var b, c = 0; null != (b = a(this)[c]); c++) {
            if (1 === b.nodeType && a.cleanData(b.getElementsByTagName("*")),
            a.jqplot.use_excanvas)
                b.outerHTML = "";
            else
                for (; b.firstChild; )
                    b.removeChild(b.firstChild);
            b = null
        }
        return a(this)
    }
    ,
    a.fn.removeChildForce = function(a) {
        for (; a.firstChild; )
            this.removeChildForce(a.firstChild),
            a.removeChild(a.firstChild)
    }
    ,
    a.fn.jqplot = function() {
        for (var b = [], c = [], d = 0, e = arguments.length; e > d; d++)
            a.isArray(arguments[d]) ? b.push(arguments[d]) : a.isPlainObject(arguments[d]) && c.push(arguments[d]);
        return this.each(function(d) {
            var e, f, g, h, i = a(this), j = b.length, k = c.length;
            g = j > d ? b[d] : j ? b[j - 1] : null,
            h = k > d ? c[d] : k ? c[k - 1] : null,
            e = i.attr("id"),
            e === F && (e = "jqplot_target_" + a.jqplot.targetCounter++,
            i.attr("id", e)),
            f = a.jqplot(e, g, h),
            i.data("jqplot", f)
        })
    }
    ,
    a.jqplot = function(b, c, d) {
        var e = null
          , f = null;
        3 === arguments.length ? (e = c,
        f = d) : 2 === arguments.length && (a.isArray(c) ? e = c : a.isPlainObject(c) && (f = c)),
        null === e && null !== f && f.data && (e = f.data);
        var h = new g;
        if (a("#" + b).removeClass("jqplot-error"),
        !a.jqplot.config.catchErrors)
            return h.init(b, e, f),
            h.draw(),
            h.themeEngine.init.call(h),
            h;
        try {
            return h.init(b, e, f),
            h.draw(),
            h.themeEngine.init.call(h),
            h
        } catch (i) {
            var j = a.jqplot.config.errorMessage || i.message;
            a("#" + b).append('<div class="jqplot-error-message">' + j + "</div>"),
            a("#" + b).addClass("jqplot-error"),
            document.getElementById(b).style.background = a.jqplot.config.errorBackground,
            document.getElementById(b).style.border = a.jqplot.config.errorBorder,
            document.getElementById(b).style.fontFamily = a.jqplot.config.errorFontFamily,
            document.getElementById(b).style.fontSize = a.jqplot.config.errorFontSize,
            document.getElementById(b).style.fontStyle = a.jqplot.config.errorFontStyle,
            document.getElementById(b).style.fontWeight = a.jqplot.config.errorFontWeight
        }
    }
    ,
    a.jqplot.version = "1.0.8",
    a.jqplot.revision = "1250",
    a.jqplot.targetCounter = 1,
    a.jqplot.CanvasManager = function() {
        "undefined" == typeof a.jqplot.CanvasManager.canvases && (a.jqplot.CanvasManager.canvases = [],
        a.jqplot.CanvasManager.free = []);
        var b = [];
        this.getCanvas = function() {
            var c, d = !0;
            if (!a.jqplot.use_excanvas)
                for (var e = 0, f = a.jqplot.CanvasManager.canvases.length; f > e; e++)
                    if (a.jqplot.CanvasManager.free[e] === !0) {
                        d = !1,
                        c = a.jqplot.CanvasManager.canvases[e],
                        a.jqplot.CanvasManager.free[e] = !1,
                        b.push(e);
                        break
                    }
            return d && (c = document.createElement("canvas"),
            b.push(a.jqplot.CanvasManager.canvases.length),
            a.jqplot.CanvasManager.canvases.push(c),
            a.jqplot.CanvasManager.free.push(!1)),
            c
        }
        ,
        this.initCanvas = function(b) {
            return a.jqplot.use_excanvas ? window.G_vmlCanvasManager.initElement(b) : b
        }
        ,
        this.freeAllCanvases = function() {
            for (var a = 0, c = b.length; c > a; a++)
                this.freeCanvas(b[a]);
            b = []
        }
        ,
        this.freeCanvas = function(b) {
            if (a.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== F)
                window.G_vmlCanvasManager.uninitElement(a.jqplot.CanvasManager.canvases[b]),
                a.jqplot.CanvasManager.canvases[b] = null;
            else {
                var c = a.jqplot.CanvasManager.canvases[b];
                c.getContext("2d").clearRect(0, 0, c.width, c.height),
                a(c).unbind().removeAttr("class").removeAttr("style"),
                a(c).css({
                    left: "",
                    top: "",
                    position: ""
                }),
                c.width = 0,
                c.height = 0,
                a.jqplot.CanvasManager.free[b] = !0
            }
        }
    }
    ,
    a.jqplot.log = function() {
        window.console && window.console.log.apply(window.console, arguments)
    }
    ,
    a.jqplot.config = {
        addDomReference: !1,
        enablePlugins: !1,
        defaultHeight: 300,
        defaultWidth: 400,
        UTCAdjust: !1,
        timezoneOffset: new Date(6e4 * (new Date).getTimezoneOffset()),
        errorMessage: "",
        errorBackground: "",
        errorBorder: "",
        errorFontFamily: "",
        errorFontSize: "",
        errorFontStyle: "",
        errorFontWeight: "",
        catchErrors: !1,
        defaultTickFormatString: "%.1f",
        defaultColors: ["#4bb2c5", "#EAA228", "#c5b47f", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc", "#c747a3", "#cddf54", "#FBD178", "#26B4E3", "#bd70c7"],
        defaultNegativeColors: ["#498991", "#C08840", "#9F9274", "#546D61", "#646C4A", "#6F6621", "#6E3F5F", "#4F64B0", "#A89050", "#C45923", "#187399", "#945381", "#959E5C", "#C7AF7B", "#478396", "#907294"],
        dashLength: 4,
        gapLength: 4,
        dotGapLength: 2.5,
        srcLocation: "jqplot/src/",
        pluginLocation: "jqplot/src/plugins/"
    },
    a.jqplot.arrayMax = function(a) {
        return Math.max.apply(Math, a)
    }
    ,
    a.jqplot.arrayMin = function(a) {
        return Math.min.apply(Math, a)
    }
    ,
    a.jqplot.enablePlugins = a.jqplot.config.enablePlugins,
    a.jqplot.support_canvas = function() {
        return "undefined" == typeof a.jqplot.support_canvas.result && (a.jqplot.support_canvas.result = !!document.createElement("canvas").getContext),
        a.jqplot.support_canvas.result
    }
    ,
    a.jqplot.support_canvas_text = function() {
        return "undefined" == typeof a.jqplot.support_canvas_text.result && (window.G_vmlCanvasManager !== F && window.G_vmlCanvasManager._version > 887 ? a.jqplot.support_canvas_text.result = !0 : a.jqplot.support_canvas_text.result = !(!document.createElement("canvas").getContext || "function" != typeof document.createElement("canvas").getContext("2d").fillText)),
        a.jqplot.support_canvas_text.result
    }
    ,
    a.jqplot.use_excanvas = a.support.boxModel && a.support.objectAll && $support.leadingWhitespace || a.jqplot.support_canvas() ? !1 : !0,
    a.jqplot.preInitHooks = [],
    a.jqplot.postInitHooks = [],
    a.jqplot.preParseOptionsHooks = [],
    a.jqplot.postParseOptionsHooks = [],
    a.jqplot.preDrawHooks = [],
    a.jqplot.postDrawHooks = [],
    a.jqplot.preDrawSeriesHooks = [],
    a.jqplot.postDrawSeriesHooks = [],
    a.jqplot.preDrawLegendHooks = [],
    a.jqplot.addLegendRowHooks = [],
    a.jqplot.preSeriesInitHooks = [],
    a.jqplot.postSeriesInitHooks = [],
    a.jqplot.preParseSeriesOptionsHooks = [],
    a.jqplot.postParseSeriesOptionsHooks = [],
    a.jqplot.eventListenerHooks = [],
    a.jqplot.preDrawSeriesShadowHooks = [],
    a.jqplot.postDrawSeriesShadowHooks = [],
    a.jqplot.ElemContainer = function() {
        this._elem,
        this._plotWidth,
        this._plotHeight,
        this._plotDimensions = {
            height: null,
            width: null
        }
    }
    ,
    a.jqplot.ElemContainer.prototype.createElement = function(b, c, d, e, f) {
        this._offsets = c;
        var g = d || "jqplot"
          , h = document.createElement(b);
        return this._elem = a(h),
        this._elem.addClass(g),
        this._elem.css(e),
        this._elem.attr(f),
        h = null,
        this._elem
    }
    ,
    a.jqplot.ElemContainer.prototype.getWidth = function() {
        return this._elem ? this._elem.outerWidth(!0) : null
    }
    ,
    a.jqplot.ElemContainer.prototype.getHeight = function() {
        return this._elem ? this._elem.outerHeight(!0) : null
    }
    ,
    a.jqplot.ElemContainer.prototype.getPosition = function() {
        return this._elem ? this._elem.position() : {
            top: null,
            left: null,
            bottom: null,
            right: null
        }
    }
    ,
    a.jqplot.ElemContainer.prototype.getTop = function() {
        return this.getPosition().top
    }
    ,
    a.jqplot.ElemContainer.prototype.getLeft = function() {
        return this.getPosition().left
    }
    ,
    a.jqplot.ElemContainer.prototype.getBottom = function() {
        return this._elem.css("bottom")
    }
    ,
    a.jqplot.ElemContainer.prototype.getRight = function() {
        return this._elem.css("right")
    }
    ,
    b.prototype = new a.jqplot.ElemContainer,
    b.prototype.constructor = b,
    b.prototype.init = function() {
        a.isFunction(this.renderer) && (this.renderer = new this.renderer),
        this.tickOptions.axis = this.name,
        null == this.tickOptions.showMark && (this.tickOptions.showMark = this.showTicks),
        null == this.tickOptions.showMark && (this.tickOptions.showMark = this.showTickMarks),
        null == this.tickOptions.showLabel && (this.tickOptions.showLabel = this.showTicks),
        null == this.label || "" == this.label ? this.showLabel = !1 : this.labelOptions.label = this.label,
        0 == this.showLabel && (this.labelOptions.show = !1),
        0 == this.pad && (this.pad = 1),
        0 == this.padMax && (this.padMax = 1),
        0 == this.padMin && (this.padMin = 1),
        null == this.padMax && (this.padMax = (this.pad - 1) / 2 + 1),
        null == this.padMin && (this.padMin = (this.pad - 1) / 2 + 1),
        this.pad = this.padMax + this.padMin - 1,
        (null != this.min || null != this.max) && (this.autoscale = !1),
        null == this.syncTicks && this.name.indexOf("y") > -1 ? this.syncTicks = !0 : null == this.syncTicks && (this.syncTicks = !1),
        this.renderer.init.call(this, this.rendererOptions)
    }
    ,
    b.prototype.draw = function(a, b) {
        return this.__ticks && (this.__ticks = null),
        this.renderer.draw.call(this, a, b)
    }
    ,
    b.prototype.set = function() {
        this.renderer.set.call(this)
    }
    ,
    b.prototype.pack = function(a, b) {
        this.show && this.renderer.pack.call(this, a, b),
        null == this._min && (this._min = this.min,
        this._max = this.max,
        this._tickInterval = this.tickInterval,
        this._numberTicks = this.numberTicks,
        this.__ticks = this._ticks)
    }
    ,
    b.prototype.reset = function() {
        this.renderer.reset.call(this)
    }
    ,
    b.prototype.resetScale = function(b) {
        a.extend(!0, this, {
            min: null,
            max: null,
            numberTicks: null,
            tickInterval: null,
            _ticks: [],
            ticks: []
        }, b),
        this.resetDataBounds()
    }
    ,
    b.prototype.resetDataBounds = function() {
        var b = this._dataBounds;
        b.min = null,
        b.max = null;
        for (var c, d, e, f = this.show ? !0 : !1, g = 0; g < this._series.length; g++)
            if (d = this._series[g],
            d.show || this.scaleToHiddenSeries) {
                e = d._plotData,
                "line" === d._type && d.renderer.bands.show && "x" !== this.name.charAt(0) && (e = [[0, d.renderer.bands._min], [1, d.renderer.bands._max]]);
                var h = 1
                  , i = 1;
                null != d._type && "ohlc" == d._type && (h = 3,
                i = 2);
                for (var j = 0, c = e.length; c > j; j++)
                    "xaxis" == this.name || "x2axis" == this.name ? ((null != e[j][0] && e[j][0] < b.min || null == b.min) && (b.min = e[j][0]),
                    (null != e[j][0] && e[j][0] > b.max || null == b.max) && (b.max = e[j][0])) : ((null != e[j][h] && e[j][h] < b.min || null == b.min) && (b.min = e[j][h]),
                    (null != e[j][i] && e[j][i] > b.max || null == b.max) && (b.max = e[j][i]));
                f && d.renderer.constructor !== a.jqplot.BarRenderer ? f = !1 : f && this._options.hasOwnProperty("forceTickAt0") && 0 == this._options.forceTickAt0 ? f = !1 : f && d.renderer.constructor === a.jqplot.BarRenderer && ("vertical" == d.barDirection && "xaxis" != this.name && "x2axis" != this.name ? (null != this._options.pad || null != this._options.padMin) && (f = !1) : "horizontal" != d.barDirection || "xaxis" != this.name && "x2axis" != this.name || (null != this._options.pad || null != this._options.padMin) && (f = !1))
            }
        f && this.renderer.constructor === a.jqplot.LinearAxisRenderer && b.min >= 0 && (this.padMin = 1,
        this.forceTickAt0 = !0)
    }
    ,
    c.prototype = new a.jqplot.ElemContainer,
    c.prototype.constructor = c,
    c.prototype.setOptions = function(b) {
        if (a.extend(!0, this, b),
        "inside" == this.placement && (this.placement = "insideGrid"),
        this.xoffset > 0) {
            if ("insideGrid" == this.placement)
                switch (this.location) {
                case "nw":
                case "w":
                case "sw":
                    null == this.marginLeft && (this.marginLeft = this.xoffset + "px"),
                    this.marginRight = "0px";
                    break;
                case "ne":
                case "e":
                case "se":
                default:
                    null == this.marginRight && (this.marginRight = this.xoffset + "px"),
                    this.marginLeft = "0px"
                }
            else if ("outside" == this.placement)
                switch (this.location) {
                case "nw":
                case "w":
                case "sw":
                    null == this.marginRight && (this.marginRight = this.xoffset + "px"),
                    this.marginLeft = "0px";
                    break;
                case "ne":
                case "e":
                case "se":
                default:
                    null == this.marginLeft && (this.marginLeft = this.xoffset + "px"),
                    this.marginRight = "0px"
                }
            this.xoffset = 0
        }
        if (this.yoffset > 0) {
            if ("outside" == this.placement)
                switch (this.location) {
                case "sw":
                case "s":
                case "se":
                    null == this.marginTop && (this.marginTop = this.yoffset + "px"),
                    this.marginBottom = "0px";
                    break;
                case "ne":
                case "n":
                case "nw":
                default:
                    null == this.marginBottom && (this.marginBottom = this.yoffset + "px"),
                    this.marginTop = "0px"
                }
            else if ("insideGrid" == this.placement)
                switch (this.location) {
                case "sw":
                case "s":
                case "se":
                    null == this.marginBottom && (this.marginBottom = this.yoffset + "px"),
                    this.marginTop = "0px";
                    break;
                case "ne":
                case "n":
                case "nw":
                default:
                    null == this.marginTop && (this.marginTop = this.yoffset + "px"),
                    this.marginBottom = "0px"
                }
            this.yoffset = 0
        }
    }
    ,
    c.prototype.init = function() {
        a.isFunction(this.renderer) && (this.renderer = new this.renderer),
        this.renderer.init.call(this, this.rendererOptions)
    }
    ,
    c.prototype.draw = function(b, c) {
        for (var d = 0; d < a.jqplot.preDrawLegendHooks.length; d++)
            a.jqplot.preDrawLegendHooks[d].call(this, b);
        return this.renderer.draw.call(this, b, c)
    }
    ,
    c.prototype.pack = function(a) {
        this.renderer.pack.call(this, a)
    }
    ,
    d.prototype = new a.jqplot.ElemContainer,
    d.prototype.constructor = d,
    d.prototype.init = function() {
        a.isFunction(this.renderer) && (this.renderer = new this.renderer),
        this.renderer.init.call(this, this.rendererOptions)
    }
    ,
    d.prototype.draw = function(a) {
        return this.renderer.draw.call(this, a)
    }
    ,
    d.prototype.pack = function() {
        this.renderer.pack.call(this)
    }
    ,
    e.prototype = new a.jqplot.ElemContainer,
    e.prototype.constructor = e,
    e.prototype.init = function(b, c, d) {
        this.index = b,
        this.gridBorderWidth = c;
        var e, f, g = this.data, h = [];
        for (e = 0,
        f = g.length; f > e; e++)
            if (this.breakOnNull)
                h.push(g[e]);
            else {
                if (null == g[e] || null == g[e][0] || null == g[e][1])
                    continue;
                h.push(g[e])
            }
        if (this.data = h,
        this.color || (this.color = d.colorGenerator.get(this.index)),
        this.negativeColor || (this.negativeColor = d.negativeColorGenerator.get(this.index)),
        this.fillColor || (this.fillColor = this.color),
        this.fillAlpha) {
            var i = a.jqplot.normalize2rgb(this.fillColor)
              , i = a.jqplot.getColorComponents(i);
            this.fillColor = "rgba(" + i[0] + "," + i[1] + "," + i[2] + "," + this.fillAlpha + ")"
        }
        a.isFunction(this.renderer) && (this.renderer = new this.renderer),
        this.renderer.init.call(this, this.rendererOptions, d),
        this.markerRenderer = new this.markerRenderer,
        this.markerOptions.color || (this.markerOptions.color = this.color),
        null == this.markerOptions.show && (this.markerOptions.show = this.showMarker),
        this.showMarker = this.markerOptions.show,
        this.markerRenderer.init(this.markerOptions)
    }
    ,
    e.prototype.draw = function(b, c, d) {
        var e = c == F ? {} : c;
        b = b == F ? this.canvas._ctx : b;
        var f, g, h;
        for (f = 0; f < a.jqplot.preDrawSeriesHooks.length; f++)
            a.jqplot.preDrawSeriesHooks[f].call(this, b, e);
        for (this.show && (this.renderer.setGridData.call(this, d),
        e.preventJqPlotSeriesDrawTrigger || a(b.canvas).trigger("jqplotSeriesDraw", [this.data, this.gridData]),
        g = [],
        g = e.data ? e.data : this._stack ? this._plotData : this.data,
        h = e.gridData || this.renderer.makeGridData.call(this, g, d),
        "line" === this._type && this.renderer.smooth && this.renderer._smoothedData.length && (h = this.renderer._smoothedData),
        this.renderer.draw.call(this, b, h, e, d)),
        f = 0; f < a.jqplot.postDrawSeriesHooks.length; f++)
            a.jqplot.postDrawSeriesHooks[f].call(this, b, e, d);
        b = c = d = f = g = h = null
    }
    ,
    e.prototype.drawShadow = function(b, c, d) {
        var e = c == F ? {} : c;
        b = b == F ? this.shadowCanvas._ctx : b;
        var f, g, h;
        for (f = 0; f < a.jqplot.preDrawSeriesShadowHooks.length; f++)
            a.jqplot.preDrawSeriesShadowHooks[f].call(this, b, e);
        for (this.shadow && (this.renderer.setGridData.call(this, d),
        g = [],
        g = e.data ? e.data : this._stack ? this._plotData : this.data,
        h = e.gridData || this.renderer.makeGridData.call(this, g, d),
        this.renderer.drawShadow.call(this, b, h, e, d)),
        f = 0; f < a.jqplot.postDrawSeriesShadowHooks.length; f++)
            a.jqplot.postDrawSeriesShadowHooks[f].call(this, b, e);
        b = c = d = f = g = h = null
    }
    ,
    e.prototype.toggleDisplay = function(a, b) {
        var c, d;
        c = a.data.series ? a.data.series : this,
        a.data.speed && (d = a.data.speed),
        d ? c.canvas._elem.is(":hidden") || !c.show ? (c.show = !0,
        c.canvas._elem.removeClass("jqplot-series-hidden"),
        c.shadowCanvas._elem && c.shadowCanvas._elem.fadeIn(d),
        c.canvas._elem.fadeIn(d, b),
        c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + c.index).fadeIn(d)) : (c.show = !1,
        c.canvas._elem.addClass("jqplot-series-hidden"),
        c.shadowCanvas._elem && c.shadowCanvas._elem.fadeOut(d),
        c.canvas._elem.fadeOut(d, b),
        c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + c.index).fadeOut(d)) : c.canvas._elem.is(":hidden") || !c.show ? (c.show = !0,
        c.canvas._elem.removeClass("jqplot-series-hidden"),
        c.shadowCanvas._elem && c.shadowCanvas._elem.show(),
        c.canvas._elem.show(0, b),
        c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + c.index).show()) : (c.show = !1,
        c.canvas._elem.addClass("jqplot-series-hidden"),
        c.shadowCanvas._elem && c.shadowCanvas._elem.hide(),
        c.canvas._elem.hide(0, b),
        c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + c.index).hide())
    }
    ,
    f.prototype = new a.jqplot.ElemContainer,
    f.prototype.constructor = f,
    f.prototype.init = function() {
        a.isFunction(this.renderer) && (this.renderer = new this.renderer),
        this.renderer.init.call(this, this.rendererOptions)
    }
    ,
    f.prototype.createElement = function(a, b) {
        return this._offsets = a,
        this.renderer.createElement.call(this, b)
    }
    ,
    f.prototype.draw = function() {
        this.renderer.draw.call(this)
    }
    ,
    a.jqplot.GenericCanvas = function() {
        a.jqplot.ElemContainer.call(this),
        this._ctx
    }
    ,
    a.jqplot.GenericCanvas.prototype = new a.jqplot.ElemContainer,
    a.jqplot.GenericCanvas.prototype.constructor = a.jqplot.GenericCanvas,
    a.jqplot.GenericCanvas.prototype.createElement = function(b, c, d, e) {
        this._offsets = b;
        var f = "jqplot";
        c != F && (f = c);
        var g;
        return g = e.canvasManager.getCanvas(),
        null != d && (this._plotDimensions = d),
        g.width = this._plotDimensions.width - this._offsets.left - this._offsets.right,
        g.height = this._plotDimensions.height - this._offsets.top - this._offsets.bottom,
        this._elem = a(g),
        this._elem.css({
            position: "absolute",
            left: this._offsets.left,
            top: this._offsets.top
        }),
        this._elem.addClass(f),
        g = e.canvasManager.initCanvas(g),
        g = null,
        this._elem
    }
    ,
    a.jqplot.GenericCanvas.prototype.setContext = function() {
        return this._ctx = this._elem.get(0).getContext("2d"),
        this._ctx
    }
    ,
    a.jqplot.GenericCanvas.prototype.resetCanvas = function() {
        this._elem && (a.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== F && window.G_vmlCanvasManager.uninitElement(this._elem.get(0)),
        this._elem.emptyForce()),
        this._ctx = null
    }
    ,
    a.jqplot.HooksManager = function() {
        this.hooks = [],
        this.args = []
    }
    ,
    a.jqplot.HooksManager.prototype.addOnce = function(a, b) {
        b = b || [];
        for (var c = !1, d = 0, e = this.hooks.length; e > d; d++)
            this.hooks[d] == a && (c = !0);
        c || (this.hooks.push(a),
        this.args.push(b))
    }
    ,
    a.jqplot.HooksManager.prototype.add = function(a, b) {
        b = b || [],
        this.hooks.push(a),
        this.args.push(b)
    }
    ,
    a.jqplot.EventListenerManager = function() {
        this.hooks = []
    }
    ,
    a.jqplot.EventListenerManager.prototype.addOnce = function(a, b) {
        for (var c, d, e = !1, d = 0, f = this.hooks.length; f > d; d++)
            c = this.hooks[d],
            c[0] == a && c[1] == b && (e = !0);
        e || this.hooks.push([a, b])
    }
    ,
    a.jqplot.EventListenerManager.prototype.add = function(a, b) {
        this.hooks.push([a, b])
    }
    ;
    var G = ["yMidAxis", "xaxis", "yaxis", "x2axis", "y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis"];
    a.jqplot.computeHighlightColors = function(b) {
        var c;
        if (a.isArray(b)) {
            c = [];
            for (var d = 0; d < b.length; d++) {
                for (var e = a.jqplot.getColorComponents(b[d]), f = [e[0], e[1], e[2]], g = f[0] + f[1] + f[2], h = 0; 3 > h; h++)
                    f[h] = g > 660 ? .85 * f[h] : .73 * f[h] + 90,
                    f[h] = parseInt(f[h], 10),
                    f[h] > 255 ? 255 : f[h];
                f[3] = .3 + .35 * e[3],
                c.push("rgba(" + f[0] + "," + f[1] + "," + f[2] + "," + f[3] + ")")
            }
        } else {
            for (var e = a.jqplot.getColorComponents(b), f = [e[0], e[1], e[2]], g = f[0] + f[1] + f[2], h = 0; 3 > h; h++)
                f[h] = g > 660 ? .85 * f[h] : .73 * f[h] + 90,
                f[h] = parseInt(f[h], 10),
                f[h] > 255 ? 255 : f[h];
            f[3] = .3 + .35 * e[3],
            c = "rgba(" + f[0] + "," + f[1] + "," + f[2] + "," + f[3] + ")"
        }
        return c
    }
    ,
    a.jqplot.ColorGenerator = function(b) {
        b = b || a.jqplot.config.defaultColors;
        var c = 0;
        this.next = function() {
            return c < b.length ? b[c++] : (c = 0,
            b[c++])
        }
        ,
        this.previous = function() {
            return c > 0 ? b[c--] : (c = b.length - 1,
            b[c])
        }
        ,
        this.get = function(a) {
            var c = a - b.length * Math.floor(a / b.length);
            return b[c]
        }
        ,
        this.setColors = function(a) {
            b = a
        }
        ,
        this.reset = function() {
            c = 0
        }
        ,
        this.getIndex = function() {
            return c
        }
        ,
        this.setIndex = function(a) {
            c = a
        }
    }
    ,
    a.jqplot.hex2rgb = function(a, b) {
        a = a.replace("#", ""),
        3 == a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2));
        var c;
        return c = "rgba(" + parseInt(a.slice(0, 2), 16) + ", " + parseInt(a.slice(2, 4), 16) + ", " + parseInt(a.slice(4, 6), 16),
        b && (c += ", " + b),
        c += ")"
    }
    ,
    a.jqplot.rgb2hex = function(a) {
        for (var b = /rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/, c = a.match(b), d = "#", e = 1; 4 > e; e++) {
            var f;
            -1 != c[e].search(/%/) ? (f = parseInt(255 * c[e] / 100, 10).toString(16),
            1 == f.length && (f = "0" + f)) : (f = parseInt(c[e], 10).toString(16),
            1 == f.length && (f = "0" + f)),
            d += f
        }
        return d
    }
    ,
    a.jqplot.normalize2rgb = function(b, c) {
        if (-1 != b.search(/^ *rgba?\(/))
            return b;
        if (-1 != b.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/))
            return a.jqplot.hex2rgb(b, c);
        throw new Error("Invalid color spec")
    }
    ,
    a.jqplot.getColorComponents = function(b) {
        b = a.jqplot.colorKeywordMap[b] || b;
        for (var c = a.jqplot.normalize2rgb(b), d = /rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/, e = c.match(d), f = [], g = 1; 4 > g; g++)
            -1 != e[g].search(/%/) ? f[g - 1] = parseInt(255 * e[g] / 100, 10) : f[g - 1] = parseInt(e[g], 10);
        return f[3] = parseFloat(e[4]) ? parseFloat(e[4]) : 1,
        f
    }
    ,
    a.jqplot.colorKeywordMap = {
        aliceblue: "rgb(240, 248, 255)",
        antiquewhite: "rgb(250, 235, 215)",
        aqua: "rgb( 0, 255, 255)",
        aquamarine: "rgb(127, 255, 212)",
        azure: "rgb(240, 255, 255)",
        beige: "rgb(245, 245, 220)",
        bisque: "rgb(255, 228, 196)",
        black: "rgb( 0, 0, 0)",
        blanchedalmond: "rgb(255, 235, 205)",
        blue: "rgb( 0, 0, 255)",
        blueviolet: "rgb(138, 43, 226)",
        brown: "rgb(165, 42, 42)",
        burlywood: "rgb(222, 184, 135)",
        cadetblue: "rgb( 95, 158, 160)",
        chartreuse: "rgb(127, 255, 0)",
        chocolate: "rgb(210, 105, 30)",
        coral: "rgb(255, 127, 80)",
        cornflowerblue: "rgb(100, 149, 237)",
        cornsilk: "rgb(255, 248, 220)",
        crimson: "rgb(220, 20, 60)",
        cyan: "rgb( 0, 255, 255)",
        darkblue: "rgb( 0, 0, 139)",
        darkcyan: "rgb( 0, 139, 139)",
        darkgoldenrod: "rgb(184, 134, 11)",
        darkgray: "rgb(169, 169, 169)",
        darkgreen: "rgb( 0, 100, 0)",
        darkgrey: "rgb(169, 169, 169)",
        darkkhaki: "rgb(189, 183, 107)",
        darkmagenta: "rgb(139, 0, 139)",
        darkolivegreen: "rgb( 85, 107, 47)",
        darkorange: "rgb(255, 140, 0)",
        darkorchid: "rgb(153, 50, 204)",
        darkred: "rgb(139, 0, 0)",
        darksalmon: "rgb(233, 150, 122)",
        darkseagreen: "rgb(143, 188, 143)",
        darkslateblue: "rgb( 72, 61, 139)",
        darkslategray: "rgb( 47, 79, 79)",
        darkslategrey: "rgb( 47, 79, 79)",
        darkturquoise: "rgb( 0, 206, 209)",
        darkviolet: "rgb(148, 0, 211)",
        deeppink: "rgb(255, 20, 147)",
        deepskyblue: "rgb( 0, 191, 255)",
        dimgray: "rgb(105, 105, 105)",
        dimgrey: "rgb(105, 105, 105)",
        dodgerblue: "rgb( 30, 144, 255)",
        firebrick: "rgb(178, 34, 34)",
        floralwhite: "rgb(255, 250, 240)",
        forestgreen: "rgb( 34, 139, 34)",
        fuchsia: "rgb(255, 0, 255)",
        gainsboro: "rgb(220, 220, 220)",
        ghostwhite: "rgb(248, 248, 255)",
        gold: "rgb(255, 215, 0)",
        goldenrod: "rgb(218, 165, 32)",
        gray: "rgb(128, 128, 128)",
        grey: "rgb(128, 128, 128)",
        green: "rgb( 0, 128, 0)",
        greenyellow: "rgb(173, 255, 47)",
        honeydew: "rgb(240, 255, 240)",
        hotpink: "rgb(255, 105, 180)",
        indianred: "rgb(205, 92, 92)",
        indigo: "rgb( 75, 0, 130)",
        ivory: "rgb(255, 255, 240)",
        khaki: "rgb(240, 230, 140)",
        lavender: "rgb(230, 230, 250)",
        lavenderblush: "rgb(255, 240, 245)",
        lawngreen: "rgb(124, 252, 0)",
        lemonchiffon: "rgb(255, 250, 205)",
        lightblue: "rgb(173, 216, 230)",
        lightcoral: "rgb(240, 128, 128)",
        lightcyan: "rgb(224, 255, 255)",
        lightgoldenrodyellow: "rgb(250, 250, 210)",
        lightgray: "rgb(211, 211, 211)",
        lightgreen: "rgb(144, 238, 144)",
        lightgrey: "rgb(211, 211, 211)",
        lightpink: "rgb(255, 182, 193)",
        lightsalmon: "rgb(255, 160, 122)",
        lightseagreen: "rgb( 32, 178, 170)",
        lightskyblue: "rgb(135, 206, 250)",
        lightslategray: "rgb(119, 136, 153)",
        lightslategrey: "rgb(119, 136, 153)",
        lightsteelblue: "rgb(176, 196, 222)",
        lightyellow: "rgb(255, 255, 224)",
        lime: "rgb( 0, 255, 0)",
        limegreen: "rgb( 50, 205, 50)",
        linen: "rgb(250, 240, 230)",
        magenta: "rgb(255, 0, 255)",
        maroon: "rgb(128, 0, 0)",
        mediumaquamarine: "rgb(102, 205, 170)",
        mediumblue: "rgb( 0, 0, 205)",
        mediumorchid: "rgb(186, 85, 211)",
        mediumpurple: "rgb(147, 112, 219)",
        mediumseagreen: "rgb( 60, 179, 113)",
        mediumslateblue: "rgb(123, 104, 238)",
        mediumspringgreen: "rgb( 0, 250, 154)",
        mediumturquoise: "rgb( 72, 209, 204)",
        mediumvioletred: "rgb(199, 21, 133)",
        midnightblue: "rgb( 25, 25, 112)",
        mintcream: "rgb(245, 255, 250)",
        mistyrose: "rgb(255, 228, 225)",
        moccasin: "rgb(255, 228, 181)",
        navajowhite: "rgb(255, 222, 173)",
        navy: "rgb( 0, 0, 128)",
        oldlace: "rgb(253, 245, 230)",
        olive: "rgb(128, 128, 0)",
        olivedrab: "rgb(107, 142, 35)",
        orange: "rgb(255, 165, 0)",
        orangered: "rgb(255, 69, 0)",
        orchid: "rgb(218, 112, 214)",
        palegoldenrod: "rgb(238, 232, 170)",
        palegreen: "rgb(152, 251, 152)",
        paleturquoise: "rgb(175, 238, 238)",
        palevioletred: "rgb(219, 112, 147)",
        papayawhip: "rgb(255, 239, 213)",
        peachpuff: "rgb(255, 218, 185)",
        peru: "rgb(205, 133, 63)",
        pink: "rgb(255, 192, 203)",
        plum: "rgb(221, 160, 221)",
        powderblue: "rgb(176, 224, 230)",
        purple: "rgb(128, 0, 128)",
        red: "rgb(255, 0, 0)",
        rosybrown: "rgb(188, 143, 143)",
        royalblue: "rgb( 65, 105, 225)",
        saddlebrown: "rgb(139, 69, 19)",
        salmon: "rgb(250, 128, 114)",
        sandybrown: "rgb(244, 164, 96)",
        seagreen: "rgb( 46, 139, 87)",
        seashell: "rgb(255, 245, 238)",
        sienna: "rgb(160, 82, 45)",
        silver: "rgb(192, 192, 192)",
        skyblue: "rgb(135, 206, 235)",
        slateblue: "rgb(106, 90, 205)",
        slategray: "rgb(112, 128, 144)",
        slategrey: "rgb(112, 128, 144)",
        snow: "rgb(255, 250, 250)",
        springgreen: "rgb( 0, 255, 127)",
        steelblue: "rgb( 70, 130, 180)",
        tan: "rgb(210, 180, 140)",
        teal: "rgb( 0, 128, 128)",
        thistle: "rgb(216, 191, 216)",
        tomato: "rgb(255, 99, 71)",
        turquoise: "rgb( 64, 224, 208)",
        violet: "rgb(238, 130, 238)",
        wheat: "rgb(245, 222, 179)",
        white: "rgb(255, 255, 255)",
        whitesmoke: "rgb(245, 245, 245)",
        yellow: "rgb(255, 255, 0)",
        yellowgreen: "rgb(154, 205, 50)"
    },
    a.jqplot.AxisLabelRenderer = function(b) {
        a.jqplot.ElemContainer.call(this),
        this.axis,
        this.show = !0,
        this.label = "",
        this.fontFamily = null,
        this.fontSize = null,
        this.textColor = null,
        this._elem,
        this.escapeHTML = !1,
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.AxisLabelRenderer.prototype = new a.jqplot.ElemContainer,
    a.jqplot.AxisLabelRenderer.prototype.constructor = a.jqplot.AxisLabelRenderer,
    a.jqplot.AxisLabelRenderer.prototype.init = function(b) {
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.AxisLabelRenderer.prototype.draw = function(b, c) {
        return this._elem && (this._elem.emptyForce(),
        this._elem = null),
        this._elem = a('<div style="position:absolute;" class="jqplot-' + this.axis + '-label"></div>'),
        Number(this.label) && this._elem.css("white-space", "nowrap"),
        this.escapeHTML ? this._elem.text(this.label) : this._elem.html(this.label),
        this.fontFamily && this._elem.css("font-family", this.fontFamily),
        this.fontSize && this._elem.css("font-size", this.fontSize),
        this.textColor && this._elem.css("color", this.textColor),
        this._elem
    }
    ,
    a.jqplot.AxisLabelRenderer.prototype.pack = function() {}
    ,
    a.jqplot.AxisTickRenderer = function(b) {
        a.jqplot.ElemContainer.call(this),
        this.mark = "outside",
        this.axis,
        this.showMark = !0,
        this.showGridline = !0,
        this.isMinorTick = !1,
        this.size = 4,
        this.markSize = 6,
        this.show = !0,
        this.showLabel = !0,
        this.label = null,
        this.value = null,
        this._styles = {},
        this.formatter = a.jqplot.DefaultTickFormatter,
        this.prefix = "",
        this.suffix = "",
        this.formatString = "",
        this.fontFamily,
        this.fontSize,
        this.textColor,
        this.escapeHTML = !1,
        this._elem,
        this._breakTick = !1,
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.AxisTickRenderer.prototype.init = function(b) {
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.AxisTickRenderer.prototype = new a.jqplot.ElemContainer,
    a.jqplot.AxisTickRenderer.prototype.constructor = a.jqplot.AxisTickRenderer,
    a.jqplot.AxisTickRenderer.prototype.setTick = function(a, b, c) {
        return this.value = a,
        this.axis = b,
        c && (this.isMinorTick = !0),
        this
    }
    ,
    a.jqplot.AxisTickRenderer.prototype.draw = function() {
        null === this.label && (this.label = this.prefix + this.formatter(this.formatString, this.value) + this.suffix);
        var b = {
            position: "absolute"
        };
        Number(this.label) && (b.whitSpace = "nowrap"),
        this._elem && (this._elem.emptyForce(),
        this._elem = null),
        this._elem = a(document.createElement("div")),
        this._elem.addClass("jqplot-" + this.axis + "-tick"),
        this.escapeHTML ? this._elem.text(this.label) : this._elem.html(this.label),
        this._elem.css(b);
        for (var c in this._styles)
            this._elem.css(c, this._styles[c]);
        return this.fontFamily && this._elem.css("font-family", this.fontFamily),
        this.fontSize && this._elem.css("font-size", this.fontSize),
        this.textColor && this._elem.css("color", this.textColor),
        this._breakTick && this._elem.addClass("jqplot-breakTick"),
        this._elem
    }
    ,
    a.jqplot.DefaultTickFormatter = function(b, c) {
        return "number" == typeof c ? (b || (b = a.jqplot.config.defaultTickFormatString),
        a.jqplot.sprintf(b, c)) : String(c)
    }
    ,
    a.jqplot.PercentTickFormatter = function(b, c) {
        return "number" == typeof c ? (c = 100 * c,
        b || (b = a.jqplot.config.defaultTickFormatString),
        a.jqplot.sprintf(b, c)) : String(c)
    }
    ,
    a.jqplot.AxisTickRenderer.prototype.pack = function() {}
    ,
    a.jqplot.CanvasGridRenderer = function() {
        this.shadowRenderer = new a.jqplot.ShadowRenderer
    }
    ,
    a.jqplot.CanvasGridRenderer.prototype.init = function(b) {
        this._ctx,
        a.extend(!0, this, b);
        var c = {
            lineJoin: "miter",
            lineCap: "round",
            fill: !1,
            isarc: !1,
            angle: this.shadowAngle,
            offset: this.shadowOffset,
            alpha: this.shadowAlpha,
            depth: this.shadowDepth,
            lineWidth: this.shadowWidth,
            closePath: !1,
            strokeStyle: this.shadowColor
        };
        this.renderer.shadowRenderer.init(c)
    }
    ,
    a.jqplot.CanvasGridRenderer.prototype.createElement = function(b) {
        var c;
        this._elem && (a.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== F && (c = this._elem.get(0),
        window.G_vmlCanvasManager.uninitElement(c),
        c = null),
        this._elem.emptyForce(),
        this._elem = null),
        c = b.canvasManager.getCanvas();
        var d = this._plotDimensions.width
          , e = this._plotDimensions.height;
        return c.width = d,
        c.height = e,
        this._elem = a(c),
        this._elem.addClass("jqplot-grid-canvas"),
        this._elem.css({
            position: "absolute",
            left: 0,
            top: 0
        }),
        c = b.canvasManager.initCanvas(c),
        this._top = this._offsets.top,
        this._bottom = e - this._offsets.bottom,
        this._left = this._offsets.left,
        this._right = d - this._offsets.right,
        this._width = this._right - this._left,
        this._height = this._bottom - this._top,
        c = null,
        this._elem
    }
    ,
    a.jqplot.CanvasGridRenderer.prototype.draw = function() {
        function b(b, d, e, f, g) {
            c.save(),
            g = g || {},
            (null == g.lineWidth || 0 != g.lineWidth) && (a.extend(!0, c, g),
            c.beginPath(),
            c.moveTo(b, d),
            c.lineTo(e, f),
            c.stroke(),
            c.restore())
        }
        this._ctx = this._elem.get(0).getContext("2d");
        var c = this._ctx
          , d = this._axes;
        c.save(),
        c.clearRect(0, 0, this._plotDimensions.width, this._plotDimensions.height),
        c.fillStyle = this.backgroundColor || this.background,
        c.fillRect(this._left, this._top, this._width, this._height),
        c.save(),
        c.lineJoin = "miter",
        c.lineCap = "butt",
        c.lineWidth = this.gridLineWidth,
        c.strokeStyle = this.gridLineColor;
        for (var e, f, g, h, i = ["xaxis", "yaxis", "x2axis", "y2axis"], j = 4; j > 0; j--) {
            var k = i[j - 1]
              , l = d[k]
              , m = l._ticks
              , n = m.length;
            if (l.show) {
                if (l.drawBaseline) {
                    var o = {};
                    switch (null !== l.baselineWidth && (o.lineWidth = l.baselineWidth),
                    null !== l.baselineColor && (o.strokeStyle = l.baselineColor),
                    k) {
                    case "xaxis":
                        b(this._left, this._bottom, this._right, this._bottom, o);
                        break;
                    case "yaxis":
                        b(this._left, this._bottom, this._left, this._top, o);
                        break;
                    case "x2axis":
                        b(this._left, this._bottom, this._right, this._bottom, o);
                        break;
                    case "y2axis":
                        b(this._right, this._bottom, this._right, this._top, o)
                    }
                }
                for (var p = n; p > 0; p--) {
                    var q = m[p - 1];
                    if (q.show) {
                        var r = Math.round(l.u2p(q.value)) + .5;
                        switch (k) {
                        case "xaxis":
                            if (q.showGridline && this.drawGridlines && (!q.isMinorTick && l.drawMajorGridlines || q.isMinorTick && l.drawMinorGridlines) && b(r, this._top, r, this._bottom),
                            q.showMark && q.mark && (!q.isMinorTick && l.drawMajorTickMarks || q.isMinorTick && l.drawMinorTickMarks)) {
                                g = q.markSize,
                                h = q.mark;
                                var r = Math.round(l.u2p(q.value)) + .5;
                                switch (h) {
                                case "outside":
                                    e = this._bottom,
                                    f = this._bottom + g;
                                    break;
                                case "inside":
                                    e = this._bottom - g,
                                    f = this._bottom;
                                    break;
                                case "cross":
                                    e = this._bottom - g,
                                    f = this._bottom + g;
                                    break;
                                default:
                                    e = this._bottom,
                                    f = this._bottom + g
                                }
                                this.shadow && this.renderer.shadowRenderer.draw(c, [[r, e], [r, f]], {
                                    lineCap: "butt",
                                    lineWidth: this.gridLineWidth,
                                    offset: .75 * this.gridLineWidth,
                                    depth: 2,
                                    fill: !1,
                                    closePath: !1
                                }),
                                b(r, e, r, f)
                            }
                            break;
                        case "yaxis":
                            if (q.showGridline && this.drawGridlines && (!q.isMinorTick && l.drawMajorGridlines || q.isMinorTick && l.drawMinorGridlines) && b(this._right, r, this._left, r),
                            q.showMark && q.mark && (!q.isMinorTick && l.drawMajorTickMarks || q.isMinorTick && l.drawMinorTickMarks)) {
                                g = q.markSize,
                                h = q.mark;
                                var r = Math.round(l.u2p(q.value)) + .5;
                                switch (h) {
                                case "outside":
                                    e = this._left - g,
                                    f = this._left;
                                    break;
                                case "inside":
                                    e = this._left,
                                    f = this._left + g;
                                    break;
                                case "cross":
                                    e = this._left - g,
                                    f = this._left + g;
                                    break;
                                default:
                                    e = this._left - g,
                                    f = this._left
                                }
                                this.shadow && this.renderer.shadowRenderer.draw(c, [[e, r], [f, r]], {
                                    lineCap: "butt",
                                    lineWidth: 1.5 * this.gridLineWidth,
                                    offset: .75 * this.gridLineWidth,
                                    fill: !1,
                                    closePath: !1
                                }),
                                b(e, r, f, r, {
                                    strokeStyle: l.borderColor
                                })
                            }
                            break;
                        case "x2axis":
                            if (q.showGridline && this.drawGridlines && (!q.isMinorTick && l.drawMajorGridlines || q.isMinorTick && l.drawMinorGridlines) && b(r, this._bottom, r, this._top),
                            q.showMark && q.mark && (!q.isMinorTick && l.drawMajorTickMarks || q.isMinorTick && l.drawMinorTickMarks)) {
                                g = q.markSize,
                                h = q.mark;
                                var r = Math.round(l.u2p(q.value)) + .5;
                                switch (h) {
                                case "outside":
                                    e = this._top - g,
                                    f = this._top;
                                    break;
                                case "inside":
                                    e = this._top,
                                    f = this._top + g;
                                    break;
                                case "cross":
                                    e = this._top - g,
                                    f = this._top + g;
                                    break;
                                default:
                                    e = this._top - g,
                                    f = this._top
                                }
                                this.shadow && this.renderer.shadowRenderer.draw(c, [[r, e], [r, f]], {
                                    lineCap: "butt",
                                    lineWidth: this.gridLineWidth,
                                    offset: .75 * this.gridLineWidth,
                                    depth: 2,
                                    fill: !1,
                                    closePath: !1
                                }),
                                b(r, e, r, f)
                            }
                            break;
                        case "y2axis":
                            if (q.showGridline && this.drawGridlines && (!q.isMinorTick && l.drawMajorGridlines || q.isMinorTick && l.drawMinorGridlines) && b(this._left, r, this._right, r),
                            q.showMark && q.mark && (!q.isMinorTick && l.drawMajorTickMarks || q.isMinorTick && l.drawMinorTickMarks)) {
                                g = q.markSize,
                                h = q.mark;
                                var r = Math.round(l.u2p(q.value)) + .5;
                                switch (h) {
                                case "outside":
                                    e = this._right,
                                    f = this._right + g;
                                    break;
                                case "inside":
                                    e = this._right - g,
                                    f = this._right;
                                    break;
                                case "cross":
                                    e = this._right - g,
                                    f = this._right + g;
                                    break;
                                default:
                                    e = this._right,
                                    f = this._right + g
                                }
                                this.shadow && this.renderer.shadowRenderer.draw(c, [[e, r], [f, r]], {
                                    lineCap: "butt",
                                    lineWidth: 1.5 * this.gridLineWidth,
                                    offset: .75 * this.gridLineWidth,
                                    fill: !1,
                                    closePath: !1
                                }),
                                b(e, r, f, r, {
                                    strokeStyle: l.borderColor
                                })
                            }
                        }
                    }
                }
                q = null
            }
            l = null,
            m = null
        }
        i = ["y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis", "yMidAxis"];
        for (var j = 7; j > 0; j--) {
            var l = d[i[j - 1]]
              , m = l._ticks;
            if (l.show) {
                var s = m[l.numberTicks - 1]
                  , t = m[0]
                  , u = l.getLeft()
                  , v = [[u, s.getTop() + s.getHeight() / 2], [u, t.getTop() + t.getHeight() / 2 + 1]];
                this.shadow && this.renderer.shadowRenderer.draw(c, v, {
                    lineCap: "butt",
                    fill: !1,
                    closePath: !1
                }),
                b(v[0][0], v[0][1], v[1][0], v[1][1], {
                    lineCap: "butt",
                    strokeStyle: l.borderColor,
                    lineWidth: l.borderWidth
                });
                for (var p = m.length; p > 0; p--) {
                    var q = m[p - 1];
                    g = q.markSize,
                    h = q.mark;
                    var r = Math.round(l.u2p(q.value)) + .5;
                    if (q.showMark && q.mark) {
                        switch (h) {
                        case "outside":
                            e = u,
                            f = u + g;
                            break;
                        case "inside":
                            e = u - g,
                            f = u;
                            break;
                        case "cross":
                            e = u - g,
                            f = u + g;
                            break;
                        default:
                            e = u,
                            f = u + g
                        }
                        v = [[e, r], [f, r]],
                        this.shadow && this.renderer.shadowRenderer.draw(c, v, {
                            lineCap: "butt",
                            lineWidth: 1.5 * this.gridLineWidth,
                            offset: .75 * this.gridLineWidth,
                            fill: !1,
                            closePath: !1
                        }),
                        b(e, r, f, r, {
                            strokeStyle: l.borderColor
                        })
                    }
                    q = null
                }
                t = null
            }
            l = null,
            m = null
        }
        if (c.restore(),
        this.shadow) {
            var v = [[this._left, this._bottom], [this._right, this._bottom], [this._right, this._top]];
            this.renderer.shadowRenderer.draw(c, v)
        }
        0 != this.borderWidth && this.drawBorder && (b(this._left, this._top, this._right, this._top, {
            lineCap: "round",
            strokeStyle: d.x2axis.borderColor,
            lineWidth: d.x2axis.borderWidth
        }),
        b(this._right, this._top, this._right, this._bottom, {
            lineCap: "round",
            strokeStyle: d.y2axis.borderColor,
            lineWidth: d.y2axis.borderWidth
        }),
        b(this._right, this._bottom, this._left, this._bottom, {
            lineCap: "round",
            strokeStyle: d.xaxis.borderColor,
            lineWidth: d.xaxis.borderWidth
        }),
        b(this._left, this._bottom, this._left, this._top, {
            lineCap: "round",
            strokeStyle: d.yaxis.borderColor,
            lineWidth: d.yaxis.borderWidth
        })),
        c.restore(),
        c = null,
        d = null
    }
    ,
    a.jqplot.DivTitleRenderer = function() {}
    ,
    a.jqplot.DivTitleRenderer.prototype.init = function(b) {
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.DivTitleRenderer.prototype.draw = function() {
        this._elem && (this._elem.emptyForce(),
        this._elem = null);
        var b = (this.renderer,
        document.createElement("div"));
        if (this._elem = a(b),
        this._elem.addClass("jqplot-title"),
        this.text) {
            if (this.text) {
                var c;
                this.color ? c = this.color : this.textColor && (c = this.textColor);
                var d = {
                    position: "absolute",
                    top: "0px",
                    left: "0px"
                };
                this._plotWidth && (d.width = this._plotWidth + "px"),
                this.fontSize && (d.fontSize = this.fontSize),
                "string" == typeof this.textAlign ? d.textAlign = this.textAlign : d.textAlign = "center",
                c && (d.color = c),
                this.paddingBottom && (d.paddingBottom = this.paddingBottom),
                this.fontFamily && (d.fontFamily = this.fontFamily),
                this._elem.css(d),
                this.escapeHtml ? this._elem.text(this.text) : this._elem.html(this.text)
            }
        } else
            this.show = !1,
            this._elem.height(0),
            this._elem.width(0);
        return b = null,
        this._elem
    }
    ,
    a.jqplot.DivTitleRenderer.prototype.pack = function() {}
    ;
    var H = .1;
    a.jqplot.LinePattern = function(b, c) {
        var d = {
            dotted: [H, a.jqplot.config.dotGapLength],
            dashed: [a.jqplot.config.dashLength, a.jqplot.config.gapLength],
            solid: null
        };
        if ("string" == typeof c)
            if ("." === c[0] || "-" === c[0]) {
                var e = c;
                c = [];
                for (var f = 0, g = e.length; g > f; f++) {
                    if ("." === e[f])
                        c.push(H);
                    else {
                        if ("-" !== e[f])
                            continue;
                        c.push(a.jqplot.config.dashLength)
                    }
                    c.push(a.jqplot.config.gapLength)
                }
            } else
                c = d[c];
        if (!c || !c.length)
            return b;
        var h = 0
          , i = c[0]
          , j = 0
          , k = 0
          , l = 0
          , m = 0
          , n = function(a, c) {
            b.moveTo(a, c),
            j = a,
            k = c,
            l = a,
            m = c
        }
          , o = function(a, d) {
            var e = b.lineWidth
              , f = a - j
              , g = d - k
              , l = Math.sqrt(f * f + g * g);
            if (l > 0 && e > 0)
                for (f /= l,
                g /= l; ; ) {
                    var m = e * i;
                    if (!(l > m)) {
                        j = a,
                        k = d,
                        0 == (1 & h) ? b.lineTo(j, k) : b.moveTo(j, k),
                        i -= l / e;
                        break
                    }
                    j += m * f,
                    k += m * g,
                    0 == (1 & h) ? b.lineTo(j, k) : b.moveTo(j, k),
                    l -= m,
                    h++,
                    h >= c.length && (h = 0),
                    i = c[h]
                }
        }
          , p = function() {
            b.beginPath()
        }
          , q = function() {
            o(l, m)
        };
        return {
            moveTo: n,
            lineTo: o,
            beginPath: p,
            closePath: q
        }
    }
    ,
    a.jqplot.LineRenderer = function() {
        this.shapeRenderer = new a.jqplot.ShapeRenderer,
        this.shadowRenderer = new a.jqplot.ShadowRenderer
    }
    ,
    a.jqplot.LineRenderer.prototype.init = function(b, c) {
        b = b || {},
        this._type = "line",
        this.renderer.animation = {
            show: !1,
            direction: "left",
            speed: 2500,
            _supported: !0
        },
        this.renderer.smooth = !1,
        this.renderer.tension = null,
        this.renderer.constrainSmoothing = !0,
        this.renderer._smoothedData = [],
        this.renderer._smoothedPlotData = [],
        this.renderer._hiBandGridData = [],
        this.renderer._lowBandGridData = [],
        this.renderer._hiBandSmoothedData = [],
        this.renderer._lowBandSmoothedData = [],
        this.renderer.bandData = [],
        this.renderer.bands = {
            show: !1,
            hiData: [],
            lowData: [],
            color: this.color,
            showLines: !1,
            fill: !0,
            fillColor: null,
            _min: null,
            _max: null,
            interval: "3%"
        };
        var d = {
            highlightMouseOver: b.highlightMouseOver,
            highlightMouseDown: b.highlightMouseDown,
            highlightColor: b.highlightColor
        };
        delete b.highlightMouseOver,
        delete b.highlightMouseDown,
        delete b.highlightColor,
        a.extend(!0, this.renderer, b),
        this.renderer.options = b,
        this.renderer.bandData.length > 1 && (!b.bands || null == b.bands.show) ? this.renderer.bands.show = !0 : b.bands && null == b.bands.show && null != b.bands.interval && (this.renderer.bands.show = !0),
        this.fill && (this.renderer.bands.show = !1),
        this.renderer.bands.show && this.renderer.initBands.call(this, this.renderer.options, c),
        this._stack && (this.renderer.smooth = !1);
        var e = {
            lineJoin: this.lineJoin,
            lineCap: this.lineCap,
            fill: this.fill,
            isarc: !1,
            strokeStyle: this.color,
            fillStyle: this.fillColor,
            lineWidth: this.lineWidth,
            linePattern: this.linePattern,
            closePath: this.fill
        };
        this.renderer.shapeRenderer.init(e);
        var f = b.shadowOffset;
        null == f && (f = this.lineWidth > 2.5 ? 1.25 * (1 + .6 * (Math.atan(this.lineWidth / 2.5) / .785398163 - 1)) : 1.25 * Math.atan(this.lineWidth / 2.5) / .785398163);
        var g = {
            lineJoin: this.lineJoin,
            lineCap: this.lineCap,
            fill: this.fill,
            isarc: !1,
            angle: this.shadowAngle,
            offset: f,
            alpha: this.shadowAlpha,
            depth: this.shadowDepth,
            lineWidth: this.lineWidth,
            linePattern: this.linePattern,
            closePath: this.fill
        };
        if (this.renderer.shadowRenderer.init(g),
        this._areaPoints = [],
        this._boundingBox = [[], []],
        !this.isTrendline && this.fill || this.renderer.bands.show) {
            if (this.highlightMouseOver = !0,
            this.highlightMouseDown = !1,
            this.highlightColor = null,
            d.highlightMouseDown && null == d.highlightMouseOver && (d.highlightMouseOver = !1),
            a.extend(!0, this, {
                highlightMouseOver: d.highlightMouseOver,
                highlightMouseDown: d.highlightMouseDown,
                highlightColor: d.highlightColor
            }),
            !this.highlightColor) {
                var h = this.renderer.bands.show ? this.renderer.bands.fillColor : this.fillColor;
                this.highlightColor = a.jqplot.computeHighlightColors(h)
            }
            this.highlighter && (this.highlighter.show = !1)
        }
        !this.isTrendline && c && (c.plugins.lineRenderer = {},
        c.postInitHooks.addOnce(l),
        c.postDrawHooks.addOnce(m),
        c.eventListenerHooks.addOnce("jqplotMouseMove", p),
        c.eventListenerHooks.addOnce("jqplotMouseDown", q),
        c.eventListenerHooks.addOnce("jqplotMouseUp", r),
        c.eventListenerHooks.addOnce("jqplotClick", s),
        c.eventListenerHooks.addOnce("jqplotRightClick", t))
    }
    ,
    a.jqplot.LineRenderer.prototype.initBands = function(b, c) {
        var d = b.bandData || []
          , e = this.renderer.bands;
        e.hiData = [],
        e.lowData = [];
        var f = this.data;
        if (e._max = null,
        e._min = null,
        2 == d.length)
            if (a.isArray(d[0][0])) {
                for (var g, h = 0, i = 0, j = 0, k = d[0].length; k > j; j++)
                    g = d[0][j],
                    (null != g[1] && g[1] > e._max || null == e._max) && (e._max = g[1]),
                    (null != g[1] && g[1] < e._min || null == e._min) && (e._min = g[1]);
                for (var j = 0, k = d[1].length; k > j; j++)
                    g = d[1][j],
                    (null != g[1] && g[1] > e._max || null == e._max) && (e._max = g[1],
                    i = 1),
                    (null != g[1] && g[1] < e._min || null == e._min) && (e._min = g[1],
                    h = 1);
                i === h && (e.show = !1),
                e.hiData = d[i],
                e.lowData = d[h]
            } else if (d[0].length === f.length && d[1].length === f.length)
                for (var l = d[0][0] > d[1][0] ? 0 : 1, m = l ? 0 : 1, j = 0, k = f.length; k > j; j++)
                    e.hiData.push([f[j][0], d[l][j]]),
                    e.lowData.push([f[j][0], d[m][j]]);
            else
                e.show = !1;
        else if (d.length > 2 && !a.isArray(d[0][0]))
            for (var l = d[0][0] > d[0][1] ? 0 : 1, m = l ? 0 : 1, j = 0, k = d.length; k > j; j++)
                e.hiData.push([f[j][0], d[j][l]]),
                e.lowData.push([f[j][0], d[j][m]]);
        else {
            var n = e.interval
              , o = null
              , p = null
              , q = null
              , r = null;
            if (a.isArray(n) ? (o = n[0],
            p = n[1]) : o = n,
            isNaN(o) ? "%" === o.charAt(o.length - 1) && (q = "multiply",
            o = parseFloat(o) / 100 + 1) : (o = parseFloat(o),
            q = "add"),
            null !== p && isNaN(p) ? "%" === p.charAt(p.length - 1) && (r = "multiply",
            p = parseFloat(p) / 100 + 1) : null !== p && (p = parseFloat(p),
            r = "add"),
            null !== o) {
                if (null === p && (p = -o,
                r = q,
                "multiply" === r && (p += 2)),
                p > o) {
                    var s = o;
                    o = p,
                    p = s,
                    s = q,
                    q = r,
                    r = s
                }
                for (var j = 0, k = f.length; k > j; j++) {
                    switch (q) {
                    case "add":
                        e.hiData.push([f[j][0], f[j][1] + o]);
                        break;
                    case "multiply":
                        e.hiData.push([f[j][0], f[j][1] * o])
                    }
                    switch (r) {
                    case "add":
                        e.lowData.push([f[j][0], f[j][1] + p]);
                        break;
                    case "multiply":
                        e.lowData.push([f[j][0], f[j][1] * p])
                    }
                }
            } else
                e.show = !1
        }
        for (var t = e.hiData, u = e.lowData, j = 0, k = t.length; k > j; j++)
            (null != t[j][1] && t[j][1] > e._max || null == e._max) && (e._max = t[j][1]);
        for (var j = 0, k = u.length; k > j; j++)
            (null != u[j][1] && u[j][1] < e._min || null == e._min) && (e._min = u[j][1]);
        if (null === e.fillColor) {
            var v = a.jqplot.getColorComponents(e.color);
            v[3] = .5 * v[3],
            e.fillColor = "rgba(" + v[0] + ", " + v[1] + ", " + v[2] + ", " + v[3] + ")"
        }
    }
    ,
    a.jqplot.LineRenderer.prototype.setGridData = function(a) {
        var b = this._xaxis.series_u2p
          , c = this._yaxis.series_u2p
          , d = this._plotData
          , e = this._prevPlotData;
        this.gridData = [],
        this._prevGridData = [],
        this.renderer._smoothedData = [],
        this.renderer._smoothedPlotData = [],
        this.renderer._hiBandGridData = [],
        this.renderer._lowBandGridData = [],
        this.renderer._hiBandSmoothedData = [],
        this.renderer._lowBandSmoothedData = [];
        for (var f = this.renderer.bands, g = !1, h = 0, i = d.length; i > h; h++)
            null != d[h][0] && null != d[h][1] ? this.gridData.push([b.call(this._xaxis, d[h][0]), c.call(this._yaxis, d[h][1])]) : null == d[h][0] ? (g = !0,
            this.gridData.push([null, c.call(this._yaxis, d[h][1])])) : null == d[h][1] && (g = !0,
            this.gridData.push([b.call(this._xaxis, d[h][0]), null])),
            null != e[h] && null != e[h][0] && null != e[h][1] ? this._prevGridData.push([b.call(this._xaxis, e[h][0]), c.call(this._yaxis, e[h][1])]) : null != e[h] && null == e[h][0] ? this._prevGridData.push([null, c.call(this._yaxis, e[h][1])]) : null != e[h] && null != e[h][0] && null == e[h][1] && this._prevGridData.push([b.call(this._xaxis, e[h][0]), null]);
        if (g && (this.renderer.smooth = !1,
        "line" === this._type && (f.show = !1)),
        "line" === this._type && f.show) {
            for (var h = 0, i = f.hiData.length; i > h; h++)
                this.renderer._hiBandGridData.push([b.call(this._xaxis, f.hiData[h][0]), c.call(this._yaxis, f.hiData[h][1])]);
            for (var h = 0, i = f.lowData.length; i > h; h++)
                this.renderer._lowBandGridData.push([b.call(this._xaxis, f.lowData[h][0]), c.call(this._yaxis, f.lowData[h][1])])
        }
        if ("line" === this._type && this.renderer.smooth && this.gridData.length > 2) {
            var l;
            this.renderer.constrainSmoothing ? (l = j.call(this, this.gridData),
            this.renderer._smoothedData = l[0],
            this.renderer._smoothedPlotData = l[1],
            f.show && (l = j.call(this, this.renderer._hiBandGridData),
            this.renderer._hiBandSmoothedData = l[0],
            l = j.call(this, this.renderer._lowBandGridData),
            this.renderer._lowBandSmoothedData = l[0]),
            l = null) : (l = k.call(this, this.gridData),
            this.renderer._smoothedData = l[0],
            this.renderer._smoothedPlotData = l[1],
            f.show && (l = k.call(this, this.renderer._hiBandGridData),
            this.renderer._hiBandSmoothedData = l[0],
            l = k.call(this, this.renderer._lowBandGridData),
            this.renderer._lowBandSmoothedData = l[0]),
            l = null)
        }
    }
    ,
    a.jqplot.LineRenderer.prototype.makeGridData = function(a, b) {
        var c = this._xaxis.series_u2p
          , d = this._yaxis.series_u2p
          , e = [];
        this.renderer._smoothedData = [],
        this.renderer._smoothedPlotData = [],
        this.renderer._hiBandGridData = [],
        this.renderer._lowBandGridData = [],
        this.renderer._hiBandSmoothedData = [],
        this.renderer._lowBandSmoothedData = [];
        for (var f = this.renderer.bands, g = !1, h = 0; h < a.length; h++)
            null != a[h][0] && null != a[h][1] ? e.push([c.call(this._xaxis, a[h][0]), d.call(this._yaxis, a[h][1])]) : null == a[h][0] ? (g = !0,
            e.push([null, d.call(this._yaxis, a[h][1])])) : null == a[h][1] && (g = !0,
            e.push([c.call(this._xaxis, a[h][0]), null]));
        if (g && (this.renderer.smooth = !1,
        "line" === this._type && (f.show = !1)),
        "line" === this._type && f.show) {
            for (var h = 0, i = f.hiData.length; i > h; h++)
                this.renderer._hiBandGridData.push([c.call(this._xaxis, f.hiData[h][0]), d.call(this._yaxis, f.hiData[h][1])]);
            for (var h = 0, i = f.lowData.length; i > h; h++)
                this.renderer._lowBandGridData.push([c.call(this._xaxis, f.lowData[h][0]), d.call(this._yaxis, f.lowData[h][1])])
        }
        if ("line" === this._type && this.renderer.smooth && e.length > 2) {
            var l;
            this.renderer.constrainSmoothing ? (l = j.call(this, e),
            this.renderer._smoothedData = l[0],
            this.renderer._smoothedPlotData = l[1],
            f.show && (l = j.call(this, this.renderer._hiBandGridData),
            this.renderer._hiBandSmoothedData = l[0],
            l = j.call(this, this.renderer._lowBandGridData),
            this.renderer._lowBandSmoothedData = l[0]),
            l = null) : (l = k.call(this, e),
            this.renderer._smoothedData = l[0],
            this.renderer._smoothedPlotData = l[1],
            f.show && (l = k.call(this, this.renderer._hiBandGridData),
            this.renderer._hiBandSmoothedData = l[0],
            l = k.call(this, this.renderer._lowBandGridData),
            this.renderer._lowBandSmoothedData = l[0]),
            l = null)
        }
        return e
    }
    ,
    a.jqplot.LineRenderer.prototype.draw = function(b, c, d, e) {
        var f, g, h, i, j, k = a.extend(!0, {}, d), l = k.shadow != F ? k.shadow : this.shadow, m = k.showLine != F ? k.showLine : this.showLine, n = k.fill != F ? k.fill : this.fill, o = k.fillAndStroke != F ? k.fillAndStroke : this.fillAndStroke;
        if (b.save(),
        c.length) {
            if (m)
                if (n) {
                    if (this.fillToZero) {
                        var p = this.negativeColor;
                        this.useNegativeColors || (p = k.fillStyle);
                        var q = !1
                          , r = k.fillStyle;
                        if (o)
                            var s = c.slice(0);
                        if (0 != this.index && this._stack) {
                            for (var t = this._prevGridData, f = t.length; f > 0; f--)
                                c.push(t[f - 1]);
                            l && this.renderer.shadowRenderer.draw(b, c, k),
                            this._areaPoints = c,
                            this.renderer.shapeRenderer.draw(b, c, k)
                        } else {
                            var u = []
                              , v = this.renderer.smooth ? this.renderer._smoothedPlotData : this._plotData;
                            this._areaPoints = [];
                            var w = this._yaxis.series_u2p(this.fillToValue);
                            this._xaxis.series_u2p(this.fillToValue);
                            if (k.closePath = !0,
                            "y" == this.fillAxis) {
                                u.push([c[0][0], w]),
                                this._areaPoints.push([c[0][0], w]);
                                for (var f = 0; f < c.length - 1; f++)
                                    if (u.push(c[f]),
                                    this._areaPoints.push(c[f]),
                                    v[f][1] * v[f + 1][1] <= 0) {
                                        v[f][1] < 0 ? (q = !0,
                                        k.fillStyle = p) : (q = !1,
                                        k.fillStyle = r);
                                        var x = c[f][0] + (c[f + 1][0] - c[f][0]) * (w - c[f][1]) / (c[f + 1][1] - c[f][1]);
                                        u.push([x, w]),
                                        this._areaPoints.push([x, w]),
                                        l && this.renderer.shadowRenderer.draw(b, u, k),
                                        this.renderer.shapeRenderer.draw(b, u, k),
                                        u = [[x, w]]
                                    }
                                v[c.length - 1][1] < 0 ? (q = !0,
                                k.fillStyle = p) : (q = !1,
                                k.fillStyle = r),
                                u.push(c[c.length - 1]),
                                this._areaPoints.push(c[c.length - 1]),
                                u.push([c[c.length - 1][0], w]),
                                this._areaPoints.push([c[c.length - 1][0], w])
                            }
                            l && this.renderer.shadowRenderer.draw(b, u, k),
                            this.renderer.shapeRenderer.draw(b, u, k)
                        }
                    } else {
                        if (o)
                            var s = c.slice(0);
                        if (0 != this.index && this._stack)
                            for (var t = this._prevGridData, f = t.length; f > 0; f--)
                                c.push(t[f - 1]);
                        else {
                            var y = b.canvas.height;
                            c.unshift([c[0][0], y]);
                            var z = c.length;
                            c.push([c[z - 1][0], y])
                        }
                        this._areaPoints = c,
                        l && this.renderer.shadowRenderer.draw(b, c, k),
                        this.renderer.shapeRenderer.draw(b, c, k)
                    }
                    if (o) {
                        var A = a.extend(!0, {}, k, {
                            fill: !1,
                            closePath: !1
                        });
                        if (this.renderer.shapeRenderer.draw(b, s, A),
                        this.markerRenderer.show)
                            for (this.renderer.smooth && (s = this.gridData),
                            f = 0; f < s.length; f++)
                                this.markerRenderer.draw(s[f][0], s[f][1], b, k.markerOptions)
                    }
                } else {
                    if (this.renderer.bands.show) {
                        var B, C = a.extend(!0, {}, k);
                        this.renderer.bands.showLines && (B = this.renderer.smooth ? this.renderer._hiBandSmoothedData : this.renderer._hiBandGridData,
                        this.renderer.shapeRenderer.draw(b, B, k),
                        B = this.renderer.smooth ? this.renderer._lowBandSmoothedData : this.renderer._lowBandGridData,
                        this.renderer.shapeRenderer.draw(b, B, C)),
                        this.renderer.bands.fill && (B = this.renderer.smooth ? this.renderer._hiBandSmoothedData.concat(this.renderer._lowBandSmoothedData.reverse()) : this.renderer._hiBandGridData.concat(this.renderer._lowBandGridData.reverse()),
                        this._areaPoints = B,
                        C.closePath = !0,
                        C.fill = !0,
                        C.fillStyle = this.renderer.bands.fillColor,
                        this.renderer.shapeRenderer.draw(b, B, C))
                    }
                    l && this.renderer.shadowRenderer.draw(b, c, k),
                    this.renderer.shapeRenderer.draw(b, c, k)
                }
            var g = i = h = j = null;
            for (f = 0; f < this._areaPoints.length; f++) {
                var D = this._areaPoints[f];
                (g > D[0] || null == g) && (g = D[0]),
                (j < D[1] || null == j) && (j = D[1]),
                (i < D[0] || null == i) && (i = D[0]),
                (h > D[1] || null == h) && (h = D[1])
            }
            if ("line" === this.type && this.renderer.bands.show && (j = this._yaxis.series_u2p(this.renderer.bands._min),
            h = this._yaxis.series_u2p(this.renderer.bands._max)),
            this._boundingBox = [[g, j], [i, h]],
            this.markerRenderer.show && !n)
                for (this.renderer.smooth && (c = this.gridData),
                f = 0; f < c.length; f++)
                    null != c[f][0] && null != c[f][1] && this.markerRenderer.draw(c[f][0], c[f][1], b, k.markerOptions)
        }
        b.restore()
    }
    ,
    a.jqplot.LineRenderer.prototype.drawShadow = function(a, b, c) {}
    ,
    a.jqplot.LinearAxisRenderer = function() {}
    ,
    a.jqplot.LinearAxisRenderer.prototype.init = function(b) {
        this.breakPoints = null,
        this.breakTickLabel = "&asymp;",
        this.drawBaseline = !0,
        this.baselineWidth = null,
        this.baselineColor = null,
        this.forceTickAt0 = !1,
        this.forceTickAt100 = !1,
        this.tickInset = 0,
        this.minorTicks = 0,
        this.alignTicks = !1,
        this._autoFormatString = "",
        this._overrideFormatString = !1,
        this._scalefact = 1,
        a.extend(!0, this, b),
        this.breakPoints && (a.isArray(this.breakPoints) ? (this.breakPoints.length < 2 || this.breakPoints[1] <= this.breakPoints[0]) && (this.breakPoints = null) : this.breakPoints = null),
        null != this.numberTicks && this.numberTicks < 2 && (this.numberTicks = 2),
        this.resetDataBounds()
    }
    ,
    a.jqplot.LinearAxisRenderer.prototype.draw = function(b, c) {
        if (this.show) {
            this.renderer.createTicks.call(this, c);
            if (this._elem && (this._elem.emptyForce(),
            this._elem = null),
            this._elem = a(document.createElement("div")),
            this._elem.addClass("jqplot-axis jqplot-" + this.name),
            this._elem.css("position", "absolute"),
            "xaxis" == this.name || "x2axis" == this.name ? this._elem.width(this._plotDimensions.width) : this._elem.height(this._plotDimensions.height),
            this.labelOptions.axis = this.name,
            this._label = new this.labelRenderer(this.labelOptions),
            this._label.show) {
                var d = this._label.draw(b, c);
                d.appendTo(this._elem),
                d = null
            }
            for (var e, f = this._ticks, g = 0; g < f.length; g++)
                e = f[g],
                e.show && e.showLabel && (!e.isMinorTick || this.showMinorTicks) && this._elem.append(e.draw(b, c));
            e = null,
            f = null
        }
        return this._elem
    }
    ,
    a.jqplot.LinearAxisRenderer.prototype.reset = function() {
        this.min = this._options.min,
        this.max = this._options.max,
        this.tickInterval = this._options.tickInterval,
        this.numberTicks = this._options.numberTicks,
        this._autoFormatString = "",
        this._overrideFormatString && this.tickOptions && this.tickOptions.formatString && (this.tickOptions.formatString = "");
    }
    ,
    a.jqplot.LinearAxisRenderer.prototype.set = function() {
        var b, c = 0, d = 0, e = 0, f = null == this._label ? !1 : this._label.show;
        if (this.show) {
            for (var g, h = this._ticks, i = 0; i < h.length; i++)
                g = h[i],
                g._breakTick || !g.show || !g.showLabel || g.isMinorTick && !this.showMinorTicks || (b = "xaxis" == this.name || "x2axis" == this.name ? g._elem.outerHeight(!0) : g._elem.outerWidth(!0),
                b > c && (c = b));
            g = null,
            h = null,
            f && (d = this._label._elem.outerWidth(!0),
            e = this._label._elem.outerHeight(!0)),
            "xaxis" == this.name ? (c += e,
            this._elem.css({
                height: c + "px",
                left: "0px",
                bottom: "0px"
            })) : "x2axis" == this.name ? (c += e,
            this._elem.css({
                height: c + "px",
                left: "0px",
                top: "0px"
            })) : "yaxis" == this.name ? (c += d,
            this._elem.css({
                width: c + "px",
                left: "0px",
                top: "0px"
            }),
            f && this._label.constructor == a.jqplot.AxisLabelRenderer && this._label._elem.css("width", d + "px")) : (c += d,
            this._elem.css({
                width: c + "px",
                right: "0px",
                top: "0px"
            }),
            f && this._label.constructor == a.jqplot.AxisLabelRenderer && this._label._elem.css("width", d + "px"))
        }
    }
    ,
    a.jqplot.LinearAxisRenderer.prototype.createTicks = function(b) {
        var c, d, e, f, g = this._ticks, h = this.ticks, i = this.name, j = this._dataBounds, k = "x" === this.name.charAt(0) ? this._plotDimensions.width : this._plotDimensions.height, l = this.min, m = this.max, n = this.numberTicks, o = this.tickInterval, p = 30;
        if (this._scalefact = (Math.max(k, p + 1) - p) / 300,
        h.length) {
            for (f = 0; f < h.length; f++) {
                var q = h[f]
                  , r = new this.tickRenderer(this.tickOptions);
                a.isArray(q) ? (r.value = q[0],
                this.breakPoints ? q[0] == this.breakPoints[0] ? (r.label = this.breakTickLabel,
                r._breakTick = !0,
                r.showGridline = !1,
                r.showMark = !1) : q[0] > this.breakPoints[0] && q[0] <= this.breakPoints[1] ? (r.show = !1,
                r.showGridline = !1,
                r.label = q[1]) : r.label = q[1] : r.label = q[1],
                r.setTick(q[0], this.name),
                this._ticks.push(r)) : a.isPlainObject(q) ? (a.extend(!0, r, q),
                r.axis = this.name,
                this._ticks.push(r)) : (r.value = q,
                this.breakPoints && (q == this.breakPoints[0] ? (r.label = this.breakTickLabel,
                r._breakTick = !0,
                r.showGridline = !1,
                r.showMark = !1) : q > this.breakPoints[0] && q <= this.breakPoints[1] && (r.show = !1,
                r.showGridline = !1)),
                r.setTick(q, this.name),
                this._ticks.push(r))
            }
            this.numberTicks = h.length,
            this.min = this._ticks[0].value,
            this.max = this._ticks[this.numberTicks - 1].value,
            this.tickInterval = (this.max - this.min) / (this.numberTicks - 1)
        } else {
            k = "xaxis" == i || "x2axis" == i ? this._plotDimensions.width : this._plotDimensions.height;
            var s = this.numberTicks;
            this.alignTicks && ("x2axis" === this.name && b.axes.xaxis.show ? s = b.axes.xaxis.numberTicks : "y" === this.name.charAt(0) && "yaxis" !== this.name && "yMidAxis" !== this.name && b.axes.yaxis.show && (s = b.axes.yaxis.numberTicks)),
            c = null != this.min ? this.min : j.min,
            d = null != this.max ? this.max : j.max;
            var t, u, v, w = d - c;
            if (null != this.tickOptions && this.tickOptions.formatString || (this._overrideFormatString = !0),
            null == this.min || null == this.max && null == this.tickInterval && !this.autoscale) {
                this.forceTickAt0 && (c > 0 && (c = 0),
                0 > d && (d = 0)),
                this.forceTickAt100 && (c > 100 && (c = 100),
                100 > d && (d = 100));
                var x = !1
                  , y = !1;
                null != this.min ? x = !0 : null != this.max && (y = !0);
                var z = a.jqplot.LinearTickGenerator(c, d, this._scalefact, s, x, y)
                  , A = null != this.min ? c : c + w * (this.padMin - 1)
                  , B = null != this.max ? d : d - w * (this.padMax - 1);
                (A > c || d > B) && (A = null != this.min ? c : c - w * (this.padMin - 1),
                B = null != this.max ? d : d + w * (this.padMax - 1),
                z = a.jqplot.LinearTickGenerator(A, B, this._scalefact, s, x, y)),
                this.min = z[0],
                this.max = z[1],
                this.numberTicks = z[2],
                this._autoFormatString = z[3],
                this.tickInterval = z[4]
            } else {
                if (c == d) {
                    var C = .05;
                    c > 0 && (C = Math.max(Math.log(c) / Math.LN10, .05)),
                    c -= C,
                    d += C
                }
                if (this.autoscale && null == this.min && null == this.max) {
                    for (var D, E, F, G = !1, H = !1, f = 0; f < this._series.length; f++) {
                        var I = this._series[f]
                          , J = "x" == I.fillAxis ? I._xaxis.name : I._yaxis.name;
                        if (this.name == J) {
                            for (var K = I._plotValues[I.fillAxis], L = K[0], M = K[0], N = 1; N < K.length; N++)
                                K[N] < L ? L = K[N] : K[N] > M && (M = K[N]);
                            var O = (M - L) / M;
                            I.renderer.constructor == a.jqplot.BarRenderer ? L >= 0 && (I.fillToZero || O > .1) ? G = !0 : (G = !1,
                            H = I.fill && I.fillToZero && 0 > L && M > 0 ? !0 : !1) : I.fill ? L >= 0 && (I.fillToZero || O > .1) ? G = !0 : 0 > L && M > 0 && I.fillToZero ? (G = !1,
                            H = !0) : (G = !1,
                            H = !1) : 0 > L && (G = !1)
                        }
                    }
                    if (G)
                        this.numberTicks = 2 + Math.ceil((k - (this.tickSpacing - 1)) / this.tickSpacing),
                        this.min = 0,
                        l = 0,
                        E = d / (this.numberTicks - 1),
                        v = Math.pow(10, Math.abs(Math.floor(Math.log(E) / Math.LN10))),
                        E / v == parseInt(E / v, 10) && (E += v),
                        this.tickInterval = Math.ceil(E / v) * v,
                        this.max = this.tickInterval * (this.numberTicks - 1);
                    else if (H) {
                        this.numberTicks = 2 + Math.ceil((k - (this.tickSpacing - 1)) / this.tickSpacing);
                        var P = Math.ceil(Math.abs(c) / w * (this.numberTicks - 1))
                          , Q = this.numberTicks - 1 - P;
                        E = Math.max(Math.abs(c / P), Math.abs(d / Q)),
                        v = Math.pow(10, Math.abs(Math.floor(Math.log(E) / Math.LN10))),
                        this.tickInterval = Math.ceil(E / v) * v,
                        this.max = this.tickInterval * Q,
                        this.min = -this.tickInterval * P
                    } else
                        null == this.numberTicks && (this.tickInterval ? this.numberTicks = 3 + Math.ceil(w / this.tickInterval) : this.numberTicks = 2 + Math.ceil((k - (this.tickSpacing - 1)) / this.tickSpacing)),
                        null == this.tickInterval ? (E = w / (this.numberTicks - 1),
                        v = 1 > E ? Math.pow(10, Math.abs(Math.floor(Math.log(E) / Math.LN10))) : 1,
                        this.tickInterval = Math.ceil(E * v * this.pad) / v) : v = 1 / this.tickInterval,
                        D = this.tickInterval * (this.numberTicks - 1),
                        F = (D - w) / 2,
                        null == this.min && (this.min = Math.floor(v * (c - F)) / v),
                        null == this.max && (this.max = this.min + D);
                    var R, S = a.jqplot.getSignificantFigures(this.tickInterval);
                    if (S.digitsLeft >= S.significantDigits)
                        R = "%d";
                    else {
                        var v = Math.max(0, 5 - S.digitsLeft);
                        v = Math.min(v, S.digitsRight),
                        R = "%." + v + "f"
                    }
                    this._autoFormatString = R
                } else {
                    t = null != this.min ? this.min : c - w * (this.padMin - 1),
                    u = null != this.max ? this.max : d + w * (this.padMax - 1),
                    w = u - t,
                    null == this.numberTicks && (null != this.tickInterval ? this.numberTicks = Math.ceil((u - t) / this.tickInterval) + 1 : k > 100 ? this.numberTicks = parseInt(3 + (k - 100) / 75, 10) : this.numberTicks = 2),
                    null == this.tickInterval && (this.tickInterval = w / (this.numberTicks - 1)),
                    null == this.max && (u = t + this.tickInterval * (this.numberTicks - 1)),
                    null == this.min && (t = u - this.tickInterval * (this.numberTicks - 1));
                    var R, S = a.jqplot.getSignificantFigures(this.tickInterval);
                    if (S.digitsLeft >= S.significantDigits)
                        R = "%d";
                    else {
                        var v = Math.max(0, 5 - S.digitsLeft);
                        v = Math.min(v, S.digitsRight),
                        R = "%." + v + "f"
                    }
                    this._autoFormatString = R,
                    this.min = t,
                    this.max = u
                }
                if (this.renderer.constructor == a.jqplot.LinearAxisRenderer && "" == this._autoFormatString) {
                    w = this.max - this.min;
                    var T = new this.tickRenderer(this.tickOptions)
                      , U = T.formatString || a.jqplot.config.defaultTickFormatString
                      , U = U.match(a.jqplot.sprintf.regex)[0]
                      , V = 0;
                    if (U) {
                        if (U.search(/[fFeEgGpP]/) > -1) {
                            var W = U.match(/\%\.(\d{0,})?[eEfFgGpP]/);
                            V = W ? parseInt(W[1], 10) : 6
                        } else
                            U.search(/[di]/) > -1 && (V = 0);
                        var X = Math.pow(10, -V);
                        if (this.tickInterval < X && null == n && null == o)
                            if (this.tickInterval = X,
                            null == m && null == l) {
                                this.min = Math.floor(this._dataBounds.min / X) * X,
                                this.min == this._dataBounds.min && (this.min = this._dataBounds.min - this.tickInterval),
                                this.max = Math.ceil(this._dataBounds.max / X) * X,
                                this.max == this._dataBounds.max && (this.max = this._dataBounds.max + this.tickInterval);
                                var Y = (this.max - this.min) / this.tickInterval;
                                Y = Y.toFixed(11),
                                Y = Math.ceil(Y),
                                this.numberTicks = Y + 1
                            } else if (null == m) {
                                var Y = (this._dataBounds.max - this.min) / this.tickInterval;
                                Y = Y.toFixed(11),
                                this.numberTicks = Math.ceil(Y) + 2,
                                this.max = this.min + this.tickInterval * (this.numberTicks - 1)
                            } else if (null == l) {
                                var Y = (this.max - this._dataBounds.min) / this.tickInterval;
                                Y = Y.toFixed(11),
                                this.numberTicks = Math.ceil(Y) + 2,
                                this.min = this.max - this.tickInterval * (this.numberTicks - 1)
                            } else
                                this.numberTicks = Math.ceil((m - l) / this.tickInterval) + 1,
                                this.min = Math.floor(l * Math.pow(10, V)) / Math.pow(10, V),
                                this.max = Math.ceil(m * Math.pow(10, V)) / Math.pow(10, V),
                                this.numberTicks = Math.ceil((this.max - this.min) / this.tickInterval) + 1
                    }
                }
            }
            this._overrideFormatString && "" != this._autoFormatString && (this.tickOptions = this.tickOptions || {},
            this.tickOptions.formatString = this._autoFormatString);
            for (var r, Z, f = 0; f < this.numberTicks; f++) {
                if (e = this.min + f * this.tickInterval,
                r = new this.tickRenderer(this.tickOptions),
                r.setTick(e, this.name),
                this._ticks.push(r),
                f < this.numberTicks - 1)
                    for (var N = 0; N < this.minorTicks; N++)
                        e += this.tickInterval / (this.minorTicks + 1),
                        Z = a.extend(!0, {}, this.tickOptions, {
                            name: this.name,
                            value: e,
                            label: "",
                            isMinorTick: !0
                        }),
                        r = new this.tickRenderer(Z),
                        this._ticks.push(r);
                r = null
            }
        }
        this.tickInset && (this.min = this.min - this.tickInset * this.tickInterval,
        this.max = this.max + this.tickInset * this.tickInterval),
        g = null
    }
    ,
    a.jqplot.LinearAxisRenderer.prototype.resetTickValues = function(b) {
        if (a.isArray(b) && b.length == this._ticks.length) {
            for (var c, d = 0; d < b.length; d++)
                c = this._ticks[d],
                c.value = b[d],
                c.label = c.formatter(c.formatString, b[d]),
                c.label = c.prefix + c.label,
                c._elem.html(c.label);
            c = null,
            this.min = a.jqplot.arrayMin(b),
            this.max = a.jqplot.arrayMax(b),
            this.pack()
        }
    }
    ,
    a.jqplot.LinearAxisRenderer.prototype.pack = function(b, c) {
        b = b || {},
        c = c || this._offsets;
        var d = this._ticks
          , e = this.max
          , f = this.min
          , g = c.max
          , h = c.min
          , i = null == this._label ? !1 : this._label.show;
        for (var j in b)
            this._elem.css(j, b[j]);
        this._offsets = c;
        var k = g - h
          , l = e - f;
        if (this.breakPoints ? (l = l - this.breakPoints[1] + this.breakPoints[0],
        this.p2u = function(a) {
            return (a - h) * l / k + f
        }
        ,
        this.u2p = function(a) {
            return a > this.breakPoints[0] && a < this.breakPoints[1] && (a = this.breakPoints[0]),
            a <= this.breakPoints[0] ? (a - f) * k / l + h : (a - this.breakPoints[1] + this.breakPoints[0] - f) * k / l + h
        }
        ,
        "x" == this.name.charAt(0) ? (this.series_u2p = function(a) {
            return a > this.breakPoints[0] && a < this.breakPoints[1] && (a = this.breakPoints[0]),
            a <= this.breakPoints[0] ? (a - f) * k / l : (a - this.breakPoints[1] + this.breakPoints[0] - f) * k / l
        }
        ,
        this.series_p2u = function(a) {
            return a * l / k + f
        }
        ) : (this.series_u2p = function(a) {
            return a > this.breakPoints[0] && a < this.breakPoints[1] && (a = this.breakPoints[0]),
            a >= this.breakPoints[1] ? (a - e) * k / l : (a + this.breakPoints[1] - this.breakPoints[0] - e) * k / l
        }
        ,
        this.series_p2u = function(a) {
            return a * l / k + e
        }
        )) : (this.p2u = function(a) {
            return (a - h) * l / k + f
        }
        ,
        this.u2p = function(a) {
            return (a - f) * k / l + h
        }
        ,
        "xaxis" == this.name || "x2axis" == this.name ? (this.series_u2p = function(a) {
            return (a - f) * k / l
        }
        ,
        this.series_p2u = function(a) {
            return a * l / k + f
        }
        ) : (this.series_u2p = function(a) {
            return (a - e) * k / l
        }
        ,
        this.series_p2u = function(a) {
            return a * l / k + e
        }
        )),
        this.show)
            if ("xaxis" == this.name || "x2axis" == this.name) {
                for (var m = 0; m < d.length; m++) {
                    var n = d[m];
                    if (n.show && n.showLabel) {
                        var o;
                        if (n.constructor == a.jqplot.CanvasAxisTickRenderer && n.angle) {
                            var p = "xaxis" == this.name ? 1 : -1;
                            switch (n.labelPosition) {
                            case "auto":
                                o = p * n.angle < 0 ? -n.getWidth() + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2 : -n._textRenderer.height * Math.sin(n._textRenderer.angle) / 2;
                                break;
                            case "end":
                                o = -n.getWidth() + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2;
                                break;
                            case "start":
                                o = -n._textRenderer.height * Math.sin(n._textRenderer.angle) / 2;
                                break;
                            case "middle":
                                o = -n.getWidth() / 2 + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2;
                                break;
                            default:
                                o = -n.getWidth() / 2 + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2
                            }
                        } else
                            o = -n.getWidth() / 2;
                        var q = this.u2p(n.value) + o + "px";
                        n._elem.css("left", q),
                        n.pack()
                    }
                }
                if (i) {
                    var r = this._label._elem.outerWidth(!0);
                    this._label._elem.css("left", h + k / 2 - r / 2 + "px"),
                    "xaxis" == this.name ? this._label._elem.css("bottom", "0px") : this._label._elem.css("top", "0px"),
                    this._label.pack()
                }
            } else {
                for (var m = 0; m < d.length; m++) {
                    var n = d[m];
                    if (n.show && n.showLabel) {
                        var o;
                        if (n.constructor == a.jqplot.CanvasAxisTickRenderer && n.angle) {
                            var p = "yaxis" == this.name ? 1 : -1;
                            switch (n.labelPosition) {
                            case "auto":
                            case "end":
                                o = p * n.angle < 0 ? -n._textRenderer.height * Math.cos(-n._textRenderer.angle) / 2 : -n.getHeight() + n._textRenderer.height * Math.cos(n._textRenderer.angle) / 2;
                                break;
                            case "start":
                                o = n.angle > 0 ? -n._textRenderer.height * Math.cos(-n._textRenderer.angle) / 2 : -n.getHeight() + n._textRenderer.height * Math.cos(n._textRenderer.angle) / 2;
                                break;
                            case "middle":
                                o = -n.getHeight() / 2;
                                break;
                            default:
                                o = -n.getHeight() / 2
                            }
                        } else
                            o = -n.getHeight() / 2;
                        var q = this.u2p(n.value) + o + "px";
                        n._elem.css("top", q),
                        n.pack()
                    }
                }
                if (i) {
                    var s = this._label._elem.outerHeight(!0);
                    this._label._elem.css("top", g - k / 2 - s / 2 + "px"),
                    "yaxis" == this.name ? this._label._elem.css("left", "0px") : this._label._elem.css("right", "0px"),
                    this._label.pack()
                }
            }
        d = null
    }
    ;
    a.jqplot.LinearTickGenerator = function(b, c, d, e, f, g) {
        if (f = null === f ? !1 : f,
        g = null === g || f ? !1 : g,
        b === c && (c = c ? 0 : 1),
        d = d || 1,
        b > c) {
            var h = c;
            c = b,
            b = h
        }
        var i = []
          , j = x(c - b, d)
          , k = a.jqplot.getSignificantFigures;
        if (null == e)
            if (f || g) {
                if (f) {
                    i[0] = b,
                    i[2] = Math.ceil((c - b) / j + 1),
                    i[1] = b + (i[2] - 1) * j;
                    var l = k(b).digitsRight
                      , m = k(j).digitsRight;
                    m > l ? i[3] = u(j) : i[3] = "%." + l + "f",
                    i[4] = j
                } else if (g) {
                    i[1] = c,
                    i[2] = Math.ceil((c - b) / j + 1),
                    i[0] = c - (i[2] - 1) * j;
                    var n = k(c).digitsRight
                      , m = k(j).digitsRight;
                    m > n ? i[3] = u(j) : i[3] = "%." + n + "f",
                    i[4] = j
                }
            } else
                i[0] = Math.floor(b / j) * j,
                i[1] = Math.ceil(c / j) * j,
                i[2] = Math.round((i[1] - i[0]) / j + 1),
                i[3] = u(j),
                i[4] = j;
        else {
            var o = [];
            if (o[0] = Math.floor(b / j) * j,
            o[1] = Math.ceil(c / j) * j,
            o[2] = Math.round((o[1] - o[0]) / j + 1),
            o[3] = u(j),
            o[4] = j,
            o[2] === e)
                i = o;
            else {
                var p = w(o[1] - o[0], e);
                i[0] = o[0],
                i[2] = e,
                i[4] = p,
                i[3] = u(p),
                i[1] = i[0] + (i[2] - 1) * i[4]
            }
        }
        return i
    }
    ,
    a.jqplot.LinearTickGenerator.bestLinearInterval = x,
    a.jqplot.LinearTickGenerator.bestInterval = w,
    a.jqplot.LinearTickGenerator.bestLinearComponents = y,
    a.jqplot.LinearTickGenerator.bestConstrainedInterval = v,
    a.jqplot.MarkerRenderer = function(b) {
        this.show = !0,
        this.style = "filledCircle",
        this.lineWidth = 2,
        this.size = 9,
        this.color = "#666666",
        this.shadow = !0,
        this.shadowAngle = 45,
        this.shadowOffset = 1,
        this.shadowDepth = 3,
        this.shadowAlpha = "0.07",
        this.shadowRenderer = new a.jqplot.ShadowRenderer,
        this.shapeRenderer = new a.jqplot.ShapeRenderer,
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.init = function(b) {
        a.extend(!0, this, b);
        var c = {
            angle: this.shadowAngle,
            offset: this.shadowOffset,
            alpha: this.shadowAlpha,
            lineWidth: this.lineWidth,
            depth: this.shadowDepth,
            closePath: !0
        };
        -1 != this.style.indexOf("filled") && (c.fill = !0),
        -1 != this.style.indexOf("ircle") && (c.isarc = !0,
        c.closePath = !1),
        this.shadowRenderer.init(c);
        var d = {
            fill: !1,
            isarc: !1,
            strokeStyle: this.color,
            fillStyle: this.color,
            lineWidth: this.lineWidth,
            closePath: !0
        };
        -1 != this.style.indexOf("filled") && (d.fill = !0),
        -1 != this.style.indexOf("ircle") && (d.isarc = !0,
        d.closePath = !1),
        this.shapeRenderer.init(d)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.drawDiamond = function(a, b, c, d, e) {
        var f = 1.2
          , g = this.size / 2 / f
          , h = this.size / 2 * f
          , i = [[a - g, b], [a, b + h], [a + g, b], [a, b - h]];
        this.shadow && this.shadowRenderer.draw(c, i),
        this.shapeRenderer.draw(c, i, e)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.drawPlus = function(b, c, d, e, f) {
        var g = 1
          , h = this.size / 2 * g
          , i = this.size / 2 * g
          , j = [[b, c - i], [b, c + i]]
          , k = [[b + h, c], [b - h, c]]
          , l = a.extend(!0, {}, this.options, {
            closePath: !1
        });
        this.shadow && (this.shadowRenderer.draw(d, j, {
            closePath: !1
        }),
        this.shadowRenderer.draw(d, k, {
            closePath: !1
        })),
        this.shapeRenderer.draw(d, j, l),
        this.shapeRenderer.draw(d, k, l)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.drawX = function(b, c, d, e, f) {
        var g = 1
          , h = this.size / 2 * g
          , i = this.size / 2 * g
          , j = a.extend(!0, {}, this.options, {
            closePath: !1
        })
          , k = [[b - h, c - i], [b + h, c + i]]
          , l = [[b - h, c + i], [b + h, c - i]];
        this.shadow && (this.shadowRenderer.draw(d, k, {
            closePath: !1
        }),
        this.shadowRenderer.draw(d, l, {
            closePath: !1
        })),
        this.shapeRenderer.draw(d, k, j),
        this.shapeRenderer.draw(d, l, j)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.drawDash = function(a, b, c, d, e) {
        var f = 1
          , g = this.size / 2 * f
          , h = (this.size / 2 * f,
        [[a - g, b], [a + g, b]]);
        this.shadow && this.shadowRenderer.draw(c, h),
        this.shapeRenderer.draw(c, h, e)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.drawLine = function(a, b, c, d, e) {
        var f = [a, b];
        this.shadow && this.shadowRenderer.draw(c, f),
        this.shapeRenderer.draw(c, f, e)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.drawSquare = function(a, b, c, d, e) {
        var f = 1
          , g = this.size / 2 / f
          , h = this.size / 2 * f
          , i = [[a - g, b - h], [a - g, b + h], [a + g, b + h], [a + g, b - h]];
        this.shadow && this.shadowRenderer.draw(c, i),
        this.shapeRenderer.draw(c, i, e)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.drawCircle = function(a, b, c, d, e) {
        var f = this.size / 2
          , g = 2 * Math.PI
          , h = [a, b, f, 0, g, !0];
        this.shadow && this.shadowRenderer.draw(c, h),
        this.shapeRenderer.draw(c, h, e)
    }
    ,
    a.jqplot.MarkerRenderer.prototype.draw = function(a, b, c, d) {
        if (d = d || {},
        null == d.show || 0 != d.show)
            switch (d.color && !d.fillStyle && (d.fillStyle = d.color),
            d.color && !d.strokeStyle && (d.strokeStyle = d.color),
            this.style) {
            case "diamond":
                this.drawDiamond(a, b, c, !1, d);
                break;
            case "filledDiamond":
                this.drawDiamond(a, b, c, !0, d);
                break;
            case "circle":
                this.drawCircle(a, b, c, !1, d);
                break;
            case "filledCircle":
                this.drawCircle(a, b, c, !0, d);
                break;
            case "square":
                this.drawSquare(a, b, c, !1, d);
                break;
            case "filledSquare":
                this.drawSquare(a, b, c, !0, d);
                break;
            case "x":
                this.drawX(a, b, c, !0, d);
                break;
            case "plus":
                this.drawPlus(a, b, c, !0, d);
                break;
            case "dash":
                this.drawDash(a, b, c, !0, d);
                break;
            case "line":
                this.drawLine(a, b, c, !1, d);
                break;
            default:
                this.drawDiamond(a, b, c, !1, d)
            }
    }
    ,
    a.jqplot.ShadowRenderer = function(b) {
        this.angle = 45,
        this.offset = 1,
        this.alpha = .07,
        this.lineWidth = 1.5,
        this.lineJoin = "miter",
        this.lineCap = "round",
        this.closePath = !1,
        this.fill = !1,
        this.depth = 3,
        this.strokeStyle = "rgba(0,0,0,0.1)",
        this.isarc = !1,
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.ShadowRenderer.prototype.init = function(b) {
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.ShadowRenderer.prototype.draw = function(b, c, d) {
        b.save();
        var e = null != d ? d : {}
          , f = null != e.fill ? e.fill : this.fill
          , g = null != e.fillRect ? e.fillRect : this.fillRect
          , h = null != e.closePath ? e.closePath : this.closePath
          , i = null != e.offset ? e.offset : this.offset
          , j = null != e.alpha ? e.alpha : this.alpha
          , k = null != e.depth ? e.depth : this.depth
          , l = null != e.isarc ? e.isarc : this.isarc
          , m = null != e.linePattern ? e.linePattern : this.linePattern;
        b.lineWidth = null != e.lineWidth ? e.lineWidth : this.lineWidth,
        b.lineJoin = null != e.lineJoin ? e.lineJoin : this.lineJoin,
        b.lineCap = null != e.lineCap ? e.lineCap : this.lineCap,
        b.strokeStyle = e.strokeStyle || this.strokeStyle || "rgba(0,0,0," + j + ")",
        b.fillStyle = e.fillStyle || this.fillStyle || "rgba(0,0,0," + j + ")";
        for (var n = 0; k > n; n++) {
            var o = a.jqplot.LinePattern(b, m);
            if (b.translate(Math.cos(this.angle * Math.PI / 180) * i, Math.sin(this.angle * Math.PI / 180) * i),
            o.beginPath(),
            l)
                b.arc(c[0], c[1], c[2], c[3], c[4], !0);
            else if (g)
                g && b.fillRect(c[0], c[1], c[2], c[3]);
            else if (c && c.length)
                for (var p = !0, q = 0; q < c.length; q++)
                    null != c[q][0] && null != c[q][1] ? p ? (o.moveTo(c[q][0], c[q][1]),
                    p = !1) : o.lineTo(c[q][0], c[q][1]) : p = !0;
            h && o.closePath(),
            f ? b.fill() : b.stroke()
        }
        b.restore()
    }
    ,
    a.jqplot.ShapeRenderer = function(b) {
        this.lineWidth = 1.5,
        this.linePattern = "solid",
        this.lineJoin = "miter",
        this.lineCap = "round",
        this.closePath = !1,
        this.fill = !1,
        this.isarc = !1,
        this.fillRect = !1,
        this.strokeRect = !1,
        this.clearRect = !1,
        this.strokeStyle = "#999999",
        this.fillStyle = "#999999",
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.ShapeRenderer.prototype.init = function(b) {
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.ShapeRenderer.prototype.draw = function(b, c, d) {
        b.save();
        var e = null != d ? d : {}
          , f = null != e.fill ? e.fill : this.fill
          , g = null != e.closePath ? e.closePath : this.closePath
          , h = null != e.fillRect ? e.fillRect : this.fillRect
          , i = null != e.strokeRect ? e.strokeRect : this.strokeRect
          , j = null != e.clearRect ? e.clearRect : this.clearRect
          , k = null != e.isarc ? e.isarc : this.isarc
          , l = null != e.linePattern ? e.linePattern : this.linePattern
          , m = a.jqplot.LinePattern(b, l);
        if (b.lineWidth = e.lineWidth || this.lineWidth,
        b.lineJoin = e.lineJoin || this.lineJoin,
        b.lineCap = e.lineCap || this.lineCap,
        b.strokeStyle = e.strokeStyle || e.color || this.strokeStyle,
        b.fillStyle = e.fillStyle || this.fillStyle,
        b.beginPath(),
        k)
            return b.arc(c[0], c[1], c[2], c[3], c[4], !0),
            g && b.closePath(),
            f ? b.fill() : b.stroke(),
            void b.restore();
        if (j)
            return b.clearRect(c[0], c[1], c[2], c[3]),
            void b.restore();
        if (h || i) {
            if (h && b.fillRect(c[0], c[1], c[2], c[3]),
            i)
                return b.strokeRect(c[0], c[1], c[2], c[3]),
                void b.restore()
        } else if (c && c.length) {
            for (var n = !0, o = 0; o < c.length; o++)
                null != c[o][0] && null != c[o][1] ? n ? (m.moveTo(c[o][0], c[o][1]),
                n = !1) : m.lineTo(c[o][0], c[o][1]) : n = !0;
            g && m.closePath(),
            f ? b.fill() : b.stroke()
        }
        b.restore()
    }
    ,
    a.jqplot.TableLegendRenderer = function() {}
    ,
    a.jqplot.TableLegendRenderer.prototype.init = function(b) {
        a.extend(!0, this, b)
    }
    ,
    a.jqplot.TableLegendRenderer.prototype.addrow = function(b, c, d, e) {
        var f, g, h, i, j, k = d ? this.rowSpacing + "px" : "0px";
        h = document.createElement("tr"),
        f = a(h),
        f.addClass("jqplot-table-legend"),
        h = null,
        e ? f.prependTo(this._elem) : f.appendTo(this._elem),
        this.showSwatches && (g = a(document.createElement("td")),
        g.addClass("jqplot-table-legend jqplot-table-legend-swatch"),
        g.css({
            textAlign: "center",
            paddingTop: k
        }),
        i = a(document.createElement("div")),
        i.addClass("jqplot-table-legend-swatch-outline"),
        j = a(document.createElement("div")),
        j.addClass("jqplot-table-legend-swatch"),
        j.css({
            backgroundColor: c,
            borderColor: c
        }),
        f.append(g.append(i.append(j)))),
        this.showLabels && (g = a(document.createElement("td")),
        g.addClass("jqplot-table-legend jqplot-table-legend-label"),
        g.css("paddingTop", k),
        f.append(g),
        this.escapeHtml ? g.text(b) : g.html(b)),
        g = null,
        i = null,
        j = null,
        f = null,
        h = null
    }
    ,
    a.jqplot.TableLegendRenderer.prototype.draw = function() {
        if (this._elem && (this._elem.emptyForce(),
        this._elem = null),
        this.show) {
            var b = this._series
              , c = document.createElement("table");
            this._elem = a(c),
            this._elem.addClass("jqplot-table-legend");
            var d = {
                position: "absolute"
            };
            this.background && (d.background = this.background),
            this.border && (d.border = this.border),
            this.fontSize && (d.fontSize = this.fontSize),
            this.fontFamily && (d.fontFamily = this.fontFamily),
            this.textColor && (d.textColor = this.textColor),
            null != this.marginTop && (d.marginTop = this.marginTop),
            null != this.marginBottom && (d.marginBottom = this.marginBottom),
            null != this.marginLeft && (d.marginLeft = this.marginLeft),
            null != this.marginRight && (d.marginRight = this.marginRight);
            for (var e, f = !1, g = !1, h = 0; h < b.length; h++)
                if (e = b[h],
                (e._stack || e.renderer.constructor == a.jqplot.BezierCurveRenderer) && (g = !0),
                e.show && e.showLabel) {
                    var i = this.labels[h] || e.label.toString();
                    if (i) {
                        var j = e.color;
                        g && h < b.length - 1 ? f = !0 : g && h == b.length - 1 && (f = !1),
                        this.renderer.addrow.call(this, i, j, f, g),
                        f = !0
                    }
                    for (var k = 0; k < a.jqplot.addLegendRowHooks.length; k++) {
                        var l = a.jqplot.addLegendRowHooks[k].call(this, e);
                        l && (this.renderer.addrow.call(this, l.label, l.color, f),
                        f = !0)
                    }
                    i = null
                }
        }
        return this._elem
    }
    ,
    a.jqplot.TableLegendRenderer.prototype.pack = function(a) {
        if (this.show)
            if ("insideGrid" == this.placement)
                switch (this.location) {
                case "nw":
                    var b = a.left
                      , c = a.top;
                    this._elem.css("left", b),
                    this._elem.css("top", c);
                    break;
                case "n":
                    var b = (a.left + (this._plotDimensions.width - a.right)) / 2 - this.getWidth() / 2
                      , c = a.top;
                    this._elem.css("left", b),
                    this._elem.css("top", c);
                    break;
                case "ne":
                    var b = a.right
                      , c = a.top;
                    this._elem.css({
                        right: b,
                        top: c
                    });
                    break;
                case "e":
                    var b = a.right
                      , c = (a.top + (this._plotDimensions.height - a.bottom)) / 2 - this.getHeight() / 2;
                    this._elem.css({
                        right: b,
                        top: c
                    });
                    break;
                case "se":
                    var b = a.right
                      , c = a.bottom;
                    this._elem.css({
                        right: b,
                        bottom: c
                    });
                    break;
                case "s":
                    var b = (a.left + (this._plotDimensions.width - a.right)) / 2 - this.getWidth() / 2
                      , c = a.bottom;
                    this._elem.css({
                        left: b,
                        bottom: c
                    });
                    break;
                case "sw":
                    var b = a.left
                      , c = a.bottom;
                    this._elem.css({
                        left: b,
                        bottom: c
                    });
                    break;
                case "w":
                    var b = a.left
                      , c = (a.top + (this._plotDimensions.height - a.bottom)) / 2 - this.getHeight() / 2;
                    this._elem.css({
                        left: b,
                        top: c
                    });
                    break;
                default:
                    var b = a.right
                      , c = a.bottom;
                    this._elem.css({
                        right: b,
                        bottom: c
                    })
                }
            else if ("outside" == this.placement)
                switch (this.location) {
                case "nw":
                    var b = this._plotDimensions.width - a.left
                      , c = a.top;
                    this._elem.css("right", b),
                    this._elem.css("top", c);
                    break;
                case "n":
                    var b = (a.left + (this._plotDimensions.width - a.right)) / 2 - this.getWidth() / 2
                      , c = this._plotDimensions.height - a.top;
                    this._elem.css("left", b),
                    this._elem.css("bottom", c);
                    break;
                case "ne":
                    var b = this._plotDimensions.width - a.right
                      , c = a.top;
                    this._elem.css({
                        left: b,
                        top: c
                    });
                    break;
                case "e":
                    var b = this._plotDimensions.width - a.right
                      , c = (a.top + (this._plotDimensions.height - a.bottom)) / 2 - this.getHeight() / 2;
                    this._elem.css({
                        left: b,
                        top: c
                    });
                    break;
                case "se":
                    var b = this._plotDimensions.width - a.right
                      , c = a.bottom;
                    this._elem.css({
                        left: b,
                        bottom: c
                    });
                    break;
                case "s":
                    var b = (a.left + (this._plotDimensions.width - a.right)) / 2 - this.getWidth() / 2
                      , c = this._plotDimensions.height - a.bottom;
                    this._elem.css({
                        left: b,
                        top: c
                    });
                    break;
                case "sw":
                    var b = this._plotDimensions.width - a.left
                      , c = a.bottom;
                    this._elem.css({
                        right: b,
                        bottom: c
                    });
                    break;
                case "w":
                    var b = this._plotDimensions.width - a.left
                      , c = (a.top + (this._plotDimensions.height - a.bottom)) / 2 - this.getHeight() / 2;
                    this._elem.css({
                        right: b,
                        top: c
                    });
                    break;
                default:
                    var b = a.right
                      , c = a.bottom;
                    this._elem.css({
                        right: b,
                        bottom: c
                    })
                }
            else
                switch (this.location) {
                case "nw":
                    this._elem.css({
                        left: 0,
                        top: a.top
                    });
                    break;
                case "n":
                    var b = (a.left + (this._plotDimensions.width - a.right)) / 2 - this.getWidth() / 2;
                    this._elem.css({
                        left: b,
                        top: a.top
                    });
                    break;
                case "ne":
                    this._elem.css({
                        right: 0,
                        top: a.top
                    });
                    break;
                case "e":
                    var c = (a.top + (this._plotDimensions.height - a.bottom)) / 2 - this.getHeight() / 2;
                    this._elem.css({
                        right: a.right,
                        top: c
                    });
                    break;
                case "se":
                    this._elem.css({
                        right: a.right,
                        bottom: a.bottom
                    });
                    break;
                case "s":
                    var b = (a.left + (this._plotDimensions.width - a.right)) / 2 - this.getWidth() / 2;
                    this._elem.css({
                        left: b,
                        bottom: a.bottom
                    });
                    break;
                case "sw":
                    this._elem.css({
                        left: a.left,
                        bottom: a.bottom
                    });
                    break;
                case "w":
                    var c = (a.top + (this._plotDimensions.height - a.bottom)) / 2 - this.getHeight() / 2;
                    this._elem.css({
                        left: a.left,
                        top: c
                    });
                    break;
                default:
                    this._elem.css({
                        right: a.right,
                        bottom: a.bottom
                    })
                }
    }
    ,
    a.jqplot.ThemeEngine = function() {
        this.themes = {},
        this.activeTheme = null
    }
    ,
    a.jqplot.ThemeEngine.prototype.init = function() {
        var b, c, d, e = new a.jqplot.Theme({
            _name: "Default"
        });
        for (b in e.target)
            "textColor" == b ? e.target[b] = this.target.css("color") : e.target[b] = this.target.css(b);
        if (this.title.show && this.title._elem)
            for (b in e.title)
                "textColor" == b ? e.title[b] = this.title._elem.css("color") : e.title[b] = this.title._elem.css(b);
        for (b in e.grid)
            e.grid[b] = this.grid[b];
        if (null == e.grid.backgroundColor && null != this.grid.background && (e.grid.backgroundColor = this.grid.background),
        this.legend.show && this.legend._elem)
            for (b in e.legend)
                "textColor" == b ? e.legend[b] = this.legend._elem.css("color") : e.legend[b] = this.legend._elem.css(b);
        var f;
        for (c = 0; c < this.series.length; c++) {
            f = this.series[c],
            f.renderer.constructor == a.jqplot.LineRenderer ? e.series.push(new L) : f.renderer.constructor == a.jqplot.BarRenderer ? e.series.push(new N) : f.renderer.constructor == a.jqplot.PieRenderer ? e.series.push(new O) : f.renderer.constructor == a.jqplot.DonutRenderer ? e.series.push(new P) : f.renderer.constructor == a.jqplot.FunnelRenderer ? e.series.push(new Q) : f.renderer.constructor == a.jqplot.MeterGaugeRenderer ? e.series.push(new R) : e.series.push({});
            for (b in e.series[c])
                e.series[c][b] = f[b]
        }
        var g, h;
        for (b in this.axes) {
            if (h = this.axes[b],
            g = e.axes[b] = new I,
            g.borderColor = h.borderColor,
            g.borderWidth = h.borderWidth,
            h._ticks && h._ticks[0])
                for (d in g.ticks)
                    h._ticks[0].hasOwnProperty(d) ? g.ticks[d] = h._ticks[0][d] : h._ticks[0]._elem && (g.ticks[d] = h._ticks[0]._elem.css(d));
            if (h._label && h._label.show)
                for (d in g.label)
                    h._label[d] ? g.label[d] = h._label[d] : h._label._elem && ("textColor" == d ? g.label[d] = h._label._elem.css("color") : g.label[d] = h._label._elem.css(d))
        }
        this.themeEngine._add(e),
        this.themeEngine.activeTheme = this.themeEngine.themes[e._name]
    }
    ,
    a.jqplot.ThemeEngine.prototype.get = function(a) {
        return a ? this.themes[a] : this.activeTheme
    }
    ,
    a.jqplot.ThemeEngine.prototype.getThemeNames = function() {
        var a = [];
        for (var b in this.themes)
            a.push(b);
        return a.sort(z)
    }
    ,
    a.jqplot.ThemeEngine.prototype.getThemes = function() {
        var a = []
          , b = [];
        for (var c in this.themes)
            a.push(c);
        a.sort(z);
        for (var d = 0; d < a.length; d++)
            b.push(this.themes[a[d]]);
        return b
    }
    ,
    a.jqplot.ThemeEngine.prototype.activate = function(b, c) {
        var d = !1;
        if (!c && this.activeTheme && this.activeTheme._name && (c = this.activeTheme._name),
        !this.themes.hasOwnProperty(c))
            throw new Error("No theme of that name");
        var e = this.themes[c];
        this.activeTheme = e;
        var f, g = ["xaxis", "x2axis", "yaxis", "y2axis"];
        for (p = 0; p < g.length; p++) {
            var h = g[p];
            null != e.axesStyles.borderColor && (b.axes[h].borderColor = e.axesStyles.borderColor),
            null != e.axesStyles.borderWidth && (b.axes[h].borderWidth = e.axesStyles.borderWidth)
        }
        for (var i in b.axes) {
            var j = b.axes[i];
            if (j.show) {
                var k = e.axes[i] || {}
                  , l = e.axesStyles
                  , m = a.jqplot.extend(!0, {}, k, l);
                if (f = null != e.axesStyles.borderColor ? e.axesStyles.borderColor : m.borderColor,
                null != m.borderColor && (j.borderColor = m.borderColor,
                d = !0),
                f = null != e.axesStyles.borderWidth ? e.axesStyles.borderWidth : m.borderWidth,
                null != m.borderWidth && (j.borderWidth = m.borderWidth,
                d = !0),
                j._ticks && j._ticks[0])
                    for (var n in m.ticks)
                        f = m.ticks[n],
                        null != f && (j.tickOptions[n] = f,
                        j._ticks = [],
                        d = !0);
                if (j._label && j._label.show)
                    for (var n in m.label)
                        f = m.label[n],
                        null != f && (j.labelOptions[n] = f,
                        d = !0)
            }
        }
        for (var o in e.grid)
            null != e.grid[o] && (b.grid[o] = e.grid[o]);
        if (d || b.grid.draw(),
        b.legend.show)
            for (o in e.legend)
                null != e.legend[o] && (b.legend[o] = e.legend[o]);
        if (b.title.show)
            for (o in e.title)
                null != e.title[o] && (b.title[o] = e.title[o]);
        var p;
        for (p = 0; p < e.series.length; p++) {
            var q = {};
            for (o in e.series[p])
                f = null != e.seriesStyles[o] ? e.seriesStyles[o] : e.series[p][o],
                null != f && (q[o] = f,
                "color" == o ? (b.series[p].renderer.shapeRenderer.fillStyle = f,
                b.series[p].renderer.shapeRenderer.strokeStyle = f,
                b.series[p][o] = f) : "lineWidth" == o || "linePattern" == o ? (b.series[p].renderer.shapeRenderer[o] = f,
                b.series[p][o] = f) : "markerOptions" == o ? (B(b.series[p].markerOptions, f),
                B(b.series[p].markerRenderer, f)) : b.series[p][o] = f,
                d = !0)
        }
        d && (b.target.empty(),
        b.draw());
        for (o in e.target)
            null != e.target[o] && b.target.css(o, e.target[o])
    }
    ,
    a.jqplot.ThemeEngine.prototype._add = function(a, b) {
        if (b && (a._name = b),
        a._name || (a._name = Date.parse(new Date)),
        this.themes.hasOwnProperty(a._name))
            throw new Error("jqplot.ThemeEngine Error: Theme already in use");
        this.themes[a._name] = a
    }
    ,
    a.jqplot.ThemeEngine.prototype.remove = function(a) {
        return "Default" == a ? !1 : delete this.themes[a]
    }
    ,
    a.jqplot.ThemeEngine.prototype.newTheme = function(b, c) {
        "object" == typeof b && (c = c || b,
        b = null),
        b = c && c._name ? c._name : b || Date.parse(new Date);
        var d = this.copy(this.themes.Default._name, b);
        return a.jqplot.extend(d, c),
        d
    }
    ,
    a.jqplot.clone = A,
    a.jqplot.merge = B,
    a.jqplot.extend = function() {
        var b, c = arguments[0] || {}, d = 1, e = arguments.length, f = !1;
        for ("boolean" == typeof c && (f = c,
        c = arguments[1] || {},
        d = 2),
        "object" != typeof c && "[object Function]" === !toString.call(c) && (c = {}); e > d; d++)
            if (null != (b = arguments[d]))
                for (var g in b) {
                    var h = c[g]
                      , i = b[g];
                    c !== i && (f && i && "object" == typeof i && !i.nodeType ? c[g] = a.jqplot.extend(f, h || (null != i.length ? [] : {}), i) : i !== F && (c[g] = i))
                }
        return c
    }
    ,
    a.jqplot.ThemeEngine.prototype.rename = function(a, b) {
        if ("Default" == a || "Default" == b)
            throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default");
        if (this.themes.hasOwnProperty(b))
            throw new Error("jqplot.ThemeEngine Error: New name already in use.");
        if (this.themes.hasOwnProperty(a)) {
            var c = this.copy(a, b);
            return this.remove(a),
            c
        }
        throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid")
    }
    ,
    a.jqplot.ThemeEngine.prototype.copy = function(b, c, d) {
        if ("Default" == c)
            throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme");
        if (!this.themes.hasOwnProperty(b)) {
            var e = "jqplot.ThemeEngine Error: Source name invalid";
            throw new Error(e)
        }
        if (this.themes.hasOwnProperty(c)) {
            var e = "jqplot.ThemeEngine Error: Target name invalid";
            throw new Error(e)
        }
        var f = A(this.themes[b]);
        return f._name = c,
        a.jqplot.extend(!0, f, d),
        this._add(f),
        f
    }
    ,
    a.jqplot.Theme = function(b, c) {
        "object" == typeof b && (c = c || b,
        b = null),
        b = b || Date.parse(new Date),
        this._name = b,
        this.target = {
            backgroundColor: null
        },
        this.legend = {
            textColor: null,
            fontFamily: null,
            fontSize: null,
            border: null,
            background: null
        },
        this.title = {
            textColor: null,
            fontFamily: null,
            fontSize: null,
            textAlign: null
        },
        this.seriesStyles = {},
        this.series = [],
        this.grid = {
            drawGridlines: null,
            gridLineColor: null,
            gridLineWidth: null,
            backgroundColor: null,
            borderColor: null,
            borderWidth: null,
            shadow: null
        },
        this.axesStyles = {
            label: {},
            ticks: {}
        },
        this.axes = {},
        "string" == typeof c ? this._name = c : "object" == typeof c && a.jqplot.extend(!0, this, c)
    }
    ;
    var I = function() {
        this.borderColor = null,
        this.borderWidth = null,
        this.ticks = new J,
        this.label = new K
    }
      , J = function() {
        this.show = null,
        this.showGridline = null,
        this.showLabel = null,
        this.showMark = null,
        this.size = null,
        this.textColor = null,
        this.whiteSpace = null,
        this.fontSize = null,
        this.fontFamily = null
    }
      , K = function() {
        this.textColor = null,
        this.whiteSpace = null,
        this.fontSize = null,
        this.fontFamily = null,
        this.fontWeight = null
    }
      , L = function() {
        this.color = null,
        this.lineWidth = null,
        this.linePattern = null,
        this.shadow = null,
        this.fillColor = null,
        this.showMarker = null,
        this.markerOptions = new M
    }
      , M = function() {
        this.show = null,
        this.style = null,
        this.lineWidth = null,
        this.size = null,
        this.color = null,
        this.shadow = null
    }
      , N = function() {
        this.color = null,
        this.seriesColors = null,
        this.lineWidth = null,
        this.shadow = null,
        this.barPadding = null,
        this.barMargin = null,
        this.barWidth = null,
        this.highlightColors = null
    }
      , O = function() {
        this.seriesColors = null,
        this.padding = null,
        this.sliceMargin = null,
        this.fill = null,
        this.shadow = null,
        this.startAngle = null,
        this.lineWidth = null,
        this.highlightColors = null
    }
      , P = function() {
        this.seriesColors = null,
        this.padding = null,
        this.sliceMargin = null,
        this.fill = null,
        this.shadow = null,
        this.startAngle = null,
        this.lineWidth = null,
        this.innerDiameter = null,
        this.thickness = null,
        this.ringMargin = null,
        this.highlightColors = null
    }
      , Q = function() {
        this.color = null,
        this.lineWidth = null,
        this.shadow = null,
        this.padding = null,
        this.sectionMargin = null,
        this.seriesColors = null,
        this.highlightColors = null
    }
      , R = function() {
        this.padding = null,
        this.backgroundColor = null,
        this.ringColor = null,
        this.tickColor = null,
        this.ringWidth = null,
        this.intervalColors = null,
        this.intervalInnerRadius = null,
        this.intervalOuterRadius = null,
        this.hubRadius = null,
        this.needleThickness = null,
        this.needlePad = null
    };
    a.fn.jqplotChildText = function() {
        return a(this).contents().filter(function() {
            return 3 == this.nodeType
        }).text()
    }
    ,
    a.fn.jqplotGetComputedFontStyle = function() {
        for (var a = window.getComputedStyle ? window.getComputedStyle(this[0], "") : this[0].currentStyle, b = a["font-style"] ? ["font-style", "font-weight", "font-size", "font-family"] : ["fontStyle", "fontWeight", "fontSize", "fontFamily"], c = [], d = 0; d < b.length; ++d) {
            var e = String(a[b[d]]);
            e && "normal" != e && c.push(e)
        }
        return c.join(" ")
    }
    ,
    a.fn.jqplotToImageCanvas = function(b) {
        function c(b) {
            var c = parseInt(a(b).css("line-height"), 10);
            return isNaN(c) && (c = 1.2 * parseInt(a(b).css("font-size"), 10)),
            c
        }
        function d(b, d, e, f, g, h) {
            for (var i = c(b), j = a(b).innerWidth(), k = (a(b).innerHeight(),
            e.split(/\s+/)), l = k.length, m = "", n = [], o = g, p = f, q = 0; l > q; q++)
                m += k[q],
                d.measureText(m).width > j && (n.push(q),
                m = "",
                q--);
            if (0 === n.length)
                "center" === a(b).css("textAlign") && (p = f + (h - d.measureText(m).width) / 2 - s),
                d.fillText(e, p, g);
            else {
                m = k.slice(0, n[0]).join(" "),
                "center" === a(b).css("textAlign") && (p = f + (h - d.measureText(m).width) / 2 - s),
                d.fillText(m, p, o),
                o += i;
                for (var q = 1, r = n.length; r > q; q++)
                    m = k.slice(n[q - 1], n[q]).join(" "),
                    "center" === a(b).css("textAlign") && (p = f + (h - d.measureText(m).width) / 2 - s),
                    d.fillText(m, p, o),
                    o += i;
                m = k.slice(n[q - 1], k.length).join(" "),
                "center" === a(b).css("textAlign") && (p = f + (h - d.measureText(m).width) / 2 - s),
                d.fillText(m, p, o)
            }
        }
        function e(b, c, f) {
            var g = b.tagName.toLowerCase()
              , h = a(b).position()
              , i = window.getComputedStyle ? window.getComputedStyle(b, "") : b.currentStyle
              , j = c + h.left + parseInt(i.marginLeft, 10) + parseInt(i.borderLeftWidth, 10) + parseInt(i.paddingLeft, 10)
              , k = f + h.top + parseInt(i.marginTop, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.paddingTop, 10)
              , l = m.width;
            if ("div" != g && "span" != g || a(b).hasClass("jqplot-highlighter-tooltip"))
                if ("table" === g && a(b).hasClass("jqplot-table-legend")) {
                    w.strokeStyle = a(b).css("border-top-color"),
                    w.fillStyle = a(b).css("background-color"),
                    w.fillRect(j, k, a(b).innerWidth(), a(b).innerHeight()),
                    parseInt(a(b).css("border-top-width"), 10) > 0 && w.strokeRect(j, k, a(b).innerWidth(), a(b).innerHeight()),
                    a(b).find("div.jqplot-table-legend-swatch-outline").each(function() {
                        var b = a(this);
                        w.strokeStyle = b.css("border-top-color");
                        var c = j + b.position().left
                          , d = k + b.position().top;
                        w.strokeRect(c, d, b.innerWidth(), b.innerHeight()),
                        c += parseInt(b.css("padding-left"), 10),
                        d += parseInt(b.css("padding-top"), 10);
                        var e = b.innerHeight() - 2 * parseInt(b.css("padding-top"), 10)
                          , f = b.innerWidth() - 2 * parseInt(b.css("padding-left"), 10)
                          , g = b.children("div.jqplot-table-legend-swatch");
                        w.fillStyle = g.css("background-color"),
                        w.fillRect(c, d, f, e)
                    }),
                    a(b).find("td.jqplot-table-legend-label").each(function() {
                        var b = a(this)
                          , c = j + b.position().left
                          , e = k + b.position().top + parseInt(b.css("padding-top"), 10);
                        w.font = b.jqplotGetComputedFontStyle(),
                        w.fillStyle = b.css("color"),
                        d(b, w, b.text(), c, e, l)
                    })
                } else
                    "canvas" == g && w.drawImage(b, j, k);
            else {
                a(b).children().each(function() {
                    e(this, j, k)
                });
                var n = a(b).jqplotChildText();
                n && (w.font = a(b).jqplotGetComputedFontStyle(),
                w.fillStyle = a(b).css("color"),
                d(b, w, n, j, k, l))
            }
        }
        b = b || {};
        var f = null == b.x_offset ? 0 : b.x_offset
          , g = null == b.y_offset ? 0 : b.y_offset
          , h = null == b.backgroundColor ? "rgb(255,255,255)" : b.backgroundColor;
        if (0 == a(this).width() || 0 == a(this).height())
            return null;
        if (a.jqplot.use_excanvas)
            return null;
        for (var i, j, k, l, m = document.createElement("canvas"), n = a(this).outerHeight(!0), o = a(this).outerWidth(!0), p = a(this).offset(), q = p.left, r = p.top, s = 0, t = 0, u = ["jqplot-table-legend", "jqplot-xaxis-tick", "jqplot-x2axis-tick", "jqplot-yaxis-tick", "jqplot-y2axis-tick", "jqplot-y3axis-tick", "jqplot-y4axis-tick", "jqplot-y5axis-tick", "jqplot-y6axis-tick", "jqplot-y7axis-tick", "jqplot-y8axis-tick", "jqplot-y9axis-tick", "jqplot-xaxis-label", "jqplot-x2axis-label", "jqplot-yaxis-label", "jqplot-y2axis-label", "jqplot-y3axis-label", "jqplot-y4axis-label", "jqplot-y5axis-label", "jqplot-y6axis-label", "jqplot-y7axis-label", "jqplot-y8axis-label", "jqplot-y9axis-label"], v = 0; v < u.length; v++)
            a(this).find("." + u[v]).each(function() {
                i = a(this).offset().top - r,
                j = a(this).offset().left - q,
                l = j + a(this).outerWidth(!0) + s,
                k = i + a(this).outerHeight(!0) + t,
                -s > j && (o = o - s - j,
                s = -j),
                -t > i && (n = n - t - i,
                t = -i),
                l > o && (o = l),
                k > n && (n = k)
            });
        m.width = o + Number(f),
        m.height = n + Number(g);
        var w = m.getContext("2d");
        return w.save(),
        w.fillStyle = h,
        w.fillRect(0, 0, m.width, m.height),
        w.restore(),
        w.translate(s, t),
        w.textAlign = "left",
        w.textBaseline = "top",
        a(this).children().each(function() {
            e(this, f, g)
        }),
        m
    }
    ,
    a.fn.jqplotToImageStr = function(b) {
        var c = a(this).jqplotToImageCanvas(b);
        return c ? c.toDataURL("image/png") : null
    }
    ,
    a.fn.jqplotToImageElem = function(b) {
        var c = document.createElement("img")
          , d = a(this).jqplotToImageStr(b);
        return c.src = d,
        c
    }
    ,
    a.fn.jqplotToImageElemStr = function(b) {
        var c = "<img src=" + a(this).jqplotToImageStr(b) + " />";
        return c
    }
    ,
    a.fn.jqplotSaveImage = function() {
        var b = a(this).jqplotToImageStr({});
        b && (window.location.href = b.replace("image/png", "image/octet-stream"))
    }
    ,
    a.fn.jqplotViewImage = function() {
        var b = a(this).jqplotToImageElemStr({});
        a(this).jqplotToImageStr({});
        if (b) {
            var c = window.open("");
            c.document.open("image/png"),
            c.document.write(b),
            c.document.close(),
            c = null
        }
    }
    ;
    var S = function() {
        switch (this.syntax = S.config.syntax,
        this._type = "jsDate",
        this.proxy = new Date,
        this.options = {},
        this.locale = S.regional.getLocale(),
        this.formatString = "",
        this.defaultCentury = S.config.defaultCentury,
        arguments.length) {
        case 0:
            break;
        case 1:
            if ("[object Object]" == D(arguments[0]) && "jsDate" != arguments[0]._type) {
                var a = this.options = arguments[0];
                this.syntax = a.syntax || this.syntax,
                this.defaultCentury = a.defaultCentury || this.defaultCentury,
                this.proxy = S.createDate(a.date)
            } else
                this.proxy = S.createDate(arguments[0]);
            break;
        default:
            for (var b = [], c = 0; c < arguments.length; c++)
                b.push(arguments[c]);
            this.proxy = new Date,
            this.proxy.setFullYear.apply(this.proxy, b.slice(0, 3)),
            b.slice(3).length && this.proxy.setHours.apply(this.proxy, b.slice(3))
        }
    };
    S.config = {
        defaultLocale: "en",
        syntax: "perl",
        defaultCentury: 1900
    },
    S.prototype.add = function(a, b) {
        var c = V[b] || V.day;
        return "number" == typeof c ? this.proxy.setTime(this.proxy.getTime() + c * a) : c.add(this, a),
        this
    }
    ,
    S.prototype.clone = function() {
        return new S(this.proxy.getTime())
    }
    ,
    S.prototype.getUtcOffset = function() {
        return 6e4 * this.proxy.getTimezoneOffset()
    }
    ,
    S.prototype.diff = function(a, b, c) {
        if (a = new S(a),
        null === a)
            return null;
        var d = V[b] || V.day;
        if ("number" == typeof d)
            var e = (this.proxy.getTime() - a.proxy.getTime()) / d;
        else
            var e = d.diff(this.proxy, a.proxy);
        return c ? e : Math[e > 0 ? "floor" : "ceil"](e)
    }
    ,
    S.prototype.getAbbrDayName = function() {
        return S.regional[this.locale].dayNamesShort[this.proxy.getDay()]
    }
    ,
    S.prototype.getAbbrMonthName = function() {
        return S.regional[this.locale].monthNamesShort[this.proxy.getMonth()]
    }
    ,
    S.prototype.getAMPM = function() {
        return this.proxy.getHours() >= 12 ? "PM" : "AM"
    }
    ,
    S.prototype.getAmPm = function() {
        return this.proxy.getHours() >= 12 ? "pm" : "am"
    }
    ,
    S.prototype.getCentury = function() {
        return parseInt(this.proxy.getFullYear() / 100, 10)
    }
    ,
    S.prototype.getDate = function() {
        return this.proxy.getDate()
    }
    ,
    S.prototype.getDay = function() {
        return this.proxy.getDay()
    }
    ,
    S.prototype.getDayOfWeek = function() {
        var a = this.proxy.getDay();
        return 0 === a ? 7 : a
    }
    ,
    S.prototype.getDayOfYear = function() {
        var a = this.proxy
          , b = a - new Date("" + a.getFullYear() + "/1/1 GMT");
        return b += 6e4 * a.getTimezoneOffset(),
        a = null,
        parseInt(b / 6e4 / 60 / 24, 10) + 1
    }
    ,
    S.prototype.getDayName = function() {
        return S.regional[this.locale].dayNames[this.proxy.getDay()]
    }
    ,
    S.prototype.getFullWeekOfYear = function() {
        var a = this.proxy
          , b = this.getDayOfYear()
          , c = 6 - a.getDay()
          , d = parseInt((b + c) / 7, 10);
        return d
    }
    ,
    S.prototype.getFullYear = function() {
        return this.proxy.getFullYear()
    }
    ,
    S.prototype.getGmtOffset = function() {
        var a = this.proxy.getTimezoneOffset() / 60
          , b = 0 > a ? "+" : "-";
        return a = Math.abs(a),
        b + U(Math.floor(a), 2) + ":" + U(a % 1 * 60, 2)
    }
    ,
    S.prototype.getHours = function() {
        return this.proxy.getHours()
    }
    ,
    S.prototype.getHours12 = function() {
        var a = this.proxy.getHours();
        return a > 12 ? a - 12 : 0 == a ? 12 : a
    }
    ,
    S.prototype.getIsoWeek = function() {
        var a = this.proxy
          , b = this.getWeekOfYear()
          , c = new Date("" + a.getFullYear() + "/1/1").getDay()
          , d = b + (c > 4 || 1 >= c ? 0 : 1);
        return 53 == d && new Date("" + a.getFullYear() + "/12/31").getDay() < 4 ? d = 1 : 0 === d && (a = new S(new Date("" + (a.getFullYear() - 1) + "/12/31")),
        d = a.getIsoWeek()),
        a = null,
        d
    }
    ,
    S.prototype.getMilliseconds = function() {
        return this.proxy.getMilliseconds()
    }
    ,
    S.prototype.getMinutes = function() {
        return this.proxy.getMinutes()
    }
    ,
    S.prototype.getMonth = function() {
        return this.proxy.getMonth()
    }
    ,
    S.prototype.getMonthName = function() {
        return S.regional[this.locale].monthNames[this.proxy.getMonth()]
    }
    ,
    S.prototype.getMonthNumber = function() {
        return this.proxy.getMonth() + 1
    }
    ,
    S.prototype.getSeconds = function() {
        return this.proxy.getSeconds()
    }
    ,
    S.prototype.getShortYear = function() {
        return this.proxy.getYear() % 100
    }
    ,
    S.prototype.getTime = function() {
        return this.proxy.getTime()
    }
    ,
    S.prototype.getTimezoneAbbr = function() {
        return this.proxy.toString().replace(/^.*\(([^)]+)\)$/, "$1")
    }
    ,
    S.prototype.getTimezoneName = function() {
        var a = /(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());
        return a[1] || a[2] || "GMT" + this.getGmtOffset()
    }
    ,
    S.prototype.getTimezoneOffset = function() {
        return this.proxy.getTimezoneOffset()
    }
    ,
    S.prototype.getWeekOfYear = function() {
        var a = this.getDayOfYear()
          , b = 7 - this.getDayOfWeek()
          , c = parseInt((a + b) / 7, 10);
        return c
    }
    ,
    S.prototype.getUnix = function() {
        return Math.round(this.proxy.getTime() / 1e3, 0)
    }
    ,
    S.prototype.getYear = function() {
        return this.proxy.getYear()
    }
    ,
    S.prototype.next = function(a) {
        return a = a || "day",
        this.clone().add(1, a)
    }
    ,
    S.prototype.set = function() {
        switch (arguments.length) {
        case 0:
            this.proxy = new Date;
            break;
        case 1:
            if ("[object Object]" == D(arguments[0]) && "jsDate" != arguments[0]._type) {
                var a = this.options = arguments[0];
                this.syntax = a.syntax || this.syntax,
                this.defaultCentury = a.defaultCentury || this.defaultCentury,
                this.proxy = S.createDate(a.date)
            } else
                this.proxy = S.createDate(arguments[0]);
            break;
        default:
            for (var b = [], c = 0; c < arguments.length; c++)
                b.push(arguments[c]);
            this.proxy = new Date,
            this.proxy.setFullYear.apply(this.proxy, b.slice(0, 3)),
            b.slice(3).length && this.proxy.setHours.apply(this.proxy, b.slice(3))
        }
        return this
    }
    ,
    S.prototype.setDate = function(a) {
        return this.proxy.setDate(a),
        this
    }
    ,
    S.prototype.setFullYear = function() {
        return this.proxy.setFullYear.apply(this.proxy, arguments),
        this
    }
    ,
    S.prototype.setHours = function() {
        return this.proxy.setHours.apply(this.proxy, arguments),
        this
    }
    ,
    S.prototype.setMilliseconds = function(a) {
        return this.proxy.setMilliseconds(a),
        this
    }
    ,
    S.prototype.setMinutes = function() {
        return this.proxy.setMinutes.apply(this.proxy, arguments),
        this
    }
    ,
    S.prototype.setMonth = function() {
        return this.proxy.setMonth.apply(this.proxy, arguments),
        this
    }
    ,
    S.prototype.setSeconds = function() {
        return this.proxy.setSeconds.apply(this.proxy, arguments),
        this
    }
    ,
    S.prototype.setTime = function(a) {
        return this.proxy.setTime(a),
        this
    }
    ,
    S.prototype.setYear = function() {
        return this.proxy.setYear.apply(this.proxy, arguments),
        this
    }
    ,
    S.prototype.strftime = function(a) {
        return a = a || this.formatString || S.regional[this.locale].formatString,
        S.strftime(this, a, this.syntax)
    }
    ,
    S.prototype.toString = function() {
        return this.proxy.toString()
    }
    ,
    S.prototype.toYmdInt = function() {
        return 1e4 * this.proxy.getFullYear() + 100 * this.getMonthNumber() + this.proxy.getDate()
    }
    ,
    S.regional = {
        en: {
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        fr: {
            monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            monthNamesShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
            dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        de: {
            monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
            monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
            dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
            dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        es: {
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            dayNames: ["Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&aacute;bado"],
            dayNamesShort: ["Dom", "Lun", "Mar", "Mi&eacute;", "Juv", "Vie", "S&aacute;b"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        ru: {
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
            dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        ar: {
            monthNames: ["كانون الثاني", "شباط", "آذار", "نيسان", "آذار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
            monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            dayNames: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
            dayNamesShort: ["سبت", "أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        pt: {
            monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        "pt-BR": {
            monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        pl: {
            monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
            monthNamesShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
            dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
            dayNamesShort: ["Ni", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        nl: {
            monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "July", "Augustus", "September", "Oktober", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
            dayNames: ",".Zaterdag,
            dayNamesShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
            formatString: "%Y-%m-%d %H:%M:%S"
        },
        sv: {
            monthNames: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
            monthNamesShort: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
            dayNames: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
            dayNamesShort: ["sön", "mån", "tis", "ons", "tor", "fre", "lör"],
            formatString: "%Y-%m-%d %H:%M:%S"
        }
    },
    S.regional["en-US"] = S.regional["en-GB"] = S.regional.en,
    S.regional.getLocale = function() {
        var a = S.config.defaultLocale;
        return document && document.getElementsByTagName("html") && document.getElementsByTagName("html")[0].lang && (a = document.getElementsByTagName("html")[0].lang,
        S.regional.hasOwnProperty(a) || (a = S.config.defaultLocale)),
        a
    }
    ;
    var T = 864e5
      , U = function(a, b) {
        a = String(a);
        var c = b - a.length
          , d = String(Math.pow(10, c)).slice(1);
        return d.concat(a)
    }
      , V = {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: T,
        week: 7 * T,
        month: {
            add: function(a, b) {
                V.year.add(a, Math[b > 0 ? "floor" : "ceil"](b / 12));
                var c = a.getMonth() + b % 12;
                12 == c ? (c = 0,
                a.setYear(a.getFullYear() + 1)) : -1 == c && (c = 11,
                a.setYear(a.getFullYear() - 1)),
                a.setMonth(c)
            },
            diff: function(a, b) {
                var c = a.getFullYear() - b.getFullYear()
                  , d = a.getMonth() - b.getMonth() + 12 * c
                  , e = a.getDate() - b.getDate();
                return d + e / 30
            }
        },
        year: {
            add: function(a, b) {
                a.setYear(a.getFullYear() + Math[b > 0 ? "floor" : "ceil"](b))
            },
            diff: function(a, b) {
                return V.month.diff(a, b) / 12
            }
        }
    };
    for (var W in V)
        "s" != W.substring(W.length - 1) && (V[W + "s"] = V[W]);
    var X = function(a, b, c) {
        if (S.formats[c].shortcuts[b])
            return S.strftime(a, S.formats[c].shortcuts[b], c);
        var d = (S.formats[c].codes[b] || "").split(".")
          , e = a["get" + d[0]] ? a["get" + d[0]]() : "";
        return d[1] && (e = U(e, d[1])),
        e
    };
    S.strftime = function(a, b, c, d) {
        var e = "perl"
          , f = S.regional.getLocale();
        c && S.formats.hasOwnProperty(c) ? e = c : c && S.regional.hasOwnProperty(c) && (f = c),
        d && S.formats.hasOwnProperty(d) ? e = d : d && S.regional.hasOwnProperty(d) && (f = d),
        ("[object Object]" != D(a) || "jsDate" != a._type) && (a = new S(a),
        a.locale = f),
        b || (b = a.formatString || S.regional[f].formatString);
        for (var g, h = b || "%Y-%m-%d", i = ""; h.length > 0; )
            (g = h.match(S.formats[e].codes.matcher)) ? (i += h.slice(0, g.index),
            i += (g[1] || "") + X(a, g[2], e),
            h = h.slice(g.index + g[0].length)) : (i += h,
            h = "");
        return i
    }
    ,
    S.formats = {
        ISO: "%Y-%m-%dT%H:%M:%S.%N%G",
        SQL: "%Y-%m-%d %H:%M:%S"
    },
    S.formats.perl = {
        codes: {
            matcher: /()%(#?(%|[a-z]))/i,
            Y: "FullYear",
            y: "ShortYear.2",
            m: "MonthNumber.2",
            "#m": "MonthNumber",
            B: "MonthName",
            b: "AbbrMonthName",
            d: "Date.2",
            "#d": "Date",
            e: "Date",
            A: "DayName",
            a: "AbbrDayName",
            w: "Day",
            H: "Hours.2",
            "#H": "Hours",
            I: "Hours12.2",
            "#I": "Hours12",
            p: "AMPM",
            M: "Minutes.2",
            "#M": "Minutes",
            S: "Seconds.2",
            "#S": "Seconds",
            s: "Unix",
            N: "Milliseconds.3",
            "#N": "Milliseconds",
            O: "TimezoneOffset",
            Z: "TimezoneName",
            G: "GmtOffset"
        },
        shortcuts: {
            F: "%Y-%m-%d",
            T: "%H:%M:%S",
            X: "%H:%M:%S",
            x: "%m/%d/%y",
            D: "%m/%d/%y",
            "#c": "%a %b %e %H:%M:%S %Y",
            v: "%e-%b-%Y",
            R: "%H:%M",
            r: "%I:%M:%S %p",
            t: "	",
            n: "\n",
            "%": "%"
        }
    },
    S.formats.php = {
        codes: {
            matcher: /()%((%|[a-z]))/i,
            a: "AbbrDayName",
            A: "DayName",
            d: "Date.2",
            e: "Date",
            j: "DayOfYear.3",
            u: "DayOfWeek",
            w: "Day",
            U: "FullWeekOfYear.2",
            V: "IsoWeek.2",
            W: "WeekOfYear.2",
            b: "AbbrMonthName",
            B: "MonthName",
            m: "MonthNumber.2",
            h: "AbbrMonthName",
            C: "Century.2",
            y: "ShortYear.2",
            Y: "FullYear",
            H: "Hours.2",
            I: "Hours12.2",
            l: "Hours12",
            p: "AMPM",
            P: "AmPm",
            M: "Minutes.2",
            S: "Seconds.2",
            s: "Unix",
            O: "TimezoneOffset",
            z: "GmtOffset",
            Z: "TimezoneAbbr"
        },
        shortcuts: {
            D: "%m/%d/%y",
            F: "%Y-%m-%d",
            T: "%H:%M:%S",
            X: "%H:%M:%S",
            x: "%m/%d/%y",
            R: "%H:%M",
            r: "%I:%M:%S %p",
            t: "	",
            n: "\n",
            "%": "%"
        }
    },
    S.createDate = function(a) {
        function b(a, b) {
            var c, d, e, f, g = parseFloat(b[1]), h = parseFloat(b[2]), i = parseFloat(b[3]), j = S.config.defaultCentury;
            return g > 31 ? (d = i,
            e = h,
            c = j + g) : (d = h,
            e = g,
            c = j + i),
            f = e + "/" + d + "/" + c,
            a.replace(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/, f)
        }
        if (null == a)
            return new Date;
        if (a instanceof Date)
            return a;
        if ("number" == typeof a)
            return new Date(a);
        var c = String(a).replace(/^\s*(.+)\s*$/g, "$1");
        c = c.replace(/^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,4})/, "$1/$2/$3"),
        c = c.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{4})/i, "$1 $2 $3");
        var d = c.match(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i);
        if (d && d.length > 3) {
            var e = parseFloat(d[3])
              , f = S.config.defaultCentury + e;
            f = String(f),
            c = c.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i, d[1] + " " + d[2] + " " + f)
        }
        d = c.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[^0-9]/),
        d && d.length > 3 && (c = b(c, d));
        var d = c.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})$/);
        d && d.length > 3 && (c = b(c, d));
        for (var g, h, i, j = 0, k = S.matchers.length, l = c; k > j; ) {
            if (h = Date.parse(l),
            !isNaN(h))
                return new Date(h);
            if (g = S.matchers[j],
            "function" == typeof g) {
                if (i = g.call(S, l),
                i instanceof Date)
                    return i
            } else
                l = c.replace(g[0], g[1]);
            j++
        }
        return NaN
    }
    ,
    S.daysInMonth = function(a, b) {
        return 2 == b ? 29 == new Date(a,1,29).getDate() ? 29 : 28 : [F, 31, F, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
    }
    ,
    S.matchers = [[/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/, "$2/$1/$3"], [/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/, "$2/$3/$1"], function(a) {
        var b = a.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);
        if (b) {
            if (b[1]) {
                var c = this.createDate(b[1]);
                if (isNaN(c))
                    return
            } else {
                var c = new Date;
                c.setMilliseconds(0)
            }
            var d = parseFloat(b[2]);
            return b[6] && (d = "am" == b[6].toLowerCase() ? 12 == d ? 0 : d : 12 == d ? 12 : d + 12),
            c.setHours(d, parseInt(b[3] || 0, 10), parseInt(b[4] || 0, 10), 1e3 * (parseFloat(b[5] || 0) || 0)),
            c
        }
        return a
    }
    , function(a) {
        var b = a.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);
        if (b) {
            if (b[1]) {
                var c = this.createDate(b[1]);
                if (isNaN(c))
                    return
            } else {
                var c = new Date;
                c.setMilliseconds(0)
            }
            var d = parseFloat(b[2]);
            return c.setHours(d, parseInt(b[3], 10), parseInt(b[4], 10), 1e3 * parseFloat(b[5])),
            c
        }
        return a
    }
    , function(a) {
        var b = a.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);
        if (b) {
            var c, d, e, f = new Date, g = S.config.defaultCentury, h = parseFloat(b[1]), i = parseFloat(b[3]);
            h > 31 ? (d = i,
            c = g + h) : (d = h,
            c = g + i);
            var e = C(b[2], S.regional[S.regional.getLocale()].monthNamesShort);
            return -1 == e && (e = C(b[2], S.regional[S.regional.getLocale()].monthNames)),
            f.setFullYear(c, e, d),
            f.setHours(0, 0, 0, 0),
            f
        }
        return a
    }
    ],
    a.jsDate = S,
    a.jqplot.sprintf = function() {
        function b(a, b, c, d) {
            var e = a.length >= b ? "" : Array(1 + b - a.length >>> 0).join(c);
            return d ? a + e : e + a
        }
        function c(b) {
            for (var c = new String(b), d = 10; d > 0 && c != (c = c.replace(/^(\d+)(\d{3})/, "$1" + a.jqplot.sprintf.thousandsSeparator + "$2")); d--)
                ;
            return c
        }
        function d(a, c, d, e, f, g) {
            var h = e - a.length;
            if (h > 0) {
                var i = " ";
                g && (i = "&nbsp;"),
                a = d || !f ? b(a, e, i, d) : a.slice(0, c.length) + b("", h, "0", !0) + a.slice(c.length)
            }
            return a
        }
        function e(a, c, e, f, g, h, i, j) {
            var k = a >>> 0;
            return e = e && k && {
                2: "0b",
                8: "0",
                16: "0x"
            }[c] || "",
            a = e + b(k.toString(c), h || 0, "0", !1),
            d(a, e, f, g, i, j)
        }
        function f(a, b, c, e, f, g) {
            return null != e && (a = a.slice(0, e)),
            d(a, "", b, c, f, g)
        }
        var g = arguments
          , h = 0
          , i = g[h++];
        return i.replace(a.jqplot.sprintf.regex, function(i, j, k, l, m, n, o) {
            if ("%%" == i)
                return "%";
            for (var p = !1, q = "", r = !1, s = !1, t = !1, u = !1, v = 0; k && v < k.length; v++)
                switch (k.charAt(v)) {
                case " ":
                    q = " ";
                    break;
                case "+":
                    q = "+";
                    break;
                case "-":
                    p = !0;
                    break;
                case "0":
                    r = !0;
                    break;
                case "#":
                    s = !0;
                    break;
                case "&":
                    t = !0;
                    break;
                case "'":
                    u = !0
                }
            if (l = l ? "*" == l ? +g[h++] : "*" == l.charAt(0) ? +g[l.slice(1, -1)] : +l : 0,
            0 > l && (l = -l,
            p = !0),
            !isFinite(l))
                throw new Error("$.jqplot.sprintf: (minimum-)width must be finite");
            n = n ? "*" == n ? +g[h++] : "*" == n.charAt(0) ? +g[n.slice(1, -1)] : +n : "fFeE".indexOf(o) > -1 ? 6 : "d" == o ? 0 : void 0;
            var w = j ? g[j.slice(0, -1)] : g[h++];
            switch (o) {
            case "s":
                return null == w ? "" : f(String(w), p, l, n, r, t);
            case "c":
                return f(String.fromCharCode(+w), p, l, n, r, t);
            case "b":
                return e(w, 2, s, p, l, n, r, t);
            case "o":
                return e(w, 8, s, p, l, n, r, t);
            case "x":
                return e(w, 16, s, p, l, n, r, t);
            case "X":
                return e(w, 16, s, p, l, n, r, t).toUpperCase();
            case "u":
                return e(w, 10, s, p, l, n, r, t);
            case "i":
                var x = parseInt(+w, 10);
                if (isNaN(x))
                    return "";
                var y = 0 > x ? "-" : q
                  , z = u ? c(String(Math.abs(x))) : String(Math.abs(x));
                return w = y + b(z, n, "0", !1),
                d(w, y, p, l, r, t);
            case "d":
                var x = Math.round(+w);
                if (isNaN(x))
                    return "";
                var y = 0 > x ? "-" : q
                  , z = u ? c(String(Math.abs(x))) : String(Math.abs(x));
                return w = y + b(z, n, "0", !1),
                d(w, y, p, l, r, t);
            case "e":
            case "E":
            case "f":
            case "F":
            case "g":
            case "G":
                var x = +w;
                if (isNaN(x))
                    return "";
                var y = 0 > x ? "-" : q
                  , A = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(o.toLowerCase())]
                  , B = ["toString", "toUpperCase"]["eEfFgG".indexOf(o) % 2]
                  , z = Math.abs(x)[A](n)
                  , C = z.toString().split(".");
                C[0] = u ? c(C[0]) : C[0],
                z = C.join(a.jqplot.sprintf.decimalMark),
                w = y + z;
                var D = d(w, y, p, l, r, t)[B]();
                return D;
            case "p":
            case "P":
                var x = +w;
                if (isNaN(x))
                    return "";
                var y = 0 > x ? "-" : q
                  , C = String(Number(Math.abs(x)).toExponential()).split(/e|E/)
                  , E = -1 != C[0].indexOf(".") ? C[0].length - 1 : String(x).length
                  , F = C[1] < 0 ? -C[1] - 1 : 0;
                if (Math.abs(x) < 1)
                    w = n >= E + F ? y + Math.abs(x).toPrecision(E) : n - 1 >= E ? y + Math.abs(x).toExponential(E - 1) : y + Math.abs(x).toExponential(n - 1);
                else {
                    var G = n >= E ? E : n;
                    w = y + Math.abs(x).toPrecision(G)
                }
                var B = ["toString", "toUpperCase"]["pP".indexOf(o) % 2];
                return d(w, y, p, l, r, t)[B]();
            case "n":
                return "";
            default:
                return i
            }
        })
    }
    ,
    a.jqplot.sprintf.thousandsSeparator = ",",
    a.jqplot.sprintf.decimalMark = ".",
    a.jqplot.sprintf.regex = /%%|%(\d+\$)?([-+#0&\' ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g,
    a.jqplot.getSignificantFigures = function(a) {
        var b = String(Number(Math.abs(a)).toExponential()).split(/e|E/)
          , c = -1 != b[0].indexOf(".") ? b[0].length - 1 : b[0].length
          , d = b[1] < 0 ? -b[1] - 1 : 0
          , e = parseInt(b[1], 10)
          , f = e + 1 > 0 ? e + 1 : 0
          , g = f >= c ? 0 : c - e - 1;
        return {
            significantDigits: c,
            digitsLeft: f,
            digitsRight: g,
            zeros: d,
            exponent: e
        }
    }
    ,
    a.jqplot.getPrecision = function(b) {
        return a.jqplot.getSignificantFigures(b).digitsRight
    }
    ;
    var Y = a.uiBackCompat !== !1;
    a.jqplot.effects = {
        effect: {}
    };
    var Z = "jqplot.storage.";
    a.extend(a.jqplot.effects, {
        version: "1.9pre",
        save: function(a, b) {
            for (var c = 0; c < b.length; c++)
                null !== b[c] && a.data(Z + b[c], a[0].style[b[c]])
        },
        restore: function(a, b) {
            for (var c = 0; c < b.length; c++)
                null !== b[c] && a.css(b[c], a.data(Z + b[c]))
        },
        setMode: function(a, b) {
            return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"),
            b
        },
        createWrapper: function(b) {
            if (b.parent().is(".ui-effects-wrapper"))
                return b.parent();
            var c = {
                width: b.outerWidth(!0),
                height: b.outerHeight(!0),
                "float": b.css("float")
            }
              , d = a("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            })
              , e = {
                width: b.width(),
                height: b.height()
            }
              , f = document.activeElement;
            return b.wrap(d),
            (b[0] === f || a.contains(b[0], f)) && a(f).focus(),
            d = b.parent(),
            "static" === b.css("position") ? (d.css({
                position: "relative"
            }),
            b.css({
                position: "relative"
            })) : (a.extend(c, {
                position: b.css("position"),
                zIndex: b.css("z-index")
            }),
            a.each(["top", "left", "bottom", "right"], function(a, d) {
                c[d] = b.css(d),
                isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
            }),
            b.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            })),
            b.css(e),
            d.css(c).show()
        },
        removeWrapper: function(b) {
            var c = document.activeElement;
            return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b),
            (b[0] === c || a.contains(b[0], c)) && a(c).focus()),
            b
        }
    }),
    a.fn.extend({
        jqplotEffect: function(b, c, d, e) {
            function f(b) {
                function c() {
                    a.isFunction(e) && e.call(d[0]),
                    a.isFunction(b) && b()
                }
                var d = a(this)
                  , e = g.complete
                  , f = g.mode;
                (d.is(":hidden") ? "hide" === f : "show" === f) ? c() : j.call(d[0], g, c)
            }
            var g = E.apply(this, arguments)
              , h = g.mode
              , i = g.queue
              , j = a.jqplot.effects.effect[g.effect]
              , k = !j && Y && a.jqplot.effects[g.effect];
            return a.fx.off || !j && !k ? h ? this[h](g.duration, g.complete) : this.each(function() {
                g.complete && g.complete.call(this)
            }) : j ? i === !1 ? this.each(f) : this.queue(i || "fx", f) : k.call(this, {
                options: g,
                duration: g.duration,
                callback: g.complete,
                mode: g.mode
            })
        }
    });
    var $ = /up|down|vertical/
      , _ = /up|left|vertical|horizontal/;
    a.jqplot.effects.effect.blind = function(b, c) {
        var d, e, f, g = a(this), h = ["position", "top", "bottom", "left", "right", "height", "width"], i = a.jqplot.effects.setMode(g, b.mode || "hide"), j = b.direction || "up", k = $.test(j), l = k ? "height" : "width", m = k ? "top" : "left", n = _.test(j), o = {}, p = "show" === i;
        g.parent().is(".ui-effects-wrapper") ? a.jqplot.effects.save(g.parent(), h) : a.jqplot.effects.save(g, h),
        g.show(),
        f = parseInt(g.css("top"), 10),
        d = a.jqplot.effects.createWrapper(g).css({
            overflow: "hidden"
        }),
        e = k ? d[l]() + f : d[l](),
        o[l] = p ? String(e) : "0",
        n || (g.css(k ? "bottom" : "right", 0).css(k ? "top" : "left", "").css({
            position: "absolute"
        }),
        o[m] = p ? "0" : String(e)),
        p && (d.css(l, 0),
        n || d.css(m, e)),
        d.animate(o, {
            duration: b.duration,
            easing: b.easing,
            queue: !1,
            complete: function() {
                "hide" === i && g.hide(),
                a.jqplot.effects.restore(g, h),
                a.jqplot.effects.removeWrapper(g),
                c()
            }
        })
    }
}(jQuery),
function(a) {
    function b(b, c, d, e) {
        if ("horizontal" == this.rendererOptions.barDirection && (this._stackAxis = "x",
        this._primaryAxis = "_yaxis"),
        1 == this.rendererOptions.waterfall) {
            this._data = a.extend(!0, [], this.data);
            for (var f = 0, g = this.rendererOptions.barDirection && "vertical" !== this.rendererOptions.barDirection && this.transposedData !== !1 ? 0 : 1, h = 0; h < this.data.length; h++)
                f += this.data[h][g],
                h > 0 && (this.data[h][g] += this.data[h - 1][g]);
            this.data[this.data.length] = 1 == g ? [this.data.length + 1, f] : [f, this.data.length + 1],
            this._data[this._data.length] = 1 == g ? [this._data.length + 1, f] : [f, this._data.length + 1]
        }
        if (this.rendererOptions.groups > 1) {
            this.breakOnNull = !0;
            for (var i = this.data.length, j = parseInt(i / this.rendererOptions.groups, 10), k = 0, h = j; i > h; h += j)
                this.data.splice(h + k, 0, [null, null]),
                this._plotData.splice(h + k, 0, [null, null]),
                this._stackData.splice(h + k, 0, [null, null]),
                k++;
            for (h = 0; h < this.data.length; h++)
                "_xaxis" == this._primaryAxis ? (this.data[h][0] = h + 1,
                this._plotData[h][0] = h + 1,
                this._stackData[h][0] = h + 1) : (this.data[h][1] = h + 1,
                this._plotData[h][1] = h + 1,
                this._stackData[h][1] = h + 1)
        }
    }
    function c(a, b, d, e, f) {
        var g, h, i = a, j = a - 1, k = "x" === f ? 0 : 1;
        return i > 0 ? (h = e.series[j]._plotData[b][k],
        g = 0 > d * h ? c(j, b, d, e, f) : e.series[j].gridData[b][k]) : g = 0 === k ? e.series[i]._xaxis.series_u2p(0) : e.series[i]._yaxis.series_u2p(0),
        g
    }
    function d(b, c, d) {
        for (var e = 0; e < this.series.length; e++)
            this.series[e].renderer.constructor == a.jqplot.BarRenderer && this.series[e].highlightMouseOver && (this.series[e].highlightMouseDown = !1)
    }
    function e() {
        this.plugins.barRenderer && this.plugins.barRenderer.highlightCanvas && (this.plugins.barRenderer.highlightCanvas.resetCanvas(),
        this.plugins.barRenderer.highlightCanvas = null),
        this.plugins.barRenderer = {
            highlightedSeriesIndex: null
        },
        this.plugins.barRenderer.highlightCanvas = new a.jqplot.GenericCanvas,
        this.eventCanvas._elem.before(this.plugins.barRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-barRenderer-highlight-canvas", this._plotDimensions, this)),
        this.plugins.barRenderer.highlightCanvas.setContext(),
        this.eventCanvas._elem.bind("mouseleave", {
            plot: this
        }, function(a) {
            g(a.data.plot)
        })
    }
    function f(a, b, c, d) {
        var e = a.series[b]
          , f = a.plugins.barRenderer.highlightCanvas;
        f._ctx.clearRect(0, 0, f._ctx.canvas.width, f._ctx.canvas.height),
        e._highlightedPoint = c,
        a.plugins.barRenderer.highlightedSeriesIndex = b;
        var g = {
            fillStyle: e.highlightColors[c]
        };
        e.renderer.shapeRenderer.draw(f._ctx, d, g),
        f = null
    }
    function g(a) {
        var b = a.plugins.barRenderer.highlightCanvas;
        b._ctx.clearRect(0, 0, b._ctx.canvas.width, b._ctx.canvas.height);
        for (var c = 0; c < a.series.length; c++)
            a.series[c]._highlightedPoint = null;
        a.plugins.barRenderer.highlightedSeriesIndex = null,
        a.target.trigger("jqplotDataUnhighlight"),
        b = null
    }
    function h(a, b, c, d, e) {
        if (d) {
            var h = [d.seriesIndex, d.pointIndex, d.data]
              , i = jQuery.Event("jqplotDataMouseOver");
            if (i.pageX = a.pageX,
            i.pageY = a.pageY,
            e.target.trigger(i, h),
            e.series[h[0]].show && e.series[h[0]].highlightMouseOver && (h[0] != e.plugins.barRenderer.highlightedSeriesIndex || h[1] != e.series[h[0]]._highlightedPoint)) {
                var j = jQuery.Event("jqplotDataHighlight");
                j.which = a.which,
                j.pageX = a.pageX,
                j.pageY = a.pageY,
                e.target.trigger(j, h),
                f(e, d.seriesIndex, d.pointIndex, d.points)
            }
        } else
            null == d && g(e)
    }
    function i(a, b, c, d, e) {
        if (d) {
            var h = [d.seriesIndex, d.pointIndex, d.data];
            if (e.series[h[0]].highlightMouseDown && (h[0] != e.plugins.barRenderer.highlightedSeriesIndex || h[1] != e.series[h[0]]._highlightedPoint)) {
                var i = jQuery.Event("jqplotDataHighlight");
                i.which = a.which,
                i.pageX = a.pageX,
                i.pageY = a.pageY,
                e.target.trigger(i, h),
                f(e, d.seriesIndex, d.pointIndex, d.points)
            }
        } else
            null == d && g(e)
    }
    function j(a, b, c, d, e) {
        var f = e.plugins.barRenderer.highlightedSeriesIndex;
        null != f && e.series[f].highlightMouseDown && g(e)
    }
    function k(a, b, c, d, e) {
        if (d) {
            var f = [d.seriesIndex, d.pointIndex, d.data]
              , g = jQuery.Event("jqplotDataClick");
            g.which = a.which,
            g.pageX = a.pageX,
            g.pageY = a.pageY,
            e.target.trigger(g, f)
        }
    }
    function l(a, b, c, d, e) {
        if (d) {
            var f = [d.seriesIndex, d.pointIndex, d.data]
              , h = e.plugins.barRenderer.highlightedSeriesIndex;
            null != h && e.series[h].highlightMouseDown && g(e);
            var i = jQuery.Event("jqplotDataRightClick");
            i.which = a.which,
            i.pageX = a.pageX,
            i.pageY = a.pageY,
            e.target.trigger(i, f)
        }
    }
    a.jqplot.BarRenderer = function() {
        a.jqplot.LineRenderer.call(this)
    }
    ,
    a.jqplot.BarRenderer.prototype = new a.jqplot.LineRenderer,
    a.jqplot.BarRenderer.prototype.constructor = a.jqplot.BarRenderer,
    a.jqplot.BarRenderer.prototype.init = function(b, c) {
        this.barPadding = 8,
        this.barMargin = 10,
        this.barDirection = "vertical",
        this.barWidth = null,
        this.shadowOffset = 2,
        this.shadowDepth = 5,
        this.shadowAlpha = .08,
        this.waterfall = !1,
        this.groups = 1,
        this.varyBarColor = !1,
        this.highlightMouseOver = !0,
        this.highlightMouseDown = !1,
        this.highlightColors = [],
        this.transposedData = !0,
        this.renderer.animation = {
            show: !1,
            direction: "down",
            speed: 3e3,
            _supported: !0
        },
        this._type = "bar",
        b.highlightMouseDown && null == b.highlightMouseOver && (b.highlightMouseOver = !1),
        a.extend(!0, this, b),
        a.extend(!0, this.renderer, b),
        this.fill = !0,
        "horizontal" === this.barDirection && this.rendererOptions.animation && null == this.rendererOptions.animation.direction && (this.renderer.animation.direction = "left"),
        this.waterfall && (this.fillToZero = !1,
        this.disableStack = !0),
        "vertical" == this.barDirection ? (this._primaryAxis = "_xaxis",
        this._stackAxis = "y",
        this.fillAxis = "y") : (this._primaryAxis = "_yaxis",
        this._stackAxis = "x",
        this.fillAxis = "x"),
        this._highlightedPoint = null,
        this._plotSeriesInfo = null,
        this._dataColors = [],
        this._barPoints = [];
        var f = {
            lineJoin: "miter",
            lineCap: "round",
            fill: !0,
            isarc: !1,
            strokeStyle: this.color,
            fillStyle: this.color,
            closePath: this.fill
        };
        this.renderer.shapeRenderer.init(f);
        var g = {
            lineJoin: "miter",
            lineCap: "round",
            fill: !0,
            isarc: !1,
            angle: this.shadowAngle,
            offset: this.shadowOffset,
            alpha: this.shadowAlpha,
            depth: this.shadowDepth,
            closePath: this.fill
        };
        this.renderer.shadowRenderer.init(g),
        c.postInitHooks.addOnce(d),
        c.postDrawHooks.addOnce(e),
        c.eventListenerHooks.addOnce("jqplotMouseMove", h),
        c.eventListenerHooks.addOnce("jqplotMouseDown", i),
        c.eventListenerHooks.addOnce("jqplotMouseUp", j),
        c.eventListenerHooks.addOnce("jqplotClick", k),
        c.eventListenerHooks.addOnce("jqplotRightClick", l)
    }
    ,
    a.jqplot.preSeriesInitHooks.push(b),
    a.jqplot.BarRenderer.prototype.calcSeriesNumbers = function() {
        for (var b, c, d = 0, e = 0, f = this[this._primaryAxis], g = 0; g < f._series.length; g++)
            b = f._series[g],
            b === this && (c = g),
            b.renderer.constructor == a.jqplot.BarRenderer && (d += b.data.length,
            e += 1);
        return [d, e, c]
    }
    ,
    a.jqplot.BarRenderer.prototype.setBarWidth = function() {
        var a = 0
          , b = 0
          , c = this[this._primaryAxis]
          , d = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
        a = d[0],
        b = d[1];
        var e = c.numberTicks
          , f = (e - 1) / 2;
        return "xaxis" == c.name || "x2axis" == c.name ? this._stack ? this.barWidth = (c._offsets.max - c._offsets.min) / a * b - this.barMargin : this.barWidth = ((c._offsets.max - c._offsets.min) / f - this.barPadding * (b - 1) - 2 * this.barMargin) / b : this._stack ? this.barWidth = (c._offsets.min - c._offsets.max) / a * b - this.barMargin : this.barWidth = ((c._offsets.min - c._offsets.max) / f - this.barPadding * (b - 1) - 2 * this.barMargin) / b,
        [a, b]
    }
    ,
    a.jqplot.BarRenderer.prototype.draw = function(b, d, e, f) {
        var g, h = a.extend({}, e), i = void 0 != h.shadow ? h.shadow : this.shadow, j = void 0 != h.showLine ? h.showLine : this.showLine;
        void 0 != h.fill ? h.fill : this.fill,
        this.xaxis,
        this.yaxis,
        this._xaxis.series_u2p,
        this._yaxis.series_u2p;
        this._dataColors = [],
        this._barPoints = [],
        null == this.barWidth && this.renderer.setBarWidth.call(this);
        var k = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this)
          , l = (k[0],
        k[1])
          , m = k[2]
          , n = [];
        if (this._stack ? this._barNudge = 0 : this._barNudge = (-Math.abs(l / 2 - .5) + m) * (this.barWidth + this.barPadding),
        j) {
            var o = new a.jqplot.ColorGenerator(this.negativeSeriesColors)
              , p = new a.jqplot.ColorGenerator(this.seriesColors)
              , q = o.get(this.index);
            this.useNegativeColors || (q = h.fillStyle);
            var r, s, t, u = h.fillStyle;
            if ("vertical" == this.barDirection) {
                for (var g = 0; g < d.length; g++)
                    if (this._stack || null != this.data[g][1]) {
                        if (n = [],
                        r = d[g][0] + this._barNudge,
                        t = this._stack && this._prevGridData.length ? c(this.index, g, this._plotData[g][1], f, "y") : this.fillToZero ? this._yaxis.series_u2p(0) : this.waterfall && g > 0 && g < this.gridData.length - 1 ? this.gridData[g - 1][1] : this.waterfall && 0 == g && g < this.gridData.length - 1 ? this._yaxis.min <= 0 && this._yaxis.max >= 0 ? this._yaxis.series_u2p(0) : this._yaxis.min > 0 ? b.canvas.height : 0 : this.waterfall && g == this.gridData.length - 1 ? this._yaxis.min <= 0 && this._yaxis.max >= 0 ? this._yaxis.series_u2p(0) : this._yaxis.min > 0 ? b.canvas.height : 0 : b.canvas.height,
                        this.fillToZero && this._plotData[g][1] < 0 || this.waterfall && this._data[g][1] < 0 ? this.varyBarColor && !this._stack ? this.useNegativeColors ? h.fillStyle = o.next() : h.fillStyle = p.next() : h.fillStyle = q : this.varyBarColor && !this._stack ? h.fillStyle = p.next() : h.fillStyle = u,
                        !this.fillToZero || this._plotData[g][1] >= 0 ? (n.push([r - this.barWidth / 2, t]),
                        n.push([r - this.barWidth / 2, d[g][1]]),
                        n.push([r + this.barWidth / 2, d[g][1]]),
                        n.push([r + this.barWidth / 2, t])) : (n.push([r - this.barWidth / 2, d[g][1]]),
                        n.push([r - this.barWidth / 2, t]),
                        n.push([r + this.barWidth / 2, t]),
                        n.push([r + this.barWidth / 2, d[g][1]])),
                        this._barPoints.push(n),
                        i && !this._stack) {
                            var v = a.extend(!0, {}, h);
                            delete v.fillStyle,
                            this.renderer.shadowRenderer.draw(b, n, v)
                        }
                        var w = h.fillStyle || this.color;
                        this._dataColors.push(w),
                        this.renderer.shapeRenderer.draw(b, n, h)
                    }
            } else if ("horizontal" == this.barDirection)
                for (var g = 0; g < d.length; g++)
                    if (this._stack || null != this.data[g][0]) {
                        if (n = [],
                        r = d[g][1] - this._barNudge,
                        s = this._stack && this._prevGridData.length ? c(this.index, g, this._plotData[g][0], f, "x") : this.fillToZero ? this._xaxis.series_u2p(0) : this.waterfall && g > 0 && g < this.gridData.length - 1 ? this.gridData[g - 1][0] : this.waterfall && 0 == g && g < this.gridData.length - 1 ? this._xaxis.min <= 0 && this._xaxis.max >= 0 ? this._xaxis.series_u2p(0) : (this._xaxis.min > 0,
                        0) : this.waterfall && g == this.gridData.length - 1 ? this._xaxis.min <= 0 && this._xaxis.max >= 0 ? this._xaxis.series_u2p(0) : this._xaxis.min > 0 ? 0 : b.canvas.width : 0,
                        this.fillToZero && this._plotData[g][0] < 0 || this.waterfall && this._data[g][0] < 0 ? this.varyBarColor && !this._stack ? this.useNegativeColors ? h.fillStyle = o.next() : h.fillStyle = p.next() : h.fillStyle = q : this.varyBarColor && !this._stack ? h.fillStyle = p.next() : h.fillStyle = u,
                        !this.fillToZero || this._plotData[g][0] >= 0 ? (n.push([s, r + this.barWidth / 2]),
                        n.push([s, r - this.barWidth / 2]),
                        n.push([d[g][0], r - this.barWidth / 2]),
                        n.push([d[g][0], r + this.barWidth / 2])) : (n.push([d[g][0], r + this.barWidth / 2]),
                        n.push([d[g][0], r - this.barWidth / 2]),
                        n.push([s, r - this.barWidth / 2]),
                        n.push([s, r + this.barWidth / 2])),
                        this._barPoints.push(n),
                        i && !this._stack) {
                            var v = a.extend(!0, {}, h);
                            delete v.fillStyle,
                            this.renderer.shadowRenderer.draw(b, n, v)
                        }
                        var w = h.fillStyle || this.color;
                        this._dataColors.push(w),
                        this.renderer.shapeRenderer.draw(b, n, h)
                    }
        }
        if (0 == this.highlightColors.length)
            this.highlightColors = a.jqplot.computeHighlightColors(this._dataColors);
        else if ("string" == typeof this.highlightColors) {
            var k = this.highlightColors;
            this.highlightColors = [];
            for (var g = 0; g < this._dataColors.length; g++)
                this.highlightColors.push(k)
        }
    }
    ,
    a.jqplot.BarRenderer.prototype.drawShadow = function(a, b, d, e) {
        var f, g, h, i, j, k = void 0 != d ? d : {}, l = (void 0 != k.shadow ? k.shadow : this.shadow,
        void 0 != k.showLine ? k.showLine : this.showLine);
        void 0 != k.fill ? k.fill : this.fill,
        this.xaxis,
        this.yaxis,
        this._xaxis.series_u2p,
        this._yaxis.series_u2p;
        if (this._stack && this.shadow) {
            null == this.barWidth && this.renderer.setBarWidth.call(this);
            var m = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
            if (h = m[0],
            i = m[1],
            j = m[2],
            this._stack ? this._barNudge = 0 : this._barNudge = (-Math.abs(i / 2 - .5) + j) * (this.barWidth + this.barPadding),
            l)
                if ("vertical" == this.barDirection) {
                    for (var f = 0; f < b.length; f++)
                        if (null != this.data[f][1]) {
                            g = [];
                            var n, o = b[f][0] + this._barNudge;
                            n = this._stack && this._prevGridData.length ? c(this.index, f, this._plotData[f][1], e, "y") : this.fillToZero ? this._yaxis.series_u2p(0) : a.canvas.height,
                            g.push([o - this.barWidth / 2, n]),
                            g.push([o - this.barWidth / 2, b[f][1]]),
                            g.push([o + this.barWidth / 2, b[f][1]]),
                            g.push([o + this.barWidth / 2, n]),
                            this.renderer.shadowRenderer.draw(a, g, k)
                        }
                } else if ("horizontal" == this.barDirection)
                    for (var f = 0; f < b.length; f++)
                        if (null != this.data[f][0]) {
                            g = [];
                            var p, o = b[f][1] - this._barNudge;
                            p = this._stack && this._prevGridData.length ? c(this.index, f, this._plotData[f][0], e, "x") : this.fillToZero ? this._xaxis.series_u2p(0) : 0,
                            g.push([p, o + this.barWidth / 2]),
                            g.push([b[f][0], o + this.barWidth / 2]),
                            g.push([b[f][0], o - this.barWidth / 2]),
                            g.push([p, o - this.barWidth / 2]),
                            this.renderer.shadowRenderer.draw(a, g, k)
                        }
        }
    }
}(jQuery),
function(a) {
    a.jqplot.CanvasAxisLabelRenderer = function(b) {
        this.angle = 0,
        this.axis,
        this.show = !0,
        this.showLabel = !0,
        this.label = "",
        this.fontFamily = '"Trebuchet MS", Arial, Helvetica, sans-serif',
        this.fontSize = "11pt",
        this.fontWeight = "normal",
        this.fontStretch = 1,
        this.textColor = "#666666",
        this.enableFontSupport = !0,
        this.pt2px = null,
        this._elem,
        this._ctx,
        this._plotWidth,
        this._plotHeight,
        this._plotDimensions = {
            height: null,
            width: null
        },
        a.extend(!0, this, b),
        null == b.angle && "xaxis" != this.axis && "x2axis" != this.axis && (this.angle = -90);
        var c = {
            fontSize: this.fontSize,
            fontWeight: this.fontWeight,
            fontStretch: this.fontStretch,
            fillStyle: this.textColor,
            angle: this.getAngleRad(),
            fontFamily: this.fontFamily
        };
        this.pt2px && (c.pt2px = this.pt2px),
        this.enableFontSupport && a.jqplot.support_canvas_text() ? this._textRenderer = new a.jqplot.CanvasFontRenderer(c) : this._textRenderer = new a.jqplot.CanvasTextRenderer(c)
    }
    ,
    a.jqplot.CanvasAxisLabelRenderer.prototype.init = function(b) {
        a.extend(!0, this, b),
        this._textRenderer.init({
            fontSize: this.fontSize,
            fontWeight: this.fontWeight,
            fontStretch: this.fontStretch,
            fillStyle: this.textColor,
            angle: this.getAngleRad(),
            fontFamily: this.fontFamily
        })
    }
    ,
    a.jqplot.CanvasAxisLabelRenderer.prototype.getWidth = function(a) {
        if (this._elem)
            return this._elem.outerWidth(!0);
        var b = this._textRenderer
          , c = b.getWidth(a)
          , d = b.getHeight(a)
          , e = Math.abs(Math.sin(b.angle) * d) + Math.abs(Math.cos(b.angle) * c);
        return e
    }
    ,
    a.jqplot.CanvasAxisLabelRenderer.prototype.getHeight = function(a) {
        if (this._elem)
            return this._elem.outerHeight(!0);
        var b = this._textRenderer
          , c = b.getWidth(a)
          , d = b.getHeight(a)
          , e = Math.abs(Math.cos(b.angle) * d) + Math.abs(Math.sin(b.angle) * c);
        return e
    }
    ,
    a.jqplot.CanvasAxisLabelRenderer.prototype.getAngleRad = function() {
        var a = this.angle * Math.PI / 180;
        return a
    }
    ,
    a.jqplot.CanvasAxisLabelRenderer.prototype.draw = function(b, c) {
        this._elem && (a.jqplot.use_excanvas && void 0 !== window.G_vmlCanvasManager.uninitElement && window.G_vmlCanvasManager.uninitElement(this._elem.get(0)),
        this._elem.emptyForce(),
        this._elem = null);
        var d = c.canvasManager.getCanvas();
        this._textRenderer.setText(this.label, b);
        var e = this.getWidth(b)
          , f = this.getHeight(b);
        return d.width = e,
        d.height = f,
        d.style.width = e,
        d.style.height = f,
        d = c.canvasManager.initCanvas(d),
        this._elem = a(d),
        this._elem.css({
            position: "absolute"
        }),
        this._elem.addClass("jqplot-" + this.axis + "-label"),
        d = null,
        this._elem
    }
    ,
    a.jqplot.CanvasAxisLabelRenderer.prototype.pack = function() {
        this._textRenderer.draw(this._elem.get(0).getContext("2d"), this.label)
    }
}(jQuery),
function(a) {
    a.jqplot.CategoryAxisRenderer = function(b) {
        a.jqplot.LinearAxisRenderer.call(this),
        this.sortMergedLabels = !1
    }
    ,
    a.jqplot.CategoryAxisRenderer.prototype = new a.jqplot.LinearAxisRenderer,
    a.jqplot.CategoryAxisRenderer.prototype.constructor = a.jqplot.CategoryAxisRenderer,
    a.jqplot.CategoryAxisRenderer.prototype.init = function(b) {
        this.groups = 1,
        this.groupLabels = [],
        this._groupLabels = [],
        this._grouped = !1,
        this._barsPerGroup = null,
        this.reverse = !1,
        a.extend(!0, this, {
            tickOptions: {
                formatString: "%d"
            }
        }, b);
        for (var c = this._dataBounds, d = 0; d < this._series.length; d++) {
            var e = this._series[d];
            e.groups && (this.groups = e.groups);
            for (var f = e.data, g = 0; g < f.length; g++)
                "xaxis" == this.name || "x2axis" == this.name ? ((f[g][0] < c.min || null == c.min) && (c.min = f[g][0]),
                (f[g][0] > c.max || null == c.max) && (c.max = f[g][0])) : ((f[g][1] < c.min || null == c.min) && (c.min = f[g][1]),
                (f[g][1] > c.max || null == c.max) && (c.max = f[g][1]))
        }
        this.groupLabels.length && (this.groups = this.groupLabels.length)
    }
    ,
    a.jqplot.CategoryAxisRenderer.prototype.createTicks = function() {
        var b, c, d, e, f, g = (this._ticks,
        this.ticks), h = this.name;
        this._dataBounds;
        if (g.length) {
            if (this.groups > 1 && !this._grouped) {
                for (var i = g.length, j = parseInt(i / this.groups, 10), k = 0, f = j; i > f; f += j)
                    g.splice(f + k, 0, " "),
                    k++;
                this._grouped = !0
            }
            this.min = .5,
            this.max = g.length + .5;
            var l = this.max - this.min;
            for (this.numberTicks = 2 * g.length + 1,
            f = 0; f < g.length; f++) {
                e = this.min + 2 * f * l / (this.numberTicks - 1);
                var m = new this.tickRenderer(this.tickOptions);
                m.showLabel = !1,
                m.setTick(e, this.name),
                this._ticks.push(m);
                var m = new this.tickRenderer(this.tickOptions);
                m.label = g[f],
                m.showMark = !1,
                m.showGridline = !1,
                m.setTick(e + .5, this.name),
                this._ticks.push(m)
            }
            var m = new this.tickRenderer(this.tickOptions);
            m.showLabel = !1,
            m.setTick(e + 1, this.name),
            this._ticks.push(m)
        } else {
            b = "xaxis" == h || "x2axis" == h ? this._plotDimensions.width : this._plotDimensions.height,
            null != this.min && null != this.max && null != this.numberTicks && (this.tickInterval = null),
            null != this.min && null != this.max && null != this.tickInterval && parseInt((this.max - this.min) / this.tickInterval, 10) != (this.max - this.min) / this.tickInterval && (this.tickInterval = null);
            for (var d, n, o = [], p = 0, c = .5, q = !1, f = 0; f < this._series.length; f++)
                for (var r = this._series[f], s = 0; s < r.data.length; s++)
                    n = "xaxis" == this.name || "x2axis" == this.name ? r.data[s][0] : r.data[s][1],
                    -1 == a.inArray(n, o) && (q = !0,
                    p += 1,
                    o.push(n));
            q && this.sortMergedLabels && ("string" == typeof o[0] ? o.sort() : o.sort(function(a, b) {
                return a - b
            })),
            this.ticks = o;
            for (var f = 0; f < this._series.length; f++)
                for (var r = this._series[f], s = 0; s < r.data.length; s++) {
                    n = "xaxis" == this.name || "x2axis" == this.name ? r.data[s][0] : r.data[s][1];
                    var t = a.inArray(n, o) + 1;
                    "xaxis" == this.name || "x2axis" == this.name ? r.data[s][0] = t : r.data[s][1] = t
                }
            if (this.groups > 1 && !this._grouped) {
                for (var i = o.length, j = parseInt(i / this.groups, 10), k = 0, f = j; i > f; f += j + 1)
                    o[f] = " ";
                this._grouped = !0
            }
            d = p + .5,
            null == this.numberTicks && (this.numberTicks = 2 * p + 1);
            var l = d - c;
            this.min = c,
            this.max = d;
            var u = 0
              , v = parseInt(3 + b / 10, 10)
              , j = parseInt(p / v, 10);
            null == this.tickInterval && (this.tickInterval = l / (this.numberTicks - 1));
            for (var f = 0; f < this.numberTicks; f++) {
                e = this.min + f * this.tickInterval;
                var m = new this.tickRenderer(this.tickOptions);
                f / 2 == parseInt(f / 2, 10) ? (m.showLabel = !1,
                m.showMark = !0) : (j > 0 && j > u ? (m.showLabel = !1,
                u += 1) : (m.showLabel = !0,
                u = 0),
                m.label = m.formatter(m.formatString, o[(f - 1) / 2]),
                m.showMark = !1,
                m.showGridline = !1),
                m.setTick(e, this.name),
                this._ticks.push(m)
            }
        }
    }
    ,
    a.jqplot.CategoryAxisRenderer.prototype.draw = function(b, c) {
        if (this.show) {
            this.renderer.createTicks.call(this);
            if (this._elem && this._elem.emptyForce(),
            this._elem = this._elem || a('<div class="jqplot-axis jqplot-' + this.name + '" style="position:absolute;"></div>'),
            "xaxis" == this.name || "x2axis" == this.name ? this._elem.width(this._plotDimensions.width) : this._elem.height(this._plotDimensions.height),
            this.labelOptions.axis = this.name,
            this._label = new this.labelRenderer(this.labelOptions),
            this._label.show) {
                var d = this._label.draw(b, c);
                d.appendTo(this._elem)
            }
            for (var e = this._ticks, f = 0; f < e.length; f++) {
                var g = e[f];
                if (g.showLabel && (!g.isMinorTick || this.showMinorTicks)) {
                    var d = g.draw(b, c);
                    d.appendTo(this._elem)
                }
            }
            this._groupLabels = [];
            for (var f = 0; f < this.groupLabels.length; f++) {
                var d = a('<div style="position:absolute;" class="jqplot-' + this.name + '-groupLabel"></div>');
                d.html(this.groupLabels[f]),
                this._groupLabels.push(d),
                d.appendTo(this._elem)
            }
        }
        return this._elem
    }
    ,
    a.jqplot.CategoryAxisRenderer.prototype.set = function() {
        var b, c = 0, d = 0, e = 0, f = null == this._label ? !1 : this._label.show;
        if (this.show) {
            for (var g = this._ticks, h = 0; h < g.length; h++) {
                var i = g[h];
                !i.showLabel || i.isMinorTick && !this.showMinorTicks || (b = "xaxis" == this.name || "x2axis" == this.name ? i._elem.outerHeight(!0) : i._elem.outerWidth(!0),
                b > c && (c = b))
            }
            for (var j = 0, h = 0; h < this._groupLabels.length; h++) {
                var k = this._groupLabels[h];
                b = "xaxis" == this.name || "x2axis" == this.name ? k.outerHeight(!0) : k.outerWidth(!0),
                b > j && (j = b)
            }
            f && (d = this._label._elem.outerWidth(!0),
            e = this._label._elem.outerHeight(!0)),
            "xaxis" == this.name ? (c += j + e,
            this._elem.css({
                height: c + "px",
                left: "0px",
                bottom: "0px"
            })) : "x2axis" == this.name ? (c += j + e,
            this._elem.css({
                height: c + "px",
                left: "0px",
                top: "0px"
            })) : "yaxis" == this.name ? (c += j + d,
            this._elem.css({
                width: c + "px",
                left: "0px",
                top: "0px"
            }),
            f && this._label.constructor == a.jqplot.AxisLabelRenderer && this._label._elem.css("width", d + "px")) : (c += j + d,
            this._elem.css({
                width: c + "px",
                right: "0px",
                top: "0px"
            }),
            f && this._label.constructor == a.jqplot.AxisLabelRenderer && this._label._elem.css("width", d + "px"))
        }
    }
    ,
    a.jqplot.CategoryAxisRenderer.prototype.pack = function(b, c) {
        var d, e = this._ticks, f = this.max, g = this.min, h = c.max, i = c.min, j = null == this._label ? !1 : this._label.show;
        for (var k in b)
            this._elem.css(k, b[k]);
        this._offsets = c;
        var l = h - i
          , m = f - g;
        if (this.reverse ? (this.u2p = function(a) {
            return i + (f - a) * l / m
        }
        ,
        this.p2u = function(a) {
            return g + (a - i) * m / l
        }
        ,
        "xaxis" == this.name || "x2axis" == this.name ? (this.series_u2p = function(a) {
            return (f - a) * l / m
        }
        ,
        this.series_p2u = function(a) {
            return a * m / l + f
        }
        ) : (this.series_u2p = function(a) {
            return (g - a) * l / m
        }
        ,
        this.series_p2u = function(a) {
            return a * m / l + g
        }
        )) : (this.u2p = function(a) {
            return (a - g) * l / m + i
        }
        ,
        this.p2u = function(a) {
            return (a - i) * m / l + g
        }
        ,
        "xaxis" == this.name || "x2axis" == this.name ? (this.series_u2p = function(a) {
            return (a - g) * l / m
        }
        ,
        this.series_p2u = function(a) {
            return a * m / l + g
        }
        ) : (this.series_u2p = function(a) {
            return (a - f) * l / m
        }
        ,
        this.series_p2u = function(a) {
            return a * m / l + f
        }
        )),
        this.show)
            if ("xaxis" == this.name || "x2axis" == this.name) {
                for (d = 0; d < e.length; d++) {
                    var n = e[d];
                    if (n.show && n.showLabel) {
                        var o;
                        if (n.constructor == a.jqplot.CanvasAxisTickRenderer && n.angle) {
                            var p = "xaxis" == this.name ? 1 : -1;
                            switch (n.labelPosition) {
                            case "auto":
                                o = p * n.angle < 0 ? -n.getWidth() + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2 : -n._textRenderer.height * Math.sin(n._textRenderer.angle) / 2;
                                break;
                            case "end":
                                o = -n.getWidth() + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2;
                                break;
                            case "start":
                                o = -n._textRenderer.height * Math.sin(n._textRenderer.angle) / 2;
                                break;
                            case "middle":
                                o = -n.getWidth() / 2 + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2;
                                break;
                            default:
                                o = -n.getWidth() / 2 + n._textRenderer.height * Math.sin(-n._textRenderer.angle) / 2
                            }
                        } else
                            o = -n.getWidth() / 2;
                        var q = this.u2p(n.value) + o + "px";
                        n._elem.css("left", q),
                        n.pack()
                    }
                }
                var r = ["bottom", 0];
                if (j) {
                    var s = this._label._elem.outerWidth(!0);
                    this._label._elem.css("left", i + l / 2 - s / 2 + "px"),
                    "xaxis" == this.name ? (this._label._elem.css("bottom", "0px"),
                    r = ["bottom", this._label._elem.outerHeight(!0)]) : (this._label._elem.css("top", "0px"),
                    r = ["top", this._label._elem.outerHeight(!0)]),
                    this._label.pack()
                }
                var t = parseInt(this._ticks.length / this.groups, 10) + 1;
                for (d = 0; d < this._groupLabels.length; d++) {
                    for (var u = 0, v = 0, w = d * t; (d + 1) * t > w; w++)
                        if (!(w >= this._ticks.length - 1) && this._ticks[w]._elem && " " != this._ticks[w].label) {
                            var n = this._ticks[w]._elem
                              , k = n.position();
                            u += k.left + n.outerWidth(!0) / 2,
                            v++
                        }
                    u /= v,
                    this._groupLabels[d].css({
                        left: u - this._groupLabels[d].outerWidth(!0) / 2
                    }),
                    this._groupLabels[d].css(r[0], r[1])
                }
            } else {
                for (d = 0; d < e.length; d++) {
                    var n = e[d];
                    if (n.show && n.showLabel) {
                        var o;
                        if (n.constructor == a.jqplot.CanvasAxisTickRenderer && n.angle) {
                            var p = "yaxis" == this.name ? 1 : -1;
                            switch (n.labelPosition) {
                            case "auto":
                            case "end":
                                o = p * n.angle < 0 ? -n._textRenderer.height * Math.cos(-n._textRenderer.angle) / 2 : -n.getHeight() + n._textRenderer.height * Math.cos(n._textRenderer.angle) / 2;
                                break;
                            case "start":
                                o = n.angle > 0 ? -n._textRenderer.height * Math.cos(-n._textRenderer.angle) / 2 : -n.getHeight() + n._textRenderer.height * Math.cos(n._textRenderer.angle) / 2;
                                break;
                            case "middle":
                                o = -n.getHeight() / 2;
                                break;
                            default:
                                o = -n.getHeight() / 2
                            }
                        } else
                            o = -n.getHeight() / 2;
                        var q = this.u2p(n.value) + o + "px";
                        n._elem.css("top", q),
                        n.pack()
                    }
                }
                var r = ["left", 0];
                if (j) {
                    var x = this._label._elem.outerHeight(!0);
                    this._label._elem.css("top", h - l / 2 - x / 2 + "px"),
                    "yaxis" == this.name ? (this._label._elem.css("left", "0px"),
                    r = ["left", this._label._elem.outerWidth(!0)]) : (this._label._elem.css("right", "0px"),
                    r = ["right", this._label._elem.outerWidth(!0)]),
                    this._label.pack()
                }
                var t = parseInt(this._ticks.length / this.groups, 10) + 1;
                for (d = 0; d < this._groupLabels.length; d++) {
                    for (var u = 0, v = 0, w = d * t; (d + 1) * t > w; w++)
                        if (!(w >= this._ticks.length - 1) && this._ticks[w]._elem && " " != this._ticks[w].label) {
                            var n = this._ticks[w]._elem
                              , k = n.position();
                            u += k.top + n.outerHeight() / 2,
                            v++
                        }
                    u /= v,
                    this._groupLabels[d].css({
                        top: u - this._groupLabels[d].outerHeight() / 2
                    }),
                    this._groupLabels[d].css(r[0], r[1])
                }
            }
    }
}(jQuery),
function(a) {
    a.jqplot.EnhancedLegendRenderer = function() {
        a.jqplot.TableLegendRenderer.call(this)
    }
    ,
    a.jqplot.EnhancedLegendRenderer.prototype = new a.jqplot.TableLegendRenderer,
    a.jqplot.EnhancedLegendRenderer.prototype.constructor = a.jqplot.EnhancedLegendRenderer,
    a.jqplot.EnhancedLegendRenderer.prototype.init = function(b) {
        this.numberRows = null,
        this.numberColumns = null,
        this.seriesToggle = "normal",
        this.seriesToggleReplot = !1,
        this.disableIEFading = !0,
        a.extend(!0, this, b),
        this.seriesToggle && a.jqplot.postDrawHooks.push(c)
    }
    ,
    a.jqplot.EnhancedLegendRenderer.prototype.draw = function(c, d) {
        if (this.show) {
            var e, f = this._series, g = "position:absolute;";
            g += this.background ? "background:" + this.background + ";" : "",
            g += this.border ? "border:" + this.border + ";" : "",
            g += this.fontSize ? "font-size:" + this.fontSize + ";" : "",
            g += this.fontFamily ? "font-family:" + this.fontFamily + ";" : "",
            g += this.textColor ? "color:" + this.textColor + ";" : "",
            g += null != this.marginTop ? "margin-top:" + this.marginTop + ";" : "",
            g += null != this.marginBottom ? "margin-bottom:" + this.marginBottom + ";" : "",
            g += null != this.marginLeft ? "margin-left:" + this.marginLeft + ";" : "",
            g += null != this.marginRight ? "margin-right:" + this.marginRight + ";" : "",
            this._elem = a('<table class="jqplot-table-legend" style="' + g + '"></table>'),
            this.seriesToggle && this._elem.css("z-index", "3");
            var h, i, j = !1, k = !1;
            this.numberRows ? (h = this.numberRows,
            i = this.numberColumns ? this.numberColumns : Math.ceil(f.length / h)) : this.numberColumns ? (i = this.numberColumns,
            h = Math.ceil(f.length / this.numberColumns)) : (h = f.length,
            i = 1);
            var l, m, n, o, p, q, r, s, t, u = 0;
            for (l = f.length - 1; l >= 0; l--)
                (1 == i && f[l]._stack || f[l].renderer.constructor == a.jqplot.BezierCurveRenderer) && (k = !0);
            for (l = 0; h > l; l++) {
                for (n = a(document.createElement("tr")),
                n.addClass("jqplot-table-legend"),
                k ? n.prependTo(this._elem) : n.appendTo(this._elem),
                m = 0; i > m; m++) {
                    if (u < f.length && (f[u].show || f[u].showLabel) && (e = f[u],
                    q = this.labels[u] || e.label.toString())) {
                        var v = e.color;
                        if (j = k ? l == h - 1 ? !1 : !0 : l > 0 ? !0 : !1,
                        r = j ? this.rowSpacing : "0",
                        o = a(document.createElement("td")),
                        o.addClass("jqplot-table-legend jqplot-table-legend-swatch"),
                        o.css({
                            textAlign: "center",
                            paddingTop: r
                        }),
                        s = a(document.createElement("div")),
                        s.addClass("jqplot-table-legend-swatch-outline"),
                        t = a(document.createElement("div")),
                        t.addClass("jqplot-table-legend-swatch"),
                        t.css({
                            backgroundColor: v,
                            borderColor: v
                        }),
                        o.append(s.append(t)),
                        p = a(document.createElement("td")),
                        p.addClass("jqplot-table-legend jqplot-table-legend-label"),
                        p.css("paddingTop", r),
                        this.escapeHtml ? p.text(q) : p.html(q),
                        k ? (this.showLabels && p.prependTo(n),
                        this.showSwatches && o.prependTo(n)) : (this.showSwatches && o.appendTo(n),
                        this.showLabels && p.appendTo(n)),
                        this.seriesToggle) {
                            var w;
                            ("string" == typeof this.seriesToggle || "number" == typeof this.seriesToggle) && (a.jqplot.use_excanvas && this.disableIEFading || (w = this.seriesToggle)),
                            this.showSwatches && (o.bind("click", {
                                series: e,
                                speed: w,
                                plot: d,
                                replot: this.seriesToggleReplot
                            }, b),
                            o.addClass("jqplot-seriesToggle")),
                            this.showLabels && (p.bind("click", {
                                series: e,
                                speed: w,
                                plot: d,
                                replot: this.seriesToggleReplot
                            }, b),
                            p.addClass("jqplot-seriesToggle")),
                            !e.show && e.showLabel && (o.addClass("jqplot-series-hidden"),
                            p.addClass("jqplot-series-hidden"))
                        }
                        j = !0
                    }
                    u++
                }
                o = p = s = t = null
            }
        }
        return this._elem
    }
    ;
    var b = function(b) {
        var c = b.data
          , d = c.series
          , e = c.replot
          , f = c.plot
          , g = c.speed
          , h = d.index
          , i = !1;
        (d.canvas._elem.is(":hidden") || !d.show) && (i = !0);
        var j = function() {
            if (e) {
                var b = {};
                if (a.isPlainObject(e) && a.extend(!0, b, e),
                f.replot(b),
                i && g) {
                    var c = f.series[h];
                    c.shadowCanvas._elem && c.shadowCanvas._elem.hide().fadeIn(g),
                    c.canvas._elem.hide().fadeIn(g),
                    c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + c.index).hide().fadeIn(g)
                }
            } else {
                var c = f.series[h];
                c.canvas._elem.is(":hidden") || !c.show ? (("undefined" == typeof f.options.legend.showSwatches || f.options.legend.showSwatches === !0) && f.legend._elem.find("td").eq(2 * h).addClass("jqplot-series-hidden"),
                ("undefined" == typeof f.options.legend.showLabels || f.options.legend.showLabels === !0) && f.legend._elem.find("td").eq(2 * h + 1).addClass("jqplot-series-hidden")) : (("undefined" == typeof f.options.legend.showSwatches || f.options.legend.showSwatches === !0) && f.legend._elem.find("td").eq(2 * h).removeClass("jqplot-series-hidden"),
                ("undefined" == typeof f.options.legend.showLabels || f.options.legend.showLabels === !0) && f.legend._elem.find("td").eq(2 * h + 1).removeClass("jqplot-series-hidden"))
            }
        };
        d.toggleDisplay(b, j)
    }
      , c = function() {
        if (this.legend.renderer.constructor == a.jqplot.EnhancedLegendRenderer && this.legend.seriesToggle) {
            var b = this.legend._elem.detach();
            this.eventCanvas._elem.after(b)
        }
    }
}(jQuery),
function(a) {
    a.jqplot.CanvasTextRenderer = function(b) {
        this.fontStyle = "normal",
        this.fontVariant = "normal",
        this.fontWeight = "normal",
        this.fontSize = "10px",
        this.fontFamily = "sans-serif",
        this.fontStretch = 1,
        this.fillStyle = "#666666",
        this.angle = 0,
        this.textAlign = "start",
        this.textBaseline = "alphabetic",
        this.text,
        this.width,
        this.height,
        this.pt2px = 1.28,
        a.extend(!0, this, b),
        this.normalizedFontSize = this.normalizeFontSize(this.fontSize),
        this.setHeight()
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.init = function(b) {
        a.extend(!0, this, b),
        this.normalizedFontSize = this.normalizeFontSize(this.fontSize),
        this.setHeight()
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.normalizeFontSize = function(a) {
        a = String(a);
        var b = parseFloat(a);
        return a.indexOf("px") > -1 ? b / this.pt2px : a.indexOf("pt") > -1 ? b : a.indexOf("em") > -1 ? 12 * b : a.indexOf("%") > -1 ? 12 * b / 100 : b / this.pt2px
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.fontWeight2Float = function(a) {
        if (Number(a))
            return a / 400;
        switch (a) {
        case "normal":
            return 1;
        case "bold":
            return 1.75;
        case "bolder":
            return 2.25;
        case "lighter":
            return .75;
        default:
            return 1
        }
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.getText = function() {
        return this.text
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.setText = function(a, b) {
        return this.text = a,
        this.setWidth(b),
        this
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.getWidth = function(a) {
        return this.width
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.setWidth = function(a, b) {
        return b ? this.width = b : this.width = this.measure(a, this.text),
        this
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.getHeight = function(a) {
        return this.height
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.setHeight = function(a) {
        return a ? this.height = a : this.height = this.normalizedFontSize * this.pt2px,
        this
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.letter = function(a) {
        return this.letters[a]
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.ascent = function() {
        return this.normalizedFontSize
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.descent = function() {
        return 7 * this.normalizedFontSize / 25
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.measure = function(a, b) {
        for (var c = 0, d = b.length, e = 0; d > e; e++) {
            var f = this.letter(b.charAt(e));
            f && (c += f.width * this.normalizedFontSize / 25 * this.fontStretch)
        }
        return c
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.draw = function(a, b) {
        var c = 0
          , d = .72 * this.height
          , e = 0
          , f = b.length
          , g = this.normalizedFontSize / 25;
        a.save();
        var h, i;
        -Math.PI / 2 <= this.angle && this.angle <= 0 || 3 * Math.PI / 2 <= this.angle && this.angle <= 2 * Math.PI ? (h = 0,
        i = -Math.sin(this.angle) * this.width) : 0 < this.angle && this.angle <= Math.PI / 2 || 2 * -Math.PI <= this.angle && this.angle <= 3 * -Math.PI / 2 ? (h = Math.sin(this.angle) * this.height,
        i = 0) : -Math.PI < this.angle && this.angle < -Math.PI / 2 || Math.PI <= this.angle && this.angle <= 3 * Math.PI / 2 ? (h = -Math.cos(this.angle) * this.width,
        i = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height) : (3 * -Math.PI / 2 < this.angle && this.angle < Math.PI || Math.PI / 2 < this.angle && this.angle < Math.PI) && (h = Math.sin(this.angle) * this.height - Math.cos(this.angle) * this.width,
        i = -Math.cos(this.angle) * this.height),
        a.strokeStyle = this.fillStyle,
        a.fillStyle = this.fillStyle,
        a.translate(h, i),
        a.rotate(this.angle),
        a.lineCap = "round";
        var j = this.normalizedFontSize > 30 ? 2 : 2 + (30 - this.normalizedFontSize) / 20;
        a.lineWidth = j * g * this.fontWeight2Float(this.fontWeight);
        for (var k = 0; f > k; k++) {
            var l = this.letter(b.charAt(k));
            if (l) {
                a.beginPath();
                for (var m = 1, n = 0; n < l.points.length; n++) {
                    var o = l.points[n];
                    -1 != o[0] || -1 != o[1] ? m ? (a.moveTo(c + o[0] * g * this.fontStretch, d - o[1] * g),
                    m = !1) : a.lineTo(c + o[0] * g * this.fontStretch, d - o[1] * g) : m = 1
                }
                a.stroke(),
                c += l.width * g * this.fontStretch
            }
        }
        return a.restore(),
        e
    }
    ,
    a.jqplot.CanvasTextRenderer.prototype.letters = {
        " ": {
            width: 16,
            points: []
        },
        "!": {
            width: 10,
            points: [[5, 21], [5, 7], [-1, -1], [5, 2], [4, 1], [5, 0], [6, 1], [5, 2]]
        },
        '"': {
            width: 16,
            points: [[4, 21], [4, 14], [-1, -1], [12, 21], [12, 14]]
        },
        "#": {
            width: 21,
            points: [[11, 25], [4, -7], [-1, -1], [17, 25], [10, -7], [-1, -1], [4, 12], [18, 12], [-1, -1], [3, 6], [17, 6]]
        },
        $: {
            width: 20,
            points: [[8, 25], [8, -4], [-1, -1], [12, 25], [12, -4], [-1, -1], [17, 18], [15, 20], [12, 21], [8, 21], [5, 20], [3, 18], [3, 16], [4, 14], [5, 13], [7, 12], [13, 10], [15, 9], [16, 8], [17, 6], [17, 3], [15, 1], [12, 0], [8, 0], [5, 1], [3, 3]]
        },
        "%": {
            width: 24,
            points: [[21, 21], [3, 0], [-1, -1], [8, 21], [10, 19], [10, 17], [9, 15], [7, 14], [5, 14], [3, 16], [3, 18], [4, 20], [6, 21], [8, 21], [10, 20], [13, 19], [16, 19], [19, 20], [21, 21], [-1, -1], [17, 7], [15, 6], [14, 4], [14, 2], [16, 0], [18, 0], [20, 1], [21, 3], [21, 5], [19, 7], [17, 7]]
        },
        "&": {
            width: 26,
            points: [[23, 12], [23, 13], [22, 14], [21, 14], [20, 13], [19, 11], [17, 6], [15, 3], [13, 1], [11, 0], [7, 0], [5, 1], [4, 2], [3, 4], [3, 6], [4, 8], [5, 9], [12, 13], [13, 14], [14, 16], [14, 18], [13, 20], [11, 21], [9, 20], [8, 18], [8, 16], [9, 13], [11, 10], [16, 3], [18, 1], [20, 0], [22, 0], [23, 1], [23, 2]]
        },
        "'": {
            width: 10,
            points: [[5, 19], [4, 20], [5, 21], [6, 20], [6, 18], [5, 16], [4, 15]]
        },
        "(": {
            width: 14,
            points: [[11, 25], [9, 23], [7, 20], [5, 16], [4, 11], [4, 7], [5, 2], [7, -2], [9, -5], [11, -7]]
        },
        ")": {
            width: 14,
            points: [[3, 25], [5, 23], [7, 20], [9, 16], [10, 11], [10, 7], [9, 2], [7, -2], [5, -5], [3, -7]]
        },
        "*": {
            width: 16,
            points: [[8, 21], [8, 9], [-1, -1], [3, 18], [13, 12], [-1, -1], [13, 18], [3, 12]]
        },
        "+": {
            width: 26,
            points: [[13, 18], [13, 0], [-1, -1], [4, 9], [22, 9]]
        },
        ",": {
            width: 10,
            points: [[6, 1], [5, 0], [4, 1], [5, 2], [6, 1], [6, -1], [5, -3], [4, -4]]
        },
        "-": {
            width: 18,
            points: [[6, 9], [12, 9]]
        },
        ".": {
            width: 10,
            points: [[5, 2], [4, 1], [5, 0], [6, 1], [5, 2]]
        },
        "/": {
            width: 22,
            points: [[20, 25], [2, -7]]
        },
        0: {
            width: 20,
            points: [[9, 21], [6, 20], [4, 17], [3, 12], [3, 9], [4, 4], [6, 1], [9, 0], [11, 0], [14, 1], [16, 4], [17, 9], [17, 12], [16, 17], [14, 20], [11, 21], [9, 21]]
        },
        1: {
            width: 20,
            points: [[6, 17], [8, 18], [11, 21], [11, 0]]
        },
        2: {
            width: 20,
            points: [[4, 16], [4, 17], [5, 19], [6, 20], [8, 21], [12, 21], [14, 20], [15, 19], [16, 17], [16, 15], [15, 13], [13, 10], [3, 0], [17, 0]]
        },
        3: {
            width: 20,
            points: [[5, 21], [16, 21], [10, 13], [13, 13], [15, 12], [16, 11], [17, 8], [17, 6], [16, 3], [14, 1], [11, 0], [8, 0], [5, 1], [4, 2], [3, 4]]
        },
        4: {
            width: 20,
            points: [[13, 21], [3, 7], [18, 7], [-1, -1], [13, 21], [13, 0]]
        },
        5: {
            width: 20,
            points: [[15, 21], [5, 21], [4, 12], [5, 13], [8, 14], [11, 14], [14, 13], [16, 11], [17, 8], [17, 6], [16, 3], [14, 1], [11, 0], [8, 0], [5, 1], [4, 2], [3, 4]]
        },
        6: {
            width: 20,
            points: [[16, 18], [15, 20], [12, 21], [10, 21], [7, 20], [5, 17], [4, 12], [4, 7], [5, 3], [7, 1], [10, 0], [11, 0], [14, 1], [16, 3], [17, 6], [17, 7], [16, 10], [14, 12], [11, 13], [10, 13], [7, 12], [5, 10], [4, 7]]
        },
        7: {
            width: 20,
            points: [[17, 21], [7, 0], [-1, -1], [3, 21], [17, 21]]
        },
        8: {
            width: 20,
            points: [[8, 21], [5, 20], [4, 18], [4, 16], [5, 14], [7, 13], [11, 12], [14, 11], [16, 9], [17, 7], [17, 4], [16, 2], [15, 1], [12, 0], [8, 0], [5, 1], [4, 2], [3, 4], [3, 7], [4, 9], [6, 11], [9, 12], [13, 13], [15, 14], [16, 16], [16, 18], [15, 20], [12, 21], [8, 21]]
        },
        9: {
            width: 20,
            points: [[16, 14], [15, 11], [13, 9], [10, 8], [9, 8], [6, 9], [4, 11], [3, 14], [3, 15], [4, 18], [6, 20], [9, 21], [10, 21], [13, 20], [15, 18], [16, 14], [16, 9], [15, 4], [13, 1], [10, 0], [8, 0], [5, 1], [4, 3]]
        },
        ":": {
            width: 10,
            points: [[5, 14], [4, 13], [5, 12], [6, 13], [5, 14], [-1, -1], [5, 2], [4, 1], [5, 0], [6, 1], [5, 2]]
        },
        ";": {
            width: 10,
            points: [[5, 14], [4, 13], [5, 12], [6, 13], [5, 14], [-1, -1], [6, 1], [5, 0], [4, 1], [5, 2], [6, 1], [6, -1], [5, -3], [4, -4]]
        },
        "<": {
            width: 24,
            points: [[20, 18], [4, 9], [20, 0]]
        },
        "=": {
            width: 26,
            points: [[4, 12], [22, 12], [-1, -1], [4, 6], [22, 6]]
        },
        ">": {
            width: 24,
            points: [[4, 18], [20, 9], [4, 0]]
        },
        "?": {
            width: 18,
            points: [[3, 16], [3, 17], [4, 19], [5, 20], [7, 21], [11, 21], [13, 20], [14, 19], [15, 17], [15, 15], [14, 13], [13, 12], [9, 10], [9, 7], [-1, -1], [9, 2], [8, 1], [9, 0], [10, 1], [9, 2]]
        },
        "@": {
            width: 27,
            points: [[18, 13], [17, 15], [15, 16], [12, 16], [10, 15], [9, 14], [8, 11], [8, 8], [9, 6], [11, 5], [14, 5], [16, 6], [17, 8], [-1, -1], [12, 16], [10, 14], [9, 11], [9, 8], [10, 6], [11, 5], [-1, -1], [18, 16], [17, 8], [17, 6], [19, 5], [21, 5], [23, 7], [24, 10], [24, 12], [23, 15], [22, 17], [20, 19], [18, 20], [15, 21], [12, 21], [9, 20], [7, 19], [5, 17], [4, 15], [3, 12], [3, 9], [4, 6], [5, 4], [7, 2], [9, 1], [12, 0], [15, 0], [18, 1], [20, 2], [21, 3], [-1, -1], [19, 16], [18, 8], [18, 6], [19, 5]]
        },
        A: {
            width: 18,
            points: [[9, 21], [1, 0], [-1, -1], [9, 21], [17, 0], [-1, -1], [4, 7], [14, 7]]
        },
        B: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [13, 21], [16, 20], [17, 19], [18, 17], [18, 15], [17, 13], [16, 12], [13, 11], [-1, -1], [4, 11], [13, 11], [16, 10], [17, 9], [18, 7], [18, 4], [17, 2], [16, 1], [13, 0], [4, 0]]
        },
        C: {
            width: 21,
            points: [[18, 16], [17, 18], [15, 20], [13, 21], [9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5]]
        },
        D: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [11, 21], [14, 20], [16, 18], [17, 16], [18, 13], [18, 8], [17, 5], [16, 3], [14, 1], [11, 0], [4, 0]]
        },
        E: {
            width: 19,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [17, 21], [-1, -1], [4, 11], [12, 11], [-1, -1], [4, 0], [17, 0]]
        },
        F: {
            width: 18,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [17, 21], [-1, -1], [4, 11], [12, 11]]
        },
        G: {
            width: 21,
            points: [[18, 16], [17, 18], [15, 20], [13, 21], [9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5], [18, 8], [-1, -1], [13, 8], [18, 8]]
        },
        H: {
            width: 22,
            points: [[4, 21], [4, 0], [-1, -1], [18, 21], [18, 0], [-1, -1], [4, 11], [18, 11]]
        },
        I: {
            width: 8,
            points: [[4, 21], [4, 0]]
        },
        J: {
            width: 16,
            points: [[12, 21], [12, 5], [11, 2], [10, 1], [8, 0], [6, 0], [4, 1], [3, 2], [2, 5], [2, 7]]
        },
        K: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [18, 21], [4, 7], [-1, -1], [9, 12], [18, 0]]
        },
        L: {
            width: 17,
            points: [[4, 21], [4, 0], [-1, -1], [4, 0], [16, 0]]
        },
        M: {
            width: 24,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [12, 0], [-1, -1], [20, 21], [12, 0], [-1, -1], [20, 21], [20, 0]]
        },
        N: {
            width: 22,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [18, 0], [-1, -1], [18, 21], [18, 0]]
        },
        O: {
            width: 22,
            points: [[9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5], [19, 8], [19, 13], [18, 16], [17, 18], [15, 20], [13, 21], [9, 21]]
        },
        P: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [13, 21], [16, 20], [17, 19], [18, 17], [18, 14], [17, 12], [16, 11], [13, 10], [4, 10]]
        },
        Q: {
            width: 22,
            points: [[9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5], [19, 8], [19, 13], [18, 16], [17, 18], [15, 20], [13, 21], [9, 21], [-1, -1], [12, 4], [18, -2]]
        },
        R: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [13, 21], [16, 20], [17, 19], [18, 17], [18, 15], [17, 13], [16, 12], [13, 11], [4, 11], [-1, -1], [11, 11], [18, 0]]
        },
        S: {
            width: 20,
            points: [[17, 18], [15, 20], [12, 21], [8, 21], [5, 20], [3, 18], [3, 16], [4, 14], [5, 13], [7, 12], [13, 10], [15, 9], [16, 8], [17, 6], [17, 3], [15, 1], [12, 0], [8, 0], [5, 1], [3, 3]]
        },
        T: {
            width: 16,
            points: [[8, 21], [8, 0], [-1, -1], [1, 21], [15, 21]]
        },
        U: {
            width: 22,
            points: [[4, 21], [4, 6], [5, 3], [7, 1], [10, 0], [12, 0], [15, 1], [17, 3], [18, 6], [18, 21]]
        },
        V: {
            width: 18,
            points: [[1, 21], [9, 0], [-1, -1], [17, 21], [9, 0]]
        },
        W: {
            width: 24,
            points: [[2, 21], [7, 0], [-1, -1], [12, 21], [7, 0], [-1, -1], [12, 21], [17, 0], [-1, -1], [22, 21], [17, 0]]
        },
        X: {
            width: 20,
            points: [[3, 21], [17, 0], [-1, -1], [17, 21], [3, 0]]
        },
        Y: {
            width: 18,
            points: [[1, 21], [9, 11], [9, 0], [-1, -1], [17, 21], [9, 11]]
        },
        Z: {
            width: 20,
            points: [[17, 21], [3, 0], [-1, -1], [3, 21], [17, 21], [-1, -1], [3, 0], [17, 0]]
        },
        "[": {
            width: 14,
            points: [[4, 25], [4, -7], [-1, -1], [5, 25], [5, -7], [-1, -1], [4, 25], [11, 25], [-1, -1], [4, -7], [11, -7]]
        },
        "\\": {
            width: 14,
            points: [[0, 21], [14, -3]]
        },
        "]": {
            width: 14,
            points: [[9, 25], [9, -7], [-1, -1], [10, 25], [10, -7], [-1, -1], [3, 25], [10, 25], [-1, -1], [3, -7], [10, -7]]
        },
        "^": {
            width: 16,
            points: [[6, 15], [8, 18], [10, 15], [-1, -1], [3, 12], [8, 17], [13, 12], [-1, -1], [8, 17], [8, 0]]
        },
        _: {
            width: 16,
            points: [[0, -2], [16, -2]]
        },
        "`": {
            width: 10,
            points: [[6, 21], [5, 20], [4, 18], [4, 16], [5, 15], [6, 16], [5, 17]]
        },
        a: {
            width: 19,
            points: [[15, 14], [15, 0], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        b: {
            width: 19,
            points: [[4, 21], [4, 0], [-1, -1], [4, 11], [6, 13], [8, 14], [11, 14], [13, 13], [15, 11], [16, 8], [16, 6], [15, 3], [13, 1], [11, 0], [8, 0], [6, 1], [4, 3]]
        },
        c: {
            width: 18,
            points: [[15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        d: {
            width: 19,
            points: [[15, 21], [15, 0], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        e: {
            width: 18,
            points: [[3, 8], [15, 8], [15, 10], [14, 12], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        f: {
            width: 12,
            points: [[10, 21], [8, 21], [6, 20], [5, 17], [5, 0], [-1, -1], [2, 14], [9, 14]]
        },
        g: {
            width: 19,
            points: [[15, 14], [15, -2], [14, -5], [13, -6], [11, -7], [8, -7], [6, -6], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        h: {
            width: 19,
            points: [[4, 21], [4, 0], [-1, -1], [4, 10], [7, 13], [9, 14], [12, 14], [14, 13], [15, 10], [15, 0]]
        },
        i: {
            width: 8,
            points: [[3, 21], [4, 20], [5, 21], [4, 22], [3, 21], [-1, -1], [4, 14], [4, 0]]
        },
        j: {
            width: 10,
            points: [[5, 21], [6, 20], [7, 21], [6, 22], [5, 21], [-1, -1], [6, 14], [6, -3], [5, -6], [3, -7], [1, -7]]
        },
        k: {
            width: 17,
            points: [[4, 21], [4, 0], [-1, -1], [14, 14], [4, 4], [-1, -1], [8, 8], [15, 0]]
        },
        l: {
            width: 8,
            points: [[4, 21], [4, 0]]
        },
        m: {
            width: 30,
            points: [[4, 14], [4, 0], [-1, -1], [4, 10], [7, 13], [9, 14], [12, 14], [14, 13], [15, 10], [15, 0], [-1, -1], [15, 10], [18, 13], [20, 14], [23, 14], [25, 13], [26, 10], [26, 0]]
        },
        n: {
            width: 19,
            points: [[4, 14], [4, 0], [-1, -1], [4, 10], [7, 13], [9, 14], [12, 14], [14, 13], [15, 10], [15, 0]]
        },
        o: {
            width: 19,
            points: [[8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3], [16, 6], [16, 8], [15, 11], [13, 13], [11, 14], [8, 14]]
        },
        p: {
            width: 19,
            points: [[4, 14], [4, -7], [-1, -1], [4, 11], [6, 13], [8, 14], [11, 14], [13, 13], [15, 11], [16, 8], [16, 6], [15, 3], [13, 1], [11, 0], [8, 0], [6, 1], [4, 3]]
        },
        q: {
            width: 19,
            points: [[15, 14], [15, -7], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        r: {
            width: 13,
            points: [[4, 14], [4, 0], [-1, -1], [4, 8], [5, 11], [7, 13], [9, 14], [12, 14]]
        },
        s: {
            width: 17,
            points: [[14, 11], [13, 13], [10, 14], [7, 14], [4, 13], [3, 11], [4, 9], [6, 8], [11, 7], [13, 6], [14, 4], [14, 3], [13, 1], [10, 0], [7, 0], [4, 1], [3, 3]]
        },
        t: {
            width: 12,
            points: [[5, 21], [5, 4], [6, 1], [8, 0], [10, 0], [-1, -1], [2, 14], [9, 14]]
        },
        u: {
            width: 19,
            points: [[4, 14], [4, 4], [5, 1], [7, 0], [10, 0], [12, 1], [15, 4], [-1, -1], [15, 14], [15, 0]]
        },
        v: {
            width: 16,
            points: [[2, 14], [8, 0], [-1, -1], [14, 14], [8, 0]]
        },
        w: {
            width: 22,
            points: [[3, 14], [7, 0], [-1, -1], [11, 14], [7, 0], [-1, -1], [11, 14], [15, 0], [-1, -1], [19, 14], [15, 0]]
        },
        x: {
            width: 17,
            points: [[3, 14], [14, 0], [-1, -1], [14, 14], [3, 0]]
        },
        y: {
            width: 16,
            points: [[2, 14], [8, 0], [-1, -1], [14, 14], [8, 0], [6, -4], [4, -6], [2, -7], [1, -7]]
        },
        z: {
            width: 17,
            points: [[14, 14], [3, 0], [-1, -1], [3, 14], [14, 14], [-1, -1], [3, 0], [14, 0]]
        },
        "{": {
            width: 14,
            points: [[9, 25], [7, 24], [6, 23], [5, 21], [5, 19], [6, 17], [7, 16], [8, 14], [8, 12], [6, 10], [-1, -1], [7, 24], [6, 22], [6, 20], [7, 18], [8, 17], [9, 15], [9, 13], [8, 11], [4, 9], [8, 7], [9, 5], [9, 3], [8, 1], [7, 0], [6, -2], [6, -4], [7, -6], [-1, -1], [6, 8], [8, 6], [8, 4], [7, 2], [6, 1], [5, -1], [5, -3], [6, -5], [7, -6], [9, -7]]
        },
        "|": {
            width: 8,
            points: [[4, 25], [4, -7]]
        },
        "}": {
            width: 14,
            points: [[5, 25], [7, 24], [8, 23], [9, 21], [9, 19], [8, 17], [7, 16], [6, 14], [6, 12], [8, 10], [-1, -1], [7, 24], [8, 22], [8, 20], [7, 18], [6, 17], [5, 15], [5, 13], [6, 11], [10, 9], [6, 7], [5, 5], [5, 3], [6, 1], [7, 0], [8, -2], [8, -4], [7, -6], [-1, -1], [8, 8], [6, 6], [6, 4], [7, 2], [8, 1], [9, -1], [9, -3], [8, -5], [7, -6], [5, -7]]
        },
        "~": {
            width: 24,
            points: [[3, 6], [3, 8], [4, 11], [6, 12], [8, 12], [10, 11], [14, 8], [16, 7], [18, 7], [20, 8], [21, 10], [-1, -1], [3, 8], [4, 10], [6, 11], [8, 11], [10, 10], [14, 7], [16, 6], [18, 6], [20, 7], [21, 10], [21, 12]]
        }
    },
    a.jqplot.CanvasFontRenderer = function(b) {
        b = b || {},
        b.pt2px || (b.pt2px = 1.5),
        a.jqplot.CanvasTextRenderer.call(this, b)
    }
    ,
    a.jqplot.CanvasFontRenderer.prototype = new a.jqplot.CanvasTextRenderer({}),
    a.jqplot.CanvasFontRenderer.prototype.constructor = a.jqplot.CanvasFontRenderer,
    a.jqplot.CanvasFontRenderer.prototype.measure = function(a, b) {
        var c = this.fontSize + " " + this.fontFamily;
        a.save(),
        a.font = c;
        var d = a.measureText(b).width;
        return a.restore(),
        d
    }
    ,
    a.jqplot.CanvasFontRenderer.prototype.draw = function(a, b) {
        var c = 0
          , d = .72 * this.height;
        a.save();
        var e, f;
        -Math.PI / 2 <= this.angle && this.angle <= 0 || 3 * Math.PI / 2 <= this.angle && this.angle <= 2 * Math.PI ? (e = 0,
        f = -Math.sin(this.angle) * this.width) : 0 < this.angle && this.angle <= Math.PI / 2 || 2 * -Math.PI <= this.angle && this.angle <= 3 * -Math.PI / 2 ? (e = Math.sin(this.angle) * this.height,
        f = 0) : -Math.PI < this.angle && this.angle < -Math.PI / 2 || Math.PI <= this.angle && this.angle <= 3 * Math.PI / 2 ? (e = -Math.cos(this.angle) * this.width,
        f = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height) : (3 * -Math.PI / 2 < this.angle && this.angle < Math.PI || Math.PI / 2 < this.angle && this.angle < Math.PI) && (e = Math.sin(this.angle) * this.height - Math.cos(this.angle) * this.width,
        f = -Math.cos(this.angle) * this.height),
        a.strokeStyle = this.fillStyle,
        a.fillStyle = this.fillStyle;
        var g = this.fontSize + " " + this.fontFamily;
        a.font = g,
        a.translate(e, f),
        a.rotate(this.angle),
        a.fillText(b, c, d),
        a.restore()
    }
}(jQuery),
zmMatrix.prototype = {
    dup: function() {
        return zmMatrix.create(this.elements)
    },
    canMultiplyFromLeft: function(a) {
        var b = a.elements || a;
        return void 0 === b[0][0] && (b = zmMatrix.create(b).elements),
        this.elements[0].length == b.length
    },
    multiply: function(a) {
        var b = a.modulus ? !0 : !1
          , c = a.elements || a;
        if (void 0 === c[0][0] && (c = zmMatrix.create(c).elements),
        !this.canMultiplyFromLeft(c))
            return null;
        var d, e, f, g, h, i, j = this.elements.length, k = j, l = c[0].length, m = this.elements[0].length, n = [];
        do {
            d = k - j,
            n[d] = [],
            e = l;
            do {
                f = l - e,
                g = 0,
                h = m;
                do
                    i = m - h,
                    g += this.elements[d][i] * c[i][f];
                while (--h);
                n[d][f] = g
            } while (--e)
        } while (--j);
        return c = zmMatrix.create(n),
        b ? c.col(1) : c
    },
    isSquare: function() {
        return this.elements.length == this.elements[0].length
    },
    toRightTriangular: function() {
        var a, b, c, d, e = this.dup(), f = this.elements.length, g = f, h = this.elements[0].length;
        do {
            if (b = g - f,
            0 === e.elements[b][b])
                for (j = b + 1; g > j; j++)
                    if (0 !== e.elements[j][b]) {
                        a = [],
                        c = h;
                        do
                            d = h - c,
                            a.push(e.elements[b][d] + e.elements[j][d]);
                        while (--c);
                        e.elements[b] = a;
                        break
                    }
            if (0 !== e.elements[b][b])
                for (j = b + 1; g > j; j++) {
                    var i = e.elements[j][b] / e.elements[b][b];
                    a = [],
                    c = h;
                    do
                        d = h - c,
                        a.push(b >= d ? 0 : e.elements[j][d] - e.elements[b][d] * i);
                    while (--c);
                    e.elements[j] = a
                }
        } while (--f);
        return e
    },
    determinant: function() {
        if (!this.isSquare())
            return null;
        var a, b = this.toRightTriangular(), c = b.elements[0][0], d = b.elements.length - 1, e = d;
        do
            a = e - d + 1,
            c *= b.elements[a][a];
        while (--d);
        return c
    },
    isSingular: function() {
        return this.isSquare() && 0 === this.determinant()
    },
    augment: function(a) {
        var b = a.elements || a;
        void 0 === b[0][0] && (b = zmMatrix.create(b).elements);
        var c, d, e, f = this.dup(), g = f.elements[0].length, h = f.elements.length, i = h, j = b[0].length;
        if (h != b.length)
            return null;
        do {
            c = i - h,
            d = j;
            do
                e = j - d,
                f.elements[c][g + e] = b[c][e];
            while (--d)
        } while (--h);
        return f
    },
    inverse: function() {
        if (!this.isSquare() || this.isSingular())
            return null;
        var a, b, c, d, e, f, g, h = this.elements.length, i = h, j = this.augment(zmMatrix.I(h)).toRightTriangular(), k = j.elements[0].length, l = [];
        do {
            a = h - 1,
            e = [],
            c = k,
            l[a] = [],
            f = j.elements[a][a];
            do
                d = k - c,
                g = j.elements[a][d] / f,
                e.push(g),
                d >= i && l[a].push(g);
            while (--c);
            for (j.elements[a] = e,
            b = 0; a > b; b++) {
                e = [],
                c = k;
                do
                    d = k - c,
                    e.push(j.elements[b][d] - j.elements[a][d] * j.elements[b][a]);
                while (--c);
                j.elements[b] = e
            }
        } while (--h);
        return zmMatrix.create(l)
    },
    setElements: function(a) {
        var b, c = a.elements || a;
        if (void 0 !== c[0][0]) {
            var d, e, f, g = c.length, h = g;
            this.elements = [];
            do {
                b = h - g,
                d = c[b].length,
                e = d,
                this.elements[b] = [];
                do
                    f = e - d,
                    this.elements[b][f] = c[b][f];
                while (--d)
            } while (--g);
            return this
        }
        var i = c.length
          , j = i;
        this.elements = [];
        do
            b = j - i,
            this.elements.push([c[b]]);
        while (--i);
        return this
    }
},
zmMatrix.create = function(a) {
    var b = new zmMatrix;
    return b.setElements(a)
}
,
zmMatrix.I = function(a) {
    var b, c, d, e = [], f = a;
    do {
        b = f - a,
        e[b] = [],
        c = f;
        do
            d = f - c,
            e[b][d] = b == d ? 1 : 0;
        while (--c)
    } while (--a);
    return zmMatrix.create(e)
}
,
PureCSSMatrix = function() {
    "use strict";
    function a(a) {
        a && null !== a && "none" != a ? a instanceof zmMatrix ? this.setMatrix(a) : this.setMatrixValue(a) : this.m = zmMatrix.I(3)
    }
    function b(a) {
        var b = parseFloat(c(a));
        return a.match(e) && (b = 2 * Math.PI * b / 360),
        b
    }
    function c(a) {
        return a.match(f)
    }
    function d(a) {
        return Number(a).toFixed(6)
    }
    var e = /deg$/
      , f = /([0-9.\-e]+)/g
      , g = /([a-zA-Z]+)\(([^\)]+)\)/g;
    return a.prototype.setMatrix = function(a) {
        this.m = a
    }
    ,
    a.prototype.setMatrixValue = function(a) {
        for (var d, e = zmMatrix.I(3); null !== (d = g.exec(a)); ) {
            var f, h = d[1].toLowerCase(), i = d[2].split(",");
            if ("matrix" == h)
                f = zmMatrix.create([[parseFloat(i[0]), parseFloat(i[2]), parseFloat(c(i[4]))], [parseFloat(i[1]), parseFloat(i[3]), parseFloat(c(i[5]))], [0, 0, 1]]);
            else if ("translate" == h)
                f = zmMatrix.I(3),
                f.elements[0][2] = parseFloat(c(i[0])),
                f.elements[1][2] = parseFloat(c(i[1]));
            else if ("scale" == h) {
                var j, k = parseFloat(i[0]);
                j = i.length > 1 ? parseFloat(i[1]) : k,
                f = zmMatrix.create([[k, 0, 0], [0, j, 0], [0, 0, 1]])
            } else
                "rotate" == h ? f = zmMatrix.RotationZ(b(i[0])) : "skew" == h || "skewx" == h ? (f = zmMatrix.I(3),
                f.elements[0][1] = Math.tan(b(i[0]))) : "skewy" == h ? (f = zmMatrix.I(3),
                f.elements[1][0] = Math.tan(b(i[0]))) : console.log("Problem with setMatrixValue", h, i);
            e = e.multiply(f)
        }
        this.m = e
    }
    ,
    a.prototype.multiply = function(b) {
        return new a(this.m.multiply(b.m))
    }
    ,
    a.prototype.inverse = function() {
        return 1e-6 > Math.abs(this.m.elements[0][0]) && (this.m.elements[0][0] = 0),
        new a(this.m.inverse())
    }
    ,
    a.prototype.translate = function(b, c) {
        var d = zmMatrix.I(3);
        return d.elements[0][2] = b,
        d.elements[1][2] = c,
        new a(this.m.multiply(d))
    }
    ,
    a.prototype.scale = function(b, c) {
        var d = zmMatrix.create([[b, 0, 0], [0, c, 0], [0, 0, 1]]);
        return new a(this.m.multiply(d))
    }
    ,
    a.prototype.rotate = function(b) {
        var c = zmMatrix.RotationZ(b);
        return new a(this.m.multiply(c))
    }
    ,
    a.prototype.toString = function() {
        var a = this.m.elements
          , b = "";
        return ($.browser.mozilla || $.browser.opera) && (b = "px"),
        "matrix(" + d(a[0][0]) + ", " + d(a[1][0]) + ", " + d(a[0][1]) + ", " + d(a[1][1]) + ", " + d(a[0][2]) + b + ", " + d(a[1][2]) + b + ")"
    }
    ,
    a.prototype.elements = function() {
        var a = this.m.elements;
        return {
            a: a[0][0],
            b: a[1][0],
            c: a[0][1],
            d: a[1][1],
            e: a[0][2],
            f: a[1][2]
        }
    }
    ,
    a
}(),
$.zoomooz || ($.zoomooz = {}),
$.zoomooz.helpers = function(a, b) {
    "use strict";
    var c = ["-moz-", "-webkit-", "-o-", "-ms-"];
    return b.forEachPrefix = function(a, b) {
        for (var d = 0; c.length > d; d++)
            a(c[d]);
        b && a("")
    }
    ,
    b.getElementTransform = function(c) {
        var d;
        return b.forEachPrefix(function(b) {
            d = d || a(c).css(b + "transform")
        }, !0),
        d
    }
    ,
    b
}(jQuery, {}),
function(a) {
    "use strict";
    function b(a, b, c) {
        var d = {};
        if (v.forEachPrefix(function(b) {
            d[b + "transform"] = a
        }, !0),
        b) {
            var e = n(b / 1e3, 6) + "s";
            if (d["-webkit-transition-duration"] = e,
            d["-o-transition-duration"] = e,
            d["-moz-transition-duration"] = e,
            c) {
                var f = g(c);
                d["-webkit-transition-timing-function"] = f,
                d["-o-transition-timing-function"] = f,
                d["-moz-transition-timing-function"] = f
            }
        }
        return d
    }
    function c(a, b, c, f, g, i) {
        b || (b = e(new PureCSSMatrix)),
        p = (new Date).getTime(),
        q && (clearInterval(q),
        q = null),
        f.easing && (f.easingfunction = h(f.easing, f.duration)),
        d(a, b, c, f, g),
        i && i(),
        q = setInterval(function() {
            d(a, b, c, f, g)
        }, 1)
    }
    function d(a, c, d, e, g) {
        var h, i = (new Date).getTime() - p;
        h = e.easingfunction ? e.easingfunction(i / e.duration) : i / e.duration,
        a.css(b(f(m(c, d, h)))),
        i > e.duration && (clearInterval(q),
        q = null,
        h = 1,
        g && g())
    }
    function e(a) {
        var b = a.elements()
          , c = b.a
          , d = b.b
          , e = b.c
          , f = b.d
          , g = b.e
          , h = b.f;
        if (.01 > Math.abs(c * f - d * e))
            return void console.log("fail!");
        var i = g
          , j = h
          , k = Math.sqrt(c * c + d * d);
        c /= k,
        d /= k;
        var l = c * e + d * f;
        e -= c * l,
        f -= d * l;
        var m = Math.sqrt(e * e + f * f);
        e /= m,
        f /= m,
        l /= m,
        0 > c * f - d * e && (c = -c,
        d = -d,
        e = -e,
        f = -f,
        k = -k,
        m = -m);
        var n = Math.atan2(d, c);
        return {
            tx: i,
            ty: j,
            r: n,
            k: Math.atan(l),
            sx: k,
            sy: m
        }
    }
    function f(a) {
        var b = "";
        return b += "translate(" + n(a.tx, 6) + "px," + n(a.ty, 6) + "px) ",
        b += "rotate(" + n(a.r, 6) + "rad) skewX(" + n(a.k, 6) + "rad) ",
        b += "scale(" + n(a.sx, 6) + "," + n(a.sy, 6) + ")"
    }
    function g(a) {
        return a instanceof Array ? "cubic-bezier(" + n(a[0], 6) + "," + n(a[1], 6) + "," + n(a[2], 6) + "," + n(a[3], 6) + ")" : a
    }
    function h(a, b) {
        var c = [];
        if (a instanceof Array)
            c = a;
        else
            switch (a) {
            case "linear":
                c = [0, 0, 1, 1];
                break;
            case "ease":
                c = [.25, .1, .25, 1];
                break;
            case "ease-in":
                c = [.42, 0, 1, 1];
                break;
            case "ease-out":
                c = [0, 0, .58, 1];
                break;
            case "ease-in-out":
                c = [.42, 0, .58, 1]
            }
        var d = function(a) {
            return i(a, c[0], c[1], c[2], c[3], b)
        };
        return d
    }
    function i(a, b, c, d, e, f) {
        function g(a) {
            return ((m * a + n) * a + o) * a
        }
        function h(a) {
            return ((p * a + q) * a + r) * a
        }
        function i(a) {
            return (3 * m * a + 2 * n) * a + o
        }
        function j(a) {
            return 1 / (200 * a)
        }
        function k(a, b) {
            return h(l(a, b))
        }
        function l(a, b) {
            function c(a) {
                return a >= 0 ? a : 0 - a
            }
            var d, e, f, h, j, k;
            for (f = a,
            k = 0; 8 > k; k++) {
                if (h = g(f) - a,
                b > c(h))
                    return f;
                if (j = i(f),
                1e-6 > c(j))
                    break;
                f -= h / j
            }
            if (d = 0,
            e = 1,
            f = a,
            d > f)
                return d;
            if (f > e)
                return e;
            for (; e > d; ) {
                if (h = g(f),
                b > c(h - a))
                    return f;
                a > h ? d = f : e = f,
                f = .5 * (e - d) + d
            }
            return f
        }
        var m = 0
          , n = 0
          , o = 0
          , p = 0
          , q = 0
          , r = 0;
        return o = 3 * b,
        n = 3 * (d - b) - o,
        m = 1 - o - n,
        r = 3 * c,
        q = 3 * (e - c) - r,
        p = 1 - r - q,
        k(a, j(f))
    }
    function j(a, b) {
        var c, d = v.getElementTransform(a);
        c = d ? new PureCSSMatrix(d) : new PureCSSMatrix,
        b && (c = c.translate(b.x, b.y));
        var f = e(c);
        return f.r = k(d),
        f
    }
    function k(a) {
        for (var b, c = 0; null !== (b = t.exec(a)); ) {
            var d = b[1].toLowerCase()
              , f = b[2].split(",");
            if ("matrix" == d) {
                var g = d + "(" + b[2] + ")";
                c += e(new PureCSSMatrix(g)).r
            } else if ("rotate" == d) {
                var h = f[0]
                  , i = parseFloat(o(h));
                h.match(u) && (i = 2 * Math.PI * i / 360),
                c += i
            }
        }
        return c
    }
    function l(a, b) {
        if (Math.abs(a.r - b.r) > Math.PI)
            if (b.r < a.r)
                for (; Math.abs(a.r - b.r) > Math.PI; )
                    b.r += 2 * Math.PI;
            else
                for (; Math.abs(a.r - b.r) > Math.PI; )
                    b.r -= 2 * Math.PI;
        return b
    }
    function m(a, b, c) {
        var d = {};
        for (var e in a)
            a.hasOwnProperty(e) && (d[e] = a[e] + (b[e] - a[e]) * c);
        return d
    }
    function n(a, b) {
        b = Math.abs(parseInt(b, 10)) || 0;
        var c = Math.pow(10, b);
        return Math.round(a * c) / c
    }
    function o(a) {
        return a.match(s)
    }
    var p, q, r, s = /([0-9.\-e]+)/g, t = /([a-z]+)\(([^\)]+)\)/g, u = /deg$/, v = a.zoomooz.helpers, w = {
        duration: 450,
        easing: "ease",
        nativeanimation: !1
    };
    jQuery.cssHooks.MsTransform = {
        set: function(a, b) {
            a.style.msTransform = b
        }
    },
    jQuery.cssHooks.MsTransformOrigin = {
        set: function(a, b) {
            a.style.msTransformOrigin = b
        }
    },
    a.fn.animateTransformation = function(d, g, h, i, k) {
        g = jQuery.extend({}, w, g),
        r && (clearTimeout(r),
        r = null);
        var m = !g.nativeanimation && g.duration > 0;
        !m && i && (r = setTimeout(i, g.duration)),
        this.each(function() {
            var n = a(this);
            d || (d = new PureCSSMatrix);
            var o = j(n, h)
              , p = l(o, e(d));
            m ? c(n, o, p, g, i, k) : (n.css(b(f(p), g.duration, g.easing)),
            k && k())
        })
    }
    ,
    a.fn.setTransformation = function(c) {
        this.each(function() {
            var d = a(this)
              , g = j(d)
              , h = l(g, e(c));
            d.css(b(f(h)))
        })
    }
}(jQuery),
function(a) {
    "use strict";
    function b(b, c) {
        var d = jQuery.extend({}, c);
        a.zoomooz.defaultSettings || a.zoomooz.setup();
        var e, f = a.zoomooz.defaultSettings, g = jQuery.extend({}, d);
        for (e in f)
            f.hasOwnProperty(e) && !g[e] && (g[e] = b.data(e));
        for (var h = 0; q.length > h; h++)
            e = q[h],
            g[e] || (g[e] = b.data(e));
        return jQuery.extend({}, f, g)
    }
    function c() {
        var b = document.createElement("style");
        b.type = "text/css";
        var c = "";
        p.forEachPrefix(function(a) {
            c += a + "transform-origin: 0 0;"
        }, !0),
        b.innerHTML = "html {height:100%;}.noScroll{overflow:hidden !important;}* {" + c + "}",
        document.getElementsByTagName("head")[0].appendChild(b),
        a(document).ready(function() {
            var c = window.innerWidth - a("body").width();
            b.innerHTML += "body.noScroll,html.noScroll body{margin-right:" + c + "px;}"
        })
    }
    function d() {
        var b = {
            targetsize: .9,
            scalemode: "both",
            root: a(document.body),
            debug: !1,
            animationendcallback: null,
            closeclick: !1,
            preservescroll: !1
        };
        return b
    }
    function e(b, c) {
        var d, e = !c.preservescroll, j = null;
        !function() {
            var a = c.root
              , h = a.parent();
            b[0] === a[0] ? j = f(a, h) : a.data("original-scroll") ? e || (j = f(a, h)) : (d = !0,
            j = g(a, h, e))
        }();
        var k, l = null;
        h(c.root);
        var n = null;
        if (b[0] !== c.root[0]) {
            var o = m(b, c.root).inverse();
            e || (n = j),
            k = i(b, o, n, c),
            c.animationendcallback && (l = function() {
                c.animationendcallback.call(b[0])
            }
            )
        } else
            e && (k = (new PureCSSMatrix).translate(-j.x, -j.y)),
            l = function() {
                var d = a(c.root)
                  , f = j.elem;
                f.removeClass("noScroll"),
                d.setTransformation(new PureCSSMatrix),
                d.data("original-scroll", null),
                a(document).off("touchmove"),
                e && (f[0] == document.body || f[0] == window ? window.scrollTo(j.x, j.y) : (f.scrollLeft(j.x),
                f.scrollTop(j.y))),
                c.animationendcallback && c.animationendcallback.call(b[0])
            }
            ;
        var p = null;
        e && j && j.animationstartedcallback && (p = j.animationstartedcallback),
        d || (n = !1),
        a(c.root).animateTransformation(k, c, n, l, p)
    }
    function f(a, b) {
        var c = a.data("original-scroll");
        return c || (c = {
            elem: b,
            x: 0,
            "y:": 0
        }),
        c
    }
    function g(b, c, d) {
        var e = b.scrollTop()
          , f = b.scrollLeft()
          , g = b;
        e || (e = c.scrollTop(),
        f = c.scrollLeft(),
        g = c);
        var h = {
            elem: g,
            x: f,
            y: e
        };
        b.data("original-scroll", h),
        a(document).on("touchmove", function(a) {
            a.preventDefault()
        });
        var i = "translate(-" + f + "px,-" + e + "px)";
        return p.forEachPrefix(function(a) {
            b.css(a + "transform", i)
        }),
        g.addClass("noScroll"),
        d && (h.animationstartedcallback = function() {
            g[0] == document.body || g[0] == document ? window.scrollTo(0, 0) : (g.scrollLeft(0),
            g.scrollTop(0))
        }
        ),
        h
    }
    function h(b) {
        var c = a(b).parent()
          , d = c.width()
          , e = c.height()
          , f = d / 2
          , g = e / 2
          , h = n(f) + "px " + n(g) + "px";
        p.forEachPrefix(function(a) {
            b.css(a + "transform-origin", h)
        })
    }
    function i(b, c, d, e) {
        var f, g = e.targetsize, h = e.scalemode, i = e.root, j = a(i).parent(), k = j.width(), l = j.height(), m = k / b.outerWidth(), n = l / b.outerHeight();
        if ("width" == h)
            f = g * m;
        else if ("height" == h)
            f = g * n;
        else if ("both" == h)
            f = g * Math.min(m, n);
        else {
            if ("scale" != h)
                return void console.log("wrong zoommode");
            f = g
        }
        var o = (k - b.outerWidth() * f) / 2
          , p = (l - b.outerHeight() * f) / 2
          , q = k / 2
          , r = l / 2
          , s = -parseFloat(i.css("margin-left")) || 0
          , t = -parseFloat(i.css("margin-top")) || 0
          , u = new PureCSSMatrix;
        d && (u = u.translate(d.x, d.y));
        var v = u.translate(s, t).translate(-q, -r).translate(o, p).scale(f, f).multiply(c).translate(q, r);
        return v
    }
    function j(a, b, c) {
        return [a.a * b + a.c * c + a.e, a.b * b + a.d * c + a.f]
    }
    function k(a, b) {
        var c = m(a, b.root).elements();
        l(j(c, 0, 0)),
        l(j(c, 0, a.outerHeight())),
        l(j(c, a.outerWidth(), a.outerHeight())),
        l(j(c, a.outerWidth(), 0))
    }
    function l(b) {
        var c = "width:4px;height:4px;background-color:red;position:absolute;margin-left:-2px;margin-top:-2px;";
        c += "left:" + b[0] + "px;top:" + b[1] + "px;";
        var d = '<div class="debuglabel" style="' + c + '"></div>';
        a("#debug").append(d)
    }
    function m(b, c) {
        var d = b[0];
        if (!d || !d.ownerDocument)
            return null;
        var e, f = new PureCSSMatrix;
        if (d === d.ownerDocument.body) {
            var g;
            return g = jQuery.offset.bodyOffset ? jQuery.offset.bodyOffset(d) : jQuery.fn.offset(d),
            e = new PureCSSMatrix,
            e = e.translate(g.left, g.top),
            f = f.multiply(e)
        }
        var h;
        jQuery.offset.initialize ? (jQuery.offset.initialize(),
        h = {
            fixedPosition: jQuery.offset.supportsFixedPosition,
            doesNotAddBorder: jQuery.offset.doesNotAddBorder,
            doesAddBorderForTableAndCells: jQuery.support.doesAddBorderForTableAndCells,
            subtractsBorderForOverflowNotVisible: jQuery.offset.subtractsBorderForOverflowNotVisible
        }) : h = jQuery.support;
        var i, j, k = d.offsetParent, l = d.ownerDocument, m = l.documentElement, n = l.body, p = c[0], q = l.defaultView;
        j = q ? q.getComputedStyle(d, null) : d.currentStyle;
        var r = d.offsetTop
          , s = d.offsetLeft
          , t = o().translate(s, r);
        for (t = t.multiply(o(d)),
        f = t.multiply(f); (d = d.parentNode) && d !== p && (r = 0,
        s = 0,
        !h.fixedPosition || "fixed" !== j.position); )
            i = q ? q.getComputedStyle(d, null) : d.currentStyle,
            r -= d.scrollTop,
            s -= d.scrollLeft,
            d === k && (r += d.offsetTop,
            s += d.offsetLeft,
            !h.doesNotAddBorder || h.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(d.nodeName) || (r += parseFloat(i.borderTopWidth) || 0,
            s += parseFloat(i.borderLeftWidth) || 0),
            k = d.offsetParent),
            h.subtractsBorderForOverflowNotVisible && "visible" !== i.overflow && (r += parseFloat(i.borderTopWidth) || 0,
            s += parseFloat(i.borderLeftWidth) || 0),
            j = i,
            d.offsetParent == p && (r -= parseFloat(a(d.offsetParent).css("margin-top")) || 0,
            s -= parseFloat(a(d.offsetParent).css("margin-left")) || 0),
            t = o().translate(s, r),
            t = t.multiply(o(d)),
            f = t.multiply(f);
        r = 0,
        s = 0,
        ("relative" === j.position || "static" === j.position) && (r += n.offsetTop,
        s += n.offsetLeft),
        h.fixedPosition && "fixed" === j.position && (r += Math.max(m.scrollTop, n.scrollTop),
        s += Math.max(m.scrollLeft, n.scrollLeft));
        var u = (new PureCSSMatrix).translate(s, r);
        return f = f.multiply(u)
    }
    function n(a) {
        return Number(a).toFixed(6)
    }
    function o(a) {
        var b = p.getElementTransform(a);
        return b ? new PureCSSMatrix(b) : new PureCSSMatrix
    }
    var p = a.zoomooz.helpers
      , q = ["duration", "easing", "nativeanimation"];
    c(),
    a.zoomooz || (a.zoomooz = {}),
    a.zoomooz.setup = function(b) {
        a.zoomooz.defaultSettings = jQuery.extend(d(), b)
    }
    ,
    a.fn.zoomSettings = function(c) {
        var d;
        return this.each(function() {
            var e = a(this);
            d = b(e, c)
        }),
        d
    }
    ,
    a.fn.zoomTo = function(b, c) {
        return this.each(function() {
            var d = a(this);
            c || (b = d.zoomSettings(b)),
            e(d, b),
            b.debug ? (0 === a("#debug").length ? a(b.root).append('<div id="debug"><div>') : a("#debug").html(""),
            k(d, b)) : 0 !== a("#debug").length && a("#debug").html("")
        }),
        this
    }
}(jQuery),
function(a) {
    "use strict";
    function b(c, d, e) {
        c.addClass("zoomTarget"),
        e.animationendcallback || (e.animationendcallback = e.closeclick ? function() {
            a(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"),
            c.addClass("selectedZoomTarget")
        }
        : function() {
            a(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"),
            c.addClass("selectedZoomTarget zoomNotClickable")
        }
        );
        var f = d.closest(".zoomContainer");
        0 !== f.length && (e.root = f);
        var g = e.root;
        if (!g.hasClass("zoomTarget")) {
            var h = g.zoomSettings({});
            h.animationendcallback = function() {
                var b = a(this);
                a(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"),
                b.addClass("selectedZoomTarget zoomNotClickable"),
                b.parent().addClass("selectedZoomTarget zoomNotClickable")
            }
            ,
            b(g, g, h),
            b(g.parent(), g, h),
            g.click()
        }
        c.on("click", function(b) {
            var f = a(b.target);
            (!f.hasClass("zoomTarget") || f.is(c)) && (e.closeclick && d.hasClass("selectedZoomTarget") ? e.root.click() : d.zoomTo(e))
        })
    }
    function c() {
        function a(a) {
            var b = "-webkit-touch-callout: " + (a ? "default" : "none") + ";";
            return d.forEachPrefix(function(c) {
                b += c + "user-select:" + (a ? "text" : "none") + ";"
            }, !0),
            b
        }
        var b = document.createElement("style");
        b.type = "text/css",
        b.innerHTML = ".zoomTarget{" + a(!1) + "}.zoomTarget:hover{cursor:pointer!important;}.zoomNotClickable{" + a(!0) + "}.zoomNotClickable:hover{cursor:auto!important;}.zoomContainer{position:relative;padding:1px;margin:-1px;}",
        document.getElementsByTagName("head")[0].appendChild(b)
    }
    a.zoomooz || (a.zoomooz = {});
    var d = a.zoomooz.helpers;
    a.fn.zoomTarget = function(c) {
        this.each(function() {
            var d = a(this).zoomSettings(c);
            b(a(this), a(this), d)
        })
    }
    ,
    c(),
    a(document).ready(function() {
        a(".zoomTarget").zoomTarget()
    })
}(jQuery),
function(a) {
    "use strict";
    a.zoomooz || (a.zoomooz = {}),
    a.fn.zoomContainer = function() {}
    ,
    a(document).ready(function() {
        a(".zoomContainer").zoomContainer()
    })
}(jQuery),
function(a) {
    function b(b, d) {
        var e = c()
          , f = jQuery.extend({}, d);
        for (var g in e)
            e.hasOwnProperty(g) && !f[g] && (f[g] = e[g]instanceof jQuery ? a(b.data(g)) : b.data(g));
        return jQuery.extend({}, e, f)
    }
    function c() {
        return {
            type: "next",
            root: a(document.body),
            wrap: "true"
        }
    }
    function d(a, b) {
        a.addClass("zoomButton");
        var c;
        c = b.root.hasClass("zoomContainer") ? b.root : b.root.find(".zoomContainer");
        var d = function() {
            function a(a) {
                return g.indexOf(a)
            }
            function b(b) {
                var c = a(b) + 1;
                return g.length > c && 0 !== c ? g[c] : null
            }
            function d(b) {
                var c = a(b) - 1;
                return 0 > c ? null : g[c]
            }
            function e() {
                return g[0]
            }
            function f() {
                return g[g.length - 1]
            }
            var g = jQuery.makeArray(c.find(".zoomTarget"));
            return {
                next: b,
                prev: d,
                last: f,
                first: e
            }
        }();
        a.on("click", function() {
            var a, e = !0, f = c.find(".selectedZoomTarget");
            0 === f.length && (f = d.first()),
            0 === b.type.indexOf("prev") ? (a = d.prev(f[0]),
            null === a && (b.wrap ? a = d.last() : e = !1)) : (a = d.next(f[0]),
            null === a && (b.wrap ? a = d.first() : e = !1)),
            e && setTimeout(function() {
                a.click()
            }, 10)
        })
    }
    a.zoomooz || (a.zoomooz = {}),
    a.zoomooz.helpers,
    a.fn.zoomButton = function(c) {
        this.each(function() {
            var e = b(a(this), c);
            d(a(this), e)
        })
    }
    ,
    a(document).ready(function() {
        a(".zoomButton").zoomButton()
    })
}(jQuery),
function(a) {
    a.jqplot.PointLabels = function(b) {
        this.show = a.jqplot.config.enablePlugins,
        this.location = "n",
        this.labelsFromSeries = !1,
        this.seriesLabelIndex = null,
        this.labels = [],
        this._labels = [],
        this.stackedValue = !1,
        this.ypadding = 6,
        this.xpadding = 6,
        this.escapeHTML = !0,
        this.edgeTolerance = -5,
        this.formatter = a.jqplot.DefaultTickFormatter,
        this.formatString = "",
        this.hideZeros = !1,
        this._elems = [],
        a.extend(!0, this, b)
    }
    ;
    var b = {
        nw: 0,
        n: 1,
        ne: 2,
        e: 3,
        se: 4,
        s: 5,
        sw: 6,
        w: 7
    }
      , c = ["se", "s", "sw", "w", "nw", "n", "ne", "e"];
    a.jqplot.PointLabels.init = function(b, c, d, e, f) {
        var g = a.extend(!0, {}, d, e);
        g.pointLabels = g.pointLabels || {},
        this.renderer.constructor !== a.jqplot.BarRenderer || "horizontal" !== this.barDirection || g.pointLabels.location || (g.pointLabels.location = "e"),
        this.plugins.pointLabels = new a.jqplot.PointLabels(g.pointLabels),
        this.plugins.pointLabels.setLabels.call(this)
    }
    ,
    a.jqplot.PointLabels.prototype.setLabels = function() {
        var b, c = this.plugins.pointLabels;
        if (b = null != c.seriesLabelIndex ? c.seriesLabelIndex : this.renderer.constructor === a.jqplot.BarRenderer && "horizontal" === this.barDirection ? this._plotData[0].length < 3 ? 0 : this._plotData[0].length - 1 : 0 === this._plotData.length ? 0 : this._plotData[0].length - 1,
        c._labels = [],
        0 === c.labels.length || c.labelsFromSeries)
            if (c.stackedValue) {
                if (this._plotData.length && this._plotData[0].length)
                    for (var d = 0; d < this._plotData.length; d++)
                        c._labels.push(this._plotData[d][b])
            } else {
                var e = this.data;
                if (this.renderer.constructor === a.jqplot.BarRenderer && this.waterfall && (e = this._data),
                e.length && e[0].length)
                    for (var d = 0; d < e.length; d++)
                        c._labels.push(e[d][b]);
                e = null
            }
        else
            c.labels.length && (c._labels = c.labels)
    }
    ,
    a.jqplot.PointLabels.prototype.xOffset = function(a, b, c) {
        b = b || this.location,
        c = c || this.xpadding;
        var d;
        switch (b) {
        case "nw":
            d = -a.outerWidth(!0) - this.xpadding;
            break;
        case "n":
            d = -a.outerWidth(!0) / 2;
            break;
        case "ne":
            d = this.xpadding;
            break;
        case "e":
            d = this.xpadding;
            break;
        case "se":
            d = this.xpadding;
            break;
        case "s":
            d = -a.outerWidth(!0) / 2;
            break;
        case "sw":
            d = -a.outerWidth(!0) - this.xpadding;
            break;
        case "w":
            d = -a.outerWidth(!0) - this.xpadding;
            break;
        default:
            d = -a.outerWidth(!0) - this.xpadding
        }
        return d
    }
    ,
    a.jqplot.PointLabels.prototype.yOffset = function(a, b, c) {
        b = b || this.location,
        c = c || this.xpadding;
        var d;
        switch (b) {
        case "nw":
            d = -a.outerHeight(!0) - this.ypadding;
            break;
        case "n":
            d = -a.outerHeight(!0) - this.ypadding;
            break;
        case "ne":
            d = -a.outerHeight(!0) - this.ypadding;
            break;
        case "e":
            d = -a.outerHeight(!0) / 2;
            break;
        case "se":
            d = this.ypadding;
            break;
        case "s":
            d = this.ypadding;
            break;
        case "sw":
            d = this.ypadding;
            break;
        case "w":
            d = -a.outerHeight(!0) / 2;
            break;
        default:
            d = -a.outerHeight(!0) - this.ypadding
        }
        return d
    }
    ,
    a.jqplot.PointLabels.draw = function(d, e, f) {
        var g = this.plugins.pointLabels;
        g.setLabels.call(this);
        for (var h = 0; h < g._elems.length; h++)
            g._elems[h].emptyForce();
        if (g._elems.splice(0, g._elems.length),
        g.show) {
            var i = "_" + this._stackAxis + "axis";
            g.formatString || (g.formatString = this[i]._ticks[0].formatString,
            g.formatter = this[i]._ticks[0].formatter);
            for (var j, k, l = this._plotData, m = (this._prevPlotData,
            this._xaxis), n = this._yaxis, h = 0, o = g._labels.length; o > h; h++) {
                var p = g._labels[h];
                if (!(null == p || g.hideZeros && 0 == parseInt(p, 10))) {
                    p = g.formatter(g.formatString, p),
                    k = document.createElement("div"),
                    g._elems[h] = a(k),
                    j = g._elems[h],
                    j.addClass("jqplot-point-label jqplot-series-" + this.index + " jqplot-point-" + h),
                    j.css("position", "absolute"),
                    j.insertAfter(d.canvas),
                    g.escapeHTML ? j.text(p) : j.html(p);
                    var q = g.location;
                    (this.fillToZero && l[h][1] < 0 || this.fillToZero && "bar" === this._type && "horizontal" === this.barDirection && l[h][0] < 0 || (this.waterfall && parseInt(p, 10)) < 0) && (q = c[b[q]]);
                    var r = m.u2p(l[h][0]) + g.xOffset(j, q)
                      , s = n.u2p(l[h][1]) + g.yOffset(j, q);
                    this._stack && !g.stackedValue && ("vertical" === this.barDirection ? s = (this._barPoints[h][0][1] + this._barPoints[h][1][1]) / 2 + f._gridPadding.top - .5 * j.outerHeight(!0) : r = (this._barPoints[h][2][0] + this._barPoints[h][0][0]) / 2 + f._gridPadding.left - .5 * j.outerWidth(!0)),
                    this.renderer.constructor == a.jqplot.BarRenderer && ("vertical" == this.barDirection ? r += this._barNudge : s -= this._barNudge),
                    j.css("left", r),
                    j.css("top", s);
                    var t = r + j.width()
                      , u = s + j.height()
                      , v = g.edgeTolerance
                      , w = a(d.canvas).position().left
                      , x = a(d.canvas).position().top
                      , y = d.canvas.width + w
                      , z = d.canvas.height + x;
                    (w > r - v || x > s - v || t + v > y || u + v > z) && j.remove(),
                    j = null,
                    k = null
                }
            }
        }
    }
    ,
    a.jqplot.postSeriesInitHooks.push(a.jqplot.PointLabels.init),
    a.jqplot.postDrawSeriesHooks.push(a.jqplot.PointLabels.draw)
}(jQuery),
function(a) {
    function b(b, c) {
        var d = b.plugins.highlighter
          , e = b.series[c.seriesIndex]
          , f = e.markerRenderer
          , g = d.markerRenderer;
        g.style = f.style,
        g.lineWidth = f.lineWidth + d.lineWidthAdjust,
        g.size = f.size + d.sizeAdjust;
        var h = a.jqplot.getColorComponents(f.color)
          , i = [h[0], h[1], h[2]]
          , j = h[3] >= .6 ? .6 * h[3] : h[3] * (2 - h[3]);
        g.color = "rgba(" + i[0] + "," + i[1] + "," + i[2] + "," + j + ")",
        g.init(),
        g.draw(e.gridData[c.pointIndex][0], e.gridData[c.pointIndex][1], d.highlightCanvas._ctx)
    }
    function c(b, c, d) {
        var h = b.plugins.highlighter
          , i = h._tooltipElem
          , j = c.highlighter || {}
          , k = a.extend(!0, {}, h, j);
        if (k.useAxesFormatters) {
            for (var l, m = c._xaxis._ticks[0].formatter, n = c._yaxis._ticks[0].formatter, o = c._xaxis._ticks[0].formatString, p = c._yaxis._ticks[0].formatString, q = m(o, d.data[0]), r = [], s = 1; s < k.yvalues + 1; s++)
                r.push(n(p, d.data[s]));
            if ("string" == typeof k.formatString)
                switch (k.tooltipAxes) {
                case "both":
                case "xy":
                    r.unshift(q),
                    r.unshift(k.formatString),
                    l = a.jqplot.sprintf.apply(a.jqplot.sprintf, r);
                    break;
                case "yx":
                    r.push(q),
                    r.unshift(k.formatString),
                    l = a.jqplot.sprintf.apply(a.jqplot.sprintf, r);
                    break;
                case "x":
                    l = a.jqplot.sprintf.apply(a.jqplot.sprintf, [k.formatString, q]);
                    break;
                case "y":
                    r.unshift(k.formatString),
                    l = a.jqplot.sprintf.apply(a.jqplot.sprintf, r);
                    break;
                default:
                    r.unshift(q),
                    r.unshift(k.formatString),
                    l = a.jqplot.sprintf.apply(a.jqplot.sprintf, r)
                }
            else
                switch (k.tooltipAxes) {
                case "both":
                case "xy":
                    l = q;
                    for (var s = 0; s < r.length; s++)
                        l += k.tooltipSeparator + r[s];
                    break;
                case "yx":
                    l = "";
                    for (var s = 0; s < r.length; s++)
                        l += r[s] + k.tooltipSeparator;
                    l += q;
                    break;
                case "x":
                    l = q;
                    break;
                case "y":
                    l = r.join(k.tooltipSeparator);
                    break;
                default:
                    l = q;
                    for (var s = 0; s < r.length; s++)
                        l += k.tooltipSeparator + r[s]
                }
        } else {
            var l;
            "string" == typeof k.formatString ? l = a.jqplot.sprintf.apply(a.jqplot.sprintf, [k.formatString].concat(d.data)) : "both" == k.tooltipAxes || "xy" == k.tooltipAxes ? l = a.jqplot.sprintf(k.tooltipFormatString, d.data[0]) + k.tooltipSeparator + a.jqplot.sprintf(k.tooltipFormatString, d.data[1]) : "yx" == k.tooltipAxes ? l = a.jqplot.sprintf(k.tooltipFormatString, d.data[1]) + k.tooltipSeparator + a.jqplot.sprintf(k.tooltipFormatString, d.data[0]) : "x" == k.tooltipAxes ? l = a.jqplot.sprintf(k.tooltipFormatString, d.data[0]) : "y" == k.tooltipAxes && (l = a.jqplot.sprintf(k.tooltipFormatString, d.data[1]))
        }
        a.isFunction(k.tooltipContentEditor) && (l = k.tooltipContentEditor(l, d.seriesIndex, d.pointIndex, b)),
        i.html(l);
        var t = {
            x: d.gridData[0],
            y: d.gridData[1]
        }
          , u = 0
          , v = .707;
        1 == c.markerRenderer.show && (u = (c.markerRenderer.size + k.sizeAdjust) / 2);
        var w = e;
        switch (c.fillToZero && c.fill && d.data[1] < 0 && (w = g),
        w[f[k.tooltipLocation]]) {
        case "nw":
            var x = t.x + b._gridPadding.left - i.outerWidth(!0) - k.tooltipOffset - v * u
              , y = t.y + b._gridPadding.top - k.tooltipOffset - i.outerHeight(!0) - v * u;
            break;
        case "n":
            var x = t.x + b._gridPadding.left - i.outerWidth(!0) / 2
              , y = t.y + b._gridPadding.top - k.tooltipOffset - i.outerHeight(!0) - u;
            break;
        case "ne":
            var x = t.x + b._gridPadding.left + k.tooltipOffset + v * u
              , y = t.y + b._gridPadding.top - k.tooltipOffset - i.outerHeight(!0) - v * u;
            break;
        case "e":
            var x = t.x + b._gridPadding.left + k.tooltipOffset + u
              , y = t.y + b._gridPadding.top - i.outerHeight(!0) / 2;
            break;
        case "se":
            var x = t.x + b._gridPadding.left + k.tooltipOffset + v * u
              , y = t.y + b._gridPadding.top + k.tooltipOffset + v * u;
            break;
        case "s":
            var x = t.x + b._gridPadding.left - i.outerWidth(!0) / 2
              , y = t.y + b._gridPadding.top + k.tooltipOffset + u;
            break;
        case "sw":
            var x = t.x + b._gridPadding.left - i.outerWidth(!0) - k.tooltipOffset - v * u
              , y = t.y + b._gridPadding.top + k.tooltipOffset + v * u;
            break;
        case "w":
            var x = t.x + b._gridPadding.left - i.outerWidth(!0) - k.tooltipOffset - u
              , y = t.y + b._gridPadding.top - i.outerHeight(!0) / 2;
            break;
        default:
            var x = t.x + b._gridPadding.left - i.outerWidth(!0) - k.tooltipOffset - v * u
              , y = t.y + b._gridPadding.top - k.tooltipOffset - i.outerHeight(!0) - v * u
        }
        i.css("left", x),
        i.css("top", y),
        k.fadeTooltip ? i.stop(!0, !0).fadeIn(k.tooltipFadeSpeed) : i.show(),
        i = null
    }
    function d(a, d, e, f, g) {
        var h = g.plugins.highlighter
          , i = g.plugins.cursor;
        if (h.show)
            if (null == f && h.isHighlighting) {
                var j = jQuery.Event("jqplotHighlighterUnhighlight");
                g.target.trigger(j);
                var k = h.highlightCanvas._ctx;
                k.clearRect(0, 0, k.canvas.width, k.canvas.height),
                h.fadeTooltip ? h._tooltipElem.fadeOut(h.tooltipFadeSpeed) : h._tooltipElem.hide(),
                h.bringSeriesToFront && g.restorePreviousSeriesOrder(),
                h.isHighlighting = !1,
                h.currentNeighbor = null,
                k = null
            } else if (null != f && g.series[f.seriesIndex].showHighlight && !h.isHighlighting) {
                var j = jQuery.Event("jqplotHighlighterHighlight");
                j.which = a.which,
                j.pageX = a.pageX,
                j.pageY = a.pageY;
                var l = [f.seriesIndex, f.pointIndex, f.data, g];
                g.target.trigger(j, l),
                h.isHighlighting = !0,
                h.currentNeighbor = f,
                h.showMarker && b(g, f),
                !g.series[f.seriesIndex].show || !h.showTooltip || i && i._zoom.started || c(g, g.series[f.seriesIndex], f),
                h.bringSeriesToFront && g.moveSeriesToFront(f.seriesIndex)
            } else if (null != f && h.isHighlighting && h.currentNeighbor != f && g.series[f.seriesIndex].showHighlight) {
                var k = h.highlightCanvas._ctx;
                k.clearRect(0, 0, k.canvas.width, k.canvas.height),
                h.isHighlighting = !0,
                h.currentNeighbor = f,
                h.showMarker && b(g, f),
                !g.series[f.seriesIndex].show || !h.showTooltip || i && i._zoom.started || c(g, g.series[f.seriesIndex], f),
                h.bringSeriesToFront && g.moveSeriesToFront(f.seriesIndex)
            }
    }
    a.jqplot.eventListenerHooks.push(["jqplotMouseMove", d]),
    a.jqplot.Highlighter = function(b) {
        this.show = a.jqplot.config.enablePlugins,
        this.markerRenderer = new a.jqplot.MarkerRenderer({
            shadow: !1
        }),
        this.showMarker = !0,
        this.lineWidthAdjust = 2.5,
        this.sizeAdjust = 5,
        this.showTooltip = !0,
        this.tooltipLocation = "nw",
        this.fadeTooltip = !0,
        this.tooltipFadeSpeed = "fast",
        this.tooltipOffset = 2,
        this.tooltipAxes = "both",
        this.tooltipSeparator = ", ",
        this.tooltipContentEditor = null,
        this.useAxesFormatters = !0,
        this.tooltipFormatString = "%.5P",
        this.formatString = null,
        this.yvalues = 1,
        this.bringSeriesToFront = !1,
        this._tooltipElem,
        this.isHighlighting = !1,
        this.currentNeighbor = null,
        a.extend(!0, this, b)
    }
    ;
    var e = ["nw", "n", "ne", "e", "se", "s", "sw", "w"]
      , f = {
        nw: 0,
        n: 1,
        ne: 2,
        e: 3,
        se: 4,
        s: 5,
        sw: 6,
        w: 7
    }
      , g = ["se", "s", "sw", "w", "nw", "n", "ne", "e"];
    a.jqplot.Highlighter.init = function(b, c, d) {
        var e = d || {};
        this.plugins.highlighter = new a.jqplot.Highlighter(e.highlighter)
    }
    ,
    a.jqplot.Highlighter.parseOptions = function(a, b) {
        this.showHighlight = !0
    }
    ,
    a.jqplot.Highlighter.postPlotDraw = function() {
        this.plugins.highlighter && this.plugins.highlighter.highlightCanvas && (this.plugins.highlighter.highlightCanvas.resetCanvas(),
        this.plugins.highlighter.highlightCanvas = null),
        this.plugins.highlighter && this.plugins.highlighter._tooltipElem && (this.plugins.highlighter._tooltipElem.emptyForce(),
        this.plugins.highlighter._tooltipElem = null),
        this.plugins.highlighter.highlightCanvas = new a.jqplot.GenericCanvas,
        this.eventCanvas._elem.before(this.plugins.highlighter.highlightCanvas.createElement(this._gridPadding, "jqplot-highlight-canvas", this._plotDimensions, this)),
        this.plugins.highlighter.highlightCanvas.setContext();
        var b = document.createElement("div");
        this.plugins.highlighter._tooltipElem = a(b),
        b = null,
        this.plugins.highlighter._tooltipElem.addClass("jqplot-highlighter-tooltip"),
        this.plugins.highlighter._tooltipElem.css({
            position: "absolute",
            display: "none"
        }),
        this.eventCanvas._elem.before(this.plugins.highlighter._tooltipElem)
    }
    ,
    a.jqplot.preInitHooks.push(a.jqplot.Highlighter.init),
    a.jqplot.preParseSeriesOptionsHooks.push(a.jqplot.Highlighter.parseOptions),
    a.jqplot.postDrawHooks.push(a.jqplot.Highlighter.postPlotDraw)
}(jQuery),
tl = window.tl || {},
tl.pg = tl.pg || {},
tl.pg.interval = {},
tl.currentIndex = -1,
function(a) {
    tl.pg.default_prefs = {
        auto_show_first: !0,
        loading_selector: "#loading",
        track_events_cb: function() {},
        handle_doc_switch: null,
        custom_open_button: null,
        pg_caption: "page guide",
        tourtitle: "Open Page Guide for help",
        check_welcome_dismissed: function() {
            var a = "tlypageguide_welcome_shown_" + tl.pg.hashUrl();
            try {
                if (localStorage.getItem(a))
                    return !0
            } catch (b) {
                if (document.cookie.indexOf(a) > -1)
                    return !0
            }
            return !1
        },
        dismiss_welcome: function() {
            var a = "tlypageguide_welcome_shown_" + tl.pg.hashUrl();
            try {
                localStorage.setItem(a, !0)
            } catch (b) {
                var c = new Date;
                c.setDate(c.getDate() + 365),
                document.cookie = a + "=true; expires=" + c.toUTCString()
            }
        },
        ready_callback: null,
        pointer_fallback: !0,
        default_zindex: 100,
        steps_element: "#tlyPageGuide",
        auto_refresh: !1,
        refresh_welcome: !1,
        refresh_interval: 500
    },
    tl.pg.wrapper_markup = '<div id="tlyPageGuideWrapper"><div id="tlyPageGuideOverlay"></div><div id="tlyPageGuideMessages"><a href="#" class="tlypageguide_close"></a><span class="tlypageguide_index"></span><div class="tlypageguide_text"></div><a href="#" class="tlypageguide_back">Previous</a><a href="#" class="tlypageguide_fwd">Next</a></div><div id="tlyPageGuideContent"></div><div id="tlyPageGuideToggles"></div></div>',
    tl.pg.toggle_markup = '<div class="tlypageguide_toggle" title="Launch Page Guide"><div><span class="tlypageguide_toggletitle"></span></div><a href="#" class="tlypageguide_close" title="close guide">close guide &raquo;</a></div>',
    tl.pg.init = function(b) {
        b = a.extend({}, tl.pg.default_prefs, b),
        tl.pg.last_preferences = b;
        var c = a(b.steps_element)
          , d = tl.pg.hashCode(b.steps_element);
        if (clearInterval(tl.pg.interval[d]),
        0 !== c.length) {
            b.pointer_fallback && tl.pg.pointerEventSupport() && (b.pointer_fallback = !1);
            var e = a("#tlyPageGuideWrapper")
              , f = !0;
            if (e.length || (f = !1,
            e = a(tl.pg.wrapper_markup)),
            null == b.custom_open_button && a("#tlyPageGuideToggle" + d).length < 1) {
                var g = c.data("tourtitle") || b.tourtitle
                  , h = a(tl.pg.toggle_markup).attr("id", "tlyPageGuideToggle" + d).prepend(b.pg_caption);
                h.find(".tlypageguide_toggletitle").text(g),
                e.find("#tlyPageGuideToggles").append(h)
            }
            f || a("body").prepend(e);
            var i = new tl.pg.PageGuide(a("#tlyPageGuideWrapper"),b);
            return i.ready(function() {
                i.setup_welcome(),
                i.preferences.welcome_refresh && i.updateTimer(function() {
                    i.setup_welcome()
                }, "welcome"),
                i.setup_handlers(),
                i.$base.find(".tlypageguide_toggle").animate({
                    right: "-120px"
                }, 250),
                "function" == typeof b.ready_callback && b.ready_callback()
            }),
            a("#main-ui-view").on("click", function() {
                a(".tlypageguide_close").click()
            }),
            i
        }
    }
    ,
    tl.pg.PageGuide = function(b, c) {
        this.preferences = c,
        this.$base = b,
        this.$message = this.$base.find("#tlyPageGuideMessages"),
        this.$fwd = this.$base.find("a.tlypageguide_fwd"),
        this.$back = this.$base.find("a.tlypageguide_back"),
        this.$content = this.$base.find("#tlyPageGuideContent"),
        this.$steps = a(c.steps_element),
        this.uuid = tl.pg.hashCode(c.steps_element),
        this.$toggle = this.$base.find("#tlyPageGuideToggle" + this.uuid),
        this.cur_idx = 0,
        this.cur_selector = null,
        this.track_event = this.preferences.track_events_cb,
        this.handle_doc_switch = this.preferences.handle_doc_switch,
        this.custom_open_button = this.preferences.custom_open_button,
        this.is_open = !1,
        this.targetData = {},
        this.hashTable = {},
        this.changeQueue = [],
        this.visibleTargets = [],
        this.timer = {
            overlay: null,
            welcome: null
        }
    }
    ,
    tl.pg.hashUrl = function() {
        return tl.pg.hashCode(window.location.href)
    }
    ,
    tl.pg.hashCode = function(a) {
        var b, c, d = 0;
        if (null == a || 0 === a.length)
            return d;
        for (b = 0; b < a.length; b++)
            c = a.charCodeAt(b),
            d = (d << 5) - d + c,
            d &= d;
        return d.toString()
    }
    ,
    tl.pg.isScrolledIntoView = function(b) {
        var c = a(window).scrollTop()
          , d = c + a(window).height()
          , e = a(b).offset().top
          , f = e + a(b).height();
        return f >= c && d - 100 >= e
    }
    ,
    tl.pg.destroy = function() {
        a("#tlyPageGuideWrapper").remove(),
        a("body").removeClass("tlypageguide-open"),
        a("body").removeClass("tlyPageGuideWelcomeOpen");
        for (var b in tl.pg.interval)
            tl.pg.interval.hasOwnProperty(b) && clearInterval(tl.pg.interval[b])
    }
    ,
    tl.pg.pointerEventSupport = function() {
        var a = document.createElement("x")
          , b = document.documentElement
          , c = window.getComputedStyle
          , d = null;
        return "pointerEvents"in a.style ? (a.style.pointerEvents = "auto",
        a.style.pointerEvents = "x",
        b.appendChild(a),
        d = c && "auto" === c(a, "").pointerEvents,
        b.removeChild(a),
        !!d) : !1
    }
    ,
    tl.pg.PageGuide.prototype.setup_welcome = function() {
        var b = a(".tlyPageGuideWelcome, #tlyPageGuideWelcome").not("#tlyPageGuideWrapper > .tlyPageGuideWelcome, #tlyPageGuideWrapper > #tlyPageGuideWelcome").eq(0)
          , c = this;
        b.length > 0 && (c.preferences.show_welcome = !c.preferences.check_welcome_dismissed(),
        c.preferences.show_welcome && b.appendTo(c.$base),
        b.find(".tlypageguide_ignore").length && b.on("click", ".tlypageguide_ignore", function() {
            c.close_welcome(),
            c.track_event("PG.ignoreWelcome")
        }),
        b.find(".tlypageguide_dismiss").length && b.on("click", ".tlypageguide_dismiss", function() {
            c.close_welcome(),
            c.preferences.dismiss_welcome(),
            c.track_event("PG.dismissWelcome")
        }),
        b.on("click", ".tlypageguide_start", function() {
            c.open(),
            c.track_event("PG.startFromWelcome")
        }),
        c.preferences.show_welcome && c.pop_welcome())
    }
    ,
    tl.pg.PageGuide.prototype.ready = function(b) {
        var c = this;
        return tl.pg.interval[c.uuid] = window.setInterval(function() {
            a(c.preferences.loading_selector).is(":visible") || (b(),
            clearInterval(tl.pg.interval[c.uuid]))
        }, 250),
        this
    }
    ,
    tl.pg.PageGuide.prototype.addSteps = function() {
        var b = this;
        b.$steps.find("li").each(function(c, d) {
            var e = a(d)
              , f = e.data("tourtarget")
              , g = e.attr("class");
            if (!b.targetData[f]) {
                b.targetData[f] = {
                    targetStyle: {},
                    content: e.html()
                };
                var h = tl.pg.hashCode(f) + "";
                b.hashTable[h] = f,
                b.$content.append('<div id="' + f.replace("#", "") + 'Item" class="tlypageguide_shadow tlypageguide_shadow' + h + '" data-selectorhash="' + h + '"><span id="' + f.replace("#", "") + 'ItemClick" style="display: none;" class="tlyPageGuideStepIndex ' + g + '"></span></div>'),
                a(f + "Item").on("mouseover", function() {
                    b.is_open && a(f + "ItemClick").click()
                })
            }
        })
    }
    ,
    tl.pg.PageGuide.prototype.checkTargets = function() {
        var b = this
          , c = 0
          , d = [];
        for (var e in b.targetData) {
            var f = a(e + ":visible")
              , g = {
                targetStyle: {
                    display: f.length && f.is(":visible") ? "block" : "none"
                }
            };
            if ("block" === g.targetStyle.display) {
                var h = f.offset();
                a.extend(g.targetStyle, {
                    top: h.top,
                    left: h.left,
                    width: f.outerWidth(),
                    height: f.outerHeight(),
                    "z-index": f.css("z-index")
                }),
                c++,
                g.index = c,
                d.push(e)
            }
            var i = {
                target: e
            };
            for (var j in g.targetStyle)
                g.targetStyle[j] !== b.targetData[e][j] && (null == i.targetStyle && (i.targetStyle = {}),
                i.targetStyle[j] = g.targetStyle[j]);
            g.index !== b.targetData[e].index && (i.index = g.index),
            (null != i.targetStyle || null != i.index) && b.changeQueue.push(i),
            a.extend(b.targetData[e], g)
        }
        b.visibleTargets = d
    }
    ,
    tl.pg.PageGuide.prototype.positionOverlays = function() {
        for (var b = 0; b < this.changeQueue.length; b++) {
            var c = this.changeQueue[b]
              , d = ".tlypageguide_shadow" + tl.pg.hashCode(c.target)
              , e = this.$content.find(d);
            if (null != c.targetStyle) {
                var f = a.extend({}, c.targetStyle);
                for (var g in f)
                    "z-index" === g && (f[g] = "number" == typeof f[g] ? f[g] + 1 : this.preferences.default_zindex);
                e.css(f)
            }
            null != c.index && e.find(".tlyPageGuideStepIndex").text(c.index)
        }
        this.changeQueue = []
    }
    ,
    tl.pg.PageGuide.prototype.refreshVisibleSteps = function() {
        this.addSteps(),
        this.checkTargets(),
        this.positionOverlays()
    }
    ,
    tl.pg.PageGuide.prototype.updateVisible = function() {
        if (this.refreshVisibleSteps(),
        null != this.cur_selector && this.cur_selector !== this.visibleTargets[this.cur_idx]) {
            var a = this.cur_idx % this.visibleTargets.length;
            this.show_message(a)
        }
    }
    ,
    tl.pg.PageGuide.prototype.show_message = function(b) {
        var c = this.visibleTargets[b]
          , d = this.targetData[c];
        if (null != d) {
            this.$message.stop();
            var e = ".tlypageguide_shadow" + tl.pg.hashCode(c);
            this.$content.find(".tlypageguide-active").removeClass("tlypageguide-active"),
            this.$content.find(e).addClass("tlypageguide-active"),
            this.$message.find(".tlypageguide_text").html(d.content),
            this.cur_idx = b,
            this.cur_selector = c;
            var f = 100
              , g = parseFloat(this.$message.css("height"));
            this.$message.css("height", "auto");
            var h = parseFloat(this.$message.outerHeight());
            this.$message.css("height", g),
            f > h && (h = f),
            h > a(window).height() / 2 && (h = a(window).height() / 2),
            tl.pg.isScrolledIntoView(a(c)) || a("html,body").animate({
                scrollTop: d.targetStyle.top - 50
            }, 500),
            this.$message.show().animate({
                height: h
            }, 500),
            this.roll_number(this.$message.find("span"), d.index)
        }
    }
    ,
    tl.pg.PageGuide.prototype.setTitleMessages = function() {
        this.$message.find(".tlypageguide_close").html(this.preferences.close),
        this.$message.find(".tlypageguide_close")[0].title = this.preferences.closeTitle,
        this.$message.find(".tlypageguide_back")[0].title = this.preferences.previousTitle,
        this.$message.find(".tlypageguide_fwd")[0].title = this.preferences.nextTitle
    }
    ,
    tl.pg.PageGuide.prototype.navigateBack = function() {
        var b = (this.cur_idx + this.visibleTargets.length - 1) % this.visibleTargets.length;
        return this.track_event("PG.back"),
        this.show_message(b, !0),
        tl.currentElement = a(a(".tlypageguide_shadow:visible")[b]),
        a(".tlyPageSelected").removeClass("tlyPageSelected"),
        tl.currentElement.addClass("tlyPageSelected"),
        !1
    }
    ,
    tl.pg.PageGuide.prototype.navigateForward = function() {
        var b = (this.cur_idx + 1) % this.visibleTargets.length;
        return this.track_event("PG.fwd"),
        this.show_message(b, !0),
        tl.currentElement = a(a(".tlypageguide_shadow:visible")[b]),
        a(".tlyPageSelected").removeClass("tlyPageSelected"),
        tl.currentElement.addClass("tlyPageSelected"),
        !1
    }
    ,
    tl.pg.PageGuide.prototype.open = function() {
        this.is_open || this._open()
    }
    ,
    tl.pg.PageGuide.prototype._open = function() {
        this.preferences.show_welcome && (this.preferences.dismiss_welcome(),
        this.close_welcome()),
        this.is_open = !0,
        this.track_event("PG.open"),
        this.refreshVisibleSteps(),
        this.preferences.auto_show_first && this.visibleTargets.length && (this.setTitleMessages(),
        this.show_message(0)),
        a("body").addClass("tlypageguide-open"),
        this.$toggle.addClass("tlyPageGuideToggleActive"),
        tl.currentIndex = 1,
        tl.currentElement = a(".tlypageguide_shadow").first(),
        a(".tlyPageSelected").removeClass("tlyPageSelected"),
        tl.currentElement.addClass("tlyPageSelected");
        var b = this;
        b.preferences.auto_refresh && b.updateTimer(function() {
            b.updateVisible()
        }, "overlay")
    }
    ,
    tl.pg.PageGuide.prototype.updateTimer = function(a, b) {
        var c = this;
        a(),
        c.timer[b] = setTimeout(function() {
            c.updateTimer(a, b)
        }, c.preferences.refresh_interval)
    }
    ,
    tl.pg.PageGuide.prototype.close = function() {
        this.is_open && this._close()
    }
    ,
    tl.pg.PageGuide.prototype._close = function() {
        this.is_open = !1,
        this.track_event("PG.close"),
        this.preferences.auto_refresh && clearTimeout(this.timer.overlay),
        this.$content.find(".tlypageguide_shadow").css("display", "none"),
        this.$content.find(".tlypageguide-active").removeClass("tlypageguide-active"),
        this.$message.stop(),
        this.$message.animate({
            height: "0"
        }, 500, function() {
            a(this).hide()
        }),
        a("body").removeClass("tlypageguide-open"),
        this.$toggle.removeClass("tlyPageGuideToggleActive")
    }
    ,
    tl.pg.PageGuide.prototype.setup_handlers = function() {
        var b = this
          , c = null == b.custom_open_button ? b.$base.find("#tlyPageGuideToggle" + b.uuid) : a(b.custom_open_button);
        c.off(),
        c.on("click", function() {
            return b.is_open ? b.close() : !b.preferences.show_welcome || b.preferences.check_welcome_dismissed() || a("body").hasClass("tlyPageGuideWelcomeOpen") ? b.open() : b.pop_welcome(),
            !1
        }),
        a(".tlypageguide_close", b.$message.add(a(".tlypageguide_toggle"))).on("click", function() {
            return b.close(),
            !1
        }),
        b.$base.on("click", ".tlyPageGuideStepIndex", function() {
            tl.currentElement && tl.currentElement.removeClass("tlyPageSelected"),
            tl.currentElement = a(this).parent();
            var c = b.hashTable[tl.currentElement.data("selectorhash")];
            tl.currentElement.addClass("tlyPageSelected");
            var d = b.targetData[c]
              , e = d ? d.index : 1;
            e !== tl.currentIndex && (b.track_event("PG.specific_elt"),
            b.show_message(e - 1),
            tl.currentIndex = e)
        }),
        b.$fwd.on("click", function() {
            return b.is_open && b.navigateForward(),
            !1
        }),
        b.$back.on("click", function() {
            return b.is_open && b.navigateBack(),
            !1
        }),
        b.preferences.pointer_fallback && b.$base.on("click", ".tlypageguide_shadow", function(b) {
            a(this).hide();
            var c = a(document.elementFromPoint(b.clientX, b.clientY));
            c.is("a") ? c.get(0).click() : c.trigger(b.type),
            a(this).show()
        }),
        a(window).resize(function() {
            b.is_open && b.refreshVisibleSteps()
        })
    }
    ,
    tl.pg.PageGuide.prototype.roll_number = function(a, b, c) {
        c = parseInt(a.html()) < parseInt(b) ? !1 : !0,
        a.stop(),
        a.animate({
            "text-indent": (c ? "" : "-") + "50px"
        }, "fast", function() {
            a.html(b),
            a.css({
                "text-indent": (c ? "-" : "") + "50px"
            }, "fast").animate({
                "text-indent": "0"
            }, "fast")
        })
    }
    ,
    tl.pg.PageGuide.prototype.pop_welcome = function() {
        a("body").addClass("tlyPageGuideWelcomeOpen"),
        this.track_event("PG.welcomeShown")
    }
    ,
    tl.pg.PageGuide.prototype.close_welcome = function() {
        a("body").removeClass("tlyPageGuideWelcomeOpen")
    }
}(jQuery),
function(a) {
    "use strict";
    function b(a, b) {
        var c = p ? b : l(b)
          , g = c.worker && Papa.WORKERS_SUPPORTED && o;
        if (g) {
            var h = i();
            h.userStep = c.step,
            h.userChunk = c.chunk,
            h.userComplete = c.complete,
            h.userError = c.error,
            c.step = n(c.step),
            c.chunk = n(c.chunk),
            c.complete = n(c.complete),
            c.error = n(c.error),
            delete c.worker,
            h.postMessage({
                input: a,
                config: c,
                workerId: h.id
            })
        } else if ("string" == typeof a) {
            if (!c.download) {
                var j = new f(c)
                  , k = j.parse(a);
                return n(c.complete) && c.complete(k),
                k
            }
            var m = new d(c);
            m.stream(a)
        } else if (a instanceof File)
            if (c.step || c.chunk) {
                var m = new e(c);
                m.stream(a)
            } else {
                var j = new f(c);
                if (p) {
                    var q = new FileReaderSync
                      , r = q.readAsText(a, c.encoding);
                    return j.parse(r)
                }
                q = new FileReader,
                q.onload = function(a) {
                    var b = new f(c)
                      , d = b.parse(a.target.result);
                    n(c.complete) && c.complete(d)
                }
                ,
                q.readAsText(a, c.encoding)
            }
    }
    function c(b, c) {
        function d() {
            "object" == typeof c && ("string" == typeof c.delimiter && 1 == c.delimiter.length && -1 == a.Papa.BAD_DELIMITERS.indexOf(c.delimiter) && (j = c.delimiter),
            ("boolean" == typeof c.quotes || c.quotes instanceof Array) && (i = c.quotes),
            "string" == typeof c.newline && (k = c.newline))
        }
        function e(a) {
            if ("object" != typeof a)
                return [];
            var b = [];
            for (var c in a)
                b.push(c);
            return b
        }
        function f(a, b) {
            var c = "";
            "string" == typeof a && (a = JSON.parse(a)),
            "string" == typeof b && (b = JSON.parse(b));
            var d = a instanceof Array && a.length > 0
              , e = !(b[0]instanceof Array);
            if (d) {
                for (var f = 0; f < a.length; f++)
                    f > 0 && (c += j),
                    c += g(a[f], f);
                b.length > 0 && (c += k)
            }
            for (var h = 0; h < b.length; h++) {
                for (var i = d ? a.length : b[h].length, l = 0; i > l; l++) {
                    l > 0 && (c += j);
                    var m = d && e ? a[l] : l;
                    c += g(b[h][m], l)
                }
                h < b.length - 1 && (c += k)
            }
            return c
        }
        function g(b, c) {
            if ("undefined" == typeof b)
                return "";
            b = b.toString().replace(/"/g, '""');
            var d = "boolean" == typeof i && i || i instanceof Array && i[c] || h(b, a.Papa.BAD_DELIMITERS) || b.indexOf(j) > -1 || " " == b.charAt(0) || " " == b.charAt(b.length - 1);
            return d ? '"' + b + '"' : b
        }
        function h(a, b) {
            for (var c = 0; c < b.length; c++)
                if (a.indexOf(b[c]) > -1)
                    return !0;
            return !1
        }
        var i = !1
          , j = ","
          , k = "\r\n";
        if (d(),
        "string" == typeof b && (b = JSON.parse(b)),
        b instanceof Array) {
            if (!b.length || b[0]instanceof Array)
                return f(null, b);
            if ("object" == typeof b[0])
                return f(e(b[0]), b)
        } else if ("object" == typeof b)
            return "string" == typeof b.data && (b.data = JSON.parse(b.data)),
            b.data instanceof Array && (b.fields || (b.fields = b.data[0]instanceof Array ? b.fields : e(b.data[0])),
            b.data[0]instanceof Array || "object" == typeof b.data[0] || (b.data = [b.data])),
            f(b.fields || [], b.data || []);
        throw "exception: Unable to serialize unrecognized input"
    }
    function d(b) {
        b = b || {},
        b.chunkSize || (b.chunkSize = Papa.RemoteChunkSize);
        var c, d, e = 0, g = 0, h = "", i = "", j = new f(m(b));
        this.stream = function(f) {
            function k() {
                if (c = new XMLHttpRequest,
                p || (c.onload = l,
                c.onerror = m),
                c.open("GET", f, !p),
                b.step) {
                    var a = e + b.chunkSize - 1;
                    g && a > g && (a = g),
                    c.setRequestHeader("Range", "bytes=" + e + "-" + a)
                }
                c.send(),
                p && 0 == c.status ? m() : e += b.chunkSize
            }
            function l() {
                if (4 == c.readyState) {
                    if (c.status < 200 || c.status >= 400)
                        return void m();
                    h += i + c.responseText,
                    i = "";
                    var f = !b.step || e > o(c);
                    if (!f) {
                        var g = h.lastIndexOf("\n");
                        if (0 > g && (g = h.lastIndexOf("\r")),
                        !(g > -1))
                            return void d();
                        i = h.substring(g + 1),
                        h = h.substring(0, g)
                    }
                    var k = j.parse(h);
                    h = "",
                    p ? a.postMessage({
                        results: k,
                        workerId: Papa.WORKER_ID,
                        finished: f
                    }) : n(b.chunk) && (b.chunk(k),
                    k = void 0),
                    f && n(b.complete) ? b.complete(k) : k && k.meta.aborted && n(b.complete) ? b.complete(k) : f || d()
                }
            }
            function m() {
                n(b.error) ? b.error(c.statusText) : p && b.error && a.postMessage({
                    workerId: Papa.WORKER_ID,
                    error: c.statusText,
                    finished: !1
                })
            }
            function o(a) {
                var b = a.getResponseHeader("Content-Range");
                return parseInt(b.substr(b.lastIndexOf("/") + 1))
            }
            (d = p ? function() {
                k(),
                l()
            }
            : function() {
                k()
            }
            )()
        }
    }
    function e(b) {
        b = b || {},
        b.chunkSize || (b.chunkSize = Papa.LocalChunkSize);
        var c, d = 0, e = "", g = "", h = new f(m(b));
        this.stream = function(f) {
            function i() {
                d < f.size && j()
            }
            function j() {
                var a = Math.min(d + b.chunkSize, f.size)
                  , e = c.readAsText(m.call(f, d, a), b.encoding);
                return d += b.chunkSize,
                e
            }
            function k(c) {
                e += g + c.target.result,
                g = "";
                var j = d >= f.size;
                if (!j) {
                    var k = e.lastIndexOf("\n");
                    if (0 > k && (k = e.lastIndexOf("\r")),
                    !(k > -1))
                        return void i();
                    g = e.substring(k + 1),
                    e = e.substring(0, k)
                }
                var l = h.parse(e);
                e = "",
                p ? a.postMessage({
                    results: l,
                    workerId: Papa.WORKER_ID,
                    finished: j
                }) : n(b.chunk) && (b.chunk(l, f),
                l = void 0),
                j && n(b.complete) ? b.complete(void 0, f) : l && l.meta.aborted && n(b.complete) ? b.complete(l, f) : j || i()
            }
            function l() {
                n(b.error) ? b.error(c.error, f) : p && b.error && a.postMessage({
                    workerId: Papa.WORKER_ID,
                    error: c.error,
                    file: f,
                    finished: !1
                })
            }
            var m = f.slice || f.webkitSlice || f.mozSlice;
            c = new FileReader,
            c.onload = k,
            c.onerror = l,
            i()
        }
    }
    function f(a) {
        function b() {
            return o && j && (i("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to comma"),
            j = !1),
            c() && d(),
            e()
        }
        function c() {
            return a.header && 0 == l.length
        }
        function d() {
            if (o) {
                for (var a = 0; c() && a < o.data.length; a++)
                    for (var b = 0; b < o.data[a].length; b++)
                        l.push(o.data[a][b]);
                o.data.splice(0, 1)
            }
        }
        function e() {
            if (!o || !a.header && !a.dynamicTyping)
                return o;
            for (var b = 0; b < o.data.length; b++) {
                for (var c = {}, d = 0; d < o.data[b].length; d++) {
                    if (a.dynamicTyping) {
                        var e = o.data[b][d];
                        "true" == e ? o.data[b][d] = !0 : "false" == e ? o.data[b][d] = !1 : o.data[b][d] = h(e)
                    }
                    a.header && (d >= l.length && (c.__parsed_extra || (c.__parsed_extra = []),
                    c.__parsed_extra.push(o.data[b][d])),
                    c[l[d]] = o.data[b][d])
                }
                a.header && (o.data[b] = c,
                d > l.length ? i("FieldMismatch", "TooManyFields", "Too many fields: expected " + l.length + " fields but parsed " + d, b) : d < l.length && i("FieldMismatch", "TooFewFields", "Too few fields: expected " + l.length + " fields but parsed " + d, b))
            }
            return a.header && o.meta,
            o.meta.fields = l,
            o
        }
        function f(b) {
            for (var c, d, e, f = [",", "	", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP], h = 0; h < f.length; h++) {
                var i = f[h]
                  , j = 0
                  , k = 0;
                e = void 0;
                for (var l = new g({
                    delimiter: i,
                    preview: 10
                }).parse(b), m = 0; m < l.data.length; m++) {
                    var n = l.data[m].length;
                    k += n,
                    "undefined" != typeof e ? n > 1 && (j += Math.abs(n - e),
                    e = n) : e = n
                }
                k /= l.data.length,
                ("undefined" == typeof d || d > j) && k > 1.99 && (d = j,
                c = i)
            }
            return a.delimiter = c,
            {
                successful: !!c,
                bestDelimiter: c
            }
        }
        function h(a) {
            var b = k.test(a);
            return b ? parseFloat(a) : a
        }
        function i(a, b, c, d) {
            o.errors.push({
                type: a,
                code: b,
                message: c,
                row: d
            })
        }
        var j, k = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i, l = [], o = {
            data: [],
            errors: [],
            meta: {}
        };
        a = m(a),
        this.parse = function(d) {
            if (j = !1,
            !a.delimiter) {
                var e = f(d);
                e.successful ? a.delimiter = e.bestDelimiter : (j = !0,
                a.delimiter = ","),
                o.meta.delimiter = a.delimiter
            }
            if (n(a.step)) {
                var h = a.step;
                a.step = function(a, d) {
                    o = a,
                    c() ? b() : h(b(), d)
                }
            }
            return o = new g(a).parse(d),
            b()
        }
    }
    function g(a) {
        function b() {
            for (; E < y.length && !O && !(C > 0 && L >= C); ) {
                if (P)
                    return d();
                '"' == D ? e() : F ? f() : g(),
                c()
            }
            return d()
        }
        function c() {
            E++,
            D = y[E]
        }
        function d() {
            return O && u("Abort", "ParseAbort", "Parsing was aborted by the user's step function"),
            F && u("Quotes", "MissingQuotes", "Unescaped or mismatched quotes"),
            m(),
            n(B) ? void 0 : x()
        }
        function e() {
            s() && !r() ? F = !F : (j(),
            F && r() ? E++ : u("Quotes", "UnexpectedQuotes", "Unexpected quotes"))
        }
        function f() {
            (p(E) || q(E)) && G++,
            j()
        }
        function g() {
            D == z ? k() : p(E) ? (l(),
            c()) : q(E) ? l() : h() ? i() : j()
        }
        function h() {
            if (!A)
                return !1;
            var a = 0 == E || q(E - 1) || p(E - 2);
            return a && y[E] === A
        }
        function i() {
            for (; !p(E) && !q(E) && E < y.length; )
                c()
        }
        function j() {
            H[J][K] += D
        }
        function k() {
            H[J].push(""),
            K = H[J].length - 1
        }
        function l() {
            m(),
            G++,
            L++,
            H.push([]),
            J = H.length - 1,
            k()
        }
        function m() {
            o(),
            n(B) && (H[J] && B(x(), M),
            w())
        }
        function o() {
            1 == H[J].length && N.test(H[J][0]) && (a.keepEmptyRows ? H[J].splice(0, 1) : H.splice(J, 1),
            J = H.length - 1)
        }
        function p(a) {
            return a < y.length - 1 && ("\r" == y[a] && "\n" == y[a + 1] || "\n" == y[a] && "\r" == y[a + 1])
        }
        function q(a) {
            return "\r" == y[a] || "\n" == y[a]
        }
        function r() {
            return !s() && E < y.length - 1 && '"' == y[E + 1]
        }
        function s() {
            return !F && t(E - 1) || t(E + 1)
        }
        function t(a) {
            "number" != typeof a && (a = E);
            var b = y[a];
            return -1 >= a || a >= y.length || b == z || "\r" == b || "\n" == b
        }
        function u(a, b, c) {
            I.push({
                type: a,
                code: b,
                message: c,
                line: G,
                row: J,
                index: E
            })
        }
        function v(a) {
            y = a,
            F = !1,
            E = 0,
            L = 0,
            G = 1,
            w(),
            H = [[""]],
            D = y[E]
        }
        function w() {
            H = [],
            I = [],
            J = 0,
            K = 0
        }
        function x() {
            return {
                data: H,
                errors: I,
                meta: {
                    lines: G,
                    delimiter: z,
                    aborted: O
                }
            }
        }
        var y, z, A, B, C, D, E, F, G, H, I, J, K, L, M = this, N = /^\s*$/, O = !1, P = !1;
        a = a || {},
        z = a.delimiter,
        A = a.comments,
        B = a.step,
        C = a.preview,
        ("string" != typeof z || 1 != z.length || Papa.BAD_DELIMITERS.indexOf(z) > -1) && (z = ","),
        A === !0 ? A = "#" : ("string" != typeof A || 1 != A.length || Papa.BAD_DELIMITERS.indexOf(A) > -1 || A == z) && (A = !1),
        this.parse = function(a) {
            if ("string" != typeof a)
                throw "Input must be a string";
            return v(a),
            b()
        }
        ,
        this.abort = function() {
            O = !0
        }
    }
    function h() {
        var a = "worker" + String(Math.random()).substr(2);
        return document.write('<script id="' + a + '"></script>'),
        document.getElementById(a).previousSibling.src
    }
    function i() {
        if (!Papa.WORKERS_SUPPORTED)
            return !1;
        var b = new a.Worker(o);
        return b.onmessage = j,
        b.id = r++,
        q[b.id] = b,
        b
    }
    function j(a) {
        var b = a.data
          , c = q[b.workerId];
        if (b.error)
            c.userError(b.error, b.file);
        else if (b.results && b.results.data)
            if (n(c.userStep)) {
                for (var d = 0; d < b.results.data.length; d++)
                    c.userStep({
                        data: [b.results.data[d]],
                        errors: b.results.errors,
                        meta: b.results.meta
                    });
                delete b.results
            } else
                n(c.userChunk) && (c.userChunk(b.results, b.file),
                delete b.results);
        b.finished && (n(q[b.workerId].userComplete) && q[b.workerId].userComplete(b.results),
        q[b.workerId].terminate(),
        delete q[b.workerId])
    }
    function k(b) {
        var c = b.data;
        if ("undefined" == typeof Papa.WORKER_ID && c && (Papa.WORKER_ID = c.workerId),
        "string" == typeof c.input)
            a.postMessage({
                workerId: Papa.WORKER_ID,
                results: Papa.parse(c.input, c.config),
                finished: !0
            });
        else if (c.input instanceof File) {
            var d = Papa.parse(c.input, c.config);
            d && a.postMessage({
                workerId: Papa.WORKER_ID,
                results: d,
                finished: !0
            })
        }
    }
    function l(a) {
        "object" != typeof a && (a = {});
        var b = m(a);
        return ("string" != typeof b.delimiter || 1 != b.delimiter.length || Papa.BAD_DELIMITERS.indexOf(b.delimiter) > -1) && (b.delimiter = s.delimiter),
        "boolean" != typeof b.header && (b.header = s.header),
        "boolean" != typeof b.dynamicTyping && (b.dynamicTyping = s.dynamicTyping),
        "number" != typeof b.preview && (b.preview = s.preview),
        "function" != typeof b.step && (b.step = s.step),
        "function" != typeof b.complete && (b.complete = s.complete),
        "string" != typeof b.encoding && (b.encoding = s.encoding),
        "boolean" != typeof b.worker && (b.worker = s.worker),
        "boolean" != typeof b.download && (b.download = s.download),
        "boolean" != typeof b.keepEmptyRows && (b.keepEmptyRows = s.keepEmptyRows),
        b
    }
    function m(a) {
        if ("object" != typeof a)
            return a;
        var b = a instanceof Array ? [] : {};
        for (var c in a)
            b[c] = m(a[c]);
        return b
    }
    function n(a) {
        return "function" == typeof a
    }
    var o, p = !a.document, q = {}, r = 0, s = {
        delimiter: "",
        header: !1,
        dynamicTyping: !1,
        preview: 0,
        step: void 0,
        encoding: "",
        worker: !1,
        comments: !1,
        complete: void 0,
        download: !1,
        chunk: void 0,
        keepEmptyRows: !1
    };
    if (a.Papa = {},
    a.Papa.parse = b,
    a.Papa.unparse = c,
    a.Papa.RECORD_SEP = String.fromCharCode(30),
    a.Papa.UNIT_SEP = String.fromCharCode(31),
    a.Papa.BYTE_ORDER_MARK = "\ufeff",
    a.Papa.BAD_DELIMITERS = ["\r", "\n", '"', a.Papa.BYTE_ORDER_MARK],
    a.Papa.WORKERS_SUPPORTED = !!a.Worker,
    a.Papa.LocalChunkSize = 10485760,
    a.Papa.RemoteChunkSize = 5242880,
    a.Papa.Parser = g,
    a.Papa.ParserHandle = f,
    a.Papa.NetworkStreamer = d,
    a.Papa.FileStreamer = e,
    a.jQuery) {
        var t = a.jQuery;
        t.fn.parse = function(b) {
            function c() {
                if (0 == g.length)
                    return void (n(b.complete) && b.complete());
                var a = g[0];
                if (n(b.before)) {
                    var c = b.before(a.file, a.inputElem);
                    if ("object" == typeof c) {
                        if ("abort" == c.action)
                            return void d("AbortError", a.file, a.inputElem, c.reason);
                        if ("skip" == c.action)
                            return void e();
                        "object" == typeof c.config && (a.instanceConfig = t.extend(a.instanceConfig, c.config))
                    } else if ("skip" == c)
                        return void e()
                }
                var f = a.instanceConfig.complete;
                a.instanceConfig.complete = function(b) {
                    n(f) && f(b, a.file, a.inputElem),
                    e()
                }
                ,
                Papa.parse(a.file, a.instanceConfig)
            }
            function d(a, c, d, e) {
                n(b.error) && b.error({
                    name: a
                }, c, d, e)
            }
            function e() {
                g.splice(0, 1),
                c()
            }
            var f = b.config || {}
              , g = [];
            return this.each(function(b) {
                var c = "INPUT" == t(this).prop("tagName").toUpperCase() && "file" == t(this).attr("type").toLowerCase() && a.FileReader;
                if (!c || !this.files || 0 == this.files.length)
                    return !0;
                for (var d = 0; d < this.files.length; d++)
                    g.push({
                        file: this.files[d],
                        inputElem: this,
                        instanceConfig: t.extend({}, f)
                    })
            }),
            c(),
            this
        }
    }
    p ? a.onmessage = k : Papa.WORKERS_SUPPORTED && (o = h())
}(this);
var VCard;
!function() {
    VCard = function(a) {
        if (this.changed = !1,
        "object" == typeof a)
            for (var b in a)
                this[b] = a[b],
                this.changed = !0
    }
    ,
    VCard.prototype = {
        validate: function() {
            function a(a, b) {
                c.push([a, b])
            }
            function b(a, b) {
                for (var d in b) {
                    var e = b[d];
                    "object" != typeof e ? c.push([a + "-" + d, "not-an-object"]) : e.type ? e.value || c.push([a + "-" + d, "missing-value"]) : c.push([a + "-" + d, "missing-type"])
                }
            }
            var c = [];
            this.fn || a("fn", "required");
            for (var d in VCard.multivaluedKeys)
                !this[d] || this[d]instanceof Array || (this[d] = [this[d]]);
            return this.email && b("email", this.email),
            this.tel && b("email", this.tel),
            this.uid || this.addAttribute("uid", this.generateUID()),
            this.rev || this.addAttribute("rev", this.generateRev()),
            this.errors = c,
            !(c.length > 0)
        },
        generateUID: function() {
            return "uuid:" + Math.uuid()
        },
        generateRev: function() {
            return (new Date).toISOString().replace(/[\.\:\-]/g, "")
        },
        setAttribute: function(a, b) {
            this[a] = b,
            this.changed = !0
        },
        addAttribute: function(a, b) {
            b && (VCard.multivaluedKeys[a] ? this[a] ? this[a].push(b) : this.setAttribute(a, [b]) : this.setAttribute(a, b))
        },
        toJSON: function() {
            return JSON.stringify(this.toJCard())
        },
        toJCard: function() {
            var a = {};
            for (var b in VCard.allKeys) {
                var c = VCard.allKeys[b];
                this[c] && (a[c] = this[c])
            }
            return a
        },
        merge: function(a) {
            function b(b) {
                a[b] ? a[b] == this[b] ? c.setAttribute(this[b]) : (c.addAttribute(this[b]),
                c.addAttribute(a[b])) : c[b] = this[b]
            }
            if ("undefined" != typeof a.uid && "undefined" != typeof this.uid && a.uid !== this.uid)
                throw "Won't merge vcards without matching UIDs.";
            var c = new VCard;
            for (key in this)
                b(key);
            for (key in a)
                c[key] || b(key)
        }
    },
    VCard.enums = {
        telType: ["text", "voice", "fax", "cell", "video", "pager", "textphone"],
        relatedType: ["contact", "acquaintance", "friend", "met", "co-worker", "colleague", "co-resident", "neighbor", "child", "parent", "sibling", "spouse", "kin", "muse", "crush", "date", "sweetheart", "me", "agent", "emergency"],
        emailType: ["work", "home", "internet"],
        langType: ["work", "home"]
    },
    VCard.allKeys = ["fn", "n", "nickname", "photo", "bday", "anniversary", "gender", "tel", "email", "impp", "lang", "tz", "geo", "title", "role", "logo", "org", "member", "related", "categories", "note", "prodid", "rev", "sound", "uid"],
    VCard.multivaluedKeys = {
        email: !0,
        tel: !0,
        geo: !0,
        title: !0,
        role: !0,
        logo: !0,
        org: !0,
        member: !0,
        related: !0,
        categories: !0,
        note: !0
    }
}();
var VCF;
!function() {
    VCF = {
        simpleKeys: ["VERSION", "FN", "PHOTO", "GEO", "TITLE", "ROLE", "LOGO", "MEMBER", "NOTE", "PRODID", "SOUND", "UID"],
        csvKeys: ["NICKNAME", "CATEGORIES"],
        dateAndOrTimeKeys: ["BDAY", "ANNIVERSARY", "REV"],
        parse: function(a, b, c) {
            var d = null;
            c || (c = this),
            this.lex(a, function(a, e, f) {
                function g(b) {
                    d && d.addAttribute(a.toLowerCase(), b)
                }
                if ("BEGIN" == a)
                    d = new VCard;
                else if ("END" == a)
                    d && (b.apply(c, [d]),
                    d = null);
                else if (-1 != this.simpleKeys.indexOf(a))
                    g(e);
                else if (-1 != this.csvKeys.indexOf(a))
                    g(e.split(","));
                else if (-1 != this.dateAndOrTimeKeys.indexOf(a))
                    "text" == f.VALUE ? g(e) : f.CALSCALE && "gregorian" != f.CALSCALE || g(this.parseDateAndOrTime(e));
                else if ("N" == a)
                    g(this.parseName(e));
                else if ("GENDER" == a)
                    g(this.parseGender(e));
                else if ("TEL" == a)
                    g({
                        type: f.TYPE || "voice",
                        pref: f.PREF,
                        value: e
                    });
                else if ("EMAIL" == a)
                    g({
                        type: f.TYPE,
                        pref: f.PREF,
                        value: e
                    });
                else if ("IMPP" == a)
                    g({
                        value: e
                    });
                else if ("LANG" == a)
                    g({
                        type: f.TYPE,
                        pref: f.PREF,
                        value: e
                    });
                else if ("TZ" == a)
                    g("utc-offset" == f.VALUE ? {
                        "utc-offset": this.parseTimezone(e)
                    } : {
                        name: e
                    });
                else if ("ORG" == a) {
                    var h = e.split(";");
                    g({
                        "organization-name": h[0],
                        "organization-unit": h[1]
                    })
                } else
                    "RELATED" == a ? g({
                        type: f.TYPE,
                        pref: f.PREF,
                        value: f.VALUE
                    }) : "ADR" == a && g({
                        type: f.TYPE,
                        pref: f.PREF,
                        value: e
                    })
            })
        },
        nameParts: ["family-name", "given-name", "additional-name", "honorific-prefix", "honorific-suffix"],
        parseName: function(a) {
            var b = a.split(";")
              , c = {};
            for (var d in b)
                b[d] && (c[this.nameParts[d]] = b[d].split(","));
            return c
        },
        parseGender: function(a) {
            var b = {}
              , c = a.split(";");
            switch (c[0]) {
            case "M":
                b.sex = "male";
                break;
            case "F":
                b.sex = "female";
                break;
            case "O":
                b.sex = "other"
            }
            return c[1] && (b.identity = c[1]),
            b
        },
        dateRE: /^(\d{4})(\d{2})(\d{2})$/,
        dateReducedARE: /^(\d{4})\-(\d{2})$/,
        dateReducedBRE: /^(\d{4})$/,
        dateTruncatedMDRE: /^\-{2}(\d{2})(\d{2})$/,
        dateTruncatedDRE: /^\-{3}(\d{2})$/,
        timeRE: /^(\d{2})(\d{2})(\d{2})([+\-]\d+|Z|)$/,
        timeReducedARE: /^(\d{2})(\d{2})([+\-]\d+|Z|)$/,
        timeReducedBRE: /^(\d{2})([+\-]\d+|Z|)$/,
        timeTruncatedMSRE: /^\-{2}(\d{2})(\d{2})([+\-]\d+|Z|)$/,
        timeTruncatedSRE: /^\-{3}(\d{2})([+\-]\d+|Z|)$/,
        parseDate: function(a) {
            var b, c, d, e;
            if (b = a.match(this.dateRE))
                c = b[1],
                d = b[2],
                e = b[3];
            else if (b = a.match(this.dateReducedARE))
                c = b[1],
                d = b[2];
            else if (b = a.match(this.dateReducedBRE))
                c = b[1];
            else if (b = a.match(this.dateTruncatedMDRE))
                d = b[1],
                e = b[2];
            else {
                if (!(b = a.match(this.dateTruncatedDRE)))
                    return null;
                e = b[1]
            }
            var f = new Date(0);
            return "undefined" != typeof c && f.setUTCFullYear(c),
            "undefined" != typeof d && f.setUTCMonth(d - 1),
            "undefined" != typeof e && f.setUTCDate(e),
            f
        },
        parseTime: function(a) {
            var b, c, d, e, f;
            if (b = a.match(this.timeRE))
                c = b[1],
                d = b[2],
                e = b[3],
                f = b[4];
            else if (b = a.match(this.timeReducedARE))
                c = b[1],
                d = b[2],
                f = b[3];
            else if (b = a.match(this.timeReducedBRE))
                c = b[1],
                f = b[2];
            else if (b = a.match(this.timeTruncatedMSRE))
                d = b[1],
                e = b[2],
                f = b[3];
            else {
                if (!(b = a.match(this.timeTruncatedSRE)))
                    return null;
                e = b[1],
                f = b[2]
            }
            var g = new Date(0);
            return "undefined" != typeof c && g.setUTCHours(c),
            "undefined" != typeof d && g.setUTCMinutes(d),
            "undefined" != typeof e && g.setUTCSeconds(e),
            f && (g = this.applyTimezone(g, f)),
            g
        },
        addDates: function(a, b, c) {
            if ("undefined" == typeof c && (c = !0),
            !a)
                return b;
            if (!b)
                return a;
            var d = Number(a)
              , e = Number(b)
              , f = c ? d + e : d - e;
            return new Date(f)
        },
        parseTimezone: function(a) {
            var b;
            if (b = a.match(/^([+\-])(\d{2})(\d{2})?/)) {
                var c = new Date(0);
                return c.setUTCHours(b[2]),
                c.setUTCMinutes(b[3] || 0),
                Number(c) * ("+" == b[1] ? 1 : -1)
            }
            return null
        },
        applyTimezone: function(a, b) {
            var c = this.parseTimezone(b);
            return c ? new Date(Number(a) + c) : a
        },
        parseDateTime: function(a) {
            var b = a.split("T")
              , c = this.parseDate(b[0])
              , d = this.parseTime(b[1]);
            return this.addDates(c, d)
        },
        parseDateAndOrTime: function(a) {
            switch (a.indexOf("T")) {
            case 0:
                return this.parseTime(a.slice(1));
            case -1:
                return this.parseDate(a);
            default:
                return this.parseDateTime(a)
            }
        },
        lineRE: /^([^\s].*)(?:\r?\n|$)/,
        foldedLineRE: /^\s(.+)(?:\r?\n|$)/,
        lex: function(a, b) {
            for (var c, d = null, e = 0; (c = a.match(this.lineRE)) ? d && -1 != d.indexOf("QUOTED-PRINTABLE") && "=" == d.slice(-1) ? (d = d.slice(0, -1) + c[1],
            e = c[0].length) : (d && this.lexLine(d, b),
            d = c[1],
            e = c[0].length) : (c = a.match(this.foldedLineRE)) && d && (d += c[1],
            e = c[0].length),
            a = a.slice(e),
            a; )
                ;
            d && this.lexLine(d, b),
            d = null
        },
        lexLine: function(a, b) {
            function c() {
                e ? h ? f[h] = d.split(",") : "PREF" == d ? f.PREF = 1 : f.TYPE ? f.TYPE.push(d) : f.TYPE = [d] : e = d
            }
            var d = ""
              , e = null
              , f = {}
              , g = null
              , h = null
              , i = a.indexOf("ENCODING=QUOTED-PRINTABLE");
            -1 != i && (a = a.substr(0, i) + this.decodeQP(a.substr(i + 25)));
            for (var j in a) {
                var k = a[j];
                switch (k) {
                case ":":
                    return c(),
                    g = a.slice(Number(j) + 1),
                    void b.apply(this, [e, g, f]);
                case ";":
                    c(),
                    d = "";
                    break;
                case "=":
                    h = d,
                    d = "";
                    break;
                default:
                    d += k
                }
            }
        },
        decodeQP: function(a) {
            a = (a || "").toString(),
            a = a.replace(/\=(?:\r?\n|$)/g, "");
            for (var b = "", c = 0, d = a.length; d > c; c++)
                chr = a.charAt(c),
                "=" == chr && (hex = a.substr(c + 1, 2)) && /[\da-fA-F]{2}/.test(hex) ? (b += String.fromCharCode(parseInt(hex, 16)),
                c += 2) : b += chr;
            return b
        }
    }
}(),
!function(a) {
    function b() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    var c = function(b, c) {
        var f = this;
        switch (this.element = a(b),
        this.closeButton = c.closeButton,
        this.language = c.language || this.element.data("date-language") || "en",
        this.language = this.language in d ? this.language : this.language.split("-")[0],
        this.language = this.language in d ? this.language : "en",
        this.isRTL = d[this.language].rtl || !1,
        this.format = e.parseFormat(c.format || this.element.data("date-format") || d[this.language].format || "mm/dd/yyyy"),
        this.isInline = !1,
        this.isInput = this.element.is("input"),
        this.component = this.element.is(".date") ? this.element.find(".prefix, .postfix") : !1,
        this.hasInput = this.component && this.element.find("input").length,
        this.onRender = c.onRender || function() {}
        ,
        this.component && 0 === this.component.length && (this.component = !1),
        this._attachEvents(),
        this.forceParse = !0,
        "forceParse"in c ? this.forceParse = c.forceParse : "dateForceParse"in this.element.data() && (this.forceParse = this.element.data("date-force-parse")),
        this.picker = a(e.template).appendTo(this.isInline ? this.element : "body").on({
            click: a.proxy(this.click, this),
            mousedown: a.proxy(this.mousedown, this)
        }),
        this.closeButton && this.picker.find("a.datepicker-close").show(),
        this.isInline ? this.picker.addClass("datepicker-inline") : this.picker.addClass("datepicker-dropdown dropdown-menu"),
        this.isRTL && (this.picker.addClass("datepicker-rtl"),
        this.picker.find(".prev i, .next i").toggleClass("fa fa-chevron-left fa-chevron-right").toggleClass("fa-chevron-left fa-chevron-right")),
        a(document).on("mousedown", function(b) {
            0 === a(b.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length && f.hide()
        }),
        this.autoclose = !0,
        "autoclose"in c ? this.autoclose = c.autoclose : "dateAutoclose"in this.element.data() && (this.autoclose = this.element.data("date-autoclose")),
        this.keyboardNavigation = !0,
        "keyboardNavigation"in c ? this.keyboardNavigation = c.keyboardNavigation : "dateKeyboardNavigation"in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")),
        this.viewMode = this.startViewMode = 0,
        c.startView || this.element.data("date-start-view")) {
        case 2:
        case "decade":
            this.viewMode = this.startViewMode = 2;
            break;
        case 1:
        case "year":
            this.viewMode = this.startViewMode = 1
        }
        this.todayBtn = c.todayBtn || this.element.data("date-today-btn") || !1,
        this.todayHighlight = c.todayHighlight || this.element.data("date-today-highlight") || !1,
        this.calendarWeeks = !1,
        "calendarWeeks"in c ? this.calendarWeeks = c.calendarWeeks : "dateCalendarWeeks"in this.element.data() && (this.calendarWeeks = this.element.data("date-calendar-weeks")),
        this.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function(a, b) {
            return parseInt(b) + 1
        }),
        this.weekStart = (c.weekStart || this.element.data("date-weekstart") || d[this.language].weekStart || 0) % 7,
        this.weekEnd = (this.weekStart + 6) % 7,
        this.startDate = -(1 / 0),
        this.endDate = 1 / 0,
        this.daysOfWeekDisabled = [],
        this.setStartDate(c.startDate || this.element.data("date-startdate")),
        this.setEndDate(c.endDate || this.element.data("date-enddate")),
        this.setDaysOfWeekDisabled(c.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")),
        this.fillDow(),
        this.fillMonths(),
        this.update(),
        this.showMode(),
        this.isInline && this.show()
    };
    c.prototype = {
        constructor: c,
        _events: [],
        _attachEvents: function() {
            this._detachEvents(),
            this.isInput ? this._events = [[this.element, {
                focus: a.proxy(this.show, this),
                keyup: a.proxy(this.update, this),
                keydown: a.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), {
                focus: a.proxy(this.show, this),
                keyup: a.proxy(this.update, this),
                keydown: a.proxy(this.keydown, this)
            }], [this.component, {
                click: a.proxy(this.show, this)
            }]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {
                click: a.proxy(this.show, this)
            }]];
            for (var b, c, d = 0; d < this._events.length; d++)
                b = this._events[d][0],
                c = this._events[d][1],
                b.on(c)
        },
        _detachEvents: function() {
            for (var a, b, c = 0; c < this._events.length; c++)
                a = this._events[c][0],
                b = this._events[c][1],
                a.off(b);
            this._events = []
        },
        show: function(b) {
            this.picker.show(),
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(),
            this.update(),
            this.place(),
            a(window).on("resize", a.proxy(this.place, this)),
            b && (b.stopPropagation(),
            b.preventDefault()),
            this.element.trigger({
                type: "show",
                date: this.date
            })
        },
        hide: function(b) {
            this.isInline || this.picker.is(":visible") && (this.picker.hide(),
            a(window).off("resize", this.place),
            this.viewMode = this.startViewMode,
            this.showMode(),
            this.isInput || a(document).off("mousedown", this.hide),
            this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(),
            this.element.trigger({
                type: "hide",
                date: this.date
            }))
        },
        remove: function() {
            this._detachEvents(),
            this.picker.remove(),
            delete this.element.data().datepicker
        },
        getDate: function() {
            var a = this.getUTCDate();
            return new Date(a.getTime() + 6e4 * a.getTimezoneOffset())
        },
        getUTCDate: function() {
            return this.date
        },
        setDate: function(a) {
            this.setUTCDate(new Date(a.getTime() - 6e4 * a.getTimezoneOffset()))
        },
        setUTCDate: function(a) {
            this.date = a,
            this.setValue()
        },
        setValue: function() {
            var a = this.getFormattedDate();
            this.isInput ? this.element.val(a) : (this.component && this.element.find("input").val(a),
            this.element.data("date", a))
        },
        getFormattedDate: function(a) {
            return void 0 === a && (a = this.format),
            e.formatDate(this.date, a, this.language)
        },
        setStartDate: function(a) {
            this.startDate = a || -(1 / 0),
            this.startDate !== -(1 / 0) && (this.startDate = e.parseDate(this.startDate, this.format, this.language)),
            this.update(),
            this.updateNavArrows()
        },
        setEndDate: function(a) {
            this.endDate = a || 1 / 0,
            this.endDate !== 1 / 0 && (this.endDate = e.parseDate(this.endDate, this.format, this.language)),
            this.update(),
            this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(b) {
            this.daysOfWeekDisabled = b || [],
            a.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)),
            this.daysOfWeekDisabled = a.map(this.daysOfWeekDisabled, function(a) {
                return parseInt(a, 10)
            }),
            this.update(),
            this.updateNavArrows()
        },
        place: function() {
            if (!this.isInline) {
                var b = parseInt(this.element.parents().filter(function() {
                    return "auto" != a(this).css("z-index")
                }).first().css("z-index")) + 10
                  , c = this.component ? this.component : this.element
                  , d = c.offset()
                  , e = c.outerHeight() + parseInt(c.css("margin-top"))
                  , f = c.outerWidth() + parseInt(c.css("margin-left"))
                  , g = d.top + e
                  , h = d.left;
                g + this.picker.height() >= a(window).scrollTop() + a(window).height() && (g = d.top - e - this.picker.height()),
                d.left + this.picker.width() >= a(window).width() && (h = d.left + f - this.picker.width()),
                this.picker.css({
                    top: g,
                    left: h,
                    zIndex: b
                })
            }
        },
        update: function() {
            var a, b = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0]instanceof Date) ? (a = arguments[0],
            b = !0) : a = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(),
            this.date = e.parseDate(a, this.format, this.language),
            b && this.setValue(),
            this.date < this.startDate ? this.viewDate = new Date(this.startDate.valueOf()) : this.date > this.endDate ? this.viewDate = new Date(this.endDate.valueOf()) : this.viewDate = new Date(this.date.valueOf()),
            this.fill()
        },
        fillDow: function() {
            var a = this.weekStart
              , b = "<tr>";
            if (this.calendarWeeks) {
                var c = '<th class="cw">&nbsp;</th>';
                b += c,
                this.picker.find(".datepicker-days thead tr:first-child").prepend(c)
            }
            for (; a < this.weekStart + 7; )
                b += '<th class="dow">' + d[this.language].daysMin[a++ % 7] + "</th>";
            b += "</tr>",
            this.picker.find(".datepicker-days thead").append(b)
        },
        fillMonths: function() {
            for (var a = "", b = 0; 12 > b; )
                a += '<span class="month">' + d[this.language].monthsShort[b++] + "</span>";
            this.picker.find(".datepicker-months td").html(a)
        },
        fill: function() {
            var c = new Date(this.viewDate.valueOf())
              , f = c.getUTCFullYear()
              , g = c.getUTCMonth()
              , h = this.startDate !== -(1 / 0) ? this.startDate.getUTCFullYear() : -(1 / 0)
              , i = this.startDate !== -(1 / 0) ? this.startDate.getUTCMonth() : -(1 / 0)
              , j = this.endDate !== 1 / 0 ? this.endDate.getUTCFullYear() : 1 / 0
              , k = this.endDate !== 1 / 0 ? this.endDate.getUTCMonth() : 1 / 0
              , l = this.date && this.date.valueOf()
              , m = new Date;
            this.picker.find(".datepicker-days thead th.date-switch").text(d[this.language].months[g] + " " + f),
            this.picker.find("tfoot th.today").text(d[this.language].today).toggle(this.todayBtn !== !1),
            this.updateNavArrows(),
            this.fillMonths();
            var n = b(f, g - 1, 28, 0, 0, 0, 0)
              , o = e.getDaysInMonth(n.getUTCFullYear(), n.getUTCMonth());
            n.setUTCDate(o),
            n.setUTCDate(o - (n.getUTCDay() - this.weekStart + 7) % 7);
            var p = new Date(n.valueOf());
            p.setUTCDate(p.getUTCDate() + 42),
            p = p.valueOf();
            for (var q, r = []; n.valueOf() < p; ) {
                if (n.getUTCDay() == this.weekStart && (r.push("<tr>"),
                this.calendarWeeks)) {
                    var s = new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate() - n.getDay() + 10 - (this.weekStart && this.weekStart % 7 < 5 && 7))
                      , t = new Date(s.getFullYear(),0,4)
                      , u = ~~((s - t) / 864e5 / 7 + 1.5);
                    r.push('<td class="cw">' + u + "</td>")
                }
                q = " " + this.onRender(n) + " ",
                n.getUTCFullYear() < f || n.getUTCFullYear() == f && n.getUTCMonth() < g ? q += " old" : (n.getUTCFullYear() > f || n.getUTCFullYear() == f && n.getUTCMonth() > g) && (q += " new"),
                this.todayHighlight && n.getUTCFullYear() == m.getFullYear() && n.getUTCMonth() == m.getMonth() && n.getUTCDate() == m.getDate() && (q += " today"),
                l && n.valueOf() == l && (q += " active"),
                (n.valueOf() < this.startDate || n.valueOf() > this.endDate || -1 !== a.inArray(n.getUTCDay(), this.daysOfWeekDisabled)) && (q += " disabled"),
                r.push('<td class="day' + q + '">' + n.getUTCDate() + "</td>"),
                n.getUTCDay() == this.weekEnd && r.push("</tr>"),
                n.setUTCDate(n.getUTCDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(r.join(""));
            var v = this.date && this.date.getUTCFullYear()
              , w = this.picker.find(".datepicker-months").find("th:eq(1)").text(f).end().find("span").removeClass("active");
            v && v == f && w.eq(this.date.getUTCMonth()).addClass("active"),
            (h > f || f > j) && w.addClass("disabled"),
            f == h && w.slice(0, i).addClass("disabled"),
            f == j && w.slice(k + 1).addClass("disabled"),
            r = "",
            f = 10 * parseInt(f / 10, 10);
            var x = this.picker.find(".datepicker-years").find("th:eq(1)").text(f + "-" + (f + 9)).end().find("td");
            f -= 1;
            for (var y = -1; 11 > y; y++)
                r += '<span class="year' + (-1 == y || 10 == y ? " old" : "") + (v == f ? " active" : "") + (h > f || f > j ? " disabled" : "") + '">' + f + "</span>",
                f += 1;
            x.html(r)
        },
        updateNavArrows: function() {
            var a = new Date(this.viewDate.valueOf())
              , b = a.getUTCFullYear()
              , c = a.getUTCMonth();
            switch (this.viewMode) {
            case 0:
                this.startDate !== -(1 / 0) && b <= this.startDate.getUTCFullYear() && c <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                }),
                this.endDate !== 1 / 0 && b >= this.endDate.getUTCFullYear() && c >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
            case 1:
            case 2:
                this.startDate !== -(1 / 0) && b <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                }),
                this.endDate !== 1 / 0 && b >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                })
            }
        },
        click: function(c) {
            c.stopPropagation(),
            c.preventDefault(),
            a(c.target).hasClass("datepicker-close") && this.hide();
            var d = a(c.target).closest("span, td, th");
            if (1 == d.length)
                switch (d[0].nodeName.toLowerCase()) {
                case "th":
                    switch (d[0].className) {
                    case "date-switch":
                        this.showMode(1);
                        break;
                    case "prev":
                    case "next":
                        var f = e.modes[this.viewMode].navStep * ("prev" == d[0].className ? -1 : 1);
                        switch (this.viewMode) {
                        case 0:
                            this.viewDate = this.moveMonth(this.viewDate, f);
                            break;
                        case 1:
                        case 2:
                            this.viewDate = this.moveYear(this.viewDate, f)
                        }
                        this.fill();
                        break;
                    case "today":
                        var g = new Date;
                        g = b(g.getFullYear(), g.getMonth(), g.getDate(), 0, 0, 0),
                        this.showMode(-2);
                        var h = "linked" == this.todayBtn ? null : "view";
                        this._setDate(g, h)
                    }
                    break;
                case "span":
                    if (!d.is(".disabled")) {
                        if (this.viewDate.setUTCDate(1),
                        d.is(".month")) {
                            var i = d.parent().find("span").index(d);
                            this.viewDate.setUTCMonth(i),
                            this.element.trigger({
                                type: "changeMonth",
                                date: this.viewDate
                            })
                        } else {
                            var j = parseInt(d.text(), 10) || 0;
                            this.viewDate.setUTCFullYear(j),
                            this.element.trigger({
                                type: "changeYear",
                                date: this.viewDate
                            })
                        }
                        this.showMode(-1),
                        this.fill()
                    }
                    break;
                case "td":
                    if (d.is(".day") && !d.is(".disabled")) {
                        var k = parseInt(d.text(), 10) || 1
                          , j = this.viewDate.getUTCFullYear()
                          , i = this.viewDate.getUTCMonth();
                        d.is(".old") ? 0 === i ? (i = 11,
                        j -= 1) : i -= 1 : d.is(".new") && (11 == i ? (i = 0,
                        j += 1) : i += 1),
                        this._setDate(b(j, i, k, 0, 0, 0, 0))
                    }
                }
        },
        _setDate: function(a, b) {
            b && "date" != b || (this.date = a),
            b && "view" != b || (this.viewDate = a),
            this.fill(),
            this.setValue(),
            this.element.trigger({
                type: "changeDate",
                date: this.date
            });
            var c;
            this.isInput ? c = this.element : this.component && (c = this.element.find("input")),
            c && (c.change(),
            !this.autoclose || b && "date" != b || this.hide())
        },
        moveMonth: function(a, b) {
            if (!b)
                return a;
            var c, d, e = new Date(a.valueOf()), f = e.getUTCDate(), g = e.getUTCMonth(), h = Math.abs(b);
            if (b = b > 0 ? 1 : -1,
            1 == h)
                d = -1 == b ? function() {
                    return e.getUTCMonth() == g
                }
                : function() {
                    return e.getUTCMonth() != c
                }
                ,
                c = g + b,
                e.setUTCMonth(c),
                (0 > c || c > 11) && (c = (c + 12) % 12);
            else {
                for (var i = 0; h > i; i++)
                    e = this.moveMonth(e, b);
                c = e.getUTCMonth(),
                e.setUTCDate(f),
                d = function() {
                    return c != e.getUTCMonth()
                }
            }
            for (; d(); )
                e.setUTCDate(--f),
                e.setUTCMonth(c);
            return e
        },
        moveYear: function(a, b) {
            return this.moveMonth(a, 12 * b)
        },
        dateWithinRange: function(a) {
            return a >= this.startDate && a <= this.endDate
        },
        keydown: function(a) {
            if (this.picker.is(":not(:visible)"))
                return void (27 == a.keyCode && this.show());
            var b, c, d, e = !1;
            switch (a.keyCode) {
            case 27:
                this.hide(),
                a.preventDefault();
                break;
            case 37:
            case 39:
                if (!this.keyboardNavigation)
                    break;
                b = 37 == a.keyCode ? -1 : 1,
                a.ctrlKey ? (c = this.moveYear(this.date, b),
                d = this.moveYear(this.viewDate, b)) : a.shiftKey ? (c = this.moveMonth(this.date, b),
                d = this.moveMonth(this.viewDate, b)) : (c = new Date(this.date.valueOf()),
                c.setUTCDate(this.date.getUTCDate() + b),
                d = new Date(this.viewDate.valueOf()),
                d.setUTCDate(this.viewDate.getUTCDate() + b)),
                this.dateWithinRange(c) && (this.date = c,
                this.viewDate = d,
                this.setValue(),
                this.update(),
                a.preventDefault(),
                e = !0);
                break;
            case 38:
            case 40:
                if (!this.keyboardNavigation)
                    break;
                b = 38 == a.keyCode ? -1 : 1,
                a.ctrlKey ? (c = this.moveYear(this.date, b),
                d = this.moveYear(this.viewDate, b)) : a.shiftKey ? (c = this.moveMonth(this.date, b),
                d = this.moveMonth(this.viewDate, b)) : (c = new Date(this.date.valueOf()),
                c.setUTCDate(this.date.getUTCDate() + 7 * b),
                d = new Date(this.viewDate.valueOf()),
                d.setUTCDate(this.viewDate.getUTCDate() + 7 * b)),
                this.dateWithinRange(c) && (this.date = c,
                this.viewDate = d,
                this.setValue(),
                this.update(),
                a.preventDefault(),
                e = !0);
                break;
            case 13:
                this.hide(),
                a.preventDefault();
                break;
            case 9:
                this.hide()
            }
            if (e) {
                this.element.trigger({
                    type: "changeDate",
                    date: this.date
                });
                var f;
                this.isInput ? f = this.element : this.component && (f = this.element.find("input")),
                f && f.change()
            }
        },
        showMode: function(a) {
            a && (this.viewMode = Math.max(0, Math.min(2, this.viewMode + a))),
            this.picker.find(">div").hide().filter(".datepicker-" + e.modes[this.viewMode].clsName).css("display", "block"),
            this.updateNavArrows()
        }
    },
    a.fn.fdatepicker = function(b) {
        var d = Array.apply(null, arguments);
        return d.shift(),
        this.each(function() {
            var e = a(this)
              , f = e.data("datepicker")
              , g = "object" == typeof b && b;
            f || e.data("datepicker", f = new c(this,a.extend({}, a.fn.fdatepicker.defaults, g))),
            "string" == typeof b && "function" == typeof f[b] && f[b].apply(f, d)
        })
    }
    ,
    a.fn.fdatepicker.defaults = {
        onRender: function(a) {
            return ""
        }
    },
    a.fn.fdatepicker.Constructor = c;
    var d = a.fn.fdatepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today"
        },
        pl: {
            days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
            daysShort: ["Nie", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"],
            daysMin: ["Nd", "Po", "Wt", "Śr", "Czw", "Pt", "So", "Nd"],
            months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
            monthsShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lit", "Gru"],
            today: "Dzisiaj"
        },
        es: {
            days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
            daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            today: "Hoy"
        },
        pt: {
            days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
            daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
            daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sá", "Do"],
            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            today: "Hoje"
        },
        it: {
            days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
            daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Veb", "Sab", "Dom"],
            daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
            months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
            today: "Oggi"
        },
        de: {
            days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
            daysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
            daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
            months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
            monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
            today: "Heute"
        }
    }
      , e = {
        modes: [{
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }],
        isLeapYear: function(a) {
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
        },
        getDaysInMonth: function(a, b) {
            return [31, e.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(a) {
            var b = a.replace(this.validParts, "\x00").split("\x00")
              , c = a.match(this.validParts);
            if (!b || !b.length || !c || 0 === c.length)
                throw new Error("Invalid date format.");
            return {
                separators: b,
                parts: c
            }
        },
        parseDate: function(e, f, g) {
            if (e instanceof Date)
                return e;
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
                var h, i, j = /([\-+]\d+)([dmwy])/, k = e.match(/([\-+]\d+)([dmwy])/g);
                e = new Date;
                for (var l = 0; l < k.length; l++)
                    switch (h = j.exec(k[l]),
                    i = parseInt(h[1]),
                    h[2]) {
                    case "d":
                        e.setUTCDate(e.getUTCDate() + i);
                        break;
                    case "m":
                        e = c.prototype.moveMonth.call(c.prototype, e, i);
                        break;
                    case "w":
                        e.setUTCDate(e.getUTCDate() + 7 * i);
                        break;
                    case "y":
                        e = c.prototype.moveYear.call(c.prototype, e, i)
                    }
                return b(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), 0, 0, 0)
            }
            var m, n, h, k = e && e.match(this.nonpunctuation) || [], e = new Date, o = {}, p = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], q = {
                yyyy: function(a, b) {
                    return a.setUTCFullYear(b)
                },
                yy: function(a, b) {
                    return a.setUTCFullYear(2e3 + b)
                },
                m: function(a, b) {
                    for (b -= 1; 0 > b; )
                        b += 12;
                    for (b %= 12,
                    a.setUTCMonth(b); a.getUTCMonth() != b; )
                        a.setUTCDate(a.getUTCDate() - 1);
                    return a
                },
                d: function(a, b) {
                    return a.setUTCDate(b)
                }
            };
            q.M = q.MM = q.mm = q.m,
            q.dd = q.d,
            e = b(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0);
            var r = f.parts.slice();
            if (k.length != r.length && (r = a(r).filter(function(b, c) {
                return -1 !== a.inArray(c, p)
            }).toArray()),
            k.length == r.length) {
                for (var l = 0, s = r.length; s > l; l++) {
                    if (m = parseInt(k[l], 10),
                    h = r[l],
                    isNaN(m))
                        switch (h) {
                        case "MM":
                            n = a(d[g].months).filter(function() {
                                var a = this.slice(0, k[l].length)
                                  , b = k[l].slice(0, a.length);
                                return a == b
                            }),
                            m = a.inArray(n[0], d[g].months) + 1;
                            break;
                        case "M":
                            n = a(d[g].monthsShort).filter(function() {
                                var a = this.slice(0, k[l].length)
                                  , b = k[l].slice(0, a.length);
                                return a == b
                            }),
                            m = a.inArray(n[0], d[g].monthsShort) + 1
                        }
                    o[h] = m
                }
                for (var t, l = 0; l < p.length; l++)
                    t = p[l],
                    t in o && !isNaN(o[t]) && q[t](e, o[t])
            }
            return e
        },
        formatDate: function(b, c, e) {
            var f = {
                d: b.getUTCDate(),
                D: d[e].daysShort[b.getUTCDay()],
                DD: d[e].days[b.getUTCDay()],
                m: b.getUTCMonth() + 1,
                M: d[e].monthsShort[b.getUTCMonth()],
                MM: d[e].months[b.getUTCMonth()],
                yy: b.getUTCFullYear().toString().substring(2),
                yyyy: b.getUTCFullYear()
            };
            f.dd = (f.d < 10 ? "0" : "") + f.d,
            f.mm = (f.m < 10 ? "0" : "") + f.m;
            for (var b = [], g = a.extend([], c.separators), h = 0, i = c.parts.length; i > h; h++)
                g.length && b.push(g.shift()),
                b.push(f[c.parts[h]]);
            return b.join("")
        },
        headTemplate: '<thead><tr><th class="prev"><i class="fa fa-chevron-left fa-chevron-left"/></th><th colspan="5" class="date-switch"></th><th class="next"><i class="fa fa-chevron-right fa-chevron-right"/></th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    e.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + e.headTemplate + "<tbody></tbody>" + e.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + e.headTemplate + e.contTemplate + e.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + e.headTemplate + e.contTemplate + e.footTemplate + '</table></div><a class="button datepicker-close small alert right" style="width:auto;"><i class="fa fa-remove fa-times"></i></a></div>',
    a.fn.fdatepicker.DPGlobal = e
}(window.jQuery),
function(a, b, c) {
    "use strict";
    function d() {
        if (j.webkit)
            return {
                height: 0,
                width: 0
            };
        if (!j.data.outer) {
            var b = {
                border: "none",
                "box-sizing": "content-box",
                height: "200px",
                margin: "0",
                padding: "0",
                width: "200px"
            };
            j.data.inner = a("<div>").css(a.extend({}, b)),
            j.data.outer = a("<div>").css(a.extend({
                left: "-1000px",
                overflow: "scroll",
                position: "absolute",
                top: "-1000px"
            }, b)).append(j.data.inner).appendTo("body")
        }
        return j.data.outer.scrollLeft(1e3).scrollTop(1e3),
        {
            height: Math.ceil(j.data.outer.offset().top - j.data.inner.offset().top || 0),
            width: Math.ceil(j.data.outer.offset().left - j.data.inner.offset().left || 0)
        }
    }
    function e(c, d) {
        return a(b).on({
            "blur.scrollbar": function() {
                a(b).add("body").off(".scrollbar"),
                c && c()
            },
            "dragstart.scrollbar": function(a) {
                return a.preventDefault(),
                !1
            },
            "mouseup.scrollbar": function() {
                a(b).add("body").off(".scrollbar"),
                c && c()
            }
        }),
        a("body").on({
            "selectstart.scrollbar": function(a) {
                return a.preventDefault(),
                !1
            }
        }),
        d && d.preventDefault(),
        !1
    }
    function f(a) {
        var b = a.originalEvent;
        return b.axis && b.axis === b.HORIZONTAL_AXIS ? !1 : b.wheelDeltaX ? !1 : !0
    }
    var g = !1
      , h = 1
      , i = "px"
      , j = {
        data: {},
        mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(c.navigator.userAgent),
        scroll: null,
        scrolls: [],
        webkit: c.WebKitPoint ? !0 : !1,
        log: g ? function(b, d) {
            var e = b;
            d && "string" != typeof b && (e = [],
            a.each(b, function(a, b) {
                e.push('"' + a + '": ' + b)
            }),
            e = e.join(", ")),
            c.console && c.console.log ? c.console.log(e) : alert(e)
        }
        : function() {}
    }
      , k = {
        autoScrollSize: !0,
        autoUpdate: !0,
        debug: !1,
        disableBodyScroll: !1,
        duration: 200,
        ignoreMobile: !0,
        scrollStep: 30,
        showArrows: !1,
        stepScrolling: !0,
        type: "simple",
        scrollx: null,
        scrolly: null,
        onDestroy: null,
        onInit: null,
        onScroll: null,
        onUpdate: null
    }
      , l = function(b, e) {
        j.scroll || (j.log("Init jQuery Scrollbar v0.2.4"),
        j.scroll = d(),
        o(),
        a(c).resize(function() {
            var a = !1;
            if (j.scroll && (j.scroll.height || j.scroll.width)) {
                var b = d();
                (b.height != j.scroll.height || b.width != j.scroll.width) && (j.scroll = b,
                a = !0)
            }
            o(a)
        })),
        this.container = b,
        this.options = a.extend({}, k, c.jQueryScrollbarOptions || {}),
        this.scrollTo = null,
        this.scrollx = {},
        this.scrolly = {},
        this.init(e)
    };
    l.prototype = {
        destroy: function() {
            if (this.wrapper) {
                var c = this.container.scrollLeft()
                  , d = this.container.scrollTop();
                this.container.insertBefore(this.wrapper).css({
                    height: "",
                    margin: ""
                }).removeClass("scroll-content").removeClass("scroll-scrollx_visible").removeClass("scroll-scrolly_visible").off(".scrollbar").scrollLeft(c).scrollTop(d),
                this.scrollx.scrollbar.removeClass("scroll-scrollx_visible").find("div").andSelf().off(".scrollbar"),
                this.scrolly.scrollbar.removeClass("scroll-scrolly_visible").find("div").andSelf().off(".scrollbar"),
                this.wrapper.remove(),
                a(b).add("body").off(".scrollbar"),
                a.isFunction(this.options.onDestroy) && this.options.onDestroy.apply(this, [this.container])
            }
        },
        getScrollbar: function(b) {
            var c = this.options["scroll" + b]
              , d = {
                advanced: '<div class="scroll-element_corner"></div><div class="scroll-arrow scroll-arrow_less"></div><div class="scroll-arrow scroll-arrow_more"></div><div class="scroll-element_outer">    <div class="scroll-element_size"></div>    <div class="scroll-element_inner-wrapper">        <div class="scroll-element_inner scroll-element_track">            <div class="scroll-element_inner-bottom"></div>        </div>    </div>    <div class="scroll-bar">        <div class="scroll-bar_body">            <div class="scroll-bar_body-inner"></div>        </div>        <div class="scroll-bar_bottom"></div>        <div class="scroll-bar_center"></div>    </div></div>',
                simple: '<div class="scroll-element_outer">    <div class="scroll-element_size"></div>    <div class="scroll-element_track"></div>    <div class="scroll-bar"></div></div>'
            }
              , e = d[this.options.type] ? this.options.type : "advanced";
            return c = c ? "string" == typeof c ? a(c).appendTo(this.wrapper) : a(c) : a("<div>").addClass("scroll-element").html(d[e]).appendTo(this.wrapper),
            this.options.showArrows && c.addClass("scroll-element_arrows_visible"),
            c.addClass("scroll-" + b)
        },
        init: function(c) {
            var d = this
              , g = this.container
              , k = this.containerWrapper || g
              , l = a.extend(this.options, c || {})
              , m = {
                x: this.scrollx,
                y: this.scrolly
            }
              , n = this.wrapper
              , o = {
                scrollLeft: g.scrollLeft(),
                scrollTop: g.scrollTop()
            };
            if (j.mobile && l.ignoreMobile)
                return !1;
            if (n)
                k.css({
                    height: "",
                    "margin-bottom": -1 * j.scroll.height + i,
                    "margin-right": -1 * j.scroll.width + i
                });
            else {
                if (this.wrapper = n = a("<div>").addClass("scroll-wrapper").addClass(g.attr("class")).css("position", "absolute" == g.css("position") ? "absolute" : "relative").insertBefore(g).append(g),
                g.is("textarea") && (this.containerWrapper = k = a("<div>").insertBefore(g).append(g),
                n.addClass("scroll-textarea")),
                k.addClass("scroll-content").css({
                    height: "",
                    "margin-bottom": -1 * j.scroll.height + i,
                    "margin-right": -1 * j.scroll.width + i
                }),
                g.on("scroll.scrollbar", function(b) {
                    a.isFunction(l.onScroll) && l.onScroll.call(d, {
                        maxScroll: m.y.maxScrollOffset,
                        scroll: g.scrollTop(),
                        size: m.y.size,
                        visible: m.y.visible
                    }, {
                        maxScroll: m.x.maxScrollOffset,
                        scroll: g.scrollLeft(),
                        size: m.x.size,
                        visible: m.x.visible
                    }),
                    m.x.isVisible && m.x.scroller.css("left", g.scrollLeft() * m.x.kx + i),
                    m.y.isVisible && m.y.scroller.css("top", g.scrollTop() * m.y.kx + i)
                }),
                n.on("scroll", function() {
                    n.scrollTop(0).scrollLeft(0)
                }),
                l.disableBodyScroll) {
                    var p = function(a) {
                        f(a) ? m.y.isVisible && m.y.mousewheel(a) : m.x.isVisible && m.x.mousewheel(a)
                    };
                    n.on({
                        "MozMousePixelScroll.scrollbar": p,
                        "mousewheel.scrollbar": p
                    }),
                    j.mobile && n.on("touchstart.scrollbar", function(c) {
                        var d = c.originalEvent.touches && c.originalEvent.touches[0] || c
                          , e = {
                            pageX: d.pageX,
                            pageY: d.pageY
                        }
                          , f = {
                            left: g.scrollLeft(),
                            top: g.scrollTop()
                        };
                        a(b).on({
                            "touchmove.scrollbar": function(a) {
                                var b = a.originalEvent.targetTouches && a.originalEvent.targetTouches[0] || a;
                                g.scrollLeft(f.left + e.pageX - b.pageX),
                                g.scrollTop(f.top + e.pageY - b.pageY),
                                a.preventDefault()
                            },
                            "touchend.scrollbar": function() {
                                a(b).off(".scrollbar")
                            }
                        })
                    })
                }
                a.isFunction(l.onInit) && l.onInit.apply(this, [g])
            }
            a.each(m, function(c, i) {
                var j = null
                  , k = 1
                  , n = "x" == c ? "scrollLeft" : "scrollTop"
                  , o = l.scrollStep
                  , p = function() {
                    var a = g[n]();
                    g[n](a + o),
                    1 == k && a + o >= q && (a = g[n]()),
                    -1 == k && q >= a + o && (a = g[n]()),
                    g[n]() == a && j && j()
                }
                  , q = 0;
                i.scrollbar || (i.scrollbar = d.getScrollbar(c),
                i.scroller = i.scrollbar.find(".scroll-bar"),
                i.mousewheel = function(a) {
                    if (!i.isVisible || "x" == c && f(a))
                        return !0;
                    if ("y" == c && !f(a))
                        return m.x.mousewheel(a),
                        !0;
                    var b = -1 * a.originalEvent.wheelDelta || a.originalEvent.detail
                      , e = i.size - i.visible - i.offset;
                    return 0 >= q && 0 > b || q >= e && b > 0 || (q += b,
                    0 > q && (q = 0),
                    q > e && (q = e),
                    d.scrollTo = d.scrollTo || {},
                    d.scrollTo[n] = q,
                    setTimeout(function() {
                        d.scrollTo && (g.stop().animate(d.scrollTo, 240, "linear", function() {
                            q = g[n]()
                        }),
                        d.scrollTo = null)
                    }, 1)),
                    a.preventDefault(),
                    !1
                }
                ,
                i.scrollbar.on({
                    "MozMousePixelScroll.scrollbar": i.mousewheel,
                    "mousewheel.scrollbar": i.mousewheel,
                    "mouseenter.scrollbar": function() {
                        q = g[n]()
                    }
                }),
                i.scrollbar.find(".scroll-arrow, .scroll-element_track").on("mousedown.scrollbar", function(b) {
                    if (b.which != h)
                        return !0;
                    k = 1;
                    var f = {
                        eventOffset: b["x" == c ? "pageX" : "pageY"],
                        maxScrollValue: i.size - i.visible - i.offset,
                        scrollbarOffset: i.scroller.offset()["x" == c ? "left" : "top"],
                        scrollbarSize: i.scroller["x" == c ? "outerWidth" : "outerHeight"]()
                    }
                      , m = 0
                      , r = 0;
                    return a(this).hasClass("scroll-arrow") ? (k = a(this).hasClass("scroll-arrow_more") ? 1 : -1,
                    o = l.scrollStep * k,
                    q = k > 0 ? f.maxScrollValue : 0) : (k = f.eventOffset > f.scrollbarOffset + f.scrollbarSize ? 1 : f.eventOffset < f.scrollbarOffset ? -1 : 0,
                    o = Math.round(.75 * i.visible) * k,
                    q = f.eventOffset - f.scrollbarOffset - (l.stepScrolling ? 1 == k ? f.scrollbarSize : 0 : Math.round(f.scrollbarSize / 2)),
                    q = g[n]() + q / i.kx),
                    d.scrollTo = d.scrollTo || {},
                    d.scrollTo[n] = l.stepScrolling ? g[n]() + o : q,
                    l.stepScrolling && (j = function() {
                        q = g[n](),
                        clearInterval(r),
                        clearTimeout(m),
                        m = 0,
                        r = 0
                    }
                    ,
                    m = setTimeout(function() {
                        r = setInterval(p, 40)
                    }, l.duration + 100)),
                    setTimeout(function() {
                        d.scrollTo && (g.animate(d.scrollTo, l.duration),
                        d.scrollTo = null)
                    }, 1),
                    e(j, b)
                }),
                i.scroller.on("mousedown.scrollbar", function(d) {
                    if (d.which != h)
                        return !0;
                    var f = d["x" == c ? "pageX" : "pageY"]
                      , j = g[n]();
                    return i.scrollbar.addClass("scroll-draggable"),
                    a(b).on("mousemove.scrollbar", function(a) {
                        var b = parseInt((a["x" == c ? "pageX" : "pageY"] - f) / i.kx, 10);
                        g[n](j + b)
                    }),
                    e(function() {
                        i.scrollbar.removeClass("scroll-draggable"),
                        q = g[n]()
                    }, d)
                }))
            }),
            a.each(m, function(a, b) {
                var c = "scroll-scroll" + a + "_visible"
                  , d = "x" == a ? m.y : m.x;
                b.scrollbar.removeClass(c),
                d.scrollbar.removeClass(c),
                k.removeClass(c)
            }),
            a.each(m, function(b, c) {
                a.extend(c, "x" == b ? {
                    offset: parseInt(g.css("left"), 10) || 0,
                    size: g.prop("scrollWidth"),
                    visible: n.width()
                } : {
                    offset: parseInt(g.css("top"), 10) || 0,
                    size: g.prop("scrollHeight"),
                    visible: n.height()
                })
            });
            var q = function(b, c) {
                var d = "scroll-scroll" + b + "_visible"
                  , e = "x" == b ? m.y : m.x
                  , f = parseInt(g.css("x" == b ? "left" : "top"), 10) || 0
                  , h = c.size
                  , l = c.visible + f;
                c.isVisible = h - l > 1,
                c.isVisible ? (c.scrollbar.addClass(d),
                e.scrollbar.addClass(d),
                k.addClass(d)) : (c.scrollbar.removeClass(d),
                e.scrollbar.removeClass(d),
                k.removeClass(d)),
                "y" == b && (c.isVisible || c.size < c.visible) && k.css("height", l + j.scroll.height + i),
                (m.x.size != g.prop("scrollWidth") || m.y.size != g.prop("scrollHeight") || m.x.visible != n.width() || m.y.visible != n.height() || m.x.offset != (parseInt(g.css("left"), 10) || 0) || m.y.offset != (parseInt(g.css("top"), 10) || 0)) && (a.each(m, function(b, c) {
                    a.extend(c, "x" == b ? {
                        offset: parseInt(g.css("left"), 10) || 0,
                        size: g.prop("scrollWidth"),
                        visible: n.width()
                    } : {
                        offset: parseInt(g.css("top"), 10) || 0,
                        size: g.prop("scrollHeight"),
                        visible: n.height()
                    })
                }),
                q("x" == b ? "y" : "x", e))
            };
            a.each(m, q),
            a.isFunction(l.onUpdate) && l.onUpdate.apply(this, [g]),
            a.each(m, function(a, b) {
                var c = "x" == a ? "left" : "top"
                  , d = "x" == a ? "outerWidth" : "outerHeight"
                  , e = "x" == a ? "width" : "height"
                  , f = parseInt(g.css(c), 10) || 0
                  , h = b.size
                  , j = b.visible + f
                  , k = b.scrollbar.find(".scroll-element_size");
                k = k[d]() + (parseInt(k.css(c), 10) || 0),
                l.autoScrollSize && (b.scrollbarSize = parseInt(k * j / h, 10),
                b.scroller.css(e, b.scrollbarSize + i)),
                b.scrollbarSize = b.scroller[d](),
                b.kx = (k - b.scrollbarSize) / (h - j) || 1,
                b.maxScrollOffset = h - j
            }),
            g.scrollLeft(o.scrollLeft).scrollTop(o.scrollTop).trigger("scroll")
        }
    },
    a.fn.scrollbar = function(b, c) {
        var d = this;
        return "get" === b && (d = null),
        this.each(function() {
            var e = a(this);
            if (e.hasClass("scroll-wrapper") || "body" == e.get(0).nodeName)
                return !0;
            var f = e.data("scrollbar");
            if (f) {
                if ("get" === b)
                    return d = f,
                    !1;
                var g = "string" == typeof b && f[b] ? b : "init";
                if (f[g].apply(f, a.isArray(c) ? c : []),
                "destroy" === b)
                    for (e.removeData("scrollbar"); a.inArray(f, j.scrolls) >= 0; )
                        j.scrolls.splice(a.inArray(f, j.scrolls), 1)
            } else
                "string" != typeof b && (f = new l(e,b),
                e.data("scrollbar", f),
                j.scrolls.push(f));
            return !0
        }),
        d
    }
    ,
    a.fn.scrollbar.options = k,
    c.angular && !function(a) {
        var b = a.module("jQueryScrollbar", []);
        b.directive("jqueryScrollbar", function() {
            return {
                link: function(a, b) {
                    b.scrollbar(a.options).on("$destroy", function() {
                        b.scrollbar("destroy")
                    })
                },
                restring: "AC",
                scope: {
                    options: "=jqueryScrollbar"
                }
            }
        })
    }(c.angular);
    var m = 0
      , n = 0
      , o = function(a) {
        var b, c, d, e, f, h, i;
        for (b = 0; b < j.scrolls.length; b++)
            e = j.scrolls[b],
            c = e.container,
            d = e.options,
            f = e.wrapper,
            h = e.scrollx,
            i = e.scrolly,
            (a || d.autoUpdate && f && f.is(":visible") && (c.prop("scrollWidth") != h.size || c.prop("scrollHeight") != i.size || f.width() != h.visible || f.height() != i.visible)) && (e.init(),
            g && (j.log({
                scrollHeight: c.prop("scrollHeight") + ":" + e.scrolly.size,
                scrollWidth: c.prop("scrollWidth") + ":" + e.scrollx.size,
                visibleHeight: f.height() + ":" + e.scrolly.visible,
                visibleWidth: f.width() + ":" + e.scrollx.visible
            }, !0),
            n++));
        g && n > 10 ? (j.log("Scroll updates exceed 10"),
        o = function() {}
        ) : (clearTimeout(m),
        m = setTimeout(o, 300))
    }
}(jQuery, document, window),
function(a, b, c, d) {
    function e(b, c) {
        b.owlCarousel = {
            name: "Owl Carousel",
            author: "Bartosz Wojciechowski",
            version: "2.0.0-beta.2.1"
        },
        this.settings = null,
        this.options = a.extend({}, e.Defaults, c),
        this.itemData = a.extend({}, l),
        this.dom = a.extend({}, m),
        this.width = a.extend({}, n),
        this.num = a.extend({}, o),
        this.drag = a.extend({}, q),
        this.state = a.extend({}, r),
        this.e = a.extend({}, s),
        this.plugins = {},
        this._supress = {},
        this._current = null,
        this._speed = null,
        this._coordinates = null,
        this.dom.el = b,
        this.dom.$el = a(b);
        for (var d in e.Plugins)
            this.plugins[d[0].toLowerCase() + d.slice(1)] = new e.Plugins[d](this);
        this.init()
    }
    function f(a) {
        var b, d, e = c.createElement("div"), f = a;
        for (b in f)
            if (d = f[b],
            "undefined" != typeof e.style[d])
                return e = null,
                [d, b];
        return [!1]
    }
    function g() {
        return f(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }
    function h() {
        return f(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }
    function i() {
        return f(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }
    function j() {
        return "ontouchstart"in b || !!navigator.msMaxTouchPoints
    }
    function k() {
        return b.navigator.msPointerEnabled
    }
    var l, m, n, o, p, q, r, s;
    l = {
        index: !1,
        indexAbs: !1,
        posLeft: !1,
        clone: !1,
        active: !1,
        loaded: !1,
        lazyLoad: !1,
        current: !1,
        width: !1,
        center: !1,
        page: !1,
        hasVideo: !1,
        playVideo: !1
    },
    m = {
        el: null,
        $el: null,
        stage: null,
        $stage: null,
        oStage: null,
        $oStage: null,
        $items: null,
        $oItems: null,
        $cItems: null,
        $content: null
    },
    n = {
        el: 0,
        stage: 0,
        item: 0,
        prevWindow: 0,
        cloneLast: 0
    },
    o = {
        items: 0,
        oItems: 0,
        cItems: 0,
        active: 0,
        merged: []
    },
    q = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    },
    r = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    },
    s = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    },
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    },
    e.Plugins = {},
    e.prototype.init = function() {
        if (this.setResponsiveOptions(),
        this.trigger("initialize"),
        this.dom.$el.hasClass(this.settings.baseClass) || this.dom.$el.addClass(this.settings.baseClass),
        this.dom.$el.hasClass(this.settings.themeClass) || this.dom.$el.addClass(this.settings.themeClass),
        this.settings.rtl && this.dom.$el.addClass("owl-rtl"),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var a, b, c;
            if (a = this.dom.$el.find("img"),
            b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d,
            c = this.dom.$el.children(b).width(),
            a.length && 0 >= c)
                return this.preloadAutoWidthImages(a),
                !1
        }
        this.width.prevWindow = this.viewport(),
        this.createStage(),
        this.fetchContent(),
        this.eventsCall(),
        this.internalEvents(),
        this.dom.$el.addClass("owl-loading"),
        this.refresh(!0),
        this.dom.$el.removeClass("owl-loading").addClass("owl-loaded"),
        this.trigger("initialized"),
        this.addTriggerableEvents()
    }
    ,
    e.prototype.setResponsiveOptions = function() {
        if (this.options.responsive) {
            var b = this.viewport()
              , c = this.options.responsive
              , d = -1;
            a.each(c, function(a) {
                b >= a && a > d && (d = Number(a))
            }),
            this.settings = a.extend({}, this.options, c[d]),
            delete this.settings.responsive,
            this.settings.responsiveClass && this.dom.$el.attr("class", function(a, b) {
                return b.replace(/\b owl-responsive-\S+/g, "")
            }).addClass("owl-responsive-" + d)
        } else
            this.settings = a.extend({}, this.options)
    }
    ,
    e.prototype.optionsLogic = function() {
        this.dom.$el.toggleClass("owl-center", this.settings.center),
        this.settings.loop && this.num.oItems < this.settings.items && (this.settings.loop = !1),
        this.settings.autoWidth && (this.settings.stagePadding = !1,
        this.settings.merge = !1)
    }
    ,
    e.prototype.createStage = function() {
        var b = c.createElement("div")
          , d = c.createElement(this.settings.stageElement);
        b.className = "owl-stage-outer",
        d.className = "owl-stage",
        b.appendChild(d),
        this.dom.el.appendChild(b),
        this.dom.oStage = b,
        this.dom.$oStage = a(b),
        this.dom.stage = d,
        this.dom.$stage = a(d),
        b = null,
        d = null
    }
    ,
    e.prototype.createItemContainer = function() {
        var b = c.createElement(this.settings.itemElement);
        return b.className = this.settings.itemClass,
        a(b)
    }
    ,
    e.prototype.fetchContent = function(b) {
        b ? this.dom.$content = b instanceof jQuery ? b : a(b) : this.settings.nestedItemSelector ? this.dom.$content = this.dom.$el.find("." + this.settings.nestedItemSelector).not(".owl-stage-outer") : this.dom.$content = this.dom.$el.children().not(".owl-stage-outer"),
        this.num.oItems = this.dom.$content.length,
        0 !== this.num.oItems && this.initStructure()
    }
    ,
    e.prototype.initStructure = function() {
        this.createNormalStructure()
    }
    ,
    e.prototype.createNormalStructure = function() {
        var a, b;
        for (a = 0; a < this.num.oItems; a++)
            b = this.createItemContainer(),
            this.initializeItemContainer(b, this.dom.$content[a]),
            this.dom.$stage.append(b);
        this.dom.$content = null
    }
    ,
    e.prototype.createCustomStructure = function(a) {
        var b, c;
        for (b = 0; a > b; b++)
            c = this.createItemContainer(),
            this.createItemContainerData(c),
            this.dom.$stage.append(c)
    }
    ,
    e.prototype.initializeItemContainer = function(a, b) {
        this.trigger("change", {
            property: {
                name: "item",
                value: a
            }
        }),
        this.createItemContainerData(a),
        a.append(b),
        this.trigger("changed", {
            property: {
                name: "item",
                value: a
            }
        })
    }
    ,
    e.prototype.createItemContainerData = function(b, c) {
        var d = a.extend({}, this.itemData);
        c && a.extend(d, c.data("owl-item")),
        b.data("owl-item", d)
    }
    ,
    e.prototype.cloneItemContainer = function(a) {
        var b = a.clone(!0, !0).addClass("cloned");
        return this.createItemContainerData(b, b),
        b.data("owl-item").clone = !0,
        b
    }
    ,
    e.prototype.updateLocalContent = function() {
        var b, c;
        for (this.dom.$oItems = this.dom.$stage.find("." + this.settings.itemClass).filter(function() {
            return a(this).data("owl-item").clone === !1
        }),
        this.num.oItems = this.dom.$oItems.length,
        b = 0; b < this.num.oItems; b++)
            c = this.dom.$oItems.eq(b),
            c.data("owl-item").index = b
    }
    ,
    e.prototype.loopClone = function() {
        if (!this.settings.loop || this.num.oItems < this.settings.items)
            return !1;
        var b, c, d, e = this.settings.items, f = this.num.oItems - 1;
        for (this.settings.stagePadding && 1 === this.settings.items && (e += 1),
        this.num.cItems = 2 * e,
        d = 0; e > d; d++)
            b = this.cloneItemContainer(this.dom.$oItems.eq(d)),
            c = this.cloneItemContainer(this.dom.$oItems.eq(f - d)),
            this.dom.$stage.append(b),
            this.dom.$stage.prepend(c);
        this.dom.$cItems = this.dom.$stage.find("." + this.settings.itemClass).filter(function() {
            return a(this).data("owl-item").clone === !0
        })
    }
    ,
    e.prototype.reClone = function() {
        null !== this.dom.$cItems && (this.dom.$cItems.remove(),
        this.dom.$cItems = null,
        this.num.cItems = 0),
        this.settings.loop && this.loopClone()
    }
    ,
    e.prototype.calculate = function() {
        var a, b, c, d, e, f, g, h = 0, i = 0;
        for (this.width.el = this.dom.$el.width() - 2 * this.settings.stagePadding,
        this.width.view = this.dom.$el.width(),
        c = this.width.el - this.settings.margin * (1 === this.settings.items ? 0 : this.settings.items - 1),
        this.width.el = this.width.el + this.settings.margin,
        this.width.item = (c / this.settings.items + this.settings.margin).toFixed(3),
        this.dom.$items = this.dom.$stage.find(".owl-item"),
        this.num.items = this.dom.$items.length,
        this.settings.autoWidth && this.dom.$items.css("width", ""),
        this._coordinates = [],
        this.num.merged = [],
        d = this.settings.rtl ? this.settings.center ? -(this.width.el / 2) : 0 : this.settings.center ? this.width.el / 2 : 0,
        this.width.mergeStage = 0,
        a = 0; a < this.num.items; a++)
            this.settings.merge ? (g = this.dom.$items.eq(a).find("[data-merge]").attr("data-merge") || 1,
            this.settings.mergeFit && g > this.settings.items && (g = this.settings.items),
            this.num.merged.push(parseInt(g)),
            this.width.mergeStage += this.width.item * this.num.merged[a]) : this.num.merged.push(1),
            f = this.width.item * this.num.merged[a],
            this.settings.autoWidth && (f = this.dom.$items.eq(a).width() + this.settings.margin,
            this.settings.rtl ? this.dom.$items[a].style.marginLeft = this.settings.margin + "px" : this.dom.$items[a].style.marginRight = this.settings.margin + "px"),
            this._coordinates.push(d),
            this.dom.$items.eq(a).data("owl-item").posLeft = h,
            this.dom.$items.eq(a).data("owl-item").width = f,
            this.settings.rtl ? (d += f,
            h += f) : (d -= f,
            h -= f),
            i -= Math.abs(f),
            this.settings.center && (this._coordinates[a] = this.settings.rtl ? this._coordinates[a] + f / 2 : this._coordinates[a] - f / 2);
        for (this.settings.autoWidth ? this.width.stage = this.settings.center ? Math.abs(i) : Math.abs(d) : this.width.stage = Math.abs(i),
        e = this.num.oItems + this.num.cItems,
        b = 0; e > b; b++)
            this.dom.$items.eq(b).data("owl-item").indexAbs = b;
        this.setSizes()
    }
    ,
    e.prototype.setSizes = function() {
        this.settings.stagePadding !== !1 && (this.dom.oStage.style.paddingLeft = this.settings.stagePadding + "px",
        this.dom.oStage.style.paddingRight = this.settings.stagePadding + "px"),
        this.settings.rtl ? b.setTimeout(a.proxy(function() {
            this.dom.stage.style.width = this.width.stage + "px"
        }, this), 0) : this.dom.stage.style.width = this.width.stage + "px";
        for (var c = 0; c < this.num.items; c++)
            this.settings.autoWidth || (this.dom.$items[c].style.width = this.width.item - this.settings.margin + "px"),
            this.settings.rtl ? this.dom.$items[c].style.marginLeft = this.settings.margin + "px" : this.dom.$items[c].style.marginRight = this.settings.margin + "px",
            1 === this.num.merged[c] || this.settings.autoWidth || (this.dom.$items[c].style.width = this.width.item * this.num.merged[c] - this.settings.margin + "px");
        this.width.stagePrev = this.width.stage
    }
    ,
    e.prototype.responsive = function() {
        if (!this.num.oItems)
            return !1;
        var a = this.isElWidthChanged();
        return a ? this.trigger("resize").isDefaultPrevented() ? !1 : (this.state.responsive = !0,
        this.refresh(),
        this.state.responsive = !1,
        void this.trigger("resized")) : !1
    }
    ,
    e.prototype.refresh = function() {
        var a = this.dom.$oItems && this.dom.$oItems.eq(this.normalize(this.current(), !0));
        return this.trigger("refresh"),
        this.setResponsiveOptions(),
        this.updateLocalContent(),
        this.optionsLogic(),
        0 === this.num.oItems ? !1 : (this.dom.$stage.addClass("owl-refresh"),
        this.reClone(),
        this.calculate(),
        this.dom.$stage.removeClass("owl-refresh"),
        a ? this.reset(a.data("owl-item").indexAbs) : (this.dom.oStage.scrollLeft = 0,
        this.reset(this.dom.$oItems.eq(0).data("owl-item").indexAbs)),
        this.state.orientation = b.orientation,
        this.watchVisibility(),
        void this.trigger("refreshed"))
    }
    ,
    e.prototype.updateActiveItems = function() {
        this.trigger("change", {
            property: {
                name: "items",
                value: this.dom.$items
            }
        });
        var a, b, c, d, e, f;
        for (a = 0; a < this.num.items; a++)
            this.dom.$items.eq(a).data("owl-item").active = !1,
            this.dom.$items.eq(a).data("owl-item").current = !1,
            this.dom.$items.eq(a).removeClass(this.settings.activeClass).removeClass(this.settings.centerClass);
        for (this.num.active = 0,
        padding = 2 * this.settings.stagePadding,
        stageX = this.coordinates(this.current()) + padding,
        view = this.settings.rtl ? this.width.view : -this.width.view,
        b = 0; b < this.num.items; b++)
            c = this.dom.$items.eq(b),
            d = c.data("owl-item").posLeft,
            e = c.data("owl-item").width,
            f = this.settings.rtl ? d - e - padding : d - e + padding,
            (this.op(d, "<=", stageX) && this.op(d, ">", stageX + view) || this.op(f, "<", stageX) && this.op(f, ">", stageX + view)) && (this.num.active++,
            c.data("owl-item").active = !0,
            c.data("owl-item").current = !0,
            c.addClass(this.settings.activeClass),
            this.settings.lazyLoad || (c.data("owl-item").loaded = !0),
            this.settings.loop && this.updateClonedItemsState(c.data("owl-item").index));
        this.settings.center && (this.dom.$items.eq(this.current()).addClass(this.settings.centerClass).data("owl-item").center = !0),
        this.trigger("changed", {
            property: {
                name: "items",
                value: this.dom.$items
            }
        })
    }
    ,
    e.prototype.updateClonedItemsState = function(a) {
        var b, c, d;
        for (this.settings.center && (b = this.dom.$items.eq(this.current()).data("owl-item").index),
        d = 0; d < this.num.items; d++)
            c = this.dom.$items.eq(d),
            c.data("owl-item").index === a && (c.data("owl-item").current = !0,
            c.data("owl-item").index === b && c.addClass(this.settings.centerClass))
    }
    ,
    e.prototype.eventsCall = function() {
        this.e._onDragStart = a.proxy(function(a) {
            this.onDragStart(a)
        }, this),
        this.e._onDragMove = a.proxy(function(a) {
            this.onDragMove(a)
        }, this),
        this.e._onDragEnd = a.proxy(function(a) {
            this.onDragEnd(a)
        }, this),
        this.e._transitionEnd = a.proxy(function(a) {
            this.transitionEnd(a)
        }, this),
        this.e._resizer = a.proxy(function() {
            this.responsiveTimer()
        }, this),
        this.e._responsiveCall = a.proxy(function() {
            this.responsive()
        }, this),
        this.e._preventClick = a.proxy(function(a) {
            this.preventClick(a)
        }, this)
    }
    ,
    e.prototype.responsiveTimer = function() {
        return this.viewport() === this.width.prevWindow ? !1 : (b.clearTimeout(this.resizeTimer),
        this.resizeTimer = b.setTimeout(this.e._responsiveCall, this.settings.responsiveRefreshRate),
        void (this.width.prevWindow = this.viewport()))
    }
    ,
    e.prototype.internalEvents = function() {
        var a = j()
          , d = k();
        a && !d ? this.dragType = ["touchstart", "touchmove", "touchend", "touchcancel"] : a && d ? this.dragType = ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel"] : this.dragType = ["mousedown", "mousemove", "mouseup"],
        (a || d) && this.settings.touchDrag ? this.on(c, this.dragType[3], this.e._onDragEnd) : (this.dom.$stage.on("dragstart", function() {
            return !1
        }),
        this.settings.mouseDrag ? this.dom.stage.onselectstart = function() {
            return !1
        }
        : this.dom.$el.addClass("owl-text-select-on")),
        this.transitionEndVendor && this.on(this.dom.stage, this.transitionEndVendor, this.e._transitionEnd, !1),
        this.settings.responsive !== !1 && this.on(b, "resize", this.e._resizer, !1),
        this.dragEvents()
    }
    ,
    e.prototype.dragEvents = function() {
        !this.settings.touchDrag || "touchstart" !== this.dragType[0] && "MSPointerDown" !== this.dragType[0] ? this.settings.mouseDrag && "mousedown" === this.dragType[0] ? this.on(this.dom.stage, this.dragType[0], this.e._onDragStart, !1) : this.off(this.dom.stage, this.dragType[0], this.e._onDragStart) : this.on(this.dom.stage, this.dragType[0], this.e._onDragStart, !1)
    }
    ,
    e.prototype.onDragStart = function(a) {
        var d, e, f, g, h;
        if (d = a.originalEvent || a || b.event,
        3 === d.which)
            return !1;
        if ("mousedown" === this.dragType[0] && this.dom.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        this.drag.startTime = (new Date).getTime(),
        this.speed(0),
        this.state.isTouch = !0,
        this.state.isScrolling = !1,
        this.state.isSwiping = !1,
        this.drag.distance = 0,
        e = "touchstart" === d.type,
        f = e ? a.targetTouches[0].pageX : d.pageX || d.clientX,
        g = e ? a.targetTouches[0].pageY : d.pageY || d.clientY,
        this.drag.offsetX = this.dom.$stage.position().left - this.settings.stagePadding,
        this.drag.offsetY = this.dom.$stage.position().top,
        this.settings.rtl && (this.drag.offsetX = this.dom.$stage.position().left + this.width.stage - this.width.el + this.settings.margin),
        this.state.inMotion && this.support3d)
            h = this.getTransformProperty(),
            this.drag.offsetX = h,
            this.animate(h),
            this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d)
            return this.state.inMotion = !1,
            !1;
        this.drag.startX = f - this.drag.offsetX,
        this.drag.startY = g - this.drag.offsetY,
        this.drag.start = f - this.drag.startX,
        this.drag.targetEl = d.target || d.srcElement,
        this.drag.updatedX = this.drag.start,
        ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1),
        this.on(c, this.dragType[1], this.e._onDragMove, !1),
        this.on(c, this.dragType[2], this.e._onDragEnd, !1)
    }
    ,
    e.prototype.onDragMove = function(a) {
        var c, e, f, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event,
        e = "touchmove" == c.type,
        f = e ? c.targetTouches[0].pageX : c.pageX || c.clientX,
        g = e ? c.targetTouches[0].pageY : c.pageY || c.clientY,
        this.drag.currentX = f - this.drag.startX,
        this.drag.currentY = g - this.drag.startY,
        this.drag.distance = this.drag.currentX - this.drag.offsetX,
        this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"),
        this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this.num.oItems) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this.num.oItems)) : (h = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
        i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
        j = this.settings.pullDrag ? this.drag.distance / 5 : 0,
        this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)),
        (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1,
        this.state.isSwiping = !0),
        this.drag.updatedX = this.drag.currentX,
        (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0,
        this.drag.updatedX = this.drag.start),
        this.animate(this.drag.updatedX)))
    }
    ,
    e.prototype.onDragEnd = function() {
        var a, b, d;
        if (this.state.isTouch) {
            if ("mousedown" === this.dragType[0] && this.dom.$stage.removeClass("owl-grab"),
            this.trigger("dragged"),
            this.drag.targetEl.removeAttribute("draggable"),
            this.state.isTouch = !1,
            this.state.isScrolling = !1,
            this.state.isSwiping = !1,
            0 === this.drag.distance && this.state.inMotion !== !0)
                return this.state.inMotion = !1,
                !1;
            this.drag.endTime = (new Date).getTime(),
            a = this.drag.endTime - this.drag.startTime,
            b = Math.abs(this.drag.distance),
            (b > 3 || a > 300) && this.removeClick(this.drag.targetEl),
            d = this.closest(this.drag.updatedX),
            this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(d),
            this.settings.pullDrag || this.drag.updatedX !== this.coordinates(d) || this.transitionEnd(),
            this.drag.distance = 0,
            this.off(c, this.dragType[1], this.e._onDragMove),
            this.off(c, this.dragType[2], this.e._onDragEnd)
        }
    }
    ,
    e.prototype.removeClick = function(c) {
        this.drag.targetEl = c,
        a(c).on("click.preventClick", this.e._preventClick),
        b.setTimeout(function() {
            a(c).off("click.preventClick")
        }, 300)
    }
    ,
    e.prototype.preventClick = function(b) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1,
        b.stopPropagation && b.stopPropagation(),
        a(b.target).off("click.preventClick")
    }
    ,
    e.prototype.getTransformProperty = function() {
        var a, c;
        return a = b.getComputedStyle(this.dom.stage, null).getPropertyValue(this.vendorName + "transform"),
        a = a.replace(/matrix(3d)?\(|\)/g, "").split(","),
        c = 16 === a.length,
        c !== !0 ? a[4] : a[12]
    }
    ,
    e.prototype.closest = function(b) {
        var c = 0
          , d = 30;
        return this.settings.freeDrag || a.each(this.coordinates(), a.proxy(function(a, e) {
            b > e - d && e + d > b ? c = a : this.op(b, "<", e) && this.op(b, ">", this.coordinates(a + 1) || e - this.width.el) && (c = "left" === this.state.direction ? a + 1 : a)
        }, this)),
        this.settings.loop || (this.op(b, ">", this.coordinates(this.minimum())) ? c = b = this.minimum() : this.op(b, "<", this.coordinates(this.maximum())) && (c = b = this.maximum())),
        c
    }
    ,
    e.prototype.animate = function(b) {
        this.trigger("translate"),
        this.state.inMotion = this.speed() > 0,
        this.support3d ? this.dom.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.dom.$stage.css({
            left: b + "px"
        }) : this.dom.$stage.animate({
            left: b
        }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }
    ,
    e.prototype.current = function(a) {
        if (a === d)
            return this._current;
        if (0 === this.num.oItems)
            return d;
        if (a = this.normalize(a),
        this._current === a)
            this.animate(this.coordinates(this._current));
        else {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)),
            this._current = a,
            this.animate(this.coordinates(this._current)),
            this.updateActiveItems(),
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }
    ,
    e.prototype.reset = function(a) {
        this.suppress(["change", "changed"]),
        this.speed(0),
        this.current(a),
        this.release(["change", "changed"])
    }
    ,
    e.prototype.normalize = function(a, b) {
        if (a === d || !this.dom.$items)
            return d;
        if (this.settings.loop) {
            var c = this.dom.$items.length;
            a = (a % c + c) % c
        } else
            a = Math.max(this.minimum(), Math.min(this.maximum(), a));
        return b ? this.dom.$items.eq(a).data("owl-item").index : a
    }
    ,
    e.prototype.maximum = function() {
        var b, c, d = this.settings;
        if (!d.loop && d.center)
            b = this.num.oItems - 1;
        else if (d.loop || d.center)
            if (d.loop || d.center)
                b = this.num.oItems + d.items;
            else {
                if (!d.autoWidth && !d.merge)
                    throw "Can not detect maximum absolute position.";
                revert = d.rtl ? 1 : -1,
                c = this.dom.$stage.width() - this.$el.width(),
                a.each(this.coordinates(), function(a, d) {
                    return d * revert >= c ? !1 : void (b = a + 1)
                })
            }
        else
            b = this.num.oItems - d.items;
        return b
    }
    ,
    e.prototype.minimum = function() {
        return this.dom.$oItems.eq(0).data("owl-item").indexAbs
    }
    ,
    e.prototype.speed = function(a) {
        return a !== d && (this._speed = a),
        this._speed
    }
    ,
    e.prototype.coordinates = function(a) {
        return a !== d ? this._coordinates[a] : this._coordinates
    }
    ,
    e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }
    ,
    e.prototype.to = function(c, d) {
        if (this.settings.loop) {
            var e = c - this.normalize(this.current(), !0)
              , f = this.current()
              , g = this.current()
              , h = this.current() + e
              , i = 0 > g - h ? !0 : !1;
            h < this.settings.items && i === !1 ? (f = this.num.items - (this.settings.items - g) - this.settings.items,
            this.reset(f)) : h >= this.num.items - this.settings.items && i === !0 && (f = g - this.num.oItems,
            this.reset(f)),
            b.clearTimeout(this.e._goToLoop),
            this.e._goToLoop = b.setTimeout(a.proxy(function() {
                this.speed(this.duration(this.current(), f + e, d)),
                this.current(f + e)
            }, this), 30)
        } else
            this.speed(this.duration(this.current(), c, d)),
            this.current(c)
    }
    ,
    e.prototype.next = function(a) {
        a = a || !1,
        this.to(this.normalize(this.current(), !0) + 1, a)
    }
    ,
    e.prototype.prev = function(a) {
        a = a || !1,
        this.to(this.normalize(this.current(), !0) - 1, a)
    }
    ,
    e.prototype.transitionEnd = function(a) {
        if (a !== d) {
            a.stopPropagation();
            var b = a.target || a.srcElement || a.originalTarget;
            if (b !== this.dom.stage)
                return !1
        }
        this.state.inMotion = !1,
        this.trigger("translated")
    }
    ,
    e.prototype.isElWidthChanged = function() {
        var a = this.dom.$el.width() - this.settings.stagePadding
          , b = this.width.el + this.settings.margin;
        return a !== b
    }
    ,
    e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b)
            d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth)
            d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth)
                throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }
    ,
    e.prototype.insertContent = function(a) {
        this.dom.$stage.empty(),
        this.fetchContent(a),
        this.refresh()
    }
    ,
    e.prototype.addItem = function(a, b) {
        var c = this.createItemContainer();
        b = b || 0,
        this.initializeItemContainer(c, a),
        0 === this.dom.$oItems.length ? this.dom.$stage.append(c) : -1 !== p ? this.dom.$oItems.eq(b).before(c) : this.dom.$oItems.eq(b).after(c),
        this.refresh()
    }
    ,
    e.prototype.removeItem = function(a) {
        this.dom.$oItems.eq(a).remove(),
        this.refresh()
    }
    ,
    e.prototype.addTriggerableEvents = function() {
        var b = a.proxy(function(b, c) {
            return a.proxy(function(a) {
                a.relatedTarget !== this && (this.suppress([c]),
                b.apply(this, [].slice.call(arguments, 1)),
                this.release([c]))
            }, this)
        }, this);
        a.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.insertContent,
            add: this.addItem,
            remove: this.removeItem
        }, a.proxy(function(a, c) {
            this.dom.$el.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
        }, this))
    }
    ,
    e.prototype.watchVisibility = function() {
        function c(a) {
            return a.offsetWidth > 0 && a.offsetHeight > 0
        }
        function d() {
            c(this.dom.el) && (this.dom.$el.removeClass("owl-hidden"),
            this.refresh(),
            b.clearInterval(this.e._checkVisibile))
        }
        c(this.dom.el) || (this.dom.$el.addClass("owl-hidden"),
        b.clearInterval(this.e._checkVisibile),
        this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }
    ,
    e.prototype.preloadAutoWidthImages = function(b) {
        var c, d, e, f;
        c = 0,
        d = this,
        b.each(function(g, h) {
            e = a(h),
            f = new Image,
            f.onload = function() {
                c++,
                e.attr("src", f.src),
                e.css("opacity", 1),
                c >= b.length && (d.state.imagesLoaded = !0,
                d.init())
            }
            ,
            f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
        })
    }
    ,
    e.prototype.destroy = function() {
        this.dom.$el.hasClass(this.settings.themeClass) && this.dom.$el.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && this.off(b, "resize", this.e._resizer),
        this.transitionEndVendor && this.off(this.dom.stage, this.transitionEndVendor, this.e._transitionEnd);
        for (var a in this.plugins)
            this.plugins[a].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.off(this.dom.stage, this.dragType[0], this.e._onDragStart),
        this.settings.mouseDrag && this.off(c, this.dragType[3], this.e._onDragStart),
        this.settings.mouseDrag && (this.dom.$stage.off("dragstart", function() {
            return !1
        }),
        this.dom.stage.onselectstart = function() {}
        )),
        this.dom.$el.off(".owl"),
        null !== this.dom.$cItems && this.dom.$cItems.remove(),
        this.e = null,
        this.dom.$el.data("owlCarousel", null),
        delete this.dom.el.owlCarousel,
        this.dom.$stage.unwrap(),
        this.dom.$items.unwrap(),
        this.dom.$items.contents().unwrap(),
        this.dom = null
    }
    ,
    e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
        case "<":
            return d ? a > c : c > a;
        case ">":
            return d ? c > a : a > c;
        case ">=":
            return d ? c >= a : a >= c;
        case "<=":
            return d ? a >= c : c >= a
        }
    }
    ,
    e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }
    ,
    e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }
    ,
    e.prototype.trigger = function(b, c, d) {
        var e = {
            item: {
                count: this.num.oItems,
                index: this.current()
            }
        }
          , f = a.camelCase(a.grep(["on", b, d], function(a) {
            return a
        }).join("-").toLowerCase())
          , g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
            relatedTarget: this
        }, e, c));
        return this._supress[g.type] || (a.each(this.plugins, function(a, b) {
            b.onTrigger && b.onTrigger(g)
        }),
        this.dom.$el.trigger(g),
        "function" == typeof this.settings[f] && this.settings[f].apply(this, g)),
        g
    }
    ,
    e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }
    ,
    e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }
    ,
    e.prototype.browserSupport = function() {
        if (this.support3d = i(),
        this.support3d) {
            this.transformVendor = h();
            var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = a[g()],
            this.vendorName = this.transformVendor.replace(/Transform/i, ""),
            this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = b.orientation
    }
    ,
    a.fn.owlCarousel = function(b) {
        return this.each(function() {
            a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this,b))
        })
    }
    ,
    a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    LazyLoad = function(b) {
        this.owl = b,
        this.owl.options = a.extend({}, LazyLoad.Defaults, this.owl.options),
        this.handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                "items" == a.property.name && a.property.value && !a.property.value.is(":empty") && this.check()
            }, this)
        },
        this.owl.dom.$el.on(this.handlers)
    }
    ,
    LazyLoad.Defaults = {
        lazyLoad: !1
    },
    LazyLoad.prototype.check = function() {
        var a, c, d, e, f = b.devicePixelRatio > 1 ? "data-src-retina" : "data-src";
        for (d = 0; d < this.owl.num.items; d++)
            e = this.owl.dom.$items.eq(d),
            e.data("owl-item").current === !0 && e.data("owl-item").loaded === !1 && (c = e.find(".owl-lazy"),
            a = c.attr(f),
            a = a || c.attr("data-src"),
            a && (c.css("opacity", "0"),
            this.preload(c, e)))
    }
    ,
    LazyLoad.prototype.preload = function(c, d) {
        var e, f, g;
        c.each(a.proxy(function(c, h) {
            this.owl.trigger("load", null, "lazy"),
            e = a(h),
            f = new Image,
            g = b.devicePixelRatio > 1 ? e.attr("data-src-retina") : e.attr("data-src"),
            g = g || e.attr("data-src"),
            f.onload = a.proxy(function() {
                d.data("owl-item").loaded = !0,
                e.is("img") ? e.attr("src", f.src) : e.css("background-image", "url(" + f.src + ")"),
                e.css("opacity", 1),
                this.owl.trigger("loaded", null, "lazy")
            }, this),
            f.src = g
        }, this))
    }
    ,
    LazyLoad.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers)
            this.owl.dom.$el.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.lazyLoad = LazyLoad
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    AutoHeight = function(b) {
        this.owl = b,
        this.owl.options = a.extend({}, AutoHeight.Defaults, this.owl.options),
        this.handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && this.owl.settings.autoHeight && this.setHeight()
            }, this)
        },
        this.owl.dom.$el.on(this.handlers)
    }
    ,
    AutoHeight.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    },
    AutoHeight.prototype.setHeight = function() {
        var a, c = this.owl.dom.$items.eq(this.owl.current()), d = this.owl.dom.$oStage, e = 0;
        this.owl.dom.$oStage.hasClass(this.owl.settings.autoHeightClass) || this.owl.dom.$oStage.addClass(this.owl.settings.autoHeightClass),
        a = b.setInterval(function() {
            e += 1,
            c.data("owl-item") && c.data("owl-item").loaded ? (d.height(c.height() + "px"),
            clearInterval(a)) : 500 === e && clearInterval(a)
        }, 100)
    }
    ,
    AutoHeight.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers)
            this.owl.dom.$el.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.autoHeight = AutoHeight
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    Video = function(b) {
        this.owl = b,
        this.owl.options = a.extend({}, Video.Defaults, this.owl.options),
        this.handlers = {
            "resize.owl.carousel": a.proxy(function(a) {
                this.owl.settings.video && !this.isInFullScreen() && a.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": a.proxy(function(a) {
                this.owl.state.videoPlay && this.stopVideo()
            }, this),
            "refresh.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                return this.owl.settings.video ? void (this.refreshing = "refresh" == a.type) : !1
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                this.refreshing && "items" == a.property.name && a.property.value && !a.property.value.is(":empty") && this.checkVideoLinks()
            }, this)
        },
        this.owl.dom.$el.on(this.handlers),
        this.owl.dom.$el.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.playVideo(a);
        }, this))
    }
    ,
    Video.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    },
    Video.prototype.checkVideoLinks = function() {
        var a, b, c;
        for (c = 0; c < this.owl.num.items; c++)
            b = this.owl.dom.$items.eq(c),
            b.data("owl-item").hasVideo || (a = b.find(".owl-video"),
            a.length && (this.owl.state.hasVideos = !0,
            this.owl.dom.$items.eq(c).data("owl-item").hasVideo = !0,
            a.css("display", "none"),
            this.getVideoInfo(a, b)))
    }
    ,
    Video.prototype.getVideoInfo = function(a, b) {
        var c, d, e, f, g = a.data("vimeo-id"), h = a.data("youtube-id"), i = a.data("width") || this.owl.settings.videoWidth, j = a.data("height") || this.owl.settings.videoHeight, k = a.attr("href");
        if (g)
            d = "vimeo",
            e = g;
        else if (h)
            d = "youtube",
            e = h;
        else {
            if (!k)
                throw new Error("Missing video link.");
            e = k.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
            e[3].indexOf("youtu") > -1 ? d = "youtube" : e[3].indexOf("vimeo") > -1 && (d = "vimeo"),
            e = e[6]
        }
        b.data("owl-item").videoType = d,
        b.data("owl-item").videoId = e,
        b.data("owl-item").videoWidth = i,
        b.data("owl-item").videoHeight = j,
        c = {
            type: d,
            id: e
        },
        f = i && j ? 'style="width:' + i + "px;height:" + j + 'px;"' : "",
        a.wrap('<div class="owl-video-wrapper"' + f + "></div>"),
        this.createVideoTn(a, c)
    }
    ,
    Video.prototype.createVideoTn = function(b, c) {
        function d(a) {
            f = '<div class="owl-video-play-icon"></div>',
            e = k.settings.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>',
            b.after(e),
            b.after(f)
        }
        var e, f, g, h = b.find("img"), i = "src", j = "", k = this.owl;
        return this.owl.settings.lazyLoad && (i = "data-src",
        j = "owl-lazy"),
        h.length ? (d(h.attr(i)),
        h.remove(),
        !1) : void ("youtube" === c.type ? (g = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg",
        d(g)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                g = a[0].thumbnail_large,
                d(g),
                k.settings.loop && k.updateActiveItems()
            }
        }))
    }
    ,
    Video.prototype.stopVideo = function() {
        this.owl.trigger("stop", null, "video");
        var a = this.owl.dom.$items.eq(this.owl.state.videoPlayIndex);
        a.find(".owl-video-frame").remove(),
        a.removeClass("owl-video-playing"),
        this.owl.state.videoPlay = !1
    }
    ,
    Video.prototype.playVideo = function(b) {
        this.owl.trigger("play", null, "video"),
        this.owl.state.videoPlay && this.stopVideo();
        var c, d, e, f = a(b.target || b.srcElement), g = f.closest("." + this.owl.settings.itemClass);
        e = g.data("owl-item").videoType,
        id = g.data("owl-item").videoId,
        width = g.data("owl-item").videoWidth || Math.floor(g.data("owl-item").width - this.owl.settings.margin),
        height = g.data("owl-item").videoHeight || this.owl.dom.$stage.height(),
        "youtube" === e ? c = '<iframe width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/' + id + "?autoplay=1&v=" + id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === e && (c = '<iframe src="http://player.vimeo.com/video/' + id + '?autoplay=1" width="' + width + '" height="' + height + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
        g.addClass("owl-video-playing"),
        this.owl.state.videoPlay = !0,
        this.owl.state.videoPlayIndex = g.data("owl-item").indexAbs,
        d = a('<div style="height:' + height + "px; width:" + width + 'px" class="owl-video-frame">' + c + "</div>"),
        f.after(d)
    }
    ,
    Video.prototype.isInFullScreen = function() {
        var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return d && a(d.parentNode).hasClass("owl-video-frame") && (this.owl.speed(0),
        this.owl.state.isFullScreen = !0),
        d && this.owl.state.isFullScreen && this.owl.state.videoPlay ? !1 : this.owl.state.isFullScreen ? (this.owl.state.isFullScreen = !1,
        !1) : this.owl.state.videoPlay && this.owl.state.orientation !== b.orientation ? (this.owl.state.orientation = b.orientation,
        !1) : !0
    }
    ,
    Video.prototype.destroy = function() {
        var a, b;
        this.owl.dom.$el.off("click.owl.video");
        for (a in this.handlers)
            this.owl.dom.$el.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.video = Video
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    Animate = function(b) {
        this.core = b,
        this.core.options = a.extend({}, Animate.Defaults, this.core.options),
        this.swapping = !0,
        this.previous = d,
        this.next = d,
        this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.property && "position" == a.property.name && (this.previous = this.core.current(),
                this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                this.swapping = "translated" == a.type
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        },
        this.core.dom.$el.on(this.handlers)
    }
    ,
    Animate.Defaults = {
        animateOut: !1,
        animateIn: !1
    },
    Animate.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this), d = this.core.dom.$items.eq(this.previous), e = this.core.dom.$items.eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
            d.css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)),
            f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
        }
    }
    ,
    Animate.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
        this.core.transitionEnd()
    }
    ,
    Animate.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers)
            this.core.dom.$el.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Animate = Animate
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    Autoplay = function(b) {
        this.core = b,
        this.core.options = a.extend({}, Autoplay.Defaults, this.core.options),
        this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        },
        this.core.dom.$el.on(this.handlers)
    }
    ,
    Autoplay.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    },
    Autoplay.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval),
        this.interval = b.setInterval(a.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
    }
    ,
    Autoplay.prototype.play = function(a, d) {
        return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }
    ,
    Autoplay.prototype.stop = function() {
        b.clearInterval(this.interval)
    }
    ,
    Autoplay.prototype.pause = function() {
        b.clearInterval(this.interval)
    }
    ,
    Autoplay.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers)
            this.core.dom.$el.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this.core = b,
        this.initialized = !1,
        this.pages = [],
        this.controls = {},
        this.template = null,
        this.$element = this.core.dom.$el,
        this.overrides = {
            next: this.core.next,
            prev: this.core.prev,
            to: this.core.to
        },
        this.handlers = {
            "changed.owl.carousel": a.proxy(function(b) {
                "items" == b.property.name && (this.initialized || (this.initialize(),
                this.initialized = !0),
                this.update(),
                this.draw()),
                this.filling && (b.property.value.data("owl-item").dot = a(":first-child", b.property.value).find("[data-dot]").andSelf().data("dot"))
            }, this),
            "change.owl.carousel": a.proxy(function(a) {
                if ("position" == a.property.name && !this.core.state.revert && !this.core.settings.loop && this.core.settings.navRewind) {
                    var b = this.core.current()
                      , c = this.core.maximum()
                      , d = this.core.minimum();
                    a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                }
                this.filling = this.core.settings.dotsData && "item" == a.property.name && a.property.value && a.property.value.is(":empty")
            }, this),
            "refreshed.owl.carousel": a.proxy(function() {
                this.initialized && (this.update(),
                this.draw())
            }, this)
        },
        this.core.options = a.extend({}, e.Defaults, this.core.options),
        this.$element.on(this.handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    },
    e.prototype.initialize = function() {
        var b, c, d = this.core.settings;
        d.dotsData || (this.template = a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")),
        d.navContainer && d.dotsContainer || (this.controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)),
        this.controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this.controls.$container),
        this.controls.$indicators.on(this.core.dragType[2], "div", a.proxy(function(b) {
            var c = a(b.target).parent().is(this.controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(),
            this.to(c, d.dotsSpeed)
        }, this)),
        b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this.controls.$container),
        this.controls.$next = a("<" + d.navElement + ">"),
        this.controls.$previous = this.controls.$next.clone(),
        this.controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on(this.core.dragType[2], a.proxy(function(a) {
            this.prev()
        }, this)),
        this.controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on(this.core.dragType[2], a.proxy(function(a) {
            this.next()
        }, this));
        for (c in this.overrides)
            this.core[c] = a.proxy(this[c], this)
    }
    ,
    e.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this.handlers)
            this.$element.off(a, this.handlers[a]);
        for (b in this.controls)
            this.controls[b].remove();
        for (d in this.overides)
            this.core[d] = this.overrides[d];
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null)
    }
    ,
    e.prototype.update = function() {
        var a, b, c, d = this.core.settings, e = this.core.num.cItems / 2, f = this.core.num.items - e, g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)),
        d.dots)
            for (this.pages = [],
            a = e,
            b = 0,
            c = 0; f > a; a++)
                (b >= g || 0 === b) && (this.pages.push({
                    start: a - e,
                    end: a - e + g - 1
                }),
                b = 0,
                ++c),
                b += this.core.num.merged[a]
    }
    ,
    e.prototype.draw = function() {
        var b, c, d = "", e = this.core.settings, f = this.core.dom.$oItems, g = this.core.normalize(this.core.current(), !0);
        if (!e.nav || e.loop || e.navRewind || (this.controls.$previous.toggleClass("disabled", 0 >= g),
        this.controls.$next.toggleClass("disabled", g >= this.core.maximum())),
        this.controls.$previous.toggle(e.nav),
        this.controls.$next.toggle(e.nav),
        e.dots) {
            if (b = this.pages.length - this.controls.$indicators.children().length,
            b > 0) {
                for (c = 0; c < Math.abs(b); c++)
                    d += e.dotData ? f.eq(c).data("owl-item").dot : this.template;
                this.controls.$indicators.append(d)
            } else
                0 > b && this.controls.$indicators.children().slice(b).remove();
            this.controls.$indicators.find(".active").removeClass("active"),
            this.controls.$indicators.children().eq(a.inArray(this.current(), this.pages)).addClass("active")
        }
        this.controls.$indicators.toggle(e.dots)
    }
    ,
    e.prototype.onTrigger = function(b) {
        var c = this.core.settings;
        b.page = {
            index: a.inArray(this.current(), this.pages),
            count: this.pages.length,
            size: c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items
        }
    }
    ,
    e.prototype.current = function() {
        var b = this.core.normalize(this.core.current(), !0);
        return a.grep(this.pages, function(a) {
            return a.start <= b && a.end >= b
        }).pop()
    }
    ,
    e.prototype.getPosition = function(b) {
        var c, d, e = this.core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this.pages),
        d = this.pages.length,
        b ? ++c : --c,
        c = this.pages[(c % d + d) % d].start) : (c = this.core.normalize(this.core.current(), !0),
        d = this.core.num.oItems,
        b ? c += e.slideBy : c -= e.slideBy),
        c
    }
    ,
    e.prototype.next = function(b) {
        a.proxy(this.overrides.to, this.core)(this.getPosition(!0), b)
    }
    ,
    e.prototype.prev = function(b) {
        a.proxy(this.overrides.to, this.core)(this.getPosition(!1), b)
    }
    ,
    e.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this.overrides.to, this.core)(b, c) : (e = this.pages.length,
        a.proxy(this.overrides.to, this.core)(this.pages[(b % e + e) % e].start, c))
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this.core = c,
        this.hashes = {},
        this.$element = this.core.dom.$el,
        this.handlers = {
            "initialized.owl.carousel": a.proxy(function() {
                b.location.hash.substring(1) && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "changed.owl.carousel": a.proxy(function(b) {
                this.filling && (b.property.value.data("owl-item").hash = a(":first-child", b.property.value).find("[data-hash]").andSelf().data("hash"),
                this.hashes[b.property.value.data("owl-item").hash] = b.property.value)
            }, this),
            "change.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && this.core.current() === d && "URLHash" == this.core.settings.startPosition && (a.data = this.hashes[b.location.hash.substring(1)]),
                this.filling = "item" == a.property.name && a.property.value && a.property.value.is(":empty")
            }, this)
        },
        this.core.options = a.extend({}, e.Defaults, this.core.options),
        this.$element.on(this.handlers),
        a(b).on("hashchange.owl.navigation", a.proxy(function() {
            var a = b.location.hash.substring(1)
              , c = this.core.dom.$oItems
              , d = this.hashes[a] && c.index(this.hashes[a]) || 0;
            return a ? (this.core.dom.oStage.scrollLeft = 0,
            void this.core.to(d, !1, !0)) : !1
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    },
    e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this.handlers)
            this.owl && this.owl.dom.$el.off(c, this.handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
            "function" != typeof this[d] && (this[d] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document);
var saveAs = saveAs || "undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(a) {
    "use strict";
    if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
        var b = a.document
          , c = function() {
            return a.URL || a.webkitURL || a
        }
          , d = b.createElementNS("http://www.w3.org/1999/xhtml", "a")
          , e = "download"in d
          , f = function(c) {
            var d = b.createEvent("MouseEvents");
            d.initMouseEvent("click", !0, !1, a, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
            c.dispatchEvent(d)
        }
          , g = a.webkitRequestFileSystem
          , h = a.requestFileSystem || g || a.mozRequestFileSystem
          , i = function(b) {
            (a.setImmediate || a.setTimeout)(function() {
                throw b
            }, 0)
        }
          , j = "application/octet-stream"
          , k = 0
          , l = 500
          , m = function(b) {
            var d = function() {
                "string" == typeof b ? c().revokeObjectURL(b) : b.remove()
            };
            a.chrome ? d() : setTimeout(d, l)
        }
          , n = function(a, b, c) {
            b = [].concat(b);
            for (var d = b.length; d--; ) {
                var e = a["on" + b[d]];
                if ("function" == typeof e)
                    try {
                        e.call(a, c || a)
                    } catch (f) {
                        i(f)
                    }
            }
        }
          , o = function(b, i) {
            var l, o, p, q = this, r = b.type, s = !1, t = function() {
                n(q, "writestart progress write writeend".split(" "))
            }, u = function() {
                if ((s || !l) && (l = c().createObjectURL(b)),
                o)
                    o.location.href = l;
                else {
                    var d = a.open(l, "_blank");
                    void 0 == d && "undefined" != typeof safari && (a.location.href = l)
                }
                q.readyState = q.DONE,
                t(),
                m(l)
            }, v = function(a) {
                return function() {
                    return q.readyState !== q.DONE ? a.apply(this, arguments) : void 0
                }
            }, w = {
                create: !0,
                exclusive: !1
            };
            return q.readyState = q.INIT,
            i || (i = "download"),
            e ? (l = c().createObjectURL(b),
            d.href = l,
            d.download = i,
            f(d),
            q.readyState = q.DONE,
            t(),
            void m(l)) : (/^\s*(?:text\/(?:plain|xml)|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(b.type) && (b = new Blob(["\ufeff", b],{
                type: b.type
            })),
            a.chrome && r && r !== j && (p = b.slice || b.webkitSlice,
            b = p.call(b, 0, b.size, j),
            s = !0),
            g && "download" !== i && (i += ".download"),
            (r === j || g) && (o = a),
            h ? (k += b.size,
            void h(a.TEMPORARY, k, v(function(a) {
                a.root.getDirectory("saved", w, v(function(a) {
                    var c = function() {
                        a.getFile(i, w, v(function(a) {
                            a.createWriter(v(function(c) {
                                c.onwriteend = function(b) {
                                    o.location.href = a.toURL(),
                                    q.readyState = q.DONE,
                                    n(q, "writeend", b),
                                    m(a)
                                }
                                ,
                                c.onerror = function() {
                                    var a = c.error;
                                    a.code !== a.ABORT_ERR && u()
                                }
                                ,
                                "writestart progress write abort".split(" ").forEach(function(a) {
                                    c["on" + a] = q["on" + a]
                                }),
                                c.write(b),
                                q.abort = function() {
                                    c.abort(),
                                    q.readyState = q.DONE
                                }
                                ,
                                q.readyState = q.WRITING
                            }), u)
                        }), u)
                    };
                    a.getFile(i, {
                        create: !1
                    }, v(function(a) {
                        a.remove(),
                        c()
                    }), v(function(a) {
                        a.code === a.NOT_FOUND_ERR ? c() : u()
                    }))
                }), u)
            }), u)) : void u())
        }
          , p = o.prototype
          , q = function(a, b) {
            return new o(a,b)
        };
        return p.abort = function() {
            var a = this;
            a.readyState = a.DONE,
            n(a, "abort")
        }
        ,
        p.readyState = p.INIT = 0,
        p.WRITING = 1,
        p.DONE = 2,
        p.error = p.onwritestart = p.onprogress = p.onwrite = p.onabort = p.onerror = p.onwriteend = null,
        q
    }
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
"undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null != define.amd && define([], function() {
    return saveAs
});
