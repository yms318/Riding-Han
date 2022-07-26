/*! jQuery UI - v1.12.1 - 2016-09-14
 * http://jqueryui.com
 * Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
})(function(t) {
  function e(t) {
    for (var e = t.css("visibility");
      "inherit" === e;) t = t.parent(), e = t.css("visibility");
    return "hidden" !== e
  }

  function i(t) {
    for (var e, i; t.length && t[0] !== document;) {
      if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
      t = t.parent()
    }
    return 0
  }

  function s() {
    this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "mm/dd/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
    }, this._defaults = {
      showOn: "focus",
      showAnim: "fadeIn",
      showOptions: {},
      defaultDate: null,
      appendText: "",
      buttonText: "...",
      buttonImage: "",
      buttonImageOnly: !1,
      hideIfNoPrevNext: !1,
      navigationAsDateFormat: !1,
      gotoCurrent: !1,
      changeMonth: !1,
      changeYear: !1,
      yearRange: "c-10:c+10",
      showOtherMonths: !1,
      selectOtherMonths: !1,
      showWeek: !1,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: "+10",
      minDate: null,
      maxDate: null,
      duration: "fast",
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: "",
      altFormat: "",
      constrainInput: !0,
      showButtonPanel: !1,
      autoSize: !1,
      disabled: !1
    }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
  }

  function n(e) {
    var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return e.on("mouseout", i, function() {
      t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
    }).on("mouseover", i, o)
  }

  function o() {
    t.datepicker._isDisabledDatepicker(m.inline ? m.dpDiv.parent()[0] : m.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
  }

  function a(e, i) {
    t.extend(e, i);
    for (var s in i) null == i[s] && (e[s] = i[s]);
    return e
  }

  function r(t) {
    return function() {
      var e = this.element.val();
      t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
    }
  }
  t.ui = t.ui || {}, t.ui.version = "1.12.1";
  var h = 0,
    l = Array.prototype.slice;
  t.cleanData = function(e) {
      return function(i) {
        var s, n, o;
        for (o = 0; null != (n = i[o]); o++) try {
          s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove")
        } catch (a) {}
        e(i)
      }
    }(t.cleanData), t.widget = function(e, i, s) {
      var n, o, a, r = {},
        h = e.split(".")[0];
      e = e.split(".")[1];
      var l = h + "-" + e;
      return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][l.toLowerCase()] = function(e) {
        return !!t.data(e, l)
      }, t[h] = t[h] || {}, n = t[h][e], o = t[h][e] = function(t, e) {
        return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e)
      }, t.extend(o, n, {
        version: s.version,
        _proto: t.extend({}, s),
        _childConstructors: []
      }), a = new i, a.options = t.widget.extend({}, a.options), t.each(s, function(e, s) {
        return t.isFunction(s) ? (r[e] = function() {
          function t() {
            return i.prototype[e].apply(this, arguments)
          }

          function n(t) {
            return i.prototype[e].apply(this, t)
          }
          return function() {
            var e, i = this._super,
              o = this._superApply;
            return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e
          }
        }(), void 0) : (r[e] = s, void 0)
      }), o.prototype = t.widget.extend(a, {
        widgetEventPrefix: n ? a.widgetEventPrefix || e : e
      }, r, {
        constructor: o,
        namespace: h,
        widgetName: e,
        widgetFullName: l
      }), n ? (t.each(n._childConstructors, function(e, i) {
        var s = i.prototype;
        t.widget(s.namespace + "." + s.widgetName, o, i._proto)
      }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o
    }, t.widget.extend = function(e) {
      for (var i, s, n = l.call(arguments, 1), o = 0, a = n.length; a > o; o++)
        for (i in n[o]) s = n[o][i], n[o].hasOwnProperty(i) && void 0 !== s && (e[i] = t.isPlainObject(s) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : s);
      return e
    }, t.widget.bridge = function(e, i) {
      var s = i.prototype.widgetFullName || e;
      t.fn[e] = function(n) {
        var o = "string" == typeof n,
          a = l.call(arguments, 1),
          r = this;
        return o ? this.length || "instance" !== n ? this.each(function() {
          var i, o = t.data(this, s);
          return "instance" === n ? (r = o, !1) : o ? t.isFunction(o[n]) && "_" !== n.charAt(0) ? (i = o[n].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + n + "'")
        }) : r = void 0 : (a.length && (n = t.widget.extend.apply(null, [n].concat(a))), this.each(function() {
          var e = t.data(this, s);
          e ? (e.option(n || {}), e._init && e._init()) : t.data(this, s, new i(n, this))
        })), r
      }
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: {
        classes: {},
        disabled: !1,
        create: null
      },
      _createWidget: function(e, i) {
        i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
          remove: function(t) {
            t.target === i && this.destroy()
          }
        }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
      },
      _getCreateOptions: function() {
        return {}
      },
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function() {
        var e = this;
        this._destroy(), t.each(this.classesElementLookup, function(t, i) {
          e._removeClass(i, t)
        }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
      },
      _destroy: t.noop,
      widget: function() {
        return this.element
      },
      option: function(e, i) {
        var s, n, o, a = e;
        if (0 === arguments.length) return t.widget.extend({}, this.options);
        if ("string" == typeof e)
          if (a = {}, s = e.split("."), e = s.shift(), s.length) {
            for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++) n[s[o]] = n[s[o]] || {}, n = n[s[o]];
            if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
            n[e] = i
          } else {
            if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
            a[e] = i
          } return this._setOptions(a), this
      },
      _setOptions: function(t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this
      },
      _setOption: function(t, e) {
        return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this
      },
      _setOptionClasses: function(e) {
        var i, s, n;
        for (i in e) n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({
          element: s,
          keys: i,
          classes: e,
          add: !0
        })))
      },
      _setOptionDisabled: function(t) {
        this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
      },
      enable: function() {
        return this._setOptions({
          disabled: !1
        })
      },
      disable: function() {
        return this._setOptions({
          disabled: !0
        })
      },
      _classes: function(e) {
        function i(i, o) {
          var a, r;
          for (r = 0; i.length > r; r++) a = n.classesElementLookup[i[r]] || t(), a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()), n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]])
        }
        var s = [],
          n = this;
        return e = t.extend({
          element: this.element,
          classes: this.options.classes || {}
        }, e), this._on(e.element, {
          remove: "_untrackClassesElement"
        }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ")
      },
      _untrackClassesElement: function(e) {
        var i = this;
        t.each(i.classesElementLookup, function(s, n) {
          -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get()))
        })
      },
      _removeClass: function(t, e, i) {
        return this._toggleClass(t, e, i, !1)
      },
      _addClass: function(t, e, i) {
        return this._toggleClass(t, e, i, !0)
      },
      _toggleClass: function(t, e, i, s) {
        s = "boolean" == typeof s ? s : i;
        var n = "string" == typeof t || null === t,
          o = {
            extra: n ? e : i,
            keys: n ? t : e,
            element: n ? this.element : t,
            add: s
          };
        return o.element.toggleClass(this._classes(o), s), this
      },
      _on: function(e, i, s) {
        var n, o = this;
        "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function(s, a) {
          function r() {
            return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
          }
          "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
          var h = s.match(/^([\w:-]*)\s*(.*)$/),
            l = h[1] + o.eventNamespace,
            c = h[2];
          c ? n.on(l, c, r) : i.on(l, r)
        })
      },
      _off: function(e, i) {
        i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
      },
      _delay: function(t, e) {
        function i() {
          return ("string" == typeof t ? s[t] : t).apply(s, arguments)
        }
        var s = this;
        return setTimeout(i, e || 0)
      },
      _hoverable: function(e) {
        this.hoverable = this.hoverable.add(e), this._on(e, {
          mouseenter: function(e) {
            this._addClass(t(e.currentTarget), null, "ui-state-hover")
          },
          mouseleave: function(e) {
            this._removeClass(t(e.currentTarget), null, "ui-state-hover")
          }
        })
      },
      _focusable: function(e) {
        this.focusable = this.focusable.add(e), this._on(e, {
          focusin: function(e) {
            this._addClass(t(e.currentTarget), null, "ui-state-focus")
          },
          focusout: function(e) {
            this._removeClass(t(e.currentTarget), null, "ui-state-focus")
          }
        })
      },
      _trigger: function(e, i, s) {
        var n, o, a = this.options[e];
        if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
          for (n in o) n in i || (i[n] = o[n]);
        return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
      }
    }, t.each({
      show: "fadeIn",
      hide: "fadeOut"
    }, function(e, i) {
      t.Widget.prototype["_" + e] = function(s, n, o) {
        "string" == typeof n && (n = {
          effect: n
        });
        var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
        n = n || {}, "number" == typeof n && (n = {
          duration: n
        }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
          t(this)[e](), o && o.call(s[0]), i()
        })
      }
    }), t.widget,
    function() {
      function e(t, e, i) {
        return [parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1)]
      }

      function i(e, i) {
        return parseInt(t.css(e, i), 10) || 0
      }

      function s(e) {
        var i = e[0];
        return 9 === i.nodeType ? {
          width: e.width(),
          height: e.height(),
          offset: {
            top: 0,
            left: 0
          }
        } : t.isWindow(i) ? {
          width: e.width(),
          height: e.height(),
          offset: {
            top: e.scrollTop(),
            left: e.scrollLeft()
          }
        } : i.preventDefault ? {
          width: 0,
          height: 0,
          offset: {
            top: i.pageY,
            left: i.pageX
          }
        } : {
          width: e.outerWidth(),
          height: e.outerHeight(),
          offset: e.offset()
        }
      }
      var n, o = Math.max,
        a = Math.abs,
        r = /left|center|right/,
        h = /top|center|bottom/,
        l = /[\+\-]\d+(\.[\d]+)?%?/,
        c = /^\w+/,
        u = /%$/,
        d = t.fn.position;
      t.position = {
        scrollbarWidth: function() {
          if (void 0 !== n) return n;
          var e, i, s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            o = s.children()[0];
          return t("body").append(s), e = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), n = e - i
        },
        getScrollInfo: function(e) {
          var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
            s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
            n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
            o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
          return {
            width: o ? t.position.scrollbarWidth() : 0,
            height: n ? t.position.scrollbarWidth() : 0
          }
        },
        getWithinInfo: function(e) {
          var i = t(e || window),
            s = t.isWindow(i[0]),
            n = !!i[0] && 9 === i[0].nodeType,
            o = !s && !n;
          return {
            element: i,
            isWindow: s,
            isDocument: n,
            offset: o ? t(e).offset() : {
              left: 0,
              top: 0
            },
            scrollLeft: i.scrollLeft(),
            scrollTop: i.scrollTop(),
            width: i.outerWidth(),
            height: i.outerHeight()
          }
        }
      }, t.fn.position = function(n) {
        if (!n || !n.of) return d.apply(this, arguments);
        n = t.extend({}, n);
        var u, p, f, g, m, _, v = t(n.of),
          b = t.position.getWithinInfo(n.within),
          y = t.position.getScrollInfo(b),
          w = (n.collision || "flip").split(" "),
          k = {};
        return _ = s(v), v[0].preventDefault && (n.at = "left top"), p = _.width, f = _.height, g = _.offset, m = t.extend({}, g), t.each(["my", "at"], function() {
          var t, e, i = (n[this] || "").split(" ");
          1 === i.length && (i = r.test(i[0]) ? i.concat(["center"]) : h.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = r.test(i[0]) ? i[0] : "center", i[1] = h.test(i[1]) ? i[1] : "center", t = l.exec(i[0]), e = l.exec(i[1]), k[this] = [t ? t[0] : 0, e ? e[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
        }), 1 === w.length && (w[1] = w[0]), "right" === n.at[0] ? m.left += p : "center" === n.at[0] && (m.left += p / 2), "bottom" === n.at[1] ? m.top += f : "center" === n.at[1] && (m.top += f / 2), u = e(k.at, p, f), m.left += u[0], m.top += u[1], this.each(function() {
          var s, r, h = t(this),
            l = h.outerWidth(),
            c = h.outerHeight(),
            d = i(this, "marginLeft"),
            _ = i(this, "marginTop"),
            x = l + d + i(this, "marginRight") + y.width,
            C = c + _ + i(this, "marginBottom") + y.height,
            D = t.extend({}, m),
            I = e(k.my, h.outerWidth(), h.outerHeight());
          "right" === n.my[0] ? D.left -= l : "center" === n.my[0] && (D.left -= l / 2), "bottom" === n.my[1] ? D.top -= c : "center" === n.my[1] && (D.top -= c / 2), D.left += I[0], D.top += I[1], s = {
            marginLeft: d,
            marginTop: _
          }, t.each(["left", "top"], function(e, i) {
            t.ui.position[w[e]] && t.ui.position[w[e]][i](D, {
              targetWidth: p,
              targetHeight: f,
              elemWidth: l,
              elemHeight: c,
              collisionPosition: s,
              collisionWidth: x,
              collisionHeight: C,
              offset: [u[0] + I[0], u[1] + I[1]],
              my: n.my,
              at: n.at,
              within: b,
              elem: h
            })
          }), n.using && (r = function(t) {
            var e = g.left - D.left,
              i = e + p - l,
              s = g.top - D.top,
              r = s + f - c,
              u = {
                target: {
                  element: v,
                  left: g.left,
                  top: g.top,
                  width: p,
                  height: f
                },
                element: {
                  element: h,
                  left: D.left,
                  top: D.top,
                  width: l,
                  height: c
                },
                horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle"
              };
            l > p && p > a(e + i) && (u.horizontal = "center"), c > f && f > a(s + r) && (u.vertical = "middle"), u.important = o(a(e), a(i)) > o(a(s), a(r)) ? "horizontal" : "vertical", n.using.call(this, t, u)
          }), h.offset(t.extend(D, {
            using: r
          }))
        })
      }, t.ui.position = {
        fit: {
          left: function(t, e) {
            var i, s = e.within,
              n = s.isWindow ? s.scrollLeft : s.offset.left,
              a = s.width,
              r = t.left - e.collisionPosition.marginLeft,
              h = n - r,
              l = r + e.collisionWidth - a - n;
            e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left)
          },
          top: function(t, e) {
            var i, s = e.within,
              n = s.isWindow ? s.scrollTop : s.offset.top,
              a = e.within.height,
              r = t.top - e.collisionPosition.marginTop,
              h = n - r,
              l = r + e.collisionHeight - a - n;
            e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top)
          }
        },
        flip: {
          left: function(t, e) {
            var i, s, n = e.within,
              o = n.offset.left + n.scrollLeft,
              r = n.width,
              h = n.isWindow ? n.scrollLeft : n.offset.left,
              l = t.left - e.collisionPosition.marginLeft,
              c = l - h,
              u = l + e.collisionWidth - r - h,
              d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
              p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
              f = -2 * e.offset[0];
            0 > c ? (i = t.left + d + p + f + e.collisionWidth - r - o, (0 > i || a(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || u > a(s)) && (t.left += d + p + f))
          },
          top: function(t, e) {
            var i, s, n = e.within,
              o = n.offset.top + n.scrollTop,
              r = n.height,
              h = n.isWindow ? n.scrollTop : n.offset.top,
              l = t.top - e.collisionPosition.marginTop,
              c = l - h,
              u = l + e.collisionHeight - r - h,
              d = "top" === e.my[1],
              p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
              f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
              g = -2 * e.offset[1];
            0 > c ? (s = t.top + p + f + g + e.collisionHeight - r - o, (0 > s || a(c) > s) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - h, (i > 0 || u > a(i)) && (t.top += p + f + g))
          }
        },
        flipfit: {
          left: function() {
            t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
          },
          top: function() {
            t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
          }
        }
      }
    }(), t.ui.position, t.extend(t.expr[":"], {
      data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
        return function(i) {
          return !!t.data(i, e)
        }
      }) : function(e, i, s) {
        return !!t.data(e, s[3])
      }
    }), t.fn.extend({
      disableSelection: function() {
        var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
        return function() {
          return this.on(t + ".ui-disableSelection", function(t) {
            t.preventDefault()
          })
        }
      }(),
      enableSelection: function() {
        return this.off(".ui-disableSelection")
      }
    });
  var c = "ui-effects-",
    u = "ui-effects-style",
    d = "ui-effects-animated",
    p = t;
  t.effects = {
      effect: {}
    },
    function(t, e) {
      function i(t, e, i) {
        var s = u[e.type] || {};
        return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
      }

      function s(i) {
        var s = l(),
          n = s._rgba = [];
        return i = i.toLowerCase(), f(h, function(t, o) {
          var a, r = o.re.exec(i),
            h = r && o.parse(r),
            l = o.space || "rgba";
          return h ? (a = s[l](h), s[c[l].cache] = a[c[l].cache], n = s._rgba = a._rgba, !1) : e
        }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s) : o[i]
      }

      function n(t, e, i) {
        return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
      }
      var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        h = [{
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function(t) {
            return [t[1], t[2], t[3], t[4]]
          }
        }, {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function(t) {
            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
          }
        }, {
          re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
          parse: function(t) {
            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
          }
        }, {
          re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
          parse: function(t) {
            return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
          }
        }, {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          space: "hsla",
          parse: function(t) {
            return [t[1], t[2] / 100, t[3] / 100, t[4]]
          }
        }],
        l = t.Color = function(e, i, s, n) {
          return new t.Color.fn.parse(e, i, s, n)
        },
        c = {
          rgba: {
            props: {
              red: {
                idx: 0,
                type: "byte"
              },
              green: {
                idx: 1,
                type: "byte"
              },
              blue: {
                idx: 2,
                type: "byte"
              }
            }
          },
          hsla: {
            props: {
              hue: {
                idx: 0,
                type: "degrees"
              },
              saturation: {
                idx: 1,
                type: "percent"
              },
              lightness: {
                idx: 2,
                type: "percent"
              }
            }
          }
        },
        u = {
          "byte": {
            floor: !0,
            max: 255
          },
          percent: {
            max: 1
          },
          degrees: {
            mod: 360,
            floor: !0
          }
        },
        d = l.support = {},
        p = t("<p>")[0],
        f = t.each;
      p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
        e.cache = "_" + t, e.props.alpha = {
          idx: 3,
          type: "percent",
          def: 1
        }
      }), l.fn = t.extend(l.prototype, {
        parse: function(n, a, r, h) {
          if (n === e) return this._rgba = [null, null, null, null], this;
          (n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
          var u = this,
            d = t.type(n),
            p = this._rgba = [];
          return a !== e && (n = [n, a, r, h], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
            p[e.idx] = i(n[e.idx], e)
          }), this) : "object" === d ? (n instanceof l ? f(c, function(t, e) {
            n[e.cache] && (u[e.cache] = n[e.cache].slice())
          }) : f(c, function(e, s) {
            var o = s.cache;
            f(s.props, function(t, e) {
              if (!u[o] && s.to) {
                if ("alpha" === t || null == n[t]) return;
                u[o] = s.to(u._rgba)
              }
              u[o][e.idx] = i(n[t], e, !0)
            }), u[o] && 0 > t.inArray(null, u[o].slice(0, 3)) && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])))
          }), this) : e
        },
        is: function(t) {
          var i = l(t),
            s = !0,
            n = this;
          return f(c, function(t, o) {
            var a, r = i[o.cache];
            return r && (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function(t, i) {
              return null != r[i.idx] ? s = r[i.idx] === a[i.idx] : e
            })), s
          }), s
        },
        _space: function() {
          var t = [],
            e = this;
          return f(c, function(i, s) {
            e[s.cache] && t.push(i)
          }), t.pop()
        },
        transition: function(t, e) {
          var s = l(t),
            n = s._space(),
            o = c[n],
            a = 0 === this.alpha() ? l("transparent") : this,
            r = a[o.cache] || o.to(a._rgba),
            h = r.slice();
          return s = s[o.cache], f(o.props, function(t, n) {
            var o = n.idx,
              a = r[o],
              l = s[o],
              c = u[n.type] || {};
            null !== l && (null === a ? h[o] = l : (c.mod && (l - a > c.mod / 2 ? a += c.mod : a - l > c.mod / 2 && (a -= c.mod)), h[o] = i((l - a) * e + a, n)))
          }), this[n](h)
        },
        blend: function(e) {
          if (1 === this._rgba[3]) return this;
          var i = this._rgba.slice(),
            s = i.pop(),
            n = l(e)._rgba;
          return l(t.map(i, function(t, e) {
            return (1 - s) * n[e] + s * t
          }))
        },
        toRgbaString: function() {
          var e = "rgba(",
            i = t.map(this._rgba, function(t, e) {
              return null == t ? e > 2 ? 1 : 0 : t
            });
          return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
        },
        toHslaString: function() {
          var e = "hsla(",
            i = t.map(this.hsla(), function(t, e) {
              return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
            });
          return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
        },
        toHexString: function(e) {
          var i = this._rgba.slice(),
            s = i.pop();
          return e && i.push(~~(255 * s)), "#" + t.map(i, function(t) {
            return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
          }).join("")
        },
        toString: function() {
          return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
        }
      }), l.fn.parse.prototype = l.fn, c.hsla.to = function(t) {
        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
        var e, i, s = t[0] / 255,
          n = t[1] / 255,
          o = t[2] / 255,
          a = t[3],
          r = Math.max(s, n, o),
          h = Math.min(s, n, o),
          l = r - h,
          c = r + h,
          u = .5 * c;
        return e = h === r ? 0 : s === r ? 60 * (n - o) / l + 360 : n === r ? 60 * (o - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a]
      }, c.hsla.from = function(t) {
        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
        var e = t[0] / 360,
          i = t[1],
          s = t[2],
          o = t[3],
          a = .5 >= s ? s * (1 + i) : s + i - s * i,
          r = 2 * s - a;
        return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o]
      }, f(c, function(s, n) {
        var o = n.props,
          a = n.cache,
          h = n.to,
          c = n.from;
        l.fn[s] = function(s) {
          if (h && !this[a] && (this[a] = h(this._rgba)), s === e) return this[a].slice();
          var n, r = t.type(s),
            u = "array" === r || "object" === r ? s : arguments,
            d = this[a].slice();
          return f(o, function(t, e) {
            var s = u["object" === r ? t : e.idx];
            null == s && (s = d[e.idx]), d[e.idx] = i(s, e)
          }), c ? (n = l(c(d)), n[a] = d, n) : l(d)
        }, f(o, function(e, i) {
          l.fn[e] || (l.fn[e] = function(n) {
            var o, a = t.type(n),
              h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s,
              l = this[h](),
              c = l[i.idx];
            return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
          })
        })
      }), l.hook = function(e) {
        var i = e.split(" ");
        f(i, function(e, i) {
          t.cssHooks[i] = {
            set: function(e, n) {
              var o, a, r = "";
              if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
                if (n = l(o || n), !d.rgba && 1 !== n._rgba[3]) {
                  for (a = "backgroundColor" === i ? e.parentNode : e;
                    ("" === r || "transparent" === r) && a && a.style;) try {
                    r = t.css(a, "backgroundColor"), a = a.parentNode
                  } catch (h) {}
                  n = n.blend(r && "transparent" !== r ? r : "_default")
                }
                n = n.toRgbaString()
              }
              try {
                e.style[i] = n
              } catch (h) {}
            }
          }, t.fx.step[i] = function(e) {
            e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
          }
        })
      }, l.hook(a), t.cssHooks.borderColor = {
        expand: function(t) {
          var e = {};
          return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
            e["border" + s + "Color"] = t
          }), e
        }
      }, o = t.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
      }
    }(p),
    function() {
      function e(e) {
        var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
          o = {};
        if (n && n.length && n[0] && n[n[0]])
          for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]);
        else
          for (i in n) "string" == typeof n[i] && (o[i] = n[i]);
        return o
      }

      function i(e, i) {
        var s, o, a = {};
        for (s in i) o = i[s], e[s] !== o && (n[s] || (t.fx.step[s] || !isNaN(parseFloat(o))) && (a[s] = o));
        return a
      }
      var s = ["add", "remove", "toggle"],
        n = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1
        };
      t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
        t.fx.step[i] = function(t) {
          ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (p.style(t.elem, i, t.end), t.setAttr = !0)
        }
      }), t.fn.addBack || (t.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
      }), t.effects.animateClass = function(n, o, a, r) {
        var h = t.speed(o, a, r);
        return this.queue(function() {
          var o, a = t(this),
            r = a.attr("class") || "",
            l = h.children ? a.find("*").addBack() : a;
          l = l.map(function() {
            var i = t(this);
            return {
              el: i,
              start: e(this)
            }
          }), o = function() {
            t.each(s, function(t, e) {
              n[e] && a[e + "Class"](n[e])
            })
          }, o(), l = l.map(function() {
            return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this
          }), a.attr("class", r), l = l.map(function() {
            var e = this,
              i = t.Deferred(),
              s = t.extend({}, h, {
                queue: !1,
                complete: function() {
                  i.resolve(e)
                }
              });
            return this.el.animate(this.diff, s), i.promise()
          }), t.when.apply(t, l.get()).done(function() {
            o(), t.each(arguments, function() {
              var e = this.el;
              t.each(this.diff, function(t) {
                e.css(t, "")
              })
            }), h.complete.call(a[0])
          })
        })
      }, t.fn.extend({
        addClass: function(e) {
          return function(i, s, n, o) {
            return s ? t.effects.animateClass.call(this, {
              add: i
            }, s, n, o) : e.apply(this, arguments)
          }
        }(t.fn.addClass),
        removeClass: function(e) {
          return function(i, s, n, o) {
            return arguments.length > 1 ? t.effects.animateClass.call(this, {
              remove: i
            }, s, n, o) : e.apply(this, arguments)
          }
        }(t.fn.removeClass),
        toggleClass: function(e) {
          return function(i, s, n, o, a) {
            return "boolean" == typeof s || void 0 === s ? n ? t.effects.animateClass.call(this, s ? {
              add: i
            } : {
              remove: i
            }, n, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, {
              toggle: i
            }, s, n, o)
          }
        }(t.fn.toggleClass),
        switchClass: function(e, i, s, n, o) {
          return t.effects.animateClass.call(this, {
            add: i,
            remove: e
          }, s, n, o)
        }
      })
    }(),
    function() {
      function e(e, i, s, n) {
        return t.isPlainObject(e) && (i = e, e = e.effect), e = {
          effect: e
        }, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
      }

      function i(e) {
        return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
      }

      function s(t, e) {
        var i = e.outerWidth(),
          s = e.outerHeight(),
          n = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
          o = n.exec(t) || ["", 0, i, s, 0];
        return {
          top: parseFloat(o[1]) || 0,
          right: "auto" === o[2] ? i : parseFloat(o[2]),
          bottom: "auto" === o[3] ? s : parseFloat(o[3]),
          left: parseFloat(o[4]) || 0
        }
      }
      t.expr && t.expr.filters && t.expr.filters.animated && (t.expr.filters.animated = function(e) {
        return function(i) {
          return !!t(i).data(d) || e(i)
        }
      }(t.expr.filters.animated)), t.uiBackCompat !== !1 && t.extend(t.effects, {
        save: function(t, e) {
          for (var i = 0, s = e.length; s > i; i++) null !== e[i] && t.data(c + e[i], t[0].style[e[i]])
        },
        restore: function(t, e) {
          for (var i, s = 0, n = e.length; n > s; s++) null !== e[s] && (i = t.data(c + e[s]), t.css(e[s], i))
        },
        setMode: function(t, e) {
          return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
        },
        createWrapper: function(e) {
          if (e.parent().is(".ui-effects-wrapper")) return e.parent();
          var i = {
              width: e.outerWidth(!0),
              height: e.outerHeight(!0),
              "float": e.css("float")
            },
            s = t("<div></div>").addClass("ui-effects-wrapper").css({
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0
            }),
            n = {
              width: e.width(),
              height: e.height()
            },
            o = document.activeElement;
          try {
            o.id
          } catch (a) {
            o = document.body
          }
          return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"), s = e.parent(), "static" === e.css("position") ? (s.css({
            position: "relative"
          }), e.css({
            position: "relative"
          })) : (t.extend(i, {
            position: e.css("position"),
            zIndex: e.css("z-index")
          }), t.each(["top", "left", "bottom", "right"], function(t, s) {
            i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
          }), e.css({
            position: "relative",
            top: 0,
            left: 0,
            right: "auto",
            bottom: "auto"
          })), e.css(n), s.css(i).show()
        },
        removeWrapper: function(e) {
          var i = document.activeElement;
          return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).trigger("focus")), e
        }
      }), t.extend(t.effects, {
        version: "1.12.1",
        define: function(e, i, s) {
          return s || (s = i, i = "effect"), t.effects.effect[e] = s, t.effects.effect[e].mode = i, s
        },
        scaledDimensions: function(t, e, i) {
          if (0 === e) return {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
          };
          var s = "horizontal" !== i ? (e || 100) / 100 : 1,
            n = "vertical" !== i ? (e || 100) / 100 : 1;
          return {
            height: t.height() * n,
            width: t.width() * s,
            outerHeight: t.outerHeight() * n,
            outerWidth: t.outerWidth() * s
          }
        },
        clipToBox: function(t) {
          return {
            width: t.clip.right - t.clip.left,
            height: t.clip.bottom - t.clip.top,
            left: t.clip.left,
            top: t.clip.top
          }
        },
        unshift: function(t, e, i) {
          var s = t.queue();
          e > 1 && s.splice.apply(s, [1, 0].concat(s.splice(e, i))), t.dequeue()
        },
        saveStyle: function(t) {
          t.data(u, t[0].style.cssText)
        },
        restoreStyle: function(t) {
          t[0].style.cssText = t.data(u) || "", t.removeData(u)
        },
        mode: function(t, e) {
          var i = t.is(":hidden");
          return "toggle" === e && (e = i ? "show" : "hide"), (i ? "hide" === e : "show" === e) && (e = "none"), e
        },
        getBaseline: function(t, e) {
          var i, s;
          switch (t[0]) {
            case "top":
              i = 0;
              break;
            case "middle":
              i = .5;
              break;
            case "bottom":
              i = 1;
              break;
            default:
              i = t[0] / e.height
          }
          switch (t[1]) {
            case "left":
              s = 0;
              break;
            case "center":
              s = .5;
              break;
            case "right":
              s = 1;
              break;
            default:
              s = t[1] / e.width
          }
          return {
            x: s,
            y: i
          }
        },
        createPlaceholder: function(e) {
          var i, s = e.css("position"),
            n = e.position();
          return e.css({
            marginTop: e.css("marginTop"),
            marginBottom: e.css("marginBottom"),
            marginLeft: e.css("marginLeft"),
            marginRight: e.css("marginRight")
          }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()), /^(static|relative)/.test(s) && (s = "absolute", i = t("<" + e[0].nodeName + ">").insertAfter(e).css({
            display: /^(inline|ruby)/.test(e.css("display")) ? "inline-block" : "block",
            visibility: "hidden",
            marginTop: e.css("marginTop"),
            marginBottom: e.css("marginBottom"),
            marginLeft: e.css("marginLeft"),
            marginRight: e.css("marginRight"),
            "float": e.css("float")
          }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"), e.data(c + "placeholder", i)), e.css({
            position: s,
            left: n.left,
            top: n.top
          }), i
        },
        removePlaceholder: function(t) {
          var e = c + "placeholder",
            i = t.data(e);
          i && (i.remove(), t.removeData(e))
        },
        cleanUp: function(e) {
          t.effects.restoreStyle(e), t.effects.removePlaceholder(e)
        },
        setTransition: function(e, i, s, n) {
          return n = n || {}, t.each(i, function(t, i) {
            var o = e.cssUnit(i);
            o[0] > 0 && (n[i] = o[0] * s + o[1])
          }), n
        }
      }), t.fn.extend({
        effect: function() {
          function i(e) {
            function i() {
              r.removeData(d), t.effects.cleanUp(r), "hide" === s.mode && r.hide(), a()
            }

            function a() {
              t.isFunction(h) && h.call(r[0]), t.isFunction(e) && e()
            }
            var r = t(this);
            s.mode = c.shift(), t.uiBackCompat === !1 || o ? "none" === s.mode ? (r[l](), a()) : n.call(r[0], s, i) : (r.is(":hidden") ? "hide" === l : "show" === l) ? (r[l](), a()) : n.call(r[0], s, a)
          }
          var s = e.apply(this, arguments),
            n = t.effects.effect[s.effect],
            o = n.mode,
            a = s.queue,
            r = a || "fx",
            h = s.complete,
            l = s.mode,
            c = [],
            u = function(e) {
              var i = t(this),
                s = t.effects.mode(i, l) || o;
              i.data(d, !0), c.push(s), o && ("show" === s || s === o && "hide" === s) && i.show(), o && "none" === s || t.effects.saveStyle(i), t.isFunction(e) && e()
            };
          return t.fx.off || !n ? l ? this[l](s.duration, h) : this.each(function() {
            h && h.call(this)
          }) : a === !1 ? this.each(u).each(i) : this.queue(r, u).queue(r, i)
        },
        show: function(t) {
          return function(s) {
            if (i(s)) return t.apply(this, arguments);
            var n = e.apply(this, arguments);
            return n.mode = "show", this.effect.call(this, n)
          }
        }(t.fn.show),
        hide: function(t) {
          return function(s) {
            if (i(s)) return t.apply(this, arguments);
            var n = e.apply(this, arguments);
            return n.mode = "hide", this.effect.call(this, n)
          }
        }(t.fn.hide),
        toggle: function(t) {
          return function(s) {
            if (i(s) || "boolean" == typeof s) return t.apply(this, arguments);
            var n = e.apply(this, arguments);
            return n.mode = "toggle", this.effect.call(this, n)
          }
        }(t.fn.toggle),
        cssUnit: function(e) {
          var i = this.css(e),
            s = [];
          return t.each(["em", "px", "%", "pt"], function(t, e) {
            i.indexOf(e) > 0 && (s = [parseFloat(i), e])
          }), s
        },
        cssClip: function(t) {
          return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : s(this.css("clip"), this)
        },
        transfer: function(e, i) {
          var s = t(this),
            n = t(e.to),
            o = "fixed" === n.css("position"),
            a = t("body"),
            r = o ? a.scrollTop() : 0,
            h = o ? a.scrollLeft() : 0,
            l = n.offset(),
            c = {
              top: l.top - r,
              left: l.left - h,
              height: n.innerHeight(),
              width: n.innerWidth()
            },
            u = s.offset(),
            d = t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({
              top: u.top - r,
              left: u.left - h,
              height: s.innerHeight(),
              width: s.innerWidth(),
              position: o ? "fixed" : "absolute"
            }).animate(c, e.duration, e.easing, function() {
              d.remove(), t.isFunction(i) && i()
            })
        }
      }), t.fx.step.clip = function(e) {
        e.clipInit || (e.start = t(e.elem).cssClip(), "string" == typeof e.end && (e.end = s(e.end, e.elem)), e.clipInit = !0), t(e.elem).cssClip({
          top: e.pos * (e.end.top - e.start.top) + e.start.top,
          right: e.pos * (e.end.right - e.start.right) + e.start.right,
          bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
          left: e.pos * (e.end.left - e.start.left) + e.start.left
        })
      }
    }(),
    function() {
      var e = {};
      t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
        e[i] = function(e) {
          return Math.pow(e, t + 2)
        }
      }), t.extend(e, {
        Sine: function(t) {
          return 1 - Math.cos(t * Math.PI / 2)
        },
        Circ: function(t) {
          return 1 - Math.sqrt(1 - t * t)
        },
        Elastic: function(t) {
          return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
        },
        Back: function(t) {
          return t * t * (3 * t - 2)
        },
        Bounce: function(t) {
          for (var e, i = 4;
            ((e = Math.pow(2, --i)) - 1) / 11 > t;);
          return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
        }
      }), t.each(e, function(e, i) {
        t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
          return 1 - i(1 - t)
        }, t.easing["easeInOut" + e] = function(t) {
          return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
        }
      })
    }();
  var f = t.effects;
  t.effects.define("blind", "hide", function(e, i) {
    var s = {
        up: ["bottom", "top"],
        vertical: ["bottom", "top"],
        down: ["top", "bottom"],
        left: ["right", "left"],
        horizontal: ["right", "left"],
        right: ["left", "right"]
      },
      n = t(this),
      o = e.direction || "up",
      a = n.cssClip(),
      r = {
        clip: t.extend({}, a)
      },
      h = t.effects.createPlaceholder(n);
    r.clip[s[o][0]] = r.clip[s[o][1]], "show" === e.mode && (n.cssClip(r.clip), h && h.css(t.effects.clipToBox(r)), r.clip = a), h && h.animate(t.effects.clipToBox(r), e.duration, e.easing), n.animate(r, {
      queue: !1,
      duration: e.duration,
      easing: e.easing,
      complete: i
    })
  }), t.effects.define("bounce", function(e, i) {
    var s, n, o, a = t(this),
      r = e.mode,
      h = "hide" === r,
      l = "show" === r,
      c = e.direction || "up",
      u = e.distance,
      d = e.times || 5,
      p = 2 * d + (l || h ? 1 : 0),
      f = e.duration / p,
      g = e.easing,
      m = "up" === c || "down" === c ? "top" : "left",
      _ = "up" === c || "left" === c,
      v = 0,
      b = a.queue().length;
    for (t.effects.createPlaceholder(a), o = a.css(m), u || (u = a["top" === m ? "outerHeight" : "outerWidth"]() / 3), l && (n = {
        opacity: 1
      }, n[m] = o, a.css("opacity", 0).css(m, _ ? 2 * -u : 2 * u).animate(n, f, g)), h && (u /= Math.pow(2, d - 1)), n = {}, n[m] = o; d > v; v++) s = {}, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g).animate(n, f, g), u = h ? 2 * u : u / 2;
    h && (s = {
      opacity: 0
    }, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g)), a.queue(i), t.effects.unshift(a, b, p + 1)
  }), t.effects.define("clip", "hide", function(e, i) {
    var s, n = {},
      o = t(this),
      a = e.direction || "vertical",
      r = "both" === a,
      h = r || "horizontal" === a,
      l = r || "vertical" === a;
    s = o.cssClip(), n.clip = {
      top: l ? (s.bottom - s.top) / 2 : s.top,
      right: h ? (s.right - s.left) / 2 : s.right,
      bottom: l ? (s.bottom - s.top) / 2 : s.bottom,
      left: h ? (s.right - s.left) / 2 : s.left
    }, t.effects.createPlaceholder(o), "show" === e.mode && (o.cssClip(n.clip), n.clip = s), o.animate(n, {
      queue: !1,
      duration: e.duration,
      easing: e.easing,
      complete: i
    })
  }), t.effects.define("drop", "hide", function(e, i) {
    var s, n = t(this),
      o = e.mode,
      a = "show" === o,
      r = e.direction || "left",
      h = "up" === r || "down" === r ? "top" : "left",
      l = "up" === r || "left" === r ? "-=" : "+=",
      c = "+=" === l ? "-=" : "+=",
      u = {
        opacity: 0
      };
    t.effects.createPlaceholder(n), s = e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, u[h] = l + s, a && (n.css(u), u[h] = c + s, u.opacity = 1), n.animate(u, {
      queue: !1,
      duration: e.duration,
      easing: e.easing,
      complete: i
    })
  }), t.effects.define("explode", "hide", function(e, i) {
    function s() {
      b.push(this), b.length === u * d && n()
    }

    function n() {
      p.css({
        visibility: "visible"
      }), t(b).remove(), i()
    }
    var o, a, r, h, l, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
      d = u,
      p = t(this),
      f = e.mode,
      g = "show" === f,
      m = p.show().css("visibility", "hidden").offset(),
      _ = Math.ceil(p.outerWidth() / d),
      v = Math.ceil(p.outerHeight() / u),
      b = [];
    for (o = 0; u > o; o++)
      for (h = m.top + o * v, c = o - (u - 1) / 2, a = 0; d > a; a++) r = m.left + a * _, l = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
        position: "absolute",
        visibility: "visible",
        left: -a * _,
        top: -o * v
      }).parent().addClass("ui-effects-explode").css({
        position: "absolute",
        overflow: "hidden",
        width: _,
        height: v,
        left: r + (g ? l * _ : 0),
        top: h + (g ? c * v : 0),
        opacity: g ? 0 : 1
      }).animate({
        left: r + (g ? 0 : l * _),
        top: h + (g ? 0 : c * v),
        opacity: g ? 1 : 0
      }, e.duration || 500, e.easing, s)
  }), t.effects.define("fade", "toggle", function(e, i) {
    var s = "show" === e.mode;
    t(this).css("opacity", s ? 0 : 1).animate({
      opacity: s ? 1 : 0
    }, {
      queue: !1,
      duration: e.duration,
      easing: e.easing,
      complete: i
    })
  }), t.effects.define("fold", "hide", function(e, i) {
    var s = t(this),
      n = e.mode,
      o = "show" === n,
      a = "hide" === n,
      r = e.size || 15,
      h = /([0-9]+)%/.exec(r),
      l = !!e.horizFirst,
      c = l ? ["right", "bottom"] : ["bottom", "right"],
      u = e.duration / 2,
      d = t.effects.createPlaceholder(s),
      p = s.cssClip(),
      f = {
        clip: t.extend({}, p)
      },
      g = {
        clip: t.extend({}, p)
      },
      m = [p[c[0]], p[c[1]]],
      _ = s.queue().length;
    h && (r = parseInt(h[1], 10) / 100 * m[a ? 0 : 1]), f.clip[c[0]] = r, g.clip[c[0]] = r, g.clip[c[1]] = 0, o && (s.cssClip(g.clip), d && d.css(t.effects.clipToBox(g)), g.clip = p), s.queue(function(i) {
      d && d.animate(t.effects.clipToBox(f), u, e.easing).animate(t.effects.clipToBox(g), u, e.easing), i()
    }).animate(f, u, e.easing).animate(g, u, e.easing).queue(i), t.effects.unshift(s, _, 4)
  }), t.effects.define("highlight", "show", function(e, i) {
    var s = t(this),
      n = {
        backgroundColor: s.css("backgroundColor")
      };
    "hide" === e.mode && (n.opacity = 0), t.effects.saveStyle(s), s.css({
      backgroundImage: "none",
      backgroundColor: e.color || "#ffff99"
    }).animate(n, {
      queue: !1,
      duration: e.duration,
      easing: e.easing,
      complete: i
    })
  }), t.effects.define("size", function(e, i) {
    var s, n, o, a = t(this),
      r = ["fontSize"],
      h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
      l = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
      c = e.mode,
      u = "effect" !== c,
      d = e.scale || "both",
      p = e.origin || ["middle", "center"],
      f = a.css("position"),
      g = a.position(),
      m = t.effects.scaledDimensions(a),
      _ = e.from || m,
      v = e.to || t.effects.scaledDimensions(a, 0);
    t.effects.createPlaceholder(a), "show" === c && (o = _, _ = v, v = o), n = {
      from: {
        y: _.height / m.height,
        x: _.width / m.width
      },
      to: {
        y: v.height / m.height,
        x: v.width / m.width
      }
    }, ("box" === d || "both" === d) && (n.from.y !== n.to.y && (_ = t.effects.setTransition(a, h, n.from.y, _), v = t.effects.setTransition(a, h, n.to.y, v)), n.from.x !== n.to.x && (_ = t.effects.setTransition(a, l, n.from.x, _), v = t.effects.setTransition(a, l, n.to.x, v))), ("content" === d || "both" === d) && n.from.y !== n.to.y && (_ = t.effects.setTransition(a, r, n.from.y, _), v = t.effects.setTransition(a, r, n.to.y, v)), p && (s = t.effects.getBaseline(p, m), _.top = (m.outerHeight - _.outerHeight) * s.y + g.top, _.left = (m.outerWidth - _.outerWidth) * s.x + g.left, v.top = (m.outerHeight - v.outerHeight) * s.y + g.top, v.left = (m.outerWidth - v.outerWidth) * s.x + g.left), a.css(_), ("content" === d || "both" === d) && (h = h.concat(["marginTop", "marginBottom"]).concat(r), l = l.concat(["marginLeft", "marginRight"]), a.find("*[width]").each(function() {
      var i = t(this),
        s = t.effects.scaledDimensions(i),
        o = {
          height: s.height * n.from.y,
          width: s.width * n.from.x,
          outerHeight: s.outerHeight * n.from.y,
          outerWidth: s.outerWidth * n.from.x
        },
        a = {
          height: s.height * n.to.y,
          width: s.width * n.to.x,
          outerHeight: s.height * n.to.y,
          outerWidth: s.width * n.to.x
        };
      n.from.y !== n.to.y && (o = t.effects.setTransition(i, h, n.from.y, o), a = t.effects.setTransition(i, h, n.to.y, a)), n.from.x !== n.to.x && (o = t.effects.setTransition(i, l, n.from.x, o), a = t.effects.setTransition(i, l, n.to.x, a)), u && t.effects.saveStyle(i), i.css(o), i.animate(a, e.duration, e.easing, function() {
        u && t.effects.restoreStyle(i)
      })
    })), a.animate(v, {
      queue: !1,
      duration: e.duration,
      easing: e.easing,
      complete: function() {
        var e = a.offset();
        0 === v.opacity && a.css("opacity", _.opacity), u || (a.css("position", "static" === f ? "relative" : f).offset(e), t.effects.saveStyle(a)), i()
      }
    })
  }), t.effects.define("scale", function(e, i) {
    var s = t(this),
      n = e.mode,
      o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
      a = t.extend(!0, {
        from: t.effects.scaledDimensions(s),
        to: t.effects.scaledDimensions(s, o, e.direction || "both"),
        origin: e.origin || ["middle", "center"]
      }, e);
    e.fade && (a.from.opacity = 1, a.to.opacity = 0), t.effects.effect.size.call(this, a, i)
  }), t.effects.define("puff", "hide", function(e, i) {
    var s = t.extend(!0, {}, e, {
      fade: !0,
      percent: parseInt(e.percent, 10) || 150
    });
    t.effects.effect.scale.call(this, s, i)
  }), t.effects.define("pulsate", "show", function(e, i) {
    var s = t(this),
      n = e.mode,
      o = "show" === n,
      a = "hide" === n,
      r = o || a,
      h = 2 * (e.times || 5) + (r ? 1 : 0),
      l = e.duration / h,
      c = 0,
      u = 1,
      d = s.queue().length;
    for ((o || !s.is(":visible")) && (s.css("opacity", 0).show(), c = 1); h > u; u++) s.animate({
      opacity: c
    }, l, e.easing), c = 1 - c;
    s.animate({
      opacity: c
    }, l, e.easing), s.queue(i), t.effects.unshift(s, d, h + 1)
  }), t.effects.define("shake", function(e, i) {
    var s = 1,
      n = t(this),
      o = e.direction || "left",
      a = e.distance || 20,
      r = e.times || 3,
      h = 2 * r + 1,
      l = Math.round(e.duration / h),
      c = "up" === o || "down" === o ? "top" : "left",
      u = "up" === o || "left" === o,
      d = {},
      p = {},
      f = {},
      g = n.queue().length;
    for (t.effects.createPlaceholder(n), d[c] = (u ? "-=" : "+=") + a, p[c] = (u ? "+=" : "-=") + 2 * a, f[c] = (u ? "-=" : "+=") + 2 * a, n.animate(d, l, e.easing); r > s; s++) n.animate(p, l, e.easing).animate(f, l, e.easing);
    n.animate(p, l, e.easing).animate(d, l / 2, e.easing).queue(i), t.effects.unshift(n, g, h + 1)
  }), t.effects.define("slide", "show", function(e, i) {
    var s, n, o = t(this),
      a = {
        up: ["bottom", "top"],
        down: ["top", "bottom"],
        left: ["right", "left"],
        right: ["left", "right"]
      },
      r = e.mode,
      h = e.direction || "left",
      l = "up" === h || "down" === h ? "top" : "left",
      c = "up" === h || "left" === h,
      u = e.distance || o["top" === l ? "outerHeight" : "outerWidth"](!0),
      d = {};
    t.effects.createPlaceholder(o), s = o.cssClip(), n = o.position()[l], d[l] = (c ? -1 : 1) * u + n, d.clip = o.cssClip(), d.clip[a[h][1]] = d.clip[a[h][0]], "show" === r && (o.cssClip(d.clip), o.css(l, d[l]), d.clip = s, d[l] = n), o.animate(d, {
      queue: !1,
      duration: e.duration,
      easing: e.easing,
      complete: i
    })
  });
  var f;
  t.uiBackCompat !== !1 && (f = t.effects.define("transfer", function(e, i) {
    t(this).transfer(e, i)
  })), t.ui.focusable = function(i, s) {
    var n, o, a, r, h, l = i.nodeName.toLowerCase();
    return "area" === l ? (n = i.parentNode, o = n.name, i.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']"), a.length > 0 && a.is(":visible")) : !1) : (/^(input|select|textarea|button|object)$/.test(l) ? (r = !i.disabled, r && (h = t(i).closest("fieldset")[0], h && (r = !h.disabled))) : r = "a" === l ? i.href || s : s, r && t(i).is(":visible") && e(t(i)))
  }, t.extend(t.expr[":"], {
    focusable: function(e) {
      return t.ui.focusable(e, null != t.attr(e, "tabindex"))
    }
  }), t.ui.focusable, t.fn.form = function() {
    return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form)
  }, t.ui.formResetMixin = {
    _formResetHandler: function() {
      var e = t(this);
      setTimeout(function() {
        var i = e.data("ui-form-reset-instances");
        t.each(i, function() {
          this.refresh()
        })
      })
    },
    _bindFormResetHandler: function() {
      if (this.form = this.element.form(), this.form.length) {
        var t = this.form.data("ui-form-reset-instances") || [];
        t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t)
      }
    },
    _unbindFormResetHandler: function() {
      if (this.form.length) {
        var e = this.form.data("ui-form-reset-instances");
        e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
      }
    }
  }, "1.7" === t.fn.jquery.substring(0, 3) && (t.each(["Width", "Height"], function(e, i) {
    function s(e, i, s, o) {
      return t.each(n, function() {
        i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
      }), i
    }
    var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
      o = i.toLowerCase(),
      a = {
        innerWidth: t.fn.innerWidth,
        innerHeight: t.fn.innerHeight,
        outerWidth: t.fn.outerWidth,
        outerHeight: t.fn.outerHeight
      };
    t.fn["inner" + i] = function(e) {
      return void 0 === e ? a["inner" + i].call(this) : this.each(function() {
        t(this).css(o, s(this, e) + "px")
      })
    }, t.fn["outer" + i] = function(e, n) {
      return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function() {
        t(this).css(o, s(this, e, !0, n) + "px")
      })
    }
  }), t.fn.addBack = function(t) {
    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
  }), t.ui.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
  }, t.ui.escapeSelector = function() {
    var t = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;
    return function(e) {
      return e.replace(t, "\\$1")
    }
  }(), t.fn.labels = function() {
    var e, i, s, n, o;
    return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (n = this.eq(0).parents("label"), s = this.attr("id"), s && (e = this.eq(0).parents().last(), o = e.add(e.length ? e.siblings() : this.siblings()), i = "label[for='" + t.ui.escapeSelector(s) + "']", n = n.add(o.find(i).addBack(i))), this.pushStack(n))
  }, t.fn.scrollParent = function(e) {
    var i = this.css("position"),
      s = "absolute" === i,
      n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
      o = this.parents().filter(function() {
        var e = t(this);
        return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
      }).eq(0);
    return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
  }, t.extend(t.expr[":"], {
    tabbable: function(e) {
      var i = t.attr(e, "tabindex"),
        s = null != i;
      return (!s || i >= 0) && t.ui.focusable(e, s)
    }
  }), t.fn.extend({
    uniqueId: function() {
      var t = 0;
      return function() {
        return this.each(function() {
          this.id || (this.id = "ui-id-" + ++t)
        })
      }
    }(),
    removeUniqueId: function() {
      return this.each(function() {
        /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
      })
    }
  }), t.widget("ui.accordion", {
    version: "1.12.1",
    options: {
      active: 0,
      animate: {},
      classes: {
        "ui-accordion-header": "ui-corner-top",
        "ui-accordion-header-collapsed": "ui-corner-all",
        "ui-accordion-content": "ui-corner-bottom"
      },
      collapsible: !1,
      event: "click",
      header: "> li > :first-child, > :not(li):even",
      heightStyle: "auto",
      icons: {
        activeHeader: "ui-icon-triangle-1-s",
        header: "ui-icon-triangle-1-e"
      },
      activate: null,
      beforeActivate: null
    },
    hideProps: {
      borderTopWidth: "hide",
      borderBottomWidth: "hide",
      paddingTop: "hide",
      paddingBottom: "hide",
      height: "hide"
    },
    showProps: {
      borderTopWidth: "show",
      borderBottomWidth: "show",
      paddingTop: "show",
      paddingBottom: "show",
      height: "show"
    },
    _create: function() {
      var e = this.options;
      this.prevShow = this.prevHide = t(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh()
    },
    _getCreateEventData: function() {
      return {
        header: this.active,
        panel: this.active.length ? this.active.next() : t()
      }
    },
    _createIcons: function() {
      var e, i, s = this.options.icons;
      s && (e = t("<span>"), this._addClass(e, "ui-accordion-header-icon", "ui-icon " + s.header), e.prependTo(this.headers), i = this.active.children(".ui-accordion-header-icon"), this._removeClass(i, s.header)._addClass(i, null, s.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
    },
    _destroyIcons: function() {
      this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove()
    },
    _destroy: function() {
      var t;
      this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "")
    },
    _setOption: function(t, e) {
      return "active" === t ? (this._activate(e), void 0) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), void 0)
    },
    _setOptionDisabled: function(t) {
      this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t)
    },
    _keydown: function(e) {
      if (!e.altKey && !e.ctrlKey) {
        var i = t.ui.keyCode,
          s = this.headers.length,
          n = this.headers.index(e.target),
          o = !1;
        switch (e.keyCode) {
          case i.RIGHT:
          case i.DOWN:
            o = this.headers[(n + 1) % s];
            break;
          case i.LEFT:
          case i.UP:
            o = this.headers[(n - 1 + s) % s];
            break;
          case i.SPACE:
          case i.ENTER:
            this._eventHandler(e);
            break;
          case i.HOME:
            o = this.headers[0];
            break;
          case i.END:
            o = this.headers[s - 1]
        }
        o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), t(o).trigger("focus"), e.preventDefault())
      }
    },
    _panelKeyDown: function(e) {
      e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().trigger("focus")
    },
    refresh: function() {
      var e = this.options;
      this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
    },
    _processPanels: function() {
      var t = this.headers,
        e = this.panels;
      this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)))
    },
    _refresh: function() {
      var e, i = this.options,
        s = i.heightStyle,
        n = this.element.parent();
      this.active = this._findActive(i.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function() {
        var e = t(this),
          i = e.uniqueId().attr("id"),
          s = e.next(),
          n = s.uniqueId().attr("id");
        e.attr("aria-controls", n), s.attr("aria-labelledby", i)
      }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
        "aria-selected": "false",
        "aria-expanded": "false",
        tabIndex: -1
      }).next().attr({
        "aria-hidden": "true"
      }).hide(), this.active.length ? this.active.attr({
        "aria-selected": "true",
        "aria-expanded": "true",
        tabIndex: 0
      }).next().attr({
        "aria-hidden": "false"
      }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s ? (e = n.height(), this.element.siblings(":visible").each(function() {
        var i = t(this),
          s = i.css("position");
        "absolute" !== s && "fixed" !== s && (e -= i.outerHeight(!0))
      }), this.headers.each(function() {
        e -= t(this).outerHeight(!0)
      }), this.headers.next().each(function() {
        t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
      }).css("overflow", "auto")) : "auto" === s && (e = 0, this.headers.next().each(function() {
        var i = t(this).is(":visible");
        i || t(this).show(), e = Math.max(e, t(this).css("height", "").height()), i || t(this).hide()
      }).height(e))
    },
    _activate: function(e) {
      var i = this._findActive(e)[0];
      i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
        target: i,
        currentTarget: i,
        preventDefault: t.noop
      }))
    },
    _findActive: function(e) {
      return "number" == typeof e ? this.headers.eq(e) : t()
    },
    _setupEvents: function(e) {
      var i = {
        keydown: "_keydown"
      };
      e && t.each(e.split(" "), function(t, e) {
        i[e] = "_eventHandler"
      }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
        keydown: "_panelKeyDown"
      }), this._hoverable(this.headers), this._focusable(this.headers)
    },
    _eventHandler: function(e) {
      var i, s, n = this.options,
        o = this.active,
        a = t(e.currentTarget),
        r = a[0] === o[0],
        h = r && n.collapsible,
        l = h ? t() : a.next(),
        c = o.next(),
        u = {
          oldHeader: o,
          oldPanel: c,
          newHeader: h ? t() : a,
          newPanel: l
        };
      e.preventDefault(), r && !n.collapsible || this._trigger("beforeActivate", e, u) === !1 || (n.active = h ? !1 : this.headers.index(a), this.active = r ? t() : a, this._toggle(u), this._removeClass(o, "ui-accordion-header-active", "ui-state-active"), n.icons && (i = o.children(".ui-accordion-header-icon"), this._removeClass(i, null, n.icons.activeHeader)._addClass(i, null, n.icons.header)), r || (this._removeClass(a, "ui-accordion-header-collapsed")._addClass(a, "ui-accordion-header-active", "ui-state-active"), n.icons && (s = a.children(".ui-accordion-header-icon"), this._removeClass(s, null, n.icons.header)._addClass(s, null, n.icons.activeHeader)), this._addClass(a.next(), "ui-accordion-content-active")))
    },
    _toggle: function(e) {
      var i = e.newPanel,
        s = this.prevShow.length ? this.prevShow : e.oldPanel;
      this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({
        "aria-hidden": "true"
      }), s.prev().attr({
        "aria-selected": "false",
        "aria-expanded": "false"
      }), i.length && s.length ? s.prev().attr({
        tabIndex: -1,
        "aria-expanded": "false"
      }) : i.length && this.headers.filter(function() {
        return 0 === parseInt(t(this).attr("tabIndex"), 10)
      }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
        "aria-selected": "true",
        "aria-expanded": "true",
        tabIndex: 0
      })
    },
    _animate: function(t, e, i) {
      var s, n, o, a = this,
        r = 0,
        h = t.css("box-sizing"),
        l = t.length && (!e.length || t.index() < e.index()),
        c = this.options.animate || {},
        u = l && c.down || c,
        d = function() {
          a._toggleComplete(i)
        };
      return "number" == typeof u && (o = u), "string" == typeof u && (n = u), n = n || u.easing || c.easing, o = o || u.duration || c.duration, e.length ? t.length ? (s = t.show().outerHeight(), e.animate(this.hideProps, {
        duration: o,
        easing: n,
        step: function(t, e) {
          e.now = Math.round(t)
        }
      }), t.hide().animate(this.showProps, {
        duration: o,
        easing: n,
        complete: d,
        step: function(t, i) {
          i.now = Math.round(t), "height" !== i.prop ? "content-box" === h && (r += i.now) : "content" !== a.options.heightStyle && (i.now = Math.round(s - e.outerHeight() - r), r = 0)
        }
      }), void 0) : e.animate(this.hideProps, o, n, d) : t.animate(this.showProps, o, n, d)
    },
    _toggleComplete: function(t) {
      var e = t.oldPanel,
        i = e.prev();
      this._removeClass(e, "ui-accordion-content-active"), this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
    }
  }), t.ui.safeActiveElement = function(t) {
    var e;
    try {
      e = t.activeElement
    } catch (i) {
      e = t.body
    }
    return e || (e = t.body), e.nodeName || (e = t.body), e
  }, t.widget("ui.menu", {
    version: "1.12.1",
    defaultElement: "<ul>",
    delay: 300,
    options: {
      icons: {
        submenu: "ui-icon-caret-1-e"
      },
      items: "> *",
      menus: "ul",
      position: {
        my: "left top",
        at: "right top"
      },
      role: "menu",
      blur: null,
      focus: null,
      select: null
    },
    _create: function() {
      this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({
        role: this.options.role,
        tabIndex: 0
      }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({
        "mousedown .ui-menu-item": function(t) {
          t.preventDefault()
        },
        "click .ui-menu-item": function(e) {
          var i = t(e.target),
            s = t(t.ui.safeActiveElement(this.document[0]));
          !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && s.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
        },
        "mouseenter .ui-menu-item": function(e) {
          if (!this.previousFilter) {
            var i = t(e.target).closest(".ui-menu-item"),
              s = t(e.currentTarget);
            i[0] === s[0] && (this._removeClass(s.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(e, s))
          }
        },
        mouseleave: "collapseAll",
        "mouseleave .ui-menu": "collapseAll",
        focus: function(t, e) {
          var i = this.active || this.element.find(this.options.items).eq(0);
          e || this.focus(t, i)
        },
        blur: function(e) {
          this._delay(function() {
            var i = !t.contains(this.element[0], t.ui.safeActiveElement(this.document[0]));
            i && this.collapseAll(e)
          })
        },
        keydown: "_keydown"
      }), this.refresh(), this._on(this.document, {
        click: function(t) {
          this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1
        }
      })
    },
    _destroy: function() {
      var e = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
        i = e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
      this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), i.children().each(function() {
        var e = t(this);
        e.data("ui-menu-submenu-caret") && e.remove()
      })
    },
    _keydown: function(e) {
      var i, s, n, o, a = !0;
      switch (e.keyCode) {
        case t.ui.keyCode.PAGE_UP:
          this.previousPage(e);
          break;
        case t.ui.keyCode.PAGE_DOWN:
          this.nextPage(e);
          break;
        case t.ui.keyCode.HOME:
          this._move("first", "first", e);
          break;
        case t.ui.keyCode.END:
          this._move("last", "last", e);
          break;
        case t.ui.keyCode.UP:
          this.previous(e);
          break;
        case t.ui.keyCode.DOWN:
          this.next(e);
          break;
        case t.ui.keyCode.LEFT:
          this.collapse(e);
          break;
        case t.ui.keyCode.RIGHT:
          this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
          break;
        case t.ui.keyCode.ENTER:
        case t.ui.keyCode.SPACE:
          this._activate(e);
          break;
        case t.ui.keyCode.ESCAPE:
          this.collapse(e);
          break;
        default:
          a = !1, s = this.previousFilter || "", o = !1, n = e.keyCode >= 96 && 105 >= e.keyCode ? "" + (e.keyCode - 96) : String.fromCharCode(e.keyCode), clearTimeout(this.filterTimer), n === s ? o = !0 : n = s + n, i = this._filterMenuItems(n), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(e.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(e, i), this.previousFilter = n, this.filterTimer = this._delay(function() {
            delete this.previousFilter
          }, 1e3)) : delete this.previousFilter
      }
      a && e.preventDefault()
    },
    _activate: function(t) {
      this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
    },
    refresh: function() {
      var e, i, s, n, o, a = this,
        r = this.options.icons.submenu,
        h = this.element.find(this.options.menus);
      this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), s = h.filter(":not(.ui-menu)").hide().attr({
        role: this.options.role,
        "aria-hidden": "true",
        "aria-expanded": "false"
      }).each(function() {
        var e = t(this),
          i = e.prev(),
          s = t("<span>").data("ui-menu-submenu-caret", !0);
        a._addClass(s, "ui-menu-icon", "ui-icon " + r), i.attr("aria-haspopup", "true").prepend(s), e.attr("aria-labelledby", i.attr("id"))
      }), this._addClass(s, "ui-menu", "ui-widget ui-widget-content ui-front"), e = h.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function() {
        var e = t(this);
        a._isDivider(e) && a._addClass(e, "ui-menu-divider", "ui-widget-content")
      }), n = i.not(".ui-menu-item, .ui-menu-divider"), o = n.children().not(".ui-menu").uniqueId().attr({
        tabIndex: -1,
        role: this._itemRole()
      }), this._addClass(n, "ui-menu-item")._addClass(o, "ui-menu-item-wrapper"), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
    },
    _itemRole: function() {
      return {
        menu: "menuitem",
        listbox: "option"
      } [this.options.role]
    },
    _setOption: function(t, e) {
      if ("icons" === t) {
        var i = this.element.find(".ui-menu-icon");
        this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu)
      }
      this._super(t, e)
    },
    _setOptionDisabled: function(t) {
      this._super(t), this.element.attr("aria-disabled", t + ""), this._toggleClass(null, "ui-state-disabled", !!t)
    },
    focus: function(t, e) {
      var i, s, n;
      this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children(".ui-menu-item-wrapper"), this._addClass(s, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), n = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(n, null, "ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
        this._close()
      }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
        item: e
      })
    },
    _scrollIntoView: function(e) {
      var i, s, n, o, a, r;
      this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r))
    },
    blur: function(t, e) {
      e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, {
        item: this.active
      }), this.active = null)
    },
    _startOpening: function(t) {
      clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
        this._close(), this._open(t)
      }, this.delay))
    },
    _open: function(e) {
      var i = t.extend({
        of: this.active
      }, this.options.position);
      clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
    },
    collapseAll: function(e, i) {
      clearTimeout(this.timer), this.timer = this._delay(function() {
        var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
        s.length || (s = this.element), this._close(s), this.blur(e), this._removeClass(s.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = s
      }, this.delay)
    },
    _close: function(t) {
      t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
    },
    _closeOnDocumentClick: function(e) {
      return !t(e.target).closest(".ui-menu").length
    },
    _isDivider: function(t) {
      return !/[^\-\u2014\u2013\s]/.test(t.text())
    },
    collapse: function(t) {
      var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
      e && e.length && (this._close(), this.focus(t, e))
    },
    expand: function(t) {
      var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
      e && e.length && (this._open(e.parent()), this._delay(function() {
        this.focus(t, e)
      }))
    },
    next: function(t) {
      this._move("next", "first", t)
    },
    previous: function(t) {
      this._move("prev", "last", t)
    },
    isFirstItem: function() {
      return this.active && !this.active.prevAll(".ui-menu-item").length
    },
    isLastItem: function() {
      return this.active && !this.active.nextAll(".ui-menu-item").length
    },
    _move: function(t, e, i) {
      var s;
      this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[e]()), this.focus(i, s)
    },
    nextPage: function(e) {
      var i, s, n;
      return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
        return i = t(this), 0 > i.offset().top - s - n
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(e), void 0)
    },
    previousPage: function(e) {
      var i, s, n;
      return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
        return i = t(this), i.offset().top - s + n > 0
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(e), void 0)
    },
    _hasScroll: function() {
      return this.element.outerHeight() < this.element.prop("scrollHeight")
    },
    select: function(e) {
      this.active = this.active || t(e.target).closest(".ui-menu-item");
      var i = {
        item: this.active
      };
      this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
    },
    _filterMenuItems: function(e) {
      var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
        s = RegExp("^" + i, "i");
      return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
        return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))
      })
    }
  }), t.widget("ui.autocomplete", {
    version: "1.12.1",
    defaultElement: "<input>",
    options: {
      appendTo: null,
      autoFocus: !1,
      delay: 300,
      minLength: 1,
      position: {
        my: "left top",
        at: "left bottom",
        collision: "none"
      },
      source: null,
      change: null,
      close: null,
      focus: null,
      open: null,
      response: null,
      search: null,
      select: null
    },
    requestIndex: 0,
    pending: 0,
    _create: function() {
      var e, i, s, n = this.element[0].nodeName.toLowerCase(),
        o = "textarea" === n,
        a = "input" === n;
      this.isMultiLine = o || !a && this._isContentEditable(this.element), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, {
        keydown: function(n) {
          if (this.element.prop("readOnly")) return e = !0, s = !0, i = !0, void 0;
          e = !1, s = !1, i = !1;
          var o = t.ui.keyCode;
          switch (n.keyCode) {
            case o.PAGE_UP:
              e = !0, this._move("previousPage", n);
              break;
            case o.PAGE_DOWN:
              e = !0, this._move("nextPage", n);
              break;
            case o.UP:
              e = !0, this._keyEvent("previous", n);
              break;
            case o.DOWN:
              e = !0, this._keyEvent("next", n);
              break;
            case o.ENTER:
              this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
              break;
            case o.TAB:
              this.menu.active && this.menu.select(n);
              break;
            case o.ESCAPE:
              this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
              break;
            default:
              i = !0, this._searchTimeout(n)
          }
        },
        keypress: function(s) {
          if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0;
          if (!i) {
            var n = t.ui.keyCode;
            switch (s.keyCode) {
              case n.PAGE_UP:
                this._move("previousPage", s);
                break;
              case n.PAGE_DOWN:
                this._move("nextPage", s);
                break;
              case n.UP:
                this._keyEvent("previous", s);
                break;
              case n.DOWN:
                this._keyEvent("next", s)
            }
          }
        },
        input: function(t) {
          return s ? (s = !1, t.preventDefault(), void 0) : (this._searchTimeout(t), void 0)
        },
        focus: function() {
          this.selectedItem = null, this.previous = this._value()
        },
        blur: function(t) {
          return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(t), this._change(t), void 0)
        }
      }), this._initSource(), this.menu = t("<ul>").appendTo(this._appendTo()).menu({
        role: null
      }).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, {
        mousedown: function(e) {
          e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
            delete this.cancelBlur, this.element[0] !== t.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
          })
        },
        menufocus: function(e, i) {
          var s, n;
          return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function() {
            t(e.target).trigger(e.originalEvent)
          }), void 0) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {
            item: n
          }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, s && t.trim(s).length && (this.liveRegion.children().hide(), t("<div>").text(s).appendTo(this.liveRegion)), void 0)
        },
        menuselect: function(e, i) {
          var s = i.item.data("ui-autocomplete-item"),
            n = this.previous;
          this.element[0] !== t.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = n, this._delay(function() {
            this.previous = n, this.selectedItem = s
          })), !1 !== this._trigger("select", e, {
            item: s
          }) && this._value(s.value), this.term = this._value(), this.close(e), this.selectedItem = s
        }
      }), this.liveRegion = t("<div>", {
        role: "status",
        "aria-live": "assertive",
        "aria-relevant": "additions"
      }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, {
        beforeunload: function() {
          this.element.removeAttr("autocomplete")
        }
      })
    },
    _destroy: function() {
      clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
    },
    _setOption: function(t, e) {
      this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
    },
    _isEventTargetInWidget: function(e) {
      var i = this.menu.element[0];
      return e.target === this.element[0] || e.target === i || t.contains(i, e.target)
    },
    _closeOnClickOutside: function(t) {
      this._isEventTargetInWidget(t) || this.close()
    },
    _appendTo: function() {
      var e = this.options.appendTo;
      return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
    },
    _initSource: function() {
      var e, i, s = this;
      t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, s) {
        s(t.ui.autocomplete.filter(e, i.term))
      }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, n) {
        s.xhr && s.xhr.abort(), s.xhr = t.ajax({
          url: i,
          data: e,
          dataType: "json",
          success: function(t) {
            n(t)
          },
          error: function() {
            n([])
          }
        })
      }) : this.source = this.options.source
    },
    _searchTimeout: function(t) {
      clearTimeout(this.searching), this.searching = this._delay(function() {
        var e = this.term === this._value(),
          i = this.menu.element.is(":visible"),
          s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
        (!e || e && !i && !s) && (this.selectedItem = null, this.search(null, t))
      }, this.options.delay)
    },
    search: function(t, e) {
      return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
    },
    _search: function(t) {
      this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
        term: t
      }, this._response())
    },
    _response: function() {
      var e = ++this.requestIndex;
      return t.proxy(function(t) {
        e === this.requestIndex && this.__response(t), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading")
      }, this)
    },
    __response: function(t) {
      t && (t = this._normalize(t)), this._trigger("response", null, {
        content: t
      }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
    },
    close: function(t) {
      this.cancelSearch = !0, this._close(t)
    },
    _close: function(t) {
      this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
    },
    _change: function(t) {
      this.previous !== this._value() && this._trigger("change", t, {
        item: this.selectedItem
      })
    },
    _normalize: function(e) {
      return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
        return "string" == typeof e ? {
          label: e,
          value: e
        } : t.extend({}, e, {
          label: e.label || e.value,
          value: e.value || e.label
        })
      })
    },
    _suggest: function(e) {
      var i = this.menu.element.empty();
      this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
        of: this.element
      }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, {
        mousedown: "_closeOnClickOutside"
      })
    },
    _resizeMenu: function() {
      var t = this.menu.element;
      t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
    },
    _renderMenu: function(e, i) {
      var s = this;
      t.each(i, function(t, i) {
        s._renderItemData(e, i)
      })
    },
    _renderItemData: function(t, e) {
      return this._renderItem(t, e).data("ui-autocomplete-item", e)
    },
    _renderItem: function(e, i) {
      return t("<li>").append(t("<div>").text(i.label)).appendTo(e)
    },
    _move: function(t, e) {
      return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[t](e), void 0) : (this.search(null, e), void 0)
    },
    widget: function() {
      return this.menu.element
    },
    _value: function() {
      return this.valueMethod.apply(this.element, arguments)
    },
    _keyEvent: function(t, e) {
      (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
    },
    _isContentEditable: function(t) {
      if (!t.length) return !1;
      var e = t.prop("contentEditable");
      return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e
    }
  }), t.extend(t.ui.autocomplete, {
    escapeRegex: function(t) {
      return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    },
    filter: function(e, i) {
      var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
      return t.grep(e, function(t) {
        return s.test(t.label || t.value || t)
      })
    }
  }), t.widget("ui.autocomplete", t.ui.autocomplete, {
    options: {
      messages: {
        noResults: "No search results.",
        results: function(t) {
          return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
        }
      }
    },
    __response: function(e) {
      var i;
      this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
    }
  }), t.ui.autocomplete;
  var g = /ui-corner-([a-z]){2,6}/g;
  t.widget("ui.controlgroup", {
    version: "1.12.1",
    defaultElement: "<div>",
    options: {
      direction: "horizontal",
      disabled: null,
      onlyVisible: !0,
      items: {
        button: "input[type=button], input[type=submit], input[type=reset], button, a",
        controlgroupLabel: ".ui-controlgroup-label",
        checkboxradio: "input[type='checkbox'], input[type='radio']",
        selectmenu: "select",
        spinner: ".ui-spinner-input"
      }
    },
    _create: function() {
      this._enhance()
    },
    _enhance: function() {
      this.element.attr("role", "toolbar"), this.refresh()
    },
    _destroy: function() {
      this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
    },
    _initWidgets: function() {
      var e = this,
        i = [];
      t.each(this.options.items, function(s, n) {
        var o, a = {};
        return n ? "controlgroupLabel" === s ? (o = e.element.find(n), o.each(function() {
          var e = t(this);
          e.children(".ui-controlgroup-label-contents").length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
        }), e._addClass(o, null, "ui-widget ui-widget-content ui-state-default"), i = i.concat(o.get()), void 0) : (t.fn[s] && (a = e["_" + s + "Options"] ? e["_" + s + "Options"]("middle") : {
          classes: {}
        }, e.element.find(n).each(function() {
          var n = t(this),
            o = n[s]("instance"),
            r = t.widget.extend({}, a);
          if ("button" !== s || !n.parent(".ui-spinner").length) {
            o || (o = n[s]()[s]("instance")), o && (r.classes = e._resolveClassesValues(r.classes, o)), n[s](r);
            var h = n[s]("widget");
            t.data(h[0], "ui-controlgroup-data", o ? o : n[s]("instance")), i.push(h[0])
          }
        })), void 0) : void 0
      }), this.childWidgets = t(t.unique(i)), this._addClass(this.childWidgets, "ui-controlgroup-item")
    },
    _callChildMethod: function(e) {
      this.childWidgets.each(function() {
        var i = t(this),
          s = i.data("ui-controlgroup-data");
        s && s[e] && s[e]()
      })
    },
    _updateCornerClass: function(t, e) {
      var i = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
        s = this._buildSimpleOptions(e, "label").classes.label;
      this._removeClass(t, null, i), this._addClass(t, null, s)
    },
    _buildSimpleOptions: function(t, e) {
      var i = "vertical" === this.options.direction,
        s = {
          classes: {}
        };
      return s.classes[e] = {
        middle: "",
        first: "ui-corner-" + (i ? "top" : "left"),
        last: "ui-corner-" + (i ? "bottom" : "right"),
        only: "ui-corner-all"
      } [t], s
    },
    _spinnerOptions: function(t) {
      var e = this._buildSimpleOptions(t, "ui-spinner");
      return e.classes["ui-spinner-up"] = "", e.classes["ui-spinner-down"] = "", e
    },
    _buttonOptions: function(t) {
      return this._buildSimpleOptions(t, "ui-button")
    },
    _checkboxradioOptions: function(t) {
      return this._buildSimpleOptions(t, "ui-checkboxradio-label")
    },
    _selectmenuOptions: function(t) {
      var e = "vertical" === this.options.direction;
      return {
        width: e ? "auto" : !1,
        classes: {
          middle: {
            "ui-selectmenu-button-open": "",
            "ui-selectmenu-button-closed": ""
          },
          first: {
            "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left")
          },
          last: {
            "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right")
          },
          only: {
            "ui-selectmenu-button-open": "ui-corner-top",
            "ui-selectmenu-button-closed": "ui-corner-all"
          }
        } [t]
      }
    },
    _resolveClassesValues: function(e, i) {
      var s = {};
      return t.each(e, function(n) {
        var o = i.options.classes[n] || "";
        o = t.trim(o.replace(g, "")), s[n] = (o + " " + e[n]).replace(/\s+/g, " ")
      }), s
    },
    _setOption: function(t, e) {
      return "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" === t ? (this._callChildMethod(e ? "disable" : "enable"), void 0) : (this.refresh(), void 0)
    },
    refresh: function() {
      var e, i = this;
      this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), e = this.childWidgets, this.options.onlyVisible && (e = e.filter(":visible")), e.length && (t.each(["first", "last"], function(t, s) {
        var n = e[s]().data("ui-controlgroup-data");
        if (n && i["_" + n.widgetName + "Options"]) {
          var o = i["_" + n.widgetName + "Options"](1 === e.length ? "only" : s);
          o.classes = i._resolveClassesValues(o.classes, n), n.element[n.widgetName](o)
        } else i._updateCornerClass(e[s](), s)
      }), this._callChildMethod("refresh"))
    }
  }), t.widget("ui.checkboxradio", [t.ui.formResetMixin, {
    version: "1.12.1",
    options: {
      disabled: null,
      label: null,
      icon: !0,
      classes: {
        "ui-checkboxradio-label": "ui-corner-all",
        "ui-checkboxradio-icon": "ui-corner-all"
      }
    },
    _getCreateOptions: function() {
      var e, i, s = this,
        n = this._super() || {};
      return this._readType(), i = this.element.labels(), this.label = t(i[i.length - 1]), this.label.length || t.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function() {
        s.originalLabel += 3 === this.nodeType ? t(this).text() : this.outerHTML
      }), this.originalLabel && (n.label = this.originalLabel), e = this.element[0].disabled, null != e && (n.disabled = e), n
    },
    _create: function() {
      var t = this.element[0].checked;
      this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), t && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({
        change: "_toggleClasses",
        focus: function() {
          this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
        },
        blur: function() {
          this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
        }
      })
    },
    _readType: function() {
      var e = this.element[0].nodeName.toLowerCase();
      this.type = this.element[0].type, "input" === e && /radio|checkbox/.test(this.type) || t.error("Can't create checkboxradio on element.nodeName=" + e + " and element.type=" + this.type)
    },
    _enhance: function() {
      this._updateIcon(this.element[0].checked)
    },
    widget: function() {
      return this.label
    },
    _getRadioGroup: function() {
      var e, i = this.element[0].name,
        s = "input[name='" + t.ui.escapeSelector(i) + "']";
      return i ? (e = this.form.length ? t(this.form[0].elements).filter(s) : t(s).filter(function() {
        return 0 === t(this).form().length
      }), e.not(this.element)) : t([])
    },
    _toggleClasses: function() {
      var e = this.element[0].checked;
      this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", e)._toggleClass(this.icon, null, "ui-icon-blank", !e), "radio" === this.type && this._getRadioGroup().each(function() {
        var e = t(this).checkboxradio("instance");
        e && e._removeClass(e.label, "ui-checkboxradio-checked", "ui-state-active")
      })
    },
    _destroy: function() {
      this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove())
    },
    _setOption: function(t, e) {
      return "label" !== t || e ? (this._super(t, e), "disabled" === t ? (this._toggleClass(this.label, null, "ui-state-disabled", e), this.element[0].disabled = e, void 0) : (this.refresh(), void 0)) : void 0
    },
    _updateIcon: function(e) {
      var i = "ui-icon ui-icon-background ";
      this.options.icon ? (this.icon || (this.icon = t("<span>"), this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += e ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, e ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), e || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
    },
    _updateLabel: function() {
      var t = this.label.contents().not(this.element[0]);
      this.icon && (t = t.not(this.icon[0])), this.iconSpace && (t = t.not(this.iconSpace[0])), t.remove(), this.label.append(this.options.label)
    },
    refresh: function() {
      var t = this.element[0].checked,
        e = this.element[0].disabled;
      this._updateIcon(t), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), null !== this.options.label && this._updateLabel(), e !== this.options.disabled && this._setOptions({
        disabled: e
      })
    }
  }]), t.ui.checkboxradio, t.widget("ui.button", {
    version: "1.12.1",
    defaultElement: "<button>",
    options: {
      classes: {
        "ui-button": "ui-corner-all"
      },
      disabled: null,
      icon: null,
      iconPosition: "beginning",
      label: null,
      showLabel: !0
    },
    _getCreateOptions: function() {
      var t, e = this._super() || {};
      return this.isInput = this.element.is("input"), t = this.element[0].disabled, null != t && (e.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (e.label = this.originalLabel), e
    },
    _create: function() {
      !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
        keyup: function(e) {
          e.keyCode === t.ui.keyCode.SPACE && (e.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
        }
      })
    },
    _enhance: function() {
      this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
    },
    _updateTooltip: function() {
      this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label)
    },
    _updateIcon: function(e, i) {
      var s = "iconPosition" !== e,
        n = s ? this.options.iconPosition : i,
        o = "top" === n || "bottom" === n;
      this.icon ? s && this._removeClass(this.icon, null, this.options.icon) : (this.icon = t("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), s && this._addClass(this.icon, null, i), this._attachIcon(n), o ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(n))
    },
    _destroy: function() {
      this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title")
    },
    _attachIconSpace: function(t) {
      this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace)
    },
    _attachIcon: function(t) {
      this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon)
    },
    _setOptions: function(t) {
      var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
        i = void 0 === t.icon ? this.options.icon : t.icon;
      e || i || (t.showLabel = !0), this._super(t)
    },
    _setOption: function(t, e) {
      "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, e), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, e), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), this.element[0].disabled = e, e && this.element.blur())
    },
    refresh: function() {
      var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
      t !== this.options.disabled && this._setOptions({
        disabled: t
      }), this._updateTooltip()
    }
  }), t.uiBackCompat !== !1 && (t.widget("ui.button", t.ui.button, {
    options: {
      text: !0,
      icons: {
        primary: null,
        secondary: null
      }
    },
    _create: function() {
      this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super()
    },
    _setOption: function(t, e) {
      return "text" === t ? (this._super("showLabel", e), void 0) : ("showLabel" === t && (this.options.text = e), "icon" === t && (this.options.icons.primary = e), "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))), this._superApply(arguments), void 0)
    }
  }), t.fn.button = function(e) {
    return function() {
      return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? e.apply(this, arguments) : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({
        icon: !1
      }) : this.checkboxradio.apply(this, arguments))
    }
  }(t.fn.button), t.fn.buttonset = function() {
    return t.ui.controlgroup || t.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
      button: arguments[0].items
    }), this.controlgroup.apply(this, arguments))
  }), t.ui.button, t.extend(t.ui, {
    datepicker: {
      version: "1.12.1"
    }
  });
  var m;
  t.extend(s.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    _widgetDatepicker: function() {
      return this.dpDiv
    },
    setDefaults: function(t) {
      return a(this._defaults, t || {}), this
    },
    _attachDatepicker: function(e, i) {
      var s, n, o;
      s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o)
    },
    _newInst: function(e, i) {
      var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
      return {
        id: s,
        input: e,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: i,
        dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
      }
    },
    _connectDatepicker: function(e, i) {
      var s = t(e);
      i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
    },
    _attachments: function(e, i) {
      var s, n, o, a = this._get(i, "appendText"),
        r = this._get(i, "isRTL");
      i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.off("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.on("focus", this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
        src: o,
        alt: n,
        title: n
      }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
        src: o,
        alt: n,
        title: n
      }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.on("click", function() {
        return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
      }))
    },
    _autoSize: function(t) {
      if (this._get(t, "autoSize") && !t.inline) {
        var e, i, s, n, o = new Date(2009, 11, 20),
          a = this._get(t, "dateFormat");
        a.match(/[DM]/) && (e = function(t) {
          for (i = 0, s = 0, n = 0; t.length > n; n++) t[n].length > i && (i = t[n].length, s = n);
          return s
        }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
      }
    },
    _inlineDatepicker: function(e, i) {
      var s = t(e);
      s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
    },
    _dialogDatepicker: function(e, i, s, n, o) {
      var r, h, l, c, u, d = this._dialogInst;
      return d || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), a(d.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, u = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + c, l / 2 - 150 + u]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this
    },
    _destroyDatepicker: function(e) {
      var i, s = t(e),
        n = t.data(e, "datepicker");
      s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), m === n && (m = null))
    },
    _enableDatepicker: function(e) {
      var i, s, n = t(e),
        o = t.data(e, "datepicker");
      n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function() {
        this.disabled = !1
      }).end().filter("img").css({
        opacity: "1.0",
        cursor: ""
      })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
        return t === e ? null : t
      }))
    },
    _disableDatepicker: function(e) {
      var i, s, n = t(e),
        o = t.data(e, "datepicker");
      n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function() {
        this.disabled = !0
      }).end().filter("img").css({
        opacity: "0.5",
        cursor: "default"
      })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
        return t === e ? null : t
      }), this._disabledInputs[this._disabledInputs.length] = e)
    },
    _isDisabledDatepicker: function(t) {
      if (!t) return !1;
      for (var e = 0; this._disabledInputs.length > e; e++)
        if (this._disabledInputs[e] === t) return !0;
      return !1
    },
    _getInst: function(e) {
      try {
        return t.data(e, "datepicker")
      } catch (i) {
        throw "Missing instance data for this datepicker"
      }
    },
    _optionDatepicker: function(e, i, s) {
      var n, o, r, h, l = this._getInst(e);
      return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : l ? "all" === i ? t.extend({}, l.settings) : this._get(l, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), l && (this._curInst === l && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), r = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), a(l.settings, n), null !== r && void 0 !== n.dateFormat && void 0 === n.minDate && (l.settings.minDate = this._formatDate(l, r)), null !== h && void 0 !== n.dateFormat && void 0 === n.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in n && (n.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), l), this._autoSize(l), this._setDate(l, o), this._updateAlternate(l), this._updateDatepicker(l)), void 0)
    },
    _changeDatepicker: function(t, e, i) {
      this._optionDatepicker(t, e, i)
    },
    _refreshDatepicker: function(t) {
      var e = this._getInst(t);
      e && this._updateDatepicker(e)
    },
    _setDateDatepicker: function(t, e) {
      var i = this._getInst(t);
      i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
    },
    _getDateDatepicker: function(t, e) {
      var i = this._getInst(t);
      return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
    },
    _doKeyDown: function(e) {
      var i, s, n, o = t.datepicker._getInst(e.target),
        a = !0,
        r = o.dpDiv.is(".ui-datepicker-rtl");
      if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
        case 9:
          t.datepicker._hideDatepicker(), a = !1;
          break;
        case 13:
          return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;
        case 27:
          t.datepicker._hideDatepicker();
          break;
        case 33:
          t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
          break;
        case 34:
          t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
          break;
        case 35:
          (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
          break;
        case 36:
          (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
          break;
        case 37:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
          break;
        case 38:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
          break;
        case 39:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
          break;
        case 40:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
          break;
        default:
          a = !1
      } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
      a && (e.preventDefault(), e.stopPropagation())
    },
    _doKeyPress: function(e) {
      var i, s, n = t.datepicker._getInst(e.target);
      return t.datepicker._get(n, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0
    },
    _doKeyUp: function(e) {
      var i, s = t.datepicker._getInst(e.target);
      if (s.input.val() !== s.lastVal) try {
        i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
      } catch (n) {}
      return !0
    },
    _showDatepicker: function(e) {
      if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
        var s, n, o, r, h, l, c;
        s = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== s && (t.datepicker._curInst.dpDiv.stop(!0, !0), s && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(s, "beforeShow"), o = n ? n.apply(e, [e, s]) : {}, o !== !1 && (a(s.settings, o), s.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(s), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function() {
          return r |= "fixed" === t(this).css("position"), !r
        }), h = {
          left: t.datepicker._pos[0],
          top: t.datepicker._pos[1]
        }, t.datepicker._pos = null, s.dpDiv.empty(), s.dpDiv.css({
          position: "absolute",
          display: "block",
          top: "-1000px"
        }), t.datepicker._updateDatepicker(s), h = t.datepicker._checkOffset(s, h, r), s.dpDiv.css({
          position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute",
          display: "none",
          left: h.left + "px",
          top: h.top + "px"
        }), s.inline || (l = t.datepicker._get(s, "showAnim"), c = t.datepicker._get(s, "duration"), s.dpDiv.css("z-index", i(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? s.dpDiv.show(l, t.datepicker._get(s, "showOptions"), c) : s.dpDiv[l || "show"](l ? c : null), t.datepicker._shouldFocusInput(s) && s.input.trigger("focus"), t.datepicker._curInst = s))
      }
    },
    _updateDatepicker: function(e) {
      this.maxRows = 4, m = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
      var i, s = this._getNumberOfMonths(e),
        n = s[1],
        a = 17,
        r = e.dpDiv.find("." + this._dayOverClass + " a");
      r.length > 0 && o.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
        i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
      }, 0))
    },
    _shouldFocusInput: function(t) {
      return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
    },
    _checkOffset: function(e, i, s) {
      var n = e.dpDiv.outerWidth(),
        o = e.dpDiv.outerHeight(),
        a = e.input ? e.input.outerWidth() : 0,
        r = e.input ? e.input.outerHeight() : 0,
        h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
        l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
      return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + o > l && l > o ? Math.abs(o + r) : 0), i
    },
    _findPos: function(e) {
      for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? "previousSibling" : "nextSibling"];
      return i = t(e).offset(), [i.left, i.top]
    },
    _hideDatepicker: function(e) {
      var i, s, n, o, a = this._curInst;
      !a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), s = this._get(a, "duration"), n = function() {
        t.datepicker._tidyDialog(a)
      }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), s, n) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
        position: "absolute",
        left: "0",
        top: "-100px"
      }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
    },
    _tidyDialog: function(t) {
      t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
    },
    _checkExternalClick: function(e) {
      if (t.datepicker._curInst) {
        var i = t(e.target),
          s = t.datepicker._getInst(i[0]);
        (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
      }
    },
    _adjustDate: function(e, i, s) {
      var n = t(e),
        o = this._getInst(n[0]);
      this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o))
    },
    _gotoToday: function(e) {
      var i, s = t(e),
        n = this._getInst(s[0]);
      this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
    },
    _selectMonthYear: function(e, i, s) {
      var n = t(e),
        o = this._getInst(n[0]);
      o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n)
    },
    _selectDay: function(e, i, s, n) {
      var o, a = t(e);
      t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
    },
    _clearDate: function(e) {
      var i = t(e);
      this._selectDate(i, "")
    },
    _selectDate: function(e, i) {
      var s, n = t(e),
        o = this._getInst(n[0]);
      i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.trigger("focus"), this._lastInput = null)
    },
    _updateAlternate: function(e) {
      var i, s, n, o = this._get(e, "altField");
      o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).val(n))
    },
    noWeekends: function(t) {
      var e = t.getDay();
      return [e > 0 && 6 > e, ""]
    },
    iso8601Week: function(t) {
      var e, i = new Date(t.getTime());
      return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
    },
    parseDate: function(e, i, s) {
      if (null == e || null == i) throw "Invalid arguments";
      if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
      var n, o, a, r, h = 0,
        l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
        c = "string" != typeof l ? l : (new Date).getFullYear() % 100 + parseInt(l, 10),
        u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
        d = (s ? s.dayNames : null) || this._defaults.dayNames,
        p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
        f = (s ? s.monthNames : null) || this._defaults.monthNames,
        g = -1,
        m = -1,
        _ = -1,
        v = -1,
        b = !1,
        y = function(t) {
          var i = e.length > n + 1 && e.charAt(n + 1) === t;
          return i && n++, i
        },
        w = function(t) {
          var e = y(t),
            s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
            n = "y" === t ? s : 1,
            o = RegExp("^\\d{" + n + "," + s + "}"),
            a = i.substring(h).match(o);
          if (!a) throw "Missing number at position " + h;
          return h += a[0].length, parseInt(a[0], 10)
        },
        k = function(e, s, n) {
          var o = -1,
            a = t.map(y(e) ? n : s, function(t, e) {
              return [
                [e, t]
              ]
            }).sort(function(t, e) {
              return -(t[1].length - e[1].length)
            });
          if (t.each(a, function(t, e) {
              var s = e[1];
              return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (o = e[0], h += s.length, !1) : void 0
            }), -1 !== o) return o + 1;
          throw "Unknown name at position " + h
        },
        x = function() {
          if (i.charAt(h) !== e.charAt(n)) throw "Unexpected literal at position " + h;
          h++
        };
      for (n = 0; e.length > n; n++)
        if (b) "'" !== e.charAt(n) || y("'") ? x() : b = !1;
        else switch (e.charAt(n)) {
          case "d":
            _ = w("d");
            break;
          case "D":
            k("D", u, d);
            break;
          case "o":
            v = w("o");
            break;
          case "m":
            m = w("m");
            break;
          case "M":
            m = k("M", p, f);
            break;
          case "y":
            g = w("y");
            break;
          case "@":
            r = new Date(w("@")), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();
            break;
          case "!":
            r = new Date((w("!") - this._ticksTo1970) / 1e4), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();
            break;
          case "'":
            y("'") ? x() : b = !0;
            break;
          default:
            x()
        }
      if (i.length > h && (a = i.substr(h), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
      if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c >= g ? 0 : -100)), v > -1)
        for (m = 1, _ = v;;) {
          if (o = this._getDaysInMonth(g, m - 1), o >= _) break;
          m++, _ -= o
        }
      if (r = this._daylightSavingAdjust(new Date(g, m - 1, _)), r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== _) throw "Invalid date";
      return r
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
    formatDate: function(t, e, i) {
      if (!e) return "";
      var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
        o = (i ? i.dayNames : null) || this._defaults.dayNames,
        a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
        r = (i ? i.monthNames : null) || this._defaults.monthNames,
        h = function(e) {
          var i = t.length > s + 1 && t.charAt(s + 1) === e;
          return i && s++, i
        },
        l = function(t, e, i) {
          var s = "" + e;
          if (h(t))
            for (; i > s.length;) s = "0" + s;
          return s
        },
        c = function(t, e, i, s) {
          return h(t) ? s[e] : i[e]
        },
        u = "",
        d = !1;
      if (e)
        for (s = 0; t.length > s; s++)
          if (d) "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;
          else switch (t.charAt(s)) {
            case "d":
              u += l("d", e.getDate(), 2);
              break;
            case "D":
              u += c("D", e.getDay(), n, o);
              break;
            case "o":
              u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
              break;
            case "m":
              u += l("m", e.getMonth() + 1, 2);
              break;
            case "M":
              u += c("M", e.getMonth(), a, r);
              break;
            case "y":
              u += h("y") ? e.getFullYear() : (10 > e.getFullYear() % 100 ? "0" : "") + e.getFullYear() % 100;
              break;
            case "@":
              u += e.getTime();
              break;
            case "!":
              u += 1e4 * e.getTime() + this._ticksTo1970;
              break;
            case "'":
              h("'") ? u += "'" : d = !0;
              break;
            default:
              u += t.charAt(s)
          }
      return u
    },
    _possibleChars: function(t) {
      var e, i = "",
        s = !1,
        n = function(i) {
          var s = t.length > e + 1 && t.charAt(e + 1) === i;
          return s && e++, s
        };
      for (e = 0; t.length > e; e++)
        if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
        else switch (t.charAt(e)) {
          case "d":
          case "m":
          case "y":
          case "@":
            i += "0123456789";
            break;
          case "D":
          case "M":
            return null;
          case "'":
            n("'") ? i += "'" : s = !0;
            break;
          default:
            i += t.charAt(e)
        }
      return i
    },
    _get: function(t, e) {
      return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
    },
    _setDateFromField: function(t, e) {
      if (t.input.val() !== t.lastVal) {
        var i = this._get(t, "dateFormat"),
          s = t.lastVal = t.input ? t.input.val() : null,
          n = this._getDefaultDate(t),
          o = n,
          a = this._getFormatConfig(t);
        try {
          o = this.parseDate(i, s, a) || n
        } catch (r) {
          s = e ? "" : s
        }
        t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t)
      }
    },
    _getDefaultDate: function(t) {
      return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
    },
    _determineDate: function(e, i, s) {
      var n = function(t) {
          var e = new Date;
          return e.setDate(e.getDate() + t), e
        },
        o = function(i) {
          try {
            return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
          } catch (s) {}
          for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
            switch (l[2] || "d") {
              case "d":
              case "D":
                r += parseInt(l[1], 10);
                break;
              case "w":
              case "W":
                r += 7 * parseInt(l[1], 10);
                break;
              case "m":
              case "M":
                a += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
                break;
              case "y":
              case "Y":
                o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
            }
            l = h.exec(i)
          }
          return new Date(o, a, r)
        },
        a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
      return a = a && "Invalid Date" == "" + a ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
    },
    _daylightSavingAdjust: function(t) {
      return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
    },
    _setDate: function(t, e, i) {
      var s = !e,
        n = t.selectedMonth,
        o = t.selectedYear,
        a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
      t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
    },
    _getDate: function(t) {
      var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
      return e
    },
    _attachHandlers: function(e) {
      var i = this._get(e, "stepMonths"),
        s = "#" + e.id.replace(/\\\\/g, "\\");
      e.dpDiv.find("[data-handler]").map(function() {
        var e = {
          prev: function() {
            t.datepicker._adjustDate(s, -i, "M")
          },
          next: function() {
            t.datepicker._adjustDate(s, +i, "M")
          },
          hide: function() {
            t.datepicker._hideDatepicker()
          },
          today: function() {
            t.datepicker._gotoToday(s)
          },
          selectDay: function() {
            return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
          },
          selectMonth: function() {
            return t.datepicker._selectMonthYear(s, this, "M"), !1
          },
          selectYear: function() {
            return t.datepicker._selectMonthYear(s, this, "Y"), !1
          }
        };
        t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
      })
    },
    _generateHTML: function(t) {
      var e, i, s, n, o, a, r, h, l, c, u, d, p, f, g, m, _, v, b, y, w, k, x, C, D, I, T, P, M, S, H, z, O, A, N, W, E, F, L, R = new Date,
        B = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
        Y = this._get(t, "isRTL"),
        j = this._get(t, "showButtonPanel"),
        q = this._get(t, "hideIfNoPrevNext"),
        K = this._get(t, "navigationAsDateFormat"),
        U = this._getNumberOfMonths(t),
        V = this._get(t, "showCurrentAtPos"),
        $ = this._get(t, "stepMonths"),
        X = 1 !== U[0] || 1 !== U[1],
        G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
        Q = this._getMinMaxDate(t, "min"),
        J = this._getMinMaxDate(t, "max"),
        Z = t.drawMonth - V,
        te = t.drawYear;
      if (0 > Z && (Z += 12, te--), J)
        for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e = Q && Q > e ? Q : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--);
      for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - $, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + $, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? G : B, a = K ? this.formatDate(a, r, this._getFormatConfig(t)) : a, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = j ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), _ = this._get(t, "showOtherMonths"), v = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; U[0] > k; k++) {
        for (x = "", this.maxRows = 4, C = 0; U[1] > C; C++) {
          if (D = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), I = " ui-corner-all", T = "", X) {
            if (T += "<div class='ui-datepicker-group", U[1] > 1) switch (C) {
              case 0:
                T += " ui-datepicker-group-first", I = " ui-corner-" + (Y ? "right" : "left");
                break;
              case U[1] - 1:
                T += " ui-datepicker-group-last", I = " ui-corner-" + (Y ? "left" : "right");
                break;
              default:
                T += " ui-datepicker-group-middle", I = ""
            }
            T += "'>"
          }
          for (T += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + I + "'>" + (/all|left/.test(I) && 0 === k ? Y ? o : s : "") + (/all|right/.test(I) && 0 === k ? Y ? s : o : "") + this._generateMonthYearHeader(t, Z, te, Q, J, k > 0 || C > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", P = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) M = (w + c) % 7, P += "<th scope='col'" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[M] + "'>" + p[M] + "</span></th>";
          for (T += P + "</tr></thead><tbody>", S = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, S)), H = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, z = Math.ceil((H + S) / 7), O = X ? this.maxRows > z ? this.maxRows : z : z, this.maxRows = O, A = this._daylightSavingAdjust(new Date(te, Z, 1 - H)), N = 0; O > N; N++) {
            for (T += "<tr>", W = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(A) + "</td>" : "", w = 0; 7 > w; w++) E = m ? m.apply(t.input ? t.input[0] : null, [A]) : [!0, ""], F = A.getMonth() !== Z, L = F && !v || !E[0] || Q && Q > A || J && A > J, W += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (A.getTime() === D.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === A.getTime() && b.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !_ ? "" : " " + E[1] + (A.getTime() === G.getTime() ? " " + this._currentClass : "") + (A.getTime() === B.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !_ || !E[2] ? "" : " title='" + E[2].replace(/'/g, "&#39;") + "'") + (L ? "" : " data-handler='selectDay' data-event='click' data-month='" + A.getMonth() + "' data-year='" + A.getFullYear() + "'") + ">" + (F && !_ ? "&#xa0;" : L ? "<span class='ui-state-default'>" + A.getDate() + "</span>" : "<a class='ui-state-default" + (A.getTime() === B.getTime() ? " ui-state-highlight" : "") + (A.getTime() === G.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + A.getDate() + "</a>") + "</td>", A.setDate(A.getDate() + 1), A = this._daylightSavingAdjust(A);
            T += W + "</tr>"
          }
          Z++, Z > 11 && (Z = 0, te++), T += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && C === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += T
        }
        y += x
      }
      return y += l, t._keyEvent = !1, y
    },
    _generateMonthYearHeader: function(t, e, i, s, n, o, a, r) {
      var h, l, c, u, d, p, f, g, m = this._get(t, "changeMonth"),
        _ = this._get(t, "changeYear"),
        v = this._get(t, "showMonthAfterYear"),
        b = "<div class='ui-datepicker-title'>",
        y = "";
      if (o || !m) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
      else {
        for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
        y += "</select>"
      }
      if (v || (b += y + (!o && m && _ ? "" : "&#xa0;")), !t.yearshtml)
        if (t.yearshtml = "", o || !_) b += "<span class='ui-datepicker-year'>" + i + "</span>";
        else {
          for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
              var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
              return isNaN(e) ? d : e
            }, f = p(u[0]), g = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
          t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
        } return b += this._get(t, "yearSuffix"), v && (b += (!o && m && _ ? "" : "&#xa0;") + y), b += "</div>"
    },
    _adjustInstDate: function(t, e, i) {
      var s = t.selectedYear + ("Y" === i ? e : 0),
        n = t.selectedMonth + ("M" === i ? e : 0),
        o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
        a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
      t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
    },
    _restrictMinMax: function(t, e) {
      var i = this._getMinMaxDate(t, "min"),
        s = this._getMinMaxDate(t, "max"),
        n = i && i > e ? i : e;
      return s && n > s ? s : n
    },
    _notifyChange: function(t) {
      var e = this._get(t, "onChangeMonthYear");
      e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
    },
    _getNumberOfMonths: function(t) {
      var e = this._get(t, "numberOfMonths");
      return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
    },
    _getMinMaxDate: function(t, e) {
      return this._determineDate(t, this._get(t, e + "Date"), null)
    },
    _getDaysInMonth: function(t, e) {
      return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
    },
    _getFirstDayOfMonth: function(t, e) {
      return new Date(t, e, 1).getDay()
    },
    _canAdjustMonth: function(t, e, i, s) {
      var n = this._getNumberOfMonths(t),
        o = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
      return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
    },
    _isInRange: function(t, e) {
      var i, s, n = this._getMinMaxDate(t, "min"),
        o = this._getMinMaxDate(t, "max"),
        a = null,
        r = null,
        h = this._get(t, "yearRange");
      return h && (i = h.split(":"), s = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || r >= e.getFullYear())
    },
    _getFormatConfig: function(t) {
      var e = this._get(t, "shortYearCutoff");
      return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
        shortYearCutoff: e,
        dayNamesShort: this._get(t, "dayNamesShort"),
        dayNames: this._get(t, "dayNames"),
        monthNamesShort: this._get(t, "monthNamesShort"),
        monthNames: this._get(t, "monthNames")
      }
    },
    _formatDate: function(t, e, i, s) {
      e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
      var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
      return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
    }
  }), t.fn.datepicker = function(e) {
    if (!this.length) return this;
    t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
    var i = Array.prototype.slice.call(arguments, 1);
    return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
      "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
    }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
  }, t.datepicker = new s, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.12.1", t.datepicker, t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
  var _ = !1;
  t(document).on("mouseup", function() {
    _ = !1
  }), t.widget("ui.mouse", {
    version: "1.12.1",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function() {
      var e = this;
      this.element.on("mousedown." + this.widgetName, function(t) {
        return e._mouseDown(t)
      }).on("click." + this.widgetName, function(i) {
        return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
      }), this.started = !1
    },
    _mouseDestroy: function() {
      this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function(e) {
      if (!_) {
        this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
        var i = this,
          s = 1 === e.which,
          n = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
        return s && !n && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
          i.mouseDelayMet = !0
        }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
          return i._mouseMove(t)
        }, this._mouseUpDelegate = function(t) {
          return i._mouseUp(t)
        }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), _ = !0, !0)) : !0
      }
    },
    _mouseMove: function(e) {
      if (this._mouseMoved) {
        if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
        if (!e.which)
          if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
          else if (!this.ignoreMissingWhich) return this._mouseUp(e)
      }
      return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
    },
    _mouseUp: function(e) {
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, _ = !1, e.preventDefault()
    },
    _mouseDistanceMet: function(t) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function() {
      return this.mouseDelayMet
    },
    _mouseStart: function() {},
    _mouseDrag: function() {},
    _mouseStop: function() {},
    _mouseCapture: function() {
      return !0
    }
  }), t.ui.plugin = {
    add: function(e, i, s) {
      var n, o = t.ui[e].prototype;
      for (n in s) o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]])
    },
    call: function(t, e, i, s) {
      var n, o = t.plugins[e];
      if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
        for (n = 0; o.length > n; n++) t.options[o[n][0]] && o[n][1].apply(t.element, i)
    }
  }, t.ui.safeBlur = function(e) {
    e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur")
  }, t.widget("ui.draggable", t.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null
    },
    _create: function() {
      "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit()
    },
    _setOption: function(t, e) {
      this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
    },
    _destroy: function() {
      return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0)
    },
    _mouseCapture: function(e) {
      var i = this.options;
      return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blurActiveElement(e), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
    },
    _blockFrames: function(e) {
      this.iframeBlocks = this.document.find(e).map(function() {
        var e = t(this);
        return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
      })
    },
    _unblockFrames: function() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
    },
    _blurActiveElement: function(e) {
      var i = t.ui.safeActiveElement(this.document[0]),
        s = t(e.target);
      s.closest(i).length || t.ui.safeBlur(i)
    },
    _mouseStart: function(e) {
      var i = this.options;
      return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
        return "fixed" === t(this).css("position")
      }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
    },
    _refreshOffsets: function(t) {
      this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: !1,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }, this.offset.click = {
        left: t.pageX - this.offset.left,
        top: t.pageY - this.offset.top
      }
    },
    _mouseDrag: function(e, i) {
      if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
        var s = this._uiHash();
        if (this._trigger("drag", e, s) === !1) return this._mouseUp(new t.Event("mouseup", e)), !1;
        this.position = s.position
      }
      return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
    },
    _mouseStop: function(e) {
      var i = this,
        s = !1;
      return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
        i._trigger("stop", e) !== !1 && i._clear()
      }) : this._trigger("stop", e) !== !1 && this._clear(), !1
    },
    _mouseUp: function(e) {
      return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e)
    },
    cancel: function() {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", {
        target: this.element[0]
      })) : this._clear(), this
    },
    _getHandle: function(e) {
      return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
    },
    _setHandleClassName: function() {
      this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle")
    },
    _removeHandleClassName: function() {
      this._removeClass(this.handleElement, "ui-draggable-handle")
    },
    _createHelper: function(e) {
      var i = this.options,
        s = t.isFunction(i.helper),
        n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
      return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
    },
    _setPositionRelative: function() {
      /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
    },
    _adjustOffsetFromHelper: function(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
        left: +e[0],
        top: +e[1] || 0
      }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
    },
    _isRootNode: function(t) {
      return /(html|body)/i.test(t.tagName) || t === this.document[0]
    },
    _getParentOffset: function() {
      var e = this.offsetParent.offset(),
        i = this.document[0];
      return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
        top: 0,
        left: 0
      }), {
        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function() {
      if ("relative" !== this.cssPosition) return {
        top: 0,
        left: 0
      };
      var t = this.element.position(),
        e = this._isRootNode(this.scrollParent[0]);
      return {
        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
      }
    },
    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      }
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      }
    },
    _setContainment: function() {
      var e, i, s, n = this.options,
        o = this.document[0];
      return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0)
    },
    _convertPositionTo: function(t, e) {
      e || (e = this.position);
      var i = "absolute" === t ? 1 : -1,
        s = this._isRootNode(this.scrollParent[0]);
      return {
        top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
        left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
      }
    },
    _generatePosition: function(t, e) {
      var i, s, n, o, a = this.options,
        r = this._isRootNode(this.scrollParent[0]),
        h = t.pageX,
        l = t.pageY;
      return r && this.offset.scroll || (this.offset.scroll = {
        top: this.scrollParent.scrollTop(),
        left: this.scrollParent.scrollLeft()
      }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, h = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (h = this.originalPageX), "x" === a.axis && (l = this.originalPageY)), {
        top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
        left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
      }
    },
    _clear: function() {
      this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
    },
    _trigger: function(e, i, s) {
      return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s)
    },
    plugins: {},
    _uiHash: function() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      }
    }
  }), t.ui.plugin.add("draggable", "connectToSortable", {
    start: function(e, i, s) {
      var n = t.extend({}, i, {
        item: s.element
      });
      s.sortables = [], t(s.options.connectToSortable).each(function() {
        var i = t(this).sortable("instance");
        i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n))
      })
    },
    stop: function(e, i, s) {
      var n = t.extend({}, i, {
        item: s.element
      });
      s.cancelHelperRemoval = !1, t.each(s.sortables, function() {
        var t = this;
        t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
          position: t.placeholder.css("position"),
          top: t.placeholder.css("top"),
          left: t.placeholder.css("left")
        }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n))
      })
    },
    drag: function(e, i, s) {
      t.each(s.sortables, function() {
        var n = !1,
          o = this;
        o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function() {
          return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n
        })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() {
          return i.helper[0]
        }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function() {
          this.refreshPositions()
        }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function() {
          this.refreshPositions()
        }))
      })
    }
  }), t.ui.plugin.add("draggable", "cursor", {
    start: function(e, i, s) {
      var n = t("body"),
        o = s.options;
      n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor)
    },
    stop: function(e, i, s) {
      var n = s.options;
      n._cursor && t("body").css("cursor", n._cursor)
    }
  }), t.ui.plugin.add("draggable", "opacity", {
    start: function(e, i, s) {
      var n = t(i.helper),
        o = s.options;
      n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity)
    },
    stop: function(e, i, s) {
      var n = s.options;
      n._opacity && t(i.helper).css("opacity", n._opacity)
    }
  }), t.ui.plugin.add("draggable", "scroll", {
    start: function(t, e, i) {
      i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
    },
    drag: function(e, i, s) {
      var n = s.options,
        o = !1,
        a = s.scrollParentNotHidden[0],
        r = s.document[0];
      a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
    }
  }), t.ui.plugin.add("draggable", "snap", {
    start: function(e, i, s) {
      var n = s.options;
      s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
        var e = t(this),
          i = e.offset();
        this !== s.element[0] && s.snapElements.push({
          item: this,
          width: e.outerWidth(),
          height: e.outerHeight(),
          top: i.top,
          left: i.left
        })
      })
    },
    drag: function(e, i, s) {
      var n, o, a, r, h, l, c, u, d, p, f = s.options,
        g = f.snapTolerance,
        m = i.offset.left,
        _ = m + s.helperProportions.width,
        v = i.offset.top,
        b = v + s.helperProportions.height;
      for (d = s.snapElements.length - 1; d >= 0; d--) h = s.snapElements[d].left - s.margins.left, l = h + s.snapElements[d].width, c = s.snapElements[d].top - s.margins.top, u = c + s.snapElements[d].height, h - g > _ || m > l + g || c - g > b || v > u + g || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {
        snapItem: s.snapElements[d].item
      })), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(c - b), o = g >= Math.abs(u - v), a = g >= Math.abs(h - _), r = g >= Math.abs(l - m), n && (i.position.top = s._convertPositionTo("relative", {
        top: c - s.helperProportions.height,
        left: 0
      }).top), o && (i.position.top = s._convertPositionTo("relative", {
        top: u,
        left: 0
      }).top), a && (i.position.left = s._convertPositionTo("relative", {
        top: 0,
        left: h - s.helperProportions.width
      }).left), r && (i.position.left = s._convertPositionTo("relative", {
        top: 0,
        left: l
      }).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = g >= Math.abs(c - v), o = g >= Math.abs(u - b), a = g >= Math.abs(h - m), r = g >= Math.abs(l - _), n && (i.position.top = s._convertPositionTo("relative", {
        top: c,
        left: 0
      }).top), o && (i.position.top = s._convertPositionTo("relative", {
        top: u - s.helperProportions.height,
        left: 0
      }).top), a && (i.position.left = s._convertPositionTo("relative", {
        top: 0,
        left: h
      }).left), r && (i.position.left = s._convertPositionTo("relative", {
        top: 0,
        left: l - s.helperProportions.width
      }).left)), !s.snapElements[d].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {
        snapItem: s.snapElements[d].item
      })), s.snapElements[d].snapping = n || o || a || r || p)
    }
  }), t.ui.plugin.add("draggable", "stack", {
    start: function(e, i, s) {
      var n, o = s.options,
        a = t.makeArray(t(o.stack)).sort(function(e, i) {
          return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
        });
      a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function(e) {
        t(this).css("zIndex", n + e)
      }), this.css("zIndex", n + a.length))
    }
  }), t.ui.plugin.add("draggable", "zIndex", {
    start: function(e, i, s) {
      var n = t(i.helper),
        o = s.options;
      n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex)
    },
    stop: function(e, i, s) {
      var n = s.options;
      n._zIndex && t(i.helper).css("zIndex", n._zIndex)
    }
  }), t.ui.draggable, t.widget("ui.resizable", t.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: !1,
      animate: !1,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: !1,
      autoHide: !1,
      classes: {
        "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
      },
      containment: !1,
      ghost: !1,
      grid: !1,
      handles: "e,s,se",
      helper: !1,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 90,
      resize: null,
      start: null,
      stop: null
    },
    _num: function(t) {
      return parseFloat(t) || 0
    },
    _isNumber: function(t) {
      return !isNaN(parseFloat(t))
    },
    _hasScroll: function(e, i) {
      if ("hidden" === t(e).css("overflow")) return !1;
      var s = i && "left" === i ? "scrollLeft" : "scrollTop",
        n = !1;
      return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
    },
    _create: function() {
      var e, i = this.options,
        s = this;
      this._addClass("ui-resizable"), t.extend(this, {
        _aspectRatio: !!i.aspectRatio,
        aspectRatio: i.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
      }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
        position: this.element.css("position"),
        width: this.element.outerWidth(),
        height: this.element.outerHeight(),
        top: this.element.css("top"),
        left: this.element.css("left")
      })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, e = {
        marginTop: this.originalElement.css("marginTop"),
        marginRight: this.originalElement.css("marginRight"),
        marginBottom: this.originalElement.css("marginBottom"),
        marginLeft: this.originalElement.css("marginLeft")
      }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
        position: "static",
        zoom: 1,
        display: "block"
      })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on("mouseenter", function() {
        i.disabled || (s._removeClass("ui-resizable-autohide"), s._handles.show())
      }).on("mouseleave", function() {
        i.disabled || s.resizing || (s._addClass("ui-resizable-autohide"), s._handles.hide())
      }), this._mouseInit()
    },
    _destroy: function() {
      this._mouseDestroy();
      var e, i = function(e) {
        t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
      };
      return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
        position: e.css("position"),
        width: e.outerWidth(),
        height: e.outerHeight(),
        top: e.css("top"),
        left: e.css("left")
      }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
    },
    _setOption: function(t, e) {
      switch (this._super(t, e), t) {
        case "handles":
          this._removeHandles(), this._setupHandles();
          break;
        default:
      }
    },
    _setupHandles: function() {
      var e, i, s, n, o, a = this.options,
        r = this;
      if (this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
          n: ".ui-resizable-n",
          e: ".ui-resizable-e",
          s: ".ui-resizable-s",
          w: ".ui-resizable-w",
          se: ".ui-resizable-se",
          sw: ".ui-resizable-sw",
          ne: ".ui-resizable-ne",
          nw: ".ui-resizable-nw"
        } : "e,s,se"), this._handles = t(), this.handles.constructor === String)
        for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), s = this.handles.split(","), this.handles = {}, i = 0; s.length > i; i++) e = t.trim(s[i]), n = "ui-resizable-" + e, o = t("<div>"), this._addClass(o, "ui-resizable-handle " + n), o.css({
          zIndex: a.zIndex
        }), this.handles[e] = ".ui-resizable-" + e, this.element.append(o);
      this._renderAxis = function(e) {
        var i, s, n, o;
        e = e || this.element;
        for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {
          mousedown: r._mouseDown
        })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
      }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function() {
        r.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = o && o[1] ? o[1] : "se")
      }), a.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
    },
    _removeHandles: function() {
      this._handles.remove()
    },
    _mouseCapture: function(e) {
      var i, s, n = !1;
      for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
      return !this.options.disabled && n
    },
    _mouseStart: function(e) {
      var i, s, n, o = this.options,
        a = this.element;
      return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
        left: i,
        top: s
      }, this.size = this._helper ? {
        width: this.helper.width(),
        height: this.helper.height()
      } : {
        width: a.width(),
        height: a.height()
      }, this.originalSize = this._helper ? {
        width: a.outerWidth(),
        height: a.outerHeight()
      } : {
        width: a.width(),
        height: a.height()
      }, this.sizeDiff = {
        width: a.outerWidth() - a.width(),
        height: a.outerHeight() - a.height()
      }, this.originalPosition = {
        left: i,
        top: s
      }, this.originalMousePosition = {
        left: e.pageX,
        top: e.pageY
      }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), this._addClass("ui-resizable-resizing"), this._propagate("start", e), !0
    },
    _mouseDrag: function(e) {
      var i, s, n = this.originalMousePosition,
        o = this.axis,
        a = e.pageX - n.left || 0,
        r = e.pageY - n.top || 0,
        h = this._change[o];
      return this._updatePrevProperties(), h ? (i = h.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1
    },
    _mouseStop: function(e) {
      this.resizing = !1;
      var i, s, n, o, a, r, h, l = this.options,
        c = this;
      return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = {
        width: c.helper.width() - o,
        height: c.helper.height() - n
      }, r = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null, h = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(a, {
        top: h,
        left: r
      })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
    },
    _updatePrevProperties: function() {
      this.prevPosition = {
        top: this.position.top,
        left: this.position.left
      }, this.prevSize = {
        width: this.size.width,
        height: this.size.height
      }
    },
    _applyChanges: function() {
      var t = {};
      return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
    },
    _updateVirtualBoundaries: function(t) {
      var e, i, s, n, o, a = this.options;
      o = {
        minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
        maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
        minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
        maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
      }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > n && (o.maxHeight = n)), this._vBoundaries = o
    },
    _updateCache: function(t) {
      this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
    },
    _updateRatio: function(t) {
      var e = this.position,
        i = this.size,
        s = this.axis;
      return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
    },
    _respectSize: function(t) {
      var e = this._vBoundaries,
        i = this.axis,
        s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
        n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
        o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
        a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
        r = this.originalPosition.left + this.originalSize.width,
        h = this.originalPosition.top + this.originalSize.height,
        l = /sw|nw|w/.test(i),
        c = /nw|ne|n/.test(i);
      return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && l && (t.left = r - e.minWidth), s && l && (t.left = r - e.maxWidth), a && c && (t.top = h - e.minHeight), n && c && (t.top = h - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
    },
    _getPaddingPlusBorderDimensions: function(t) {
      for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(n[e]) || 0;
      return {
        height: i[0] + i[2],
        width: i[1] + i[3]
      }
    },
    _proportionallyResize: function() {
      if (this._proportionallyResizeElements.length)
        for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
          height: i.height() - this.outerDimensions.height || 0,
          width: i.width() - this.outerDimensions.width || 0
        })
    },
    _renderProxy: function() {
      var e = this.element,
        i = this.options;
      this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({
        width: this.element.outerWidth(),
        height: this.element.outerHeight(),
        position: "absolute",
        left: this.elementOffset.left + "px",
        top: this.elementOffset.top + "px",
        zIndex: ++i.zIndex
      }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
    },
    _change: {
      e: function(t, e) {
        return {
          width: this.originalSize.width + e
        }
      },
      w: function(t, e) {
        var i = this.originalSize,
          s = this.originalPosition;
        return {
          left: s.left + e,
          width: i.width - e
        }
      },
      n: function(t, e, i) {
        var s = this.originalSize,
          n = this.originalPosition;
        return {
          top: n.top + i,
          height: s.height - i
        }
      },
      s: function(t, e, i) {
        return {
          height: this.originalSize.height + i
        }
      },
      se: function(e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
      },
      sw: function(e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
      },
      ne: function(e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
      },
      nw: function(e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
      }
    },
    _propagate: function(e, i) {
      t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
    },
    plugins: {},
    ui: function() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      }
    }
  }), t.ui.plugin.add("resizable", "animate", {
    stop: function(e) {
      var i = t(this).resizable("instance"),
        s = i.options,
        n = i._proportionallyResizeElements,
        o = n.length && /textarea/i.test(n[0].nodeName),
        a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
        r = o ? 0 : i.sizeDiff.width,
        h = {
          width: i.size.width - r,
          height: i.size.height - a
        },
        l = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
        c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
      i.element.animate(t.extend(h, c && l ? {
        top: c,
        left: l
      } : {}), {
        duration: s.animateDuration,
        easing: s.animateEasing,
        step: function() {
          var s = {
            width: parseFloat(i.element.css("width")),
            height: parseFloat(i.element.css("height")),
            top: parseFloat(i.element.css("top")),
            left: parseFloat(i.element.css("left"))
          };
          n && n.length && t(n[0]).css({
            width: s.width,
            height: s.height
          }), i._updateCache(s), i._propagate("resize", e)
        }
      })
    }
  }), t.ui.plugin.add("resizable", "containment", {
    start: function() {
      var e, i, s, n, o, a, r, h = t(this).resizable("instance"),
        l = h.options,
        c = h.element,
        u = l.containment,
        d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;
      d && (h.containerElement = t(d), /document/.test(u) || u === document ? (h.containerOffset = {
        left: 0,
        top: 0
      }, h.containerPosition = {
        left: 0,
        top: 0
      }, h.parentData = {
        element: t(document),
        left: 0,
        top: 0,
        width: t(document).width(),
        height: t(document).height() || document.body.parentNode.scrollHeight
      }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, s) {
        i[t] = h._num(e.css("padding" + s))
      }), h.containerOffset = e.offset(), h.containerPosition = e.position(), h.containerSize = {
        height: e.innerHeight() - i[3],
        width: e.innerWidth() - i[1]
      }, s = h.containerOffset, n = h.containerSize.height, o = h.containerSize.width, a = h._hasScroll(d, "left") ? d.scrollWidth : o, r = h._hasScroll(d) ? d.scrollHeight : n, h.parentData = {
        element: d,
        left: s.left,
        top: s.top,
        width: a,
        height: r
      }))
    },
    resize: function(e) {
      var i, s, n, o, a = t(this).resizable("instance"),
        r = a.options,
        h = a.containerOffset,
        l = a.position,
        c = a._aspectRatio || e.shiftKey,
        u = {
          top: 0,
          left: 0
        },
        d = a.containerElement,
        p = !0;
      d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (a._helper ? h.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - h.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? h.left : 0), l.top < (a._helper ? h.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - h.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? h.top : 0), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - u.left : a.offset.left - h.left)), s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - u.top : a.offset.top - h.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
    },
    stop: function() {
      var e = t(this).resizable("instance"),
        i = e.options,
        s = e.containerOffset,
        n = e.containerPosition,
        o = e.containerElement,
        a = t(e.helper),
        r = a.offset(),
        h = a.outerWidth() - e.sizeDiff.width,
        l = a.outerHeight() - e.sizeDiff.height;
      e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
        left: r.left - n.left - s.left,
        width: h,
        height: l
      }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
        left: r.left - n.left - s.left,
        width: h,
        height: l
      })
    }
  }), t.ui.plugin.add("resizable", "alsoResize", {
    start: function() {
      var e = t(this).resizable("instance"),
        i = e.options;
      t(i.alsoResize).each(function() {
        var e = t(this);
        e.data("ui-resizable-alsoresize", {
          width: parseFloat(e.width()),
          height: parseFloat(e.height()),
          left: parseFloat(e.css("left")),
          top: parseFloat(e.css("top"))
        })
      })
    },
    resize: function(e, i) {
      var s = t(this).resizable("instance"),
        n = s.options,
        o = s.originalSize,
        a = s.originalPosition,
        r = {
          height: s.size.height - o.height || 0,
          width: s.size.width - o.width || 0,
          top: s.position.top - a.top || 0,
          left: s.position.left - a.left || 0
        };
      t(n.alsoResize).each(function() {
        var e = t(this),
          s = t(this).data("ui-resizable-alsoresize"),
          n = {},
          o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
        t.each(o, function(t, e) {
          var i = (s[e] || 0) + (r[e] || 0);
          i && i >= 0 && (n[e] = i || null)
        }), e.css(n)
      })
    },
    stop: function() {
      t(this).removeData("ui-resizable-alsoresize")
    }
  }), t.ui.plugin.add("resizable", "ghost", {
    start: function() {
      var e = t(this).resizable("instance"),
        i = e.size;
      e.ghost = e.originalElement.clone(), e.ghost.css({
        opacity: .25,
        display: "block",
        position: "relative",
        height: i.height,
        width: i.width,
        margin: 0,
        left: 0,
        top: 0
      }), e._addClass(e.ghost, "ui-resizable-ghost"), t.uiBackCompat !== !1 && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper)
    },
    resize: function() {
      var e = t(this).resizable("instance");
      e.ghost && e.ghost.css({
        position: "relative",
        height: e.size.height,
        width: e.size.width
      })
    },
    stop: function() {
      var e = t(this).resizable("instance");
      e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
    }
  }), t.ui.plugin.add("resizable", "grid", {
    resize: function() {
      var e, i = t(this).resizable("instance"),
        s = i.options,
        n = i.size,
        o = i.originalSize,
        a = i.originalPosition,
        r = i.axis,
        h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
        l = h[0] || 1,
        c = h[1] || 1,
        u = Math.round((n.width - o.width) / l) * l,
        d = Math.round((n.height - o.height) / c) * c,
        p = o.width + u,
        f = o.height + d,
        g = s.maxWidth && p > s.maxWidth,
        m = s.maxHeight && f > s.maxHeight,
        _ = s.minWidth && s.minWidth > p,
        v = s.minHeight && s.minHeight > f;
      s.grid = h, _ && (p += l), v && (f += c), g && (p -= l), m && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - u) : ((0 >= f - c || 0 >= p - l) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - l > 0 ? (i.size.width = p, i.position.left = a.left - u) : (p = l - e.width, i.size.width = p, i.position.left = a.left + o.width - p))
    }
  }), t.ui.resizable, t.widget("ui.dialog", {
    version: "1.12.1",
    options: {
      appendTo: "body",
      autoOpen: !0,
      buttons: [],
      classes: {
        "ui-dialog": "ui-corner-all",
        "ui-dialog-titlebar": "ui-corner-all"
      },
      closeOnEscape: !0,
      closeText: "Close",
      draggable: !0,
      hide: null,
      height: "auto",
      maxHeight: null,
      maxWidth: null,
      minHeight: 150,
      minWidth: 150,
      modal: !1,
      position: {
        my: "center",
        at: "center",
        of: window,
        collision: "fit",
        using: function(e) {
          var i = t(this).css(e).offset().top;
          0 > i && t(this).css("top", e.top - i)
        }
      },
      resizable: !0,
      show: null,
      title: null,
      width: 300,
      beforeClose: null,
      close: null,
      drag: null,
      dragStart: null,
      dragStop: null,
      focus: null,
      open: null,
      resize: null,
      resizeStart: null,
      resizeStop: null
    },
    sizeRelatedOptions: {
      buttons: !0,
      height: !0,
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0,
      width: !0
    },
    resizableRelatedOptions: {
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0
    },
    _create: function() {
      this.originalCss = {
        display: this.element[0].style.display,
        width: this.element[0].style.width,
        minHeight: this.element[0].style.minHeight,
        maxHeight: this.element[0].style.maxHeight,
        height: this.element[0].style.height
      }, this.originalPosition = {
        parent: this.element.parent(),
        index: this.element.parent().children().index(this.element)
      }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
    },
    _init: function() {
      this.options.autoOpen && this.open()
    },
    _appendTo: function() {
      var e = this.options.appendTo;
      return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
    },
    _destroy: function() {
      var t, e = this.originalPosition;
      this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
    },
    widget: function() {
      return this.uiDialog
    },
    disable: t.noop,
    enable: t.noop,
    close: function(e) {
      var i = this;
      this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function() {
        i._trigger("close", e)
      }))
    },
    isOpen: function() {
      return this._isOpen
    },
    moveToTop: function() {
      this._moveToTop()
    },
    _moveToTop: function(e, i) {
      var s = !1,
        n = this.uiDialog.siblings(".ui-front:visible").map(function() {
          return +t(this).css("z-index")
        }).get(),
        o = Math.max.apply(null, n);
      return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), s = !0), s && !i && this._trigger("focus", e), s
    },
    open: function() {
      var e = this;
      return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = t(t.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
        e._focusTabbable(), e._trigger("focus")
      }), this._makeFocusTarget(), this._trigger("open"), void 0)
    },
    _focusTabbable: function() {
      var t = this._focusedElement;
      t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).trigger("focus")
    },
    _keepFocus: function(e) {
      function i() {
        var e = t.ui.safeActiveElement(this.document[0]),
          i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
        i || this._focusTabbable()
      }
      e.preventDefault(), i.call(this), this._delay(i)
    },
    _createWrapper: function() {
      this.uiDialog = t("<div>").hide().attr({
        tabIndex: -1,
        role: "dialog"
      }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, {
        keydown: function(e) {
          if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), void 0;
          if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
            var i = this.uiDialog.find(":tabbable"),
              s = i.filter(":first"),
              n = i.filter(":last");
            e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function() {
              n.trigger("focus")
            }), e.preventDefault()) : (this._delay(function() {
              s.trigger("focus")
            }), e.preventDefault())
          }
        },
        mousedown: function(t) {
          this._moveToTop(t) && this._focusTabbable()
        }
      }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
        "aria-describedby": this.element.uniqueId().attr("id")
      })
    },
    _createTitlebar: function() {
      var e;
      this.uiDialogTitlebar = t("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, {
        mousedown: function(e) {
          t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
        }
      }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
        label: t("<a>").text(this.options.closeText).html(),
        icon: "ui-icon-closethick",
        showLabel: !1
      }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, {
        click: function(t) {
          t.preventDefault(), this.close(t)
        }
      }), e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(e, "ui-dialog-title"), this._title(e), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({
        "aria-labelledby": e.attr("id")
      })
    },
    _title: function(t) {
      this.options.title ? t.text(this.options.title) : t.html("&#160;")
    },
    _createButtonPane: function() {
      this.uiDialogButtonPane = t("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons()
    },
    _createButtons: function() {
      var e = this,
        i = this.options.buttons;
      return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0) : (t.each(i, function(i, s) {
        var n, o;
        s = t.isFunction(s) ? {
          click: s,
          text: i
        } : s, s = t.extend({
          type: "button"
        }, s), n = s.click, o = {
          icon: s.icon,
          iconPosition: s.iconPosition,
          showLabel: s.showLabel,
          icons: s.icons,
          text: s.text
        }, delete s.click, delete s.icon, delete s.iconPosition, delete s.showLabel, delete s.icons, "boolean" == typeof s.text && delete s.text, t("<button></button>", s).button(o).appendTo(e.uiButtonSet).on("click", function() {
          n.apply(e.element[0], arguments)
        })
      }), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
    },
    _makeDraggable: function() {
      function e(t) {
        return {
          position: t.position,
          offset: t.offset
        }
      }
      var i = this,
        s = this.options;
      this.uiDialog.draggable({
        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
        handle: ".ui-dialog-titlebar",
        containment: "document",
        start: function(s, n) {
          i._addClass(t(this), "ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n))
        },
        drag: function(t, s) {
          i._trigger("drag", t, e(s))
        },
        stop: function(n, o) {
          var a = o.offset.left - i.document.scrollLeft(),
            r = o.offset.top - i.document.scrollTop();
          s.position = {
            my: "left top",
            at: "left" + (a >= 0 ? "+" : "") + a + " " + "top" + (r >= 0 ? "+" : "") + r,
            of: i.window
          }, i._removeClass(t(this), "ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o))
        }
      })
    },
    _makeResizable: function() {
      function e(t) {
        return {
          originalPosition: t.originalPosition,
          originalSize: t.originalSize,
          position: t.position,
          size: t.size
        }
      }
      var i = this,
        s = this.options,
        n = s.resizable,
        o = this.uiDialog.css("position"),
        a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
      this.uiDialog.resizable({
        cancel: ".ui-dialog-content",
        containment: "document",
        alsoResize: this.element,
        maxWidth: s.maxWidth,
        maxHeight: s.maxHeight,
        minWidth: s.minWidth,
        minHeight: this._minHeight(),
        handles: a,
        start: function(s, n) {
          i._addClass(t(this), "ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n))
        },
        resize: function(t, s) {
          i._trigger("resize", t, e(s))
        },
        stop: function(n, o) {
          var a = i.uiDialog.offset(),
            r = a.left - i.document.scrollLeft(),
            h = a.top - i.document.scrollTop();
          s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = {
            my: "left top",
            at: "left" + (r >= 0 ? "+" : "") + r + " " + "top" + (h >= 0 ? "+" : "") + h,
            of: i.window
          }, i._removeClass(t(this), "ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o))
        }
      }).css("position", o)
    },
    _trackFocus: function() {
      this._on(this.widget(), {
        focusin: function(e) {
          this._makeFocusTarget(), this._focusedElement = t(e.target)
        }
      })
    },
    _makeFocusTarget: function() {
      this._untrackInstance(), this._trackingInstances().unshift(this)
    },
    _untrackInstance: function() {
      var e = this._trackingInstances(),
        i = t.inArray(this, e); - 1 !== i && e.splice(i, 1)
    },
    _trackingInstances: function() {
      var t = this.document.data("ui-dialog-instances");
      return t || (t = [], this.document.data("ui-dialog-instances", t)), t
    },
    _minHeight: function() {
      var t = this.options;
      return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
    },
    _position: function() {
      var t = this.uiDialog.is(":visible");
      t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
    },
    _setOptions: function(e) {
      var i = this,
        s = !1,
        n = {};
      t.each(e, function(t, e) {
        i._setOption(t, e), t in i.sizeRelatedOptions && (s = !0), t in i.resizableRelatedOptions && (n[t] = e)
      }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n)
    },
    _setOption: function(e, i) {
      var s, n, o = this.uiDialog;
      "disabled" !== e && (this._super(e, i), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({
        label: t("<a>").text("" + this.options.closeText).html()
      }), "draggable" === e && (s = o.is(":data(ui-draggable)"), s && !i && o.draggable("destroy"), !s && i && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (n = o.is(":data(ui-resizable)"), n && !i && o.resizable("destroy"), n && "string" == typeof i && o.resizable("option", "handles", i), n || i === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
    },
    _size: function() {
      var t, e, i, s = this.options;
      this.element.show().css({
        width: "auto",
        minHeight: 0,
        maxHeight: "none",
        height: 0
      }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({
        height: "auto",
        width: s.width
      }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({
        minHeight: e,
        maxHeight: i,
        height: "auto"
      }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
    },
    _blockFrames: function() {
      this.iframeBlocks = this.document.find("iframe").map(function() {
        var e = t(this);
        return t("<div>").css({
          position: "absolute",
          width: e.outerWidth(),
          height: e.outerHeight()
        }).appendTo(e.parent()).offset(e.offset())[0]
      })
    },
    _unblockFrames: function() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
    },
    _allowInteraction: function(e) {
      return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
    },
    _createOverlay: function() {
      if (this.options.modal) {
        var e = !0;
        this._delay(function() {
          e = !1
        }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
          focusin: function(t) {
            e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
          }
        }), this.overlay = t("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, {
          mousedown: "_keepFocus"
        }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
      }
    },
    _destroyOverlay: function() {
      if (this.options.modal && this.overlay) {
        var t = this.document.data("ui-dialog-overlays") - 1;
        t ? this.document.data("ui-dialog-overlays", t) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null
      }
    }
  }), t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, {
    options: {
      dialogClass: ""
    },
    _createWrapper: function() {
      this._super(), this.uiDialog.addClass(this.options.dialogClass)
    },
    _setOption: function(t, e) {
      "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments)
    }
  }), t.ui.dialog, t.widget("ui.droppable", {
    version: "1.12.1",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      addClasses: !0,
      greedy: !1,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function() {
      var e, i = this.options,
        s = i.accept;
      this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function(t) {
        return t.is(s)
      }, this.proportions = function() {
        return arguments.length ? (e = arguments[0], void 0) : e ? e : e = {
          width: this.element[0].offsetWidth,
          height: this.element[0].offsetHeight
        }
      }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable")
    },
    _addToManager: function(e) {
      t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
    },
    _splice: function(t) {
      for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1)
    },
    _destroy: function() {
      var e = t.ui.ddmanager.droppables[this.options.scope];
      this._splice(e)
    },
    _setOption: function(e, i) {
      if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
        return t.is(i)
      };
      else if ("scope" === e) {
        var s = t.ui.ddmanager.droppables[this.options.scope];
        this._splice(s), this._addToManager(i)
      }
      this._super(e, i)
    },
    _activate: function(e) {
      var i = t.ui.ddmanager.current;
      this._addActiveClass(), i && this._trigger("activate", e, this.ui(i))
    },
    _deactivate: function(e) {
      var i = t.ui.ddmanager.current;
      this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i))
    },
    _over: function(e) {
      var i = t.ui.ddmanager.current;
      i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)))
    },
    _out: function(e) {
      var i = t.ui.ddmanager.current;
      i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)))
    },
    _drop: function(e, i) {
      var s = i || t.ui.ddmanager.current,
        n = !1;
      return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
        var i = t(this).droppable("instance");
        return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && v(s, t.extend(i, {
          offset: i.element.offset()
        }), i.options.tolerance, e) ? (n = !0, !1) : void 0
      }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1
    },
    ui: function(t) {
      return {
        draggable: t.currentItem || t.element,
        helper: t.helper,
        position: t.position,
        offset: t.positionAbs
      }
    },
    _addHoverClass: function() {
      this._addClass("ui-droppable-hover")
    },
    _removeHoverClass: function() {
      this._removeClass("ui-droppable-hover")
    },
    _addActiveClass: function() {
      this._addClass("ui-droppable-active")
    },
    _removeActiveClass: function() {
      this._removeClass("ui-droppable-active")
    }
  });
  var v = t.ui.intersect = function() {
    function t(t, e, i) {
      return t >= e && e + i > t
    }
    return function(e, i, s, n) {
      if (!i.offset) return !1;
      var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
        a = (e.positionAbs || e.position.absolute).top + e.margins.top,
        r = o + e.helperProportions.width,
        h = a + e.helperProportions.height,
        l = i.offset.left,
        c = i.offset.top,
        u = l + i.proportions().width,
        d = c + i.proportions().height;
      switch (s) {
        case "fit":
          return o >= l && u >= r && a >= c && d >= h;
        case "intersect":
          return o + e.helperProportions.width / 2 > l && u > r - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > c && d > h - e.helperProportions.height / 2;
        case "pointer":
          return t(n.pageY, c, i.proportions().height) && t(n.pageX, l, i.proportions().width);
        case "touch":
          return (a >= c && d >= a || h >= c && d >= h || c > a && h > d) && (o >= l && u >= o || r >= l && u >= r || l > o && r > u);
        default:
          return !1
      }
    }
  }();
  t.ui.ddmanager = {
    current: null,
    droppables: {
      "default": []
    },
    prepareOffsets: function(e, i) {
      var s, n, o = t.ui.ddmanager.droppables[e.options.scope] || [],
        a = i ? i.type : null,
        r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
      t: for (s = 0; o.length > s; s++)
        if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
          for (n = 0; r.length > n; n++)
            if (r[n] === o[s].element[0]) {
              o[s].proportions().height = 0;
              continue t
            } o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({
            width: o[s].element[0].offsetWidth,
            height: o[s].element[0].offsetHeight
          }))
        }
    },
    drop: function(e, i) {
      var s = !1;
      return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
        this.options && (!this.options.disabled && this.visible && v(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
      }), s
    },
    dragStart: function(e, i) {
      e.element.parentsUntil("body").on("scroll.droppable", function() {
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
      })
    },
    drag: function(e, i) {
      e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var s, n, o, a = v(e, this, this.options.tolerance, i),
            r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
          r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
            return t(this).droppable("instance").options.scope === n
          }), o.length && (s = t(o[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
        }
      })
    },
    dragStop: function(e, i) {
      e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
    }
  }, t.uiBackCompat !== !1 && t.widget("ui.droppable", t.ui.droppable, {
    options: {
      hoverClass: !1,
      activeClass: !1
    },
    _addActiveClass: function() {
      this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass)
    },
    _removeActiveClass: function() {
      this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass)
    },
    _addHoverClass: function() {
      this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass)
    },
    _removeHoverClass: function() {
      this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
    }
  }), t.ui.droppable, t.widget("ui.progressbar", {
    version: "1.12.1",
    options: {
      classes: {
        "ui-progressbar": "ui-corner-all",
        "ui-progressbar-value": "ui-corner-left",
        "ui-progressbar-complete": "ui-corner-right"
      },
      max: 100,
      value: 0,
      change: null,
      complete: null
    },
    min: 0,
    _create: function() {
      this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({
        role: "progressbar",
        "aria-valuemin": this.min
      }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = t("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue()
    },
    _destroy: function() {
      this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove()
    },
    value: function(t) {
      return void 0 === t ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), void 0)
    },
    _constrainedValue: function(t) {
      return void 0 === t && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
    },
    _setOptions: function(t) {
      var e = t.value;
      delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
    },
    _setOption: function(t, e) {
      "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
    },
    _setOptionDisabled: function(t) {
      this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t)
    },
    _percentage: function() {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
    },
    _refreshValue: function() {
      var e = this.options.value,
        i = this._percentage();
      this.valueDiv.toggle(this.indeterminate || e > this.min).width(i.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, e === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
        "aria-valuemax": this.options.max,
        "aria-valuenow": e
      }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
    }
  }), t.widget("ui.selectable", t.ui.mouse, {
    version: "1.12.1",
    options: {
      appendTo: "body",
      autoRefresh: !0,
      distance: 0,
      filter: "*",
      tolerance: "touch",
      selected: null,
      selecting: null,
      start: null,
      stop: null,
      unselected: null,
      unselecting: null
    },
    _create: function() {
      var e = this;
      this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
        e.elementPos = t(e.element[0]).offset(), e.selectees = t(e.options.filter, e.element[0]), e._addClass(e.selectees, "ui-selectee"), e.selectees.each(function() {
          var i = t(this),
            s = i.offset(),
            n = {
              left: s.left - e.elementPos.left,
              top: s.top - e.elementPos.top
            };
          t.data(this, "selectable-item", {
            element: this,
            $element: i,
            left: n.left,
            top: n.top,
            right: n.left + i.outerWidth(),
            bottom: n.top + i.outerHeight(),
            startselected: !1,
            selected: i.hasClass("ui-selected"),
            selecting: i.hasClass("ui-selecting"),
            unselecting: i.hasClass("ui-unselecting")
          })
        })
      }, this.refresh(), this._mouseInit(), this.helper = t("<div>"), this._addClass(this.helper, "ui-selectable-helper")
    },
    _destroy: function() {
      this.selectees.removeData("selectable-item"), this._mouseDestroy()
    },
    _mouseStart: function(e) {
      var i = this,
        s = this.options;
      this.opos = [e.pageX, e.pageY], this.elementPos = t(this.element[0]).offset(), this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
        left: e.pageX,
        top: e.pageY,
        width: 0,
        height: 0
      }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
        var s = t.data(this, "selectable-item");
        s.startselected = !0, e.metaKey || e.ctrlKey || (i._removeClass(s.$element, "ui-selected"), s.selected = !1, i._addClass(s.$element, "ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {
          unselecting: s.element
        }))
      }), t(e.target).parents().addBack().each(function() {
        var s, n = t.data(this, "selectable-item");
        return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), i._removeClass(n.$element, s ? "ui-unselecting" : "ui-selected")._addClass(n.$element, s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, {
          selecting: n.element
        }) : i._trigger("unselecting", e, {
          unselecting: n.element
        }), !1) : void 0
      }))
    },
    _mouseDrag: function(e) {
      if (this.dragged = !0, !this.options.disabled) {
        var i, s = this,
          n = this.options,
          o = this.opos[0],
          a = this.opos[1],
          r = e.pageX,
          h = e.pageY;
        return o > r && (i = r, r = o, o = i), a > h && (i = h, h = a, a = i), this.helper.css({
          left: o,
          top: a,
          width: r - o,
          height: h - a
        }), this.selectees.each(function() {
          var i = t.data(this, "selectable-item"),
            l = !1,
            c = {};
          i && i.element !== s.element[0] && (c.left = i.left + s.elementPos.left, c.right = i.right + s.elementPos.left, c.top = i.top + s.elementPos.top, c.bottom = i.bottom + s.elementPos.top, "touch" === n.tolerance ? l = !(c.left > r || o > c.right || c.top > h || a > c.bottom) : "fit" === n.tolerance && (l = c.left > o && r > c.right && c.top > a && h > c.bottom), l ? (i.selected && (s._removeClass(i.$element, "ui-selected"), i.selected = !1), i.unselecting && (s._removeClass(i.$element, "ui-unselecting"), i.unselecting = !1), i.selecting || (s._addClass(i.$element, "ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {
            selecting: i.element
          }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, s._addClass(i.$element, "ui-selected"), i.selected = !0) : (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, i.startselected && (s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {
            unselecting: i.element
          }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (s._removeClass(i.$element, "ui-selected"), i.selected = !1, s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {
            unselecting: i.element
          })))))
        }), !1
      }
    },
    _mouseStop: function(e) {
      var i = this;
      return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
        var s = t.data(this, "selectable-item");
        i._removeClass(s.$element, "ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {
          unselected: s.element
        })
      }), t(".ui-selecting", this.element[0]).each(function() {
        var s = t.data(this, "selectable-item");
        i._removeClass(s.$element, "ui-selecting")._addClass(s.$element, "ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {
          selected: s.element
        })
      }), this._trigger("stop", e), this.helper.remove(), !1
    }
  }), t.widget("ui.selectmenu", [t.ui.formResetMixin, {
    version: "1.12.1",
    defaultElement: "<select>",
    options: {
      appendTo: null,
      classes: {
        "ui-selectmenu-button-open": "ui-corner-top",
        "ui-selectmenu-button-closed": "ui-corner-all"
      },
      disabled: null,
      icons: {
        button: "ui-icon-triangle-1-s"
      },
      position: {
        my: "left top",
        at: "left bottom",
        collision: "none"
      },
      width: !1,
      change: null,
      close: null,
      focus: null,
      open: null,
      select: null
    },
    _create: function() {
      var e = this.element.uniqueId().attr("id");
      this.ids = {
        element: e,
        button: e + "-button",
        menu: e + "-menu"
      }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = t()
    },
    _drawButton: function() {
      var e, i = this,
        s = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
      this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, {
        click: function(t) {
          this.button.focus(), t.preventDefault()
        }
      }), this.element.hide(), this.button = t("<span>", {
        tabindex: this.options.disabled ? -1 : 0,
        id: this.ids.button,
        role: "combobox",
        "aria-expanded": "false",
        "aria-autocomplete": "list",
        "aria-owns": this.ids.menu,
        "aria-haspopup": "true",
        title: this.element.attr("title")
      }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), e = t("<span>").appendTo(this.button), this._addClass(e, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(s).appendTo(this.button), this.options.width !== !1 && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
        i._rendered || i._refreshMenu()
      })
    },
    _drawMenu: function() {
      var e = this;
      this.menu = t("<ul>", {
        "aria-hidden": "true",
        "aria-labelledby": this.ids.button,
        id: this.ids.menu
      }), this.menuWrap = t("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
        classes: {
          "ui-menu": "ui-corner-bottom"
        },
        role: "listbox",
        select: function(t, i) {
          t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t)
        },
        focus: function(t, i) {
          var s = i.item.data("ui-selectmenu-item");
          null != e.focusIndex && s.index !== e.focusIndex && (e._trigger("focus", t, {
            item: s
          }), e.isOpen || e._select(s, t)), e.focusIndex = s.index, e.button.attr("aria-activedescendant", e.menuItems.eq(s.index).attr("id"))
        }
      }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
        return !1
      }, this.menuInstance._isDivider = function() {
        return !1
      }
    },
    refresh: function() {
      this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton()
    },
    _refreshMenu: function() {
      var t, e = this.element.find("option");
      this.menu.empty(), this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, e.length && (t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
    },
    open: function(t) {
      this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)))
    },
    _position: function() {
      this.menuWrap.position(t.extend({
        of: this.button
      }, this.options.position))
    },
    close: function(t) {
      this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
    },
    widget: function() {
      return this.button
    },
    menuWidget: function() {
      return this.menu
    },
    _renderButtonItem: function(e) {
      var i = t("<span>");
      return this._setText(i, e.label), this._addClass(i, "ui-selectmenu-text"), i
    },
    _renderMenu: function(e, i) {
      var s = this,
        n = "";
      t.each(i, function(i, o) {
        var a;
        o.optgroup !== n && (a = t("<li>", {
          text: o.optgroup
        }), s._addClass(a, "ui-selectmenu-optgroup", "ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), a.appendTo(e), n = o.optgroup), s._renderItemData(e, o)
      })
    },
    _renderItemData: function(t, e) {
      return this._renderItem(t, e).data("ui-selectmenu-item", e)
    },
    _renderItem: function(e, i) {
      var s = t("<li>"),
        n = t("<div>", {
          title: i.element.attr("title")
        });
      return i.disabled && this._addClass(s, null, "ui-state-disabled"), this._setText(n, i.label), s.append(n).appendTo(e)
    },
    _setText: function(t, e) {
      e ? t.text(e) : t.html("&#160;")
    },
    _move: function(t, e) {
      var i, s, n = ".ui-menu-item";
      this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), n += ":not(.ui-state-disabled)"), s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1) : i[t + "All"](n).eq(0), s.length && this.menuInstance.focus(e, s)
    },
    _getSelectedItem: function() {
      return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
    },
    _toggle: function(t) {
      this[this.isOpen ? "close" : "open"](t)
    },
    _setSelection: function() {
      var t;
      this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
    },
    _documentClick: {
      mousedown: function(e) {
        this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)).length || this.close(e))
      }
    },
    _buttonEvents: {
      mousedown: function() {
        var t;
        window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
      },
      click: function(t) {
        this._setSelection(), this._toggle(t)
      },
      keydown: function(e) {
        var i = !0;
        switch (e.keyCode) {
          case t.ui.keyCode.TAB:
          case t.ui.keyCode.ESCAPE:
            this.close(e), i = !1;
            break;
          case t.ui.keyCode.ENTER:
            this.isOpen && this._selectFocusedItem(e);
            break;
          case t.ui.keyCode.UP:
            e.altKey ? this._toggle(e) : this._move("prev", e);
            break;
          case t.ui.keyCode.DOWN:
            e.altKey ? this._toggle(e) : this._move("next", e);
            break;
          case t.ui.keyCode.SPACE:
            this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
            break;
          case t.ui.keyCode.LEFT:
            this._move("prev", e);
            break;
          case t.ui.keyCode.RIGHT:
            this._move("next", e);
            break;
          case t.ui.keyCode.HOME:
          case t.ui.keyCode.PAGE_UP:
            this._move("first", e);
            break;
          case t.ui.keyCode.END:
          case t.ui.keyCode.PAGE_DOWN:
            this._move("last", e);
            break;
          default:
            this.menu.trigger(e), i = !1
        }
        i && e.preventDefault()
      }
    },
    _selectFocusedItem: function(t) {
      var e = this.menuItems.eq(this.focusIndex).parent("li");
      e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
    },
    _select: function(t, e) {
      var i = this.element[0].selectedIndex;
      this.element[0].selectedIndex = t.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)), this._setAria(t), this._trigger("select", e, {
        item: t
      }), t.index !== i && this._trigger("change", e, {
        item: t
      }), this.close(e)
    },
    _setAria: function(t) {
      var e = this.menuItems.eq(t.index).attr("id");
      this.button.attr({
        "aria-labelledby": e,
        "aria-activedescendant": e
      }), this.menu.attr("aria-activedescendant", e)
    },
    _setOption: function(t, e) {
      if ("icons" === t) {
        var i = this.button.find("span.ui-icon");
        this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button)
      }
      this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton()
    },
    _setOptionDisabled: function(t) {
      this._super(t), this.menuInstance.option("disabled", t), this.button.attr("aria-disabled", t), this._toggleClass(this.button, null, "ui-state-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)
    },
    _appendTo: function() {
      var e = this.options.appendTo;
      return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
    },
    _toggleAttr: function() {
      this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
    },
    _resizeButton: function() {
      var t = this.options.width;
      return t === !1 ? (this.button.css("width", ""), void 0) : (null === t && (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t), void 0)
    },
    _resizeMenu: function() {
      this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
    },
    _getCreateOptions: function() {
      var t = this._super();
      return t.disabled = this.element.prop("disabled"), t
    },
    _parseOptions: function(e) {
      var i = this,
        s = [];
      e.each(function(e, n) {
        s.push(i._parseOption(t(n), e))
      }), this.items = s
    },
    _parseOption: function(t, e) {
      var i = t.parent("optgroup");
      return {
        element: t,
        index: e,
        value: t.val(),
        label: t.text(),
        optgroup: i.attr("label") || "",
        disabled: i.prop("disabled") || t.prop("disabled")
      }
    },
    _destroy: function() {
      this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element)
    }
  }]), t.widget("ui.slider", t.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      classes: {
        "ui-slider": "ui-corner-all",
        "ui-slider-handle": "ui-corner-all",
        "ui-slider-range": "ui-corner-all ui-widget-header"
      },
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    numPages: 5,
    _create: function() {
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1
    },
    _refresh: function() {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
    },
    _createHandles: function() {
      var e, i, s = this.options,
        n = this.element.find(".ui-slider-handle"),
        o = "<span tabindex='0'></span>",
        a = [];
      for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) a.push(o);
      this.handles = n.add(t(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function(e) {
        t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0)
      })
    },
    _createRange: function() {
      var e = this.options;
      e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
        left: "",
        bottom: ""
      })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === e.range || "max" === e.range) && this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null)
    },
    _setupEvents: function() {
      this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
    },
    _destroy: function() {
      this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy()
    },
    _mouseCapture: function(e) {
      var i, s, n, o, a, r, h, l, c = this,
        u = this.options;
      return u.disabled ? !1 : (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), i = {
        x: e.pageX,
        y: e.pageY
      }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
        var i = Math.abs(s - c.values(e));
        (n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, o = t(this), a = e)
      }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, this._addClass(o, null, "ui-state-active"), o.trigger("focus"), h = o.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
        left: 0,
        top: 0
      } : {
        left: e.pageX - h.left - o.width() / 2,
        top: e.pageY - h.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
      }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0))
    },
    _mouseStart: function() {
      return !0
    },
    _mouseDrag: function(t) {
      var e = {
          x: t.pageX,
          y: t.pageY
        },
        i = this._normValueFromMouse(e);
      return this._slide(t, this._handleIndex, i), !1
    },
    _mouseStop: function(t) {
      return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
    },
    _detectOrientation: function() {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
    },
    _normValueFromMouse: function(t) {
      var e, i, s, n, o;
      return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
    },
    _uiHash: function(t, e, i) {
      var s = {
        handle: this.handles[t],
        handleIndex: t,
        value: void 0 !== e ? e : this.value()
      };
      return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), s.values = i || this.values()), s
    },
    _hasMultipleValues: function() {
      return this.options.values && this.options.values.length
    },
    _start: function(t, e) {
      return this._trigger("start", t, this._uiHash(e))
    },
    _slide: function(t, e, i) {
      var s, n, o = this.value(),
        a = this.values();
      this._hasMultipleValues() && (n = this.values(e ? 0 : 1), o = this.values(e), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), a[e] = i), i !== o && (s = this._trigger("slide", t, this._uiHash(e, i, a)), s !== !1 && (this._hasMultipleValues() ? this.values(e, i) : this.value(i)))
    },
    _stop: function(t, e) {
      this._trigger("stop", t, this._uiHash(e))
    },
    _change: function(t, e) {
      this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)))
    },
    value: function(t) {
      return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value()
    },
    values: function(e, i) {
      var s, n, o;
      if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), void 0;
      if (!arguments.length) return this._values();
      if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value();
      for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1) s[o] = this._trimAlignValue(n[o]), this._change(null, o);
      this._refreshValue()
    },
    _setOption: function(e, i) {
      var s, n = 0;
      switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), this._super(e, i), e) {
        case "orientation":
          this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", "");
          break;
        case "value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
          break;
        case "values":
          for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--) this._change(null, s);
          this._animateOff = !1;
          break;
        case "step":
        case "min":
        case "max":
          this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
          break;
        case "range":
          this._animateOff = !0, this._refresh(), this._animateOff = !1
      }
    },
    _setOptionDisabled: function(t) {
      this._super(t), this._toggleClass(null, "ui-state-disabled", !!t)
    },
    _value: function() {
      var t = this.options.value;
      return t = this._trimAlignValue(t)
    },
    _values: function(t) {
      var e, i, s;
      if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
      if (this._hasMultipleValues()) {
        for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
        return i
      }
      return []
    },
    _trimAlignValue: function(t) {
      if (this._valueMin() >= t) return this._valueMin();
      if (t >= this._valueMax()) return this._valueMax();
      var e = this.options.step > 0 ? this.options.step : 1,
        i = (t - this._valueMin()) % e,
        s = t - i;
      return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
    },
    _calculateNewMax: function() {
      var t = this.options.max,
        e = this._valueMin(),
        i = this.options.step,
        s = Math.round((t - e) / i) * i;
      t = s + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()))
    },
    _precision: function() {
      var t = this._precisionOf(this.options.step);
      return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
    },
    _precisionOf: function(t) {
      var e = "" + t,
        i = e.indexOf(".");
      return -1 === i ? 0 : e.length - i - 1
    },
    _valueMin: function() {
      return this.options.min
    },
    _valueMax: function() {
      return this.max
    },
    _refreshRange: function(t) {
      "vertical" === t && this.range.css({
        width: "",
        left: ""
      }), "horizontal" === t && this.range.css({
        height: "",
        bottom: ""
      })
    },
    _refreshValue: function() {
      var e, i, s, n, o, a = this.options.range,
        r = this.options,
        h = this,
        l = this._animateOff ? !1 : r.animate,
        c = {};
      this._hasMultipleValues() ? this.handles.each(function(s) {
        i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), c["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[l ? "animate" : "css"](c, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
          left: i + "%"
        }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
          width: i - e + "%"
        }, {
          queue: !1,
          duration: r.animate
        })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
          bottom: i + "%"
        }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
          height: i - e + "%"
        }, {
          queue: !1,
          duration: r.animate
        }))), e = i
      }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
        width: i + "%"
      }, r.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
        width: 100 - i + "%"
      }, r.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
        height: i + "%"
      }, r.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
        height: 100 - i + "%"
      }, r.animate))
    },
    _handleEvents: {
      keydown: function(e) {
        var i, s, n, o, a = t(e.target).data("ui-slider-handle-index");
        switch (e.keyCode) {
          case t.ui.keyCode.HOME:
          case t.ui.keyCode.END:
          case t.ui.keyCode.PAGE_UP:
          case t.ui.keyCode.PAGE_DOWN:
          case t.ui.keyCode.UP:
          case t.ui.keyCode.RIGHT:
          case t.ui.keyCode.DOWN:
          case t.ui.keyCode.LEFT:
            if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), i = this._start(e, a), i === !1)) return
        }
        switch (o = this.options.step, s = n = this._hasMultipleValues() ? this.values(a) : this.value(), e.keyCode) {
          case t.ui.keyCode.HOME:
            n = this._valueMin();
            break;
          case t.ui.keyCode.END:
            n = this._valueMax();
            break;
          case t.ui.keyCode.PAGE_UP:
            n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
            break;
          case t.ui.keyCode.PAGE_DOWN:
            n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
            break;
          case t.ui.keyCode.UP:
          case t.ui.keyCode.RIGHT:
            if (s === this._valueMax()) return;
            n = this._trimAlignValue(s + o);
            break;
          case t.ui.keyCode.DOWN:
          case t.ui.keyCode.LEFT:
            if (s === this._valueMin()) return;
            n = this._trimAlignValue(s - o)
        }
        this._slide(e, a, n)
      },
      keyup: function(e) {
        var i = t(e.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active"))
      }
    }
  }), t.widget("ui.sortable", t.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "sort",
    ready: !1,
    options: {
      appendTo: "parent",
      axis: !1,
      connectWith: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      dropOnEmpty: !0,
      forcePlaceholderSize: !1,
      forceHelperSize: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      items: "> *",
      opacity: !1,
      placeholder: !1,
      revert: !1,
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1e3,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },
    _isOverAxis: function(t, e, i) {
      return t >= e && e + i > t
    },
    _isFloating: function(t) {
      return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
    },
    _create: function() {
      this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
    },
    _setOption: function(t, e) {
      this._super(t, e), "handle" === t && this._setHandleClassName()
    },
    _setHandleClassName: function() {
      var e = this;
      this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), t.each(this.items, function() {
        e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
      })
    },
    _destroy: function() {
      this._mouseDestroy();
      for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
      return this
    },
    _mouseCapture: function(e, i) {
      var s = null,
        n = !1,
        o = this;
      return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
        return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : void 0
      }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function() {
        this === e.target && (n = !0)
      }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
    },
    _mouseStart: function(e, i, s) {
      var n, o, a = this.options;
      if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left
        }, t.extend(this.offset, {
          click: {
            left: e.pageX - this.offset.left,
            top: e.pageY - this.offset.top
          },
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
          prev: this.currentItem.prev()[0],
          parent: this.currentItem.parent()[0]
        }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
        for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this));
      return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(e), !0
    },
    _mouseDrag: function(e) {
      var i, s, n, o, a = this.options,
        r = !1;
      for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
        if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
          if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
          this._rearrange(e, s), this._trigger("change", e, this._uiHash());
          break
        } return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
    },
    _mouseStop: function(e, i) {
      if (e) {
        if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
          var s = this,
            n = this.placeholder.offset(),
            o = this.options.axis,
            a = {};
          o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
            s._clear(e)
          })
        } else this._clear(e, i);
        return !1
      }
    },
    cancel: function() {
      if (this.dragging) {
        this._mouseUp(new t.Event("mouseup", {
          target: null
        })), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
        for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
      }
      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
        helper: null,
        dragging: !1,
        reverting: !1,
        _noFinalSort: null
      }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
    },
    serialize: function(e) {
      var i = this._getItemsAsjQuery(e && e.connected),
        s = [];
      return e = e || {}, t(i).each(function() {
        var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
        i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
      }), !s.length && e.key && s.push(e.key + "="), s.join("&")
    },
    toArray: function(e) {
      var i = this._getItemsAsjQuery(e && e.connected),
        s = [];
      return e = e || {}, i.each(function() {
        s.push(t(e.item || this).attr(e.attribute || "id") || "")
      }), s
    },
    _intersectsWith: function(t) {
      var e = this.positionAbs.left,
        i = e + this.helperProportions.width,
        s = this.positionAbs.top,
        n = s + this.helperProportions.height,
        o = t.left,
        a = o + t.width,
        r = t.top,
        h = r + t.height,
        l = this.offset.click.top,
        c = this.offset.click.left,
        u = "x" === this.options.axis || s + l > r && h > s + l,
        d = "y" === this.options.axis || e + c > o && a > e + c,
        p = u && d;
      return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
    },
    _intersectsWithPointer: function(t) {
      var e, i, s = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
        n = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
        o = s && n;
      return o ? (e = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1)) : !1
    },
    _intersectsWithSides: function(t) {
      var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
        i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
        s = this._getDragVerticalDirection(),
        n = this._getDragHorizontalDirection();
      return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e)
    },
    _getDragVerticalDirection: function() {
      var t = this.positionAbs.top - this.lastPositionAbs.top;
      return 0 !== t && (t > 0 ? "down" : "up")
    },
    _getDragHorizontalDirection: function() {
      var t = this.positionAbs.left - this.lastPositionAbs.left;
      return 0 !== t && (t > 0 ? "right" : "left")
    },
    refresh: function(t) {
      return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
    },
    _connectWith: function() {
      var t = this.options;
      return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
    },
    _getItemsAsjQuery: function(e) {
      function i() {
        r.push(this)
      }
      var s, n, o, a, r = [],
        h = [],
        l = this._connectWith();
      if (l && e)
        for (s = l.length - 1; s >= 0; s--)
          for (o = t(l[s], this.document[0]), n = o.length - 1; n >= 0; n--) a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && h.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
      for (h.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
          options: this.options,
          item: this.currentItem
        }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--) h[s][0].each(i);
      return t(r)
    },
    _removeCurrentsFromItems: function() {
      var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = t.grep(this.items, function(t) {
        for (var i = 0; e.length > i; i++)
          if (e[i] === t.item[0]) return !1;
        return !0
      })
    },
    _refreshItems: function(e) {
      this.items = [], this.containers = [this];
      var i, s, n, o, a, r, h, l, c = this.items,
        u = [
          [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
            item: this.currentItem
          }) : t(this.options.items, this.element), this]
        ],
        d = this._connectWith();
      if (d && this.ready)
        for (i = d.length - 1; i >= 0; i--)
          for (n = t(d[i], this.document[0]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
            item: this.currentItem
          }) : t(o.options.items, o.element), o]), this.containers.push(o));
      for (i = u.length - 1; i >= 0; i--)
        for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({
          item: h,
          instance: a,
          width: 0,
          height: 0,
          left: 0,
          top: 0
        })
    },
    refreshPositions: function(e) {
      this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      var i, s, n, o;
      for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
      if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
      else
        for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
      return this
    },
    _createPlaceholder: function(e) {
      e = e || this;
      var i, s = e.options;
      s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
        element: function() {
          var s = e.currentItem[0].nodeName.toLowerCase(),
            n = t("<" + s + ">", e.document[0]);
          return e._addClass(n, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(n, "ui-sortable-helper"), "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
        },
        update: function(t, n) {
          (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
        }
      }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
    },
    _createTrPlaceholder: function(e, i) {
      var s = this;
      e.children().each(function() {
        t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
      })
    },
    _contactContainers: function(e) {
      var i, s, n, o, a, r, h, l, c, u, d = null,
        p = null;
      for (i = this.containers.length - 1; i >= 0; i--)
        if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
          if (this._intersectsWith(this.containers[i].containerCache)) {
            if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
            d = this.containers[i], p = i
          } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
      if (d)
        if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);
        else {
          for (n = 1e4, o = null, c = d.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", u = c ? "pageX" : "pageY", s = this.items.length - 1; s >= 0; s--) t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset()[a], l = !1, e[u] - h > this.items[s][r] / 2 && (l = !0), n > Math.abs(e[u] - h) && (n = Math.abs(e[u] - h), o = this.items[s], this.direction = l ? "up" : "down"));
          if (!o && !this.options.dropOnEmpty) return;
          if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
          o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
        }
    },
    _createHelper: function(e) {
      var i = this.options,
        s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
      return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
        width: this.currentItem[0].style.width,
        height: this.currentItem[0].style.height,
        position: this.currentItem.css("position"),
        top: this.currentItem.css("top"),
        left: this.currentItem.css("left")
      }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
    },
    _adjustOffsetFromHelper: function(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
        left: +e[0],
        top: +e[1] || 0
      }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
    },
    _getParentOffset: function() {
      this.offsetParent = this.helper.offsetParent();
      var e = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
        top: 0,
        left: 0
      }), {
        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function() {
      if ("relative" === this.cssPosition) {
        var t = this.currentItem.position();
        return {
          top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {
        top: 0,
        left: 0
      }
    },
    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
      }
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      }
    },
    _setContainment: function() {
      var e, i, s, n = this.options;
      "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
    },
    _convertPositionTo: function(e, i) {
      i || (i = this.position);
      var s = "absolute" === e ? 1 : -1,
        n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        o = /(html|body)/i.test(n[0].tagName);
      return {
        top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
        left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
      }
    },
    _generatePosition: function(e) {
      var i, s, n = this.options,
        o = e.pageX,
        a = e.pageY,
        r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        h = /(html|body)/i.test(r[0].tagName);
      return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
        top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
        left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
      }
    },
    _rearrange: function(t, e, i, s) {
      i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var n = this.counter;
      this._delay(function() {
        n === this.counter && this.refreshPositions(!s)
      })
    },
    _clear: function(t, e) {
      function i(t, e, i) {
        return function(s) {
          i._trigger(t, s, e._uiHash(e))
        }
      }
      this.reverting = !1;
      var s, n = [];
      if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
        for (s in this._storedCSS)("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
        this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")
      } else this.currentItem.show();
      for (this.fromOutside && !e && n.push(function(t) {
          this._trigger("receive", t, this._uiHash(this.fromOutside))
        }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function(t) {
          this._trigger("update", t, this._uiHash())
        }), this !== this.currentContainer && (e || (n.push(function(t) {
          this._trigger("remove", t, this._uiHash())
        }), n.push(function(t) {
          return function(e) {
            t._trigger("receive", e, this._uiHash(this))
          }
        }.call(this, this.currentContainer)), n.push(function(t) {
          return function(e) {
            t._trigger("update", e, this._uiHash(this))
          }
        }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
      if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
        for (s = 0; n.length > s; s++) n[s].call(this, t);
        this._trigger("stop", t, this._uiHash())
      }
      return this.fromOutside = !1, !this.cancelHelperRemoval
    },
    _trigger: function() {
      t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
    },
    _uiHash: function(e) {
      var i = e || this;
      return {
        helper: i.helper,
        placeholder: i.placeholder || t([]),
        position: i.position,
        originalPosition: i.originalPosition,
        offset: i.positionAbs,
        item: i.currentItem,
        sender: e ? e.element : null
      }
    }
  }), t.widget("ui.spinner", {
    version: "1.12.1",
    defaultElement: "<input>",
    widgetEventPrefix: "spin",
    options: {
      classes: {
        "ui-spinner": "ui-corner-all",
        "ui-spinner-down": "ui-corner-br",
        "ui-spinner-up": "ui-corner-tr"
      },
      culture: null,
      icons: {
        down: "ui-icon-triangle-1-s",
        up: "ui-icon-triangle-1-n"
      },
      incremental: !0,
      max: null,
      min: null,
      numberFormat: null,
      page: 10,
      step: 1,
      change: null,
      spin: null,
      start: null,
      stop: null
    },
    _create: function() {
      this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
        beforeunload: function() {
          this.element.removeAttr("autocomplete")
        }
      })
    },
    _getCreateOptions: function() {
      var e = this._super(),
        i = this.element;
      return t.each(["min", "max", "step"], function(t, s) {
        var n = i.attr(s);
        null != n && n.length && (e[s] = n)
      }), e
    },
    _events: {
      keydown: function(t) {
        this._start(t) && this._keydown(t) && t.preventDefault()
      },
      keyup: "_stop",
      focus: function() {
        this.previous = this.element.val()
      },
      blur: function(t) {
        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0)
      },
      mousewheel: function(t, e) {
        if (e) {
          if (!this.spinning && !this._start(t)) return !1;
          this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
            this.spinning && this._stop(t)
          }, 100), t.preventDefault()
        }
      },
      "mousedown .ui-spinner-button": function(e) {
        function i() {
          var e = this.element[0] === t.ui.safeActiveElement(this.document[0]);
          e || (this.element.trigger("focus"), this.previous = s, this._delay(function() {
            this.previous = s
          }))
        }
        var s;
        s = this.element[0] === t.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
          delete this.cancelBlur, i.call(this)
        }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
      },
      "mouseup .ui-spinner-button": "_stop",
      "mouseenter .ui-spinner-button": function(e) {
        return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0
      },
      "mouseleave .ui-spinner-button": "_stop"
    },
    _enhance: function() {
      this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>")
    },
    _draw: function() {
      this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
        classes: {
          "ui-button": ""
        }
      }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({
        icon: this.options.icons.up,
        showLabel: !1
      }), this.buttons.last().button({
        icon: this.options.icons.down,
        showLabel: !1
      }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height())
    },
    _keydown: function(e) {
      var i = this.options,
        s = t.ui.keyCode;
      switch (e.keyCode) {
        case s.UP:
          return this._repeat(null, 1, e), !0;
        case s.DOWN:
          return this._repeat(null, -1, e), !0;
        case s.PAGE_UP:
          return this._repeat(null, i.page, e), !0;
        case s.PAGE_DOWN:
          return this._repeat(null, -i.page, e), !0
      }
      return !1
    },
    _start: function(t) {
      return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
    },
    _repeat: function(t, e, i) {
      t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
        this._repeat(40, e, i)
      }, t), this._spin(e * this.options.step, i)
    },
    _spin: function(t, e) {
      var i = this.value() || 0;
      this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
        value: i
      }) === !1 || (this._value(i), this.counter++)
    },
    _increment: function(e) {
      var i = this.options.incremental;
      return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
    },
    _precision: function() {
      var t = this._precisionOf(this.options.step);
      return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
    },
    _precisionOf: function(t) {
      var e = "" + t,
        i = e.indexOf(".");
      return -1 === i ? 0 : e.length - i - 1
    },
    _adjustValue: function(t) {
      var e, i, s = this.options;
      return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t
    },
    _stop: function(t) {
      this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
    },
    _setOption: function(t, e) {
      var i, s, n;
      return "culture" === t || "numberFormat" === t ? (i = this._parse(this.element.val()), this.options[t] = e, this.element.val(this._format(i)), void 0) : (("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (s = this.buttons.first().find(".ui-icon"), this._removeClass(s, null, this.options.icons.up), this._addClass(s, null, e.up), n = this.buttons.last().find(".ui-icon"), this._removeClass(n, null, this.options.icons.down), this._addClass(n, null, e.down)), this._super(t, e), void 0)
    },
    _setOptionDisabled: function(t) {
      this._super(t), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable")
    },
    _setOptions: r(function(t) {
      this._super(t)
    }),
    _parse: function(t) {
      return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
    },
    _format: function(t) {
      return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
    },
    _refresh: function() {
      this.element.attr({
        "aria-valuemin": this.options.min,
        "aria-valuemax": this.options.max,
        "aria-valuenow": this._parse(this.element.val())
      })
    },
    isValid: function() {
      var t = this.value();
      return null === t ? !1 : t === this._adjustValue(t)
    },
    _value: function(t, e) {
      var i;
      "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
    },
    _destroy: function() {
      this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element)
    },
    stepUp: r(function(t) {
      this._stepUp(t)
    }),
    _stepUp: function(t) {
      this._start() && (this._spin((t || 1) * this.options.step), this._stop())
    },
    stepDown: r(function(t) {
      this._stepDown(t)
    }),
    _stepDown: function(t) {
      this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
    },
    pageUp: r(function(t) {
      this._stepUp((t || 1) * this.options.page)
    }),
    pageDown: r(function(t) {
      this._stepDown((t || 1) * this.options.page)
    }),
    value: function(t) {
      return arguments.length ? (r(this._value).call(this, t), void 0) : this._parse(this.element.val())
    },
    widget: function() {
      return this.uiSpinner
    }
  }), t.uiBackCompat !== !1 && t.widget("ui.spinner", t.ui.spinner, {
    _enhance: function() {
      this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
    },
    _uiSpinnerHtml: function() {
      return "<span>"
    },
    _buttonHtml: function() {
      return "<a></a><a></a>"
    }
  }), t.ui.spinner, t.widget("ui.tabs", {
    version: "1.12.1",
    delay: 300,
    options: {
      active: null,
      classes: {
        "ui-tabs": "ui-corner-all",
        "ui-tabs-nav": "ui-corner-all",
        "ui-tabs-panel": "ui-corner-bottom",
        "ui-tabs-tab": "ui-corner-top"
      },
      collapsible: !1,
      event: "click",
      heightStyle: "content",
      hide: null,
      show: null,
      activate: null,
      beforeActivate: null,
      beforeLoad: null,
      load: null
    },
    _isLocal: function() {
      var t = /#.*$/;
      return function(e) {
        var i, s;
        i = e.href.replace(t, ""), s = location.href.replace(t, "");
        try {
          i = decodeURIComponent(i)
        } catch (n) {}
        try {
          s = decodeURIComponent(s)
        } catch (n) {}
        return e.hash.length > 1 && i === s
      }
    }(),
    _create: function() {
      var e = this,
        i = this.options;
      this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
        return e.tabs.index(t)
      }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
    },
    _initialActive: function() {
      var e = this.options.active,
        i = this.options.collapsible,
        s = location.hash.substring(1);
      return null === e && (s && this.tabs.each(function(i, n) {
        return t(n).attr("aria-controls") === s ? (e = i, !1) : void 0
      }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e
    },
    _getCreateEventData: function() {
      return {
        tab: this.active,
        panel: this.active.length ? this._getPanelForTab(this.active) : t()
      }
    },
    _tabKeydown: function(e) {
      var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
        s = this.tabs.index(i),
        n = !0;
      if (!this._handlePageNav(e)) {
        switch (e.keyCode) {
          case t.ui.keyCode.RIGHT:
          case t.ui.keyCode.DOWN:
            s++;
            break;
          case t.ui.keyCode.UP:
          case t.ui.keyCode.LEFT:
            n = !1, s--;
            break;
          case t.ui.keyCode.END:
            s = this.anchors.length - 1;
            break;
          case t.ui.keyCode.HOME:
            s = 0;
            break;
          case t.ui.keyCode.SPACE:
            return e.preventDefault(), clearTimeout(this.activating), this._activate(s), void 0;
          case t.ui.keyCode.ENTER:
            return e.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active ? !1 : s), void 0;
          default:
            return
        }
        e.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), e.ctrlKey || e.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function() {
          this.option("active", s)
        }, this.delay))
      }
    },
    _panelKeydown: function(e) {
      this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.trigger("focus"))
    },
    _handlePageNav: function(e) {
      return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
    },
    _findNextTab: function(e, i) {
      function s() {
        return e > n && (e = 0), 0 > e && (e = n), e
      }
      for (var n = this.tabs.length - 1; - 1 !== t.inArray(s(), this.options.disabled);) e = i ? e + 1 : e - 1;
      return e
    },
    _focusNextTab: function(t, e) {
      return t = this._findNextTab(t, e), this.tabs.eq(t).trigger("focus"), t
    },
    _setOption: function(t, e) {
      return "active" === t ? (this._activate(e), void 0) : (this._super(t, e), "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e), void 0)
    },
    _sanitizeSelector: function(t) {
      return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
    },
    refresh: function() {
      var e = this.options,
        i = this.tablist.children(":has(a[href])");
      e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
        return i.index(t)
      }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
    },
    _refresh: function() {
      this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
        "aria-selected": "false",
        "aria-expanded": "false",
        tabIndex: -1
      }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
        "aria-hidden": "true"
      }), this.active.length ? (this.active.attr({
        "aria-selected": "true",
        "aria-expanded": "true",
        tabIndex: 0
      }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
        "aria-hidden": "false"
      })) : this.tabs.eq(0).attr("tabIndex", 0)
    },
    _processTabs: function() {
      var e = this,
        i = this.tabs,
        s = this.anchors,
        n = this.panels;
      this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function(e) {
        t(this).is(".ui-state-disabled") && e.preventDefault()
      }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
        t(this).closest("li").is(".ui-state-disabled") && this.blur()
      }), this.tabs = this.tablist.find("> li:has(a[href])").attr({
        role: "tab",
        tabIndex: -1
      }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function() {
        return t("a", this)[0]
      }).attr({
        role: "presentation",
        tabIndex: -1
      }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = t(), this.anchors.each(function(i, s) {
        var n, o, a, r = t(s).uniqueId().attr("id"),
          h = t(s).closest("li"),
          l = h.attr("aria-controls");
        e._isLocal(s) ? (n = s.hash, a = n.substring(1), o = e.element.find(e._sanitizeSelector(n))) : (a = h.attr("aria-controls") || t({}).uniqueId()[0].id, n = "#" + a, o = e.element.find(n), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), l && h.data("ui-tabs-aria-controls", l), h.attr({
          "aria-controls": a,
          "aria-labelledby": r
        }), o.attr("aria-labelledby", r)
      }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)))
    },
    _getList: function() {
      return this.tablist || this.element.find("ol, ul").eq(0)
    },
    _createPanel: function(e) {
      return t("<div>").attr("id", e).data("ui-tabs-destroy", !0)
    },
    _setOptionDisabled: function(e) {
      var i, s, n;
      for (t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1), n = 0; s = this.tabs[n]; n++) i = t(s), e === !0 || -1 !== t.inArray(n, e) ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
      this.options.disabled = e, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, e === !0)
    },
    _setupEvents: function(e) {
      var i = {};
      e && t.each(e.split(" "), function(t, e) {
        i[e] = "_eventHandler"
      }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
        click: function(t) {
          t.preventDefault()
        }
      }), this._on(this.anchors, i), this._on(this.tabs, {
        keydown: "_tabKeydown"
      }), this._on(this.panels, {
        keydown: "_panelKeydown"
      }), this._focusable(this.tabs), this._hoverable(this.tabs)
    },
    _setupHeightStyle: function(e) {
      var i, s = this.element.parent();
      "fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
        var e = t(this),
          s = e.css("position");
        "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
      }), this.element.children().not(this.panels).each(function() {
        i -= t(this).outerHeight(!0)
      }), this.panels.each(function() {
        t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
      }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
        i = Math.max(i, t(this).height("").height())
      }).height(i))
    },
    _eventHandler: function(e) {
      var i = this.options,
        s = this.active,
        n = t(e.currentTarget),
        o = n.closest("li"),
        a = o[0] === s[0],
        r = a && i.collapsible,
        h = r ? t() : this._getPanelForTab(o),
        l = s.length ? this._getPanelForTab(s) : t(),
        c = {
          oldTab: s,
          oldPanel: l,
          newTab: r ? t() : o,
          newPanel: h
        };
      e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(o), e), this._toggle(e, c))
    },
    _toggle: function(e, i) {
      function s() {
        o.running = !1, o._trigger("activate", e, i)
      }

      function n() {
        o._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, s) : (a.show(), s())
      }
      var o = this,
        a = i.newPanel,
        r = i.oldPanel;
      this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
        o._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), n()
      }) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({
        "aria-selected": "false",
        "aria-expanded": "false"
      }), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
        return 0 === t(this).attr("tabIndex")
      }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({
        "aria-selected": "true",
        "aria-expanded": "true",
        tabIndex: 0
      })
    },
    _activate: function(e) {
      var i, s = this._findActive(e);
      s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({
        target: i,
        currentTarget: i,
        preventDefault: t.noop
      }))
    },
    _findActive: function(e) {
      return e === !1 ? t() : this.tabs.eq(e)
    },
    _getIndex: function(e) {
      return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']"))), e
    },
    _destroy: function() {
      this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
        t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
      }), this.tabs.each(function() {
        var e = t(this),
          i = e.data("ui-tabs-aria-controls");
        i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
      }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
    },
    enable: function(e) {
      var i = this.options.disabled;
      i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function(t) {
        return t !== e ? t : null
      }) : t.map(this.tabs, function(t, i) {
        return i !== e ? i : null
      })), this._setOptionDisabled(i))
    },
    disable: function(e) {
      var i = this.options.disabled;
      if (i !== !0) {
        if (void 0 === e) i = !0;
        else {
          if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;
          i = t.isArray(i) ? t.merge([e], i).sort() : [e]
        }
        this._setOptionDisabled(i)
      }
    },
    load: function(e, i) {
      e = this._getIndex(e);
      var s = this,
        n = this.tabs.eq(e),
        o = n.find(".ui-tabs-anchor"),
        a = this._getPanelForTab(n),
        r = {
          tab: n,
          panel: a
        },
        h = function(t, e) {
          "abort" === e && s.panels.stop(!1, !0), s._removeClass(n, "ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr
        };
      this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(n, "ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function(t, e, n) {
        setTimeout(function() {
          a.html(t), s._trigger("load", i, r), h(n, e)
        }, 1)
      }).fail(function(t, e) {
        setTimeout(function() {
          h(t, e)
        }, 1)
      })))
    },
    _ajaxSettings: function(e, i, s) {
      var n = this;
      return {
        url: e.attr("href").replace(/#.*$/, ""),
        beforeSend: function(e, o) {
          return n._trigger("beforeLoad", i, t.extend({
            jqXHR: e,
            ajaxSettings: o
          }, s))
        }
      }
    },
    _getPanelForTab: function(e) {
      var i = t(e).attr("aria-controls");
      return this.element.find(this._sanitizeSelector("#" + i))
    }
  }), t.uiBackCompat !== !1 && t.widget("ui.tabs", t.ui.tabs, {
    _processTabs: function() {
      this._superApply(arguments), this._addClass(this.tabs, "ui-tab")
    }
  }), t.ui.tabs, t.widget("ui.tooltip", {
    version: "1.12.1",
    options: {
      classes: {
        "ui-tooltip": "ui-corner-all ui-widget-shadow"
      },
      content: function() {
        var e = t(this).attr("title") || "";
        return t("<a>").text(e).html()
      },
      hide: !0,
      items: "[title]:not([disabled])",
      position: {
        my: "left top+15",
        at: "left bottom",
        collision: "flipfit flip"
      },
      show: !0,
      track: !1,
      close: null,
      open: null
    },
    _addDescribedBy: function(e, i) {
      var s = (e.attr("aria-describedby") || "").split(/\s+/);
      s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
    },
    _removeDescribedBy: function(e) {
      var i = e.data("ui-tooltip-id"),
        s = (e.attr("aria-describedby") || "").split(/\s+/),
        n = t.inArray(i, s); - 1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
    },
    _create: function() {
      this._on({
        mouseover: "open",
        focusin: "open"
      }), this.tooltips = {}, this.parents = {}, this.liveRegion = t("<div>").attr({
        role: "log",
        "aria-live": "assertive",
        "aria-relevant": "additions"
      }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = t([])
    },
    _setOption: function(e, i) {
      var s = this;
      this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
        s._updateContent(e.element)
      })
    },
    _setOptionDisabled: function(t) {
      this[t ? "_disable" : "_enable"]()
    },
    _disable: function() {
      var e = this;
      t.each(this.tooltips, function(i, s) {
        var n = t.Event("blur");
        n.target = n.currentTarget = s.element[0], e.close(n, !0)
      }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
        var e = t(this);
        return e.is("[title]") ? e.data("ui-tooltip-title", e.attr("title")).removeAttr("title") : void 0
      }))
    },
    _enable: function() {
      this.disabledTitles.each(function() {
        var e = t(this);
        e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
      }), this.disabledTitles = t([])
    },
    open: function(e) {
      var i = this,
        s = t(e ? e.target : this.element).closest(this.options.items);
      s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function() {
        var e, s = t(this);
        s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
          element: this,
          title: s.attr("title")
        }, s.attr("title", ""))
      }), this._registerCloseHandlers(e, s), this._updateContent(s, e))
    },
    _updateContent: function(t, e) {
      var i, s = this.options.content,
        n = this,
        o = e ? e.type : null;
      return "string" == typeof s || s.nodeType || s.jquery ? this._open(e, t, s) : (i = s.call(t[0], function(i) {
        n._delay(function() {
          t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i))
        })
      }), i && this._open(e, t, i), void 0)
    },
    _open: function(e, i, s) {
      function n(t) {
        l.of = t, a.is(":hidden") || a.position(l)
      }
      var o, a, r, h, l = t.extend({}, this.options.position);
      if (s) {
        if (o = this._find(i)) return o.tooltip.find(".ui-tooltip-content").html(s), void 0;
        i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), a = o.tooltip, this._addDescribedBy(i, a.attr("id")), a.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), h = t("<div>").html(a.find(".ui-tooltip-content").html()), h.removeAttr("name").find("[name]").removeAttr("name"), h.removeAttr("id").find("[id]").removeAttr("id"), h.appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, {
          mousemove: n
        }), n(e)) : a.position(t.extend({
          of: i
        }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.track && this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function() {
          a.is(":visible") && (n(l.of), clearInterval(r))
        }, t.fx.interval)), this._trigger("open", e, {
          tooltip: a
        })
      }
    },
    _registerCloseHandlers: function(e, i) {
      var s = {
        keyup: function(e) {
          if (e.keyCode === t.ui.keyCode.ESCAPE) {
            var s = t.Event(e);
            s.currentTarget = i[0], this.close(s, !0)
          }
        }
      };
      i[0] !== this.element[0] && (s.remove = function() {
        this._removeTooltip(this._find(i).tooltip)
      }), e && "mouseover" !== e.type || (s.mouseleave = "close"), e && "focusin" !== e.type || (s.focusout = "close"), this._on(!0, i, s)
    },
    close: function(e) {
      var i, s = this,
        n = t(e ? e.currentTarget : this.element),
        o = this._find(n);
      return o ? (i = o.tooltip, o.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function() {
        s._removeTooltip(t(this))
      }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
        t(i.element).attr("title", i.title), delete s.parents[e]
      }), o.closing = !0, this._trigger("close", e, {
        tooltip: i
      }), o.hiding || (o.closing = !1)), void 0) : (n.removeData("ui-tooltip-open"), void 0)
    },
    _tooltip: function(e) {
      var i = t("<div>").attr("role", "tooltip"),
        s = t("<div>").appendTo(i),
        n = i.uniqueId().attr("id");
      return this._addClass(s, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(e)), this.tooltips[n] = {
        element: e,
        tooltip: i
      }
    },
    _find: function(t) {
      var e = t.data("ui-tooltip-id");
      return e ? this.tooltips[e] : null
    },
    _removeTooltip: function(t) {
      t.remove(), delete this.tooltips[t.attr("id")]
    },
    _appendTo: function(t) {
      var e = t.closest(".ui-front, dialog");
      return e.length || (e = this.document[0].body), e
    },
    _destroy: function() {
      var e = this;
      t.each(this.tooltips, function(i, s) {
        var n = t.Event("blur"),
          o = s.element;
        n.target = n.currentTarget = o[0], e.close(n, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
      }), this.liveRegion.remove()
    }
  }), t.uiBackCompat !== !1 && t.widget("ui.tooltip", t.ui.tooltip, {
    options: {
      tooltipClass: null
    },
    _tooltip: function() {
      var t = this._superApply(arguments);
      return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass), t
    }
  }), t.ui.tooltip
});


/*
 * jQuery Easing v1.3.2 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
 */
(function(h) {
  h.easing.jswing = h.easing.swing;
  h.extend(h.easing, {
    def: "easeOutQuad",
    swing: function(e, a, c, b, d) {
      return h.easing[h.easing.def](e, a, c, b, d)
    },
    easeInQuad: function(e, a, c, b, d) {
      return b * (a /= d) * a + c
    },
    easeOutQuad: function(e, a, c, b, d) {
      return -b * (a /= d) * (a - 2) + c
    },
    easeInOutQuad: function(e, a, c, b, d) {
      return 1 > (a /= d / 2) ? b / 2 * a * a + c : -b / 2 * (--a * (a - 2) - 1) + c
    },
    easeInCubic: function(e, a, c, b, d) {
      return b * (a /= d) * a * a + c
    },
    easeOutCubic: function(e, a, c, b, d) {
      return b * ((a = a / d - 1) * a * a + 1) + c
    },
    easeInOutCubic: function(e, a, c, b, d) {
      return 1 >
        (a /= d / 2) ? b / 2 * a * a * a + c : b / 2 * ((a -= 2) * a * a + 2) + c
    },
    easeInQuart: function(e, a, c, b, d) {
      return b * (a /= d) * a * a * a + c
    },
    easeOutQuart: function(e, a, c, b, d) {
      return -b * ((a = a / d - 1) * a * a * a - 1) + c
    },
    easeInOutQuart: function(e, a, c, b, d) {
      return 1 > (a /= d / 2) ? b / 2 * a * a * a * a + c : -b / 2 * ((a -= 2) * a * a * a - 2) + c
    },
    easeInQuint: function(e, a, c, b, d) {
      return b * (a /= d) * a * a * a * a + c
    },
    easeOutQuint: function(e, a, c, b, d) {
      return b * ((a = a / d - 1) * a * a * a * a + 1) + c
    },
    easeInOutQuint: function(e, a, c, b, d) {
      return 1 > (a /= d / 2) ? b / 2 * a * a * a * a * a + c : b / 2 * ((a -= 2) * a * a * a * a + 2) + c
    },
    easeInSine: function(e, a,
      c, b, d) {
      return -b * Math.cos(a / d * (Math.PI / 2)) + b + c
    },
    easeOutSine: function(e, a, c, b, d) {
      return b * Math.sin(a / d * (Math.PI / 2)) + c
    },
    easeInOutSine: function(e, a, c, b, d) {
      return -b / 2 * (Math.cos(Math.PI * a / d) - 1) + c
    },
    easeInExpo: function(e, a, c, b, d) {
      return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c
    },
    easeOutExpo: function(e, a, c, b, d) {
      return a == d ? c + b : b * (-Math.pow(2, -10 * a / d) + 1) + c
    },
    easeInOutExpo: function(e, a, c, b, d) {
      return 0 == a ? c : a == d ? c + b : 1 > (a /= d / 2) ? b / 2 * Math.pow(2, 10 * (a - 1)) + c : b / 2 * (-Math.pow(2, -10 * --a) + 2) + c
    },
    easeInCirc: function(e, a, c, b, d) {
      return -b *
        (Math.sqrt(1 - (a /= d) * a) - 1) + c
    },
    easeOutCirc: function(e, a, c, b, d) {
      return b * Math.sqrt(1 - (a = a / d - 1) * a) + c
    },
    easeInOutCirc: function(e, a, c, b, d) {
      return 1 > (a /= d / 2) ? -b / 2 * (Math.sqrt(1 - a * a) - 1) + c : b / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + c
    },
    easeInElastic: function(e, a, c, b, d) {
      e = 1.70158;
      var f = 0,
        g = b;
      if (0 == a) return c;
      if (1 == (a /= d)) return c + b;
      f || (f = .3 * d);
      g < Math.abs(b) ? (g = b, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(b / g);
      return -(g * Math.pow(2, 10 * --a) * Math.sin(2 * (a * d - e) * Math.PI / f)) + c
    },
    easeOutElastic: function(e, a, c, b, d) {
      e = 1.70158;
      var f = 0,
        g = b;
      if (0 ==
        a) return c;
      if (1 == (a /= d)) return c + b;
      f || (f = .3 * d);
      g < Math.abs(b) ? (g = b, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(b / g);
      return g * Math.pow(2, -10 * a) * Math.sin(2 * (a * d - e) * Math.PI / f) + b + c
    },
    easeInOutElastic: function(e, a, c, b, d) {
      e = 1.70158;
      var f = 0,
        g = b;
      if (0 == a) return c;
      if (2 == (a /= d / 2)) return c + b;
      f || (f = .3 * d * 1.5);
      g < Math.abs(b) ? (g = b, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(b / g);
      return 1 > a ? -.5 * g * Math.pow(2, 10 * --a) * Math.sin(2 * (a * d - e) * Math.PI / f) + c : g * Math.pow(2, -10 * --a) * Math.sin(2 * (a * d - e) * Math.PI / f) * .5 + b + c
    },
    easeInBack: function(e, a, c, b, d, f) {
      void 0 ==
        f && (f = 1.70158);
      return b * (a /= d) * a * ((f + 1) * a - f) + c
    },
    easeOutBack: function(e, a, c, b, d, f) {
      void 0 == f && (f = 1.70158);
      return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c
    },
    easeInOutBack: function(e, a, c, b, d, f) {
      void 0 == f && (f = 1.70158);
      return 1 > (a /= d / 2) ? b / 2 * a * a * (((f *= 1.525) + 1) * a - f) + c : b / 2 * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + c
    },
    easeInBounce: function(e, a, c, b, d) {
      return b - h.easing.easeOutBounce(e, d - a, 0, b, d) + c
    },
    easeOutBounce: function(e, a, c, b, d) {
      return (a /= d) < 1 / 2.75 ? 7.5625 * b * a * a + c : a < 2 / 2.75 ? b * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + c : a < 2.5 / 2.75 ? b * (7.5625 *
        (a -= 2.25 / 2.75) * a + .9375) + c : b * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + c
    },
    easeInOutBounce: function(e, a, c, b, d) {
      return a < d / 2 ? .5 * h.easing.easeInBounce(e, 2 * a, 0, b, d) + c : .5 * h.easing.easeOutBounce(e, 2 * a - d, 0, b, d) + .5 * b + c
    }
  })
})(jQuery);


/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;
window.Modernizr = function(a, b, c) {
    function A(a) {
      j.cssText = a
    }

    function B(a, b) {
      return A(m.join(a + ";") + (b || ""))
    }

    function C(a, b) {
      return typeof a === b
    }

    function D(a, b) {
      return !!~("" + a).indexOf(b)
    }

    function E(a, b) {
      for (var d in a) {
        var e = a[d];
        if (!D(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
      }
      return !1
    }

    function F(a, b, d) {
      for (var e in a) {
        var f = b[a[e]];
        if (f !== c) return d === !1 ? a[e] : C(f, "function") ? f.bind(d || b) : f
      }
      return !1
    }

    function G(a, b, c) {
      var d = a.charAt(0).toUpperCase() + a.slice(1),
        e = (a + " " + o.join(d + " ") + d).split(" ");
      return C(b, "string") || C(b, "undefined") ? E(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), F(e, b, c))
    }
    var d = "2.8.3",
      e = {},
      f = !0,
      g = b.documentElement,
      h = "modernizr",
      i = b.createElement(h),
      j = i.style,
      k, l = {}.toString,
      m = " -webkit- -moz- -o- -ms- ".split(" "),
      n = "Webkit Moz O ms",
      o = n.split(" "),
      p = n.toLowerCase().split(" "),
      q = {},
      r = {},
      s = {},
      t = [],
      u = t.slice,
      v, w = function(a, c, d, e) {
        var f, i, j, k, l = b.createElement("div"),
          m = b.body,
          n = m || b.createElement("body");
        if (parseInt(d, 10))
          while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
        return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
      },
      x = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c) return c(b) && c(b).matches || !1;
        var d;
        return w("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
          d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute"
        }), d
      },
      y = {}.hasOwnProperty,
      z;
    !C(y, "undefined") && !C(y.call, "undefined") ? z = function(a, b) {
      return y.call(a, b)
    } : z = function(a, b) {
      return b in a && C(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
      var c = this;
      if (typeof c != "function") throw new TypeError;
      var d = u.call(arguments, 1),
        e = function() {
          if (this instanceof e) {
            var a = function() {};
            a.prototype = c.prototype;
            var f = new a,
              g = c.apply(f, d.concat(u.call(arguments)));
            return Object(g) === g ? g : f
          }
          return c.apply(b, d.concat(u.call(arguments)))
        };
      return e
    }), q.touch = function() {
      var c;
      return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : w(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
        c = a.offsetTop === 9
      }), c
    }, q.csstransitions = function() {
      return G("transition")
    };
    for (var H in q) z(q, H) && (v = H.toLowerCase(), e[v] = q[H](), t.push((e[v] ? "" : "no-") + v));
    return e.addTest = function(a, b) {
        if (typeof a == "object")
          for (var d in a) z(a, d) && e.addTest(d, a[d]);
        else {
          a = a.toLowerCase();
          if (e[a] !== c) return e;
          b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
      }, A(""), i = k = null,
      function(a, b) {
        function l(a, b) {
          var c = a.createElement("p"),
            d = a.getElementsByTagName("head")[0] || a.documentElement;
          return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function m() {
          var a = s.elements;
          return typeof a == "string" ? a.split(" ") : a
        }

        function n(a) {
          var b = j[a[h]];
          return b || (b = {}, i++, a[h] = i, j[i] = b), b
        }

        function o(a, c, d) {
          c || (c = b);
          if (k) return c.createElement(a);
          d || (d = n(c));
          var g;
          return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
        }

        function p(a, c) {
          a || (a = b);
          if (k) return a.createDocumentFragment();
          c = c || n(a);
          var d = c.frag.cloneNode(),
            e = 0,
            f = m(),
            g = f.length;
          for (; e < g; e++) d.createElement(f[e]);
          return d
        }

        function q(a, b) {
          b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
            return s.shivMethods ? o(c, a, b) : b.createElem(c)
          }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
            return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
          }) + ");return n}")(s, b.frag)
        }

        function r(a) {
          a || (a = b);
          var c = n(a);
          return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
        }
        var c = "3.7.0",
          d = a.html5 || {},
          e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
          f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
          g, h = "_html5shiv",
          i = 0,
          j = {},
          k;
        (function() {
          try {
            var a = b.createElement("a");
            a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function() {
              b.createElement("a");
              var a = b.createDocumentFragment();
              return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
            }()
          } catch (c) {
            g = !0, k = !0
          }
        })();
        var s = {
          elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
          version: c,
          shivCSS: d.shivCSS !== !1,
          supportsUnknownElements: k,
          shivMethods: d.shivMethods !== !1,
          type: "default",
          shivDocument: r,
          createElement: o,
          createDocumentFragment: p
        };
        a.html5 = s, r(b)
      }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.mq = x, e.testProp = function(a) {
        return E([a])
      }, e.testAllProps = G, e.testStyles = w, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e
  }(this, this.document),
  function(a, b, c) {
    function d(a) {
      return "[object Function]" == o.call(a)
    }

    function e(a) {
      return "string" == typeof a
    }

    function f() {}

    function g(a) {
      return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
      var a = p.shift();
      q = 1, a ? a.t ? m(function() {
        ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
      }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
      function k(b) {
        if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
          "img" != a && m(function() {
            t.removeChild(l)
          }, 50);
          for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
        }
      }
      var j = j || B.errorTimeout,
        l = b.createElement(a),
        o = 0,
        r = 0,
        u = {
          t: d,
          s: c,
          e: f,
          a: i,
          x: j
        };
      1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
        k.call(this, r)
      }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
      return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
      var a = B;
      return a.loader = {
        load: j,
        i: 0
      }, a
    }
    var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0],
      o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !!b.createRange().compareNode,
      t = s ? l : n.parentNode,
      l = a.opera && "[object Opera]" == o.call(a.opera),
      l = !!b.attachEvent && !l,
      u = r ? "object" : l ? "script" : "img",
      v = l ? "script" : u,
      w = Array.isArray || function(a) {
        return "[object Array]" == o.call(a)
      },
      x = [],
      y = {},
      z = {
        timeout: function(a, b) {
          return b.length && (a.timeout = b[0]), a
        }
      },
      A, B;
    B = function(a) {
      function b(a) {
        var a = a.split("!"),
          b = x.length,
          c = a.pop(),
          d = a.length,
          c = {
            url: c,
            origUrl: c,
            prefixes: a
          },
          e, f, g;
        for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
        for (f = 0; f < b; f++) c = x[f](c);
        return c
      }

      function g(a, e, f, g, h) {
        var i = b(a),
          j = i.autoCallback;
        i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
          k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
        })))
      }

      function h(a, b) {
        function c(a, c) {
          if (a) {
            if (e(a)) c || (j = function() {
              var a = [].slice.call(arguments);
              k.apply(this, a), l()
            }), g(a, j, b, 0, h);
            else if (Object(a) === a)
              for (n in m = function() {
                  var b = 0,
                    c;
                  for (c in a) a.hasOwnProperty(c) && b++;
                  return b
                }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                var a = [].slice.call(arguments);
                k.apply(this, a), l()
              } : j[n] = function(a) {
                return function() {
                  var b = [].slice.call(arguments);
                  a && a.apply(this, b), l()
                }
              }(k[n])), g(a[n], j, b, n, h))
          } else !c && l()
        }
        var h = !!a.test,
          i = a.load || a.both,
          j = a.callback || f,
          k = j,
          l = a.complete || f,
          m, n;
        c(h ? a.yep : a.nope, !!i), i && c(i)
      }
      var i, j, l = this.yepnope.loader;
      if (e(a)) g(a, 0, l, 0);
      else if (w(a))
        for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
      else Object(a) === a && h(a, l)
    }, B.addPrefix = function(a, b) {
      z[a] = b
    }, B.addFilter = function(a) {
      x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
      b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
      var k = b.createElement("script"),
        l, o, e = e || B.errorTimeout;
      k.src = a;
      for (o in d) k.setAttribute(o, d[o]);
      c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
        !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
      }, m(function() {
        l || (l = 1, c(1))
      }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
      var e = b.createElement("link"),
        j, c = i ? h : c || f;
      e.href = a, e.rel = "stylesheet", e.type = "text/css";
      for (j in d) e.setAttribute(j, d[j]);
      g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
  }(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
  };

/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function(a) {
  a.fn.appear = function(d, b) {
    var c = a.extend({
      data: undefined,
      one: true,
      accX: 0,
      accY: 0
    }, b);
    return this.each(function() {
      var g = a(this);
      g.appeared = false;
      if (!d) {
        g.trigger("appear", c.data);
        return
      }
      var f = a(window);
      var e = function() {
        if (!g.is(":visible")) {
          g.appeared = false;
          return
        }
        var r = f.scrollLeft();
        var q = f.scrollTop();
        var l = g.offset();
        var s = l.left;
        var p = l.top;
        var i = c.accX;
        var t = c.accY;
        var k = g.height();
        var j = f.height();
        var n = g.width();
        var m = f.width();
        if (p + k + t >= q && p <= q + j + t && s + n + i >= r && s <= r + m + i) {
          if (!g.appeared) {
            g.trigger("appear", c.data)
          }
        } else {
          g.appeared = false
        }
      };
      var h = function() {
        g.appeared = true;
        if (c.one) {
          f.unbind("scroll", e);
          var j = a.inArray(e, a.fn.appear.checks);
          if (j >= 0) {
            a.fn.appear.checks.splice(j, 1)
          }
        }
        d.apply(this, arguments)
      };
      if (c.one) {
        g.one("appear", c.data, h)
      } else {
        g.bind("appear", c.data, h)
      }
      f.scroll(e);
      a.fn.appear.checks.push(e);
      (e)()
    })
  };
  a.extend(a.fn.appear, {
    checks: [],
    timeout: null,
    checkAll: function() {
      var b = a.fn.appear.checks.length;
      if (b > 0) {
        while (b--) {
          (a.fn.appear.checks[b])()
        }
      }
    },
    run: function() {
      if (a.fn.appear.timeout) {
        clearTimeout(a.fn.appear.timeout)
      }
      a.fn.appear.timeout = setTimeout(a.fn.appear.checkAll, 20)
    }
  });
  a.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(c, d) {
    var b = a.fn[d];
    if (b) {
      a.fn[d] = function() {
        var e = b.apply(this, arguments);
        a.fn.appear.run();
        return e
      }
    }
  })
})(jQuery);

/*!
 * fullPage 2.9.4
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
! function(e, n) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], function(t) {
    return n(t, e, e.document, e.Math)
  }) : "object" == typeof exports && exports ? module.exports = n(require("jquery"), e, e.document, e.Math) : n(jQuery, e, e.document, e.Math)
}("undefined" != typeof window ? window : this, function(e, n, t, o, i) {
  "use strict";
  var a = "fullpage-wrapper",
    r = "." + a,
    l = "fp-scrollable",
    s = "." + l,
    c = "fp-responsive",
    d = "fp-notransition",
    f = "fp-destroyed",
    u = "fp-enabled",
    h = "fp-viewing",
    p = "active",
    v = "." + p,
    g = "fp-completely",
    m = "." + g,
    w = ".section",
    S = "fp-section",
    y = "." + S,
    b = y + v,
    x = y + ":first",
    C = y + ":last",
    T = "fp-tableCell",
    k = "." + T,
    I = "fp-auto-height",
    L = "fp-normal-scroll",
    E = "fp-nav",
    M = "#" + E,
    O = "fp-tooltip",
    A = "." + O,
    R = "fp-show-active",
    H = ".slide",
    B = "fp-slide",
    z = "." + B,
    D = z + v,
    P = "fp-slides",
    q = "." + P,
    F = "fp-slidesContainer",
    V = "." + F,
    W = "fp-table",
    U = "fp-slidesNav",
    Y = "." + U,
    j = Y + " a",
    N = "fp-controlArrow",
    X = "." + N,
    K = "fp-prev",
    Q = "." + K,
    G = N + " " + K,
    J = X + Q,
    Z = "fp-next",
    $ = "." + Z,
    _ = N + " " + Z,
    ee = X + $,
    ne = e(n),
    te = e(t),
    oe = {
      scrollbars: !0,
      mouseWheel: !0,
      hideScrollbars: !1,
      fadeScrollbars: !1,
      disableMouse: !0,
      interactiveScrollbars: !0
    };
  e.fn.fullpage = function(l) {
    function s(n, t) {
      n || nt(0), rt("autoScrolling", n, t);
      var o = e(b);
      l.autoScrolling && !l.scrollBar ? (ct.css({
        overflow: "hidden",
        height: "100%"
      }), N(Bt.recordHistory, "internal"), St.css({
        "-ms-touch-action": "none",
        "touch-action": "none"
      }), o.length && nt(o.position().top)) : (ct.css({
        overflow: "visible",
        height: "initial"
      }), N(!1, "internal"), St.css({
        "-ms-touch-action": "",
        "touch-action": ""
      }), o.length && ct.scrollTop(o.position().top))
    }

    function N(e, n) {
      rt("recordHistory", e, n)
    }

    function Q(e, n) {
      rt("scrollingSpeed", e, n)
    }

    function Z(e, n) {
      rt("fitToSection", e, n)
    }

    function $(e) {
      l.lockAnchors = e
    }

    function ae(e) {
      e ? (Kn(), Qn()) : (Xn(), Gn())
    }

    function re(n, t) {
      "undefined" != typeof t ? (t = t.replace(/ /g, "").split(","), e.each(t, function(e, t) {
        ot(n, t, "m")
      })) : n ? (ae(!0), Jn()) : (ae(!1), Zn())
    }

    function le(n, t) {
      "undefined" != typeof t ? (t = t.replace(/ /g, "").split(","), e.each(t, function(e, t) {
        ot(n, t, "k")
      })) : l.keyboardScrolling = n
    }

    function se() {
      var n = e(b).prev(y);
      n.length || !l.loopTop && !l.continuousVertical || (n = e(y).last()), n.length && Ke(n, null, !0)
    }

    function ce() {
      var n = e(b).next(y);
      n.length || !l.loopBottom && !l.continuousVertical || (n = e(y).first()), n.length && Ke(n, null, !1)
    }

    function de(e, n) {
      Q(0, "internal"), fe(e, n), Q(Bt.scrollingSpeed, "internal")
    }

    function fe(e, n) {
      var t = Dn(e);
      "undefined" != typeof n ? qn(e, n) : t.length > 0 && Ke(t)
    }

    function ue(e) {
      je("right", e)
    }

    function he(e) {
      je("left", e)
    }

    function pe(n) {
      if (!St.hasClass(f)) {
        bt = !0, yt = ne.height(), e(y).each(function() {
          var n = e(this).find(q),
            t = e(this).find(z);
          l.verticalCentered && e(this).find(k).css("height", Bn(e(this)) + "px"), e(this).css("height", yt + "px"), l.scrollOverflow && (t.length ? t.each(function() {
            Rn(e(this))
          }) : Rn(e(this))), t.length > 1 && Sn(n, n.find(D))
        });
        var t = e(b),
          o = t.index(y);
        o && de(o + 1), bt = !1, e.isFunction(l.afterResize) && n && l.afterResize.call(St), e.isFunction(l.afterReBuild) && !n && l.afterReBuild.call(St)
      }
    }

    function ve(n) {
      var t = dt.hasClass(c);
      n ? t || (s(!1, "internal"), Z(!1, "internal"), e(M).hide(), dt.addClass(c), e.isFunction(l.afterResponsive) && l.afterResponsive.call(St, n)) : t && (s(Bt.autoScrolling, "internal"), Z(Bt.autoScrolling, "internal"), e(M).show(), dt.removeClass(c), e.isFunction(l.afterResponsive) && l.afterResponsive.call(St, n))
    }

    function ge() {
      l.css3 && (l.css3 = Nn()), l.scrollBar = l.scrollBar || l.hybrid, we(), Se(), re(!0), s(l.autoScrolling, "internal"), Tn(), jn(), "complete" === t.readyState && rn(), ne.on("load", rn)
    }

    function me() {
      ne.on("scroll", Re).on("hashchange", ln).blur(pn).resize(Cn), te.keydown(sn).keyup(dn).on("click touchstart", M + " a", vn).on("click touchstart", j, gn).on("click", A, cn), e(y).on("click touchstart", X, hn), l.normalScrollElements && (te.on("mouseenter", l.normalScrollElements, function() {
        ae(!1)
      }), te.on("mouseleave", l.normalScrollElements, function() {
        ae(!0)
      }))
    }

    function we() {
      var n = St.find(l.sectionSelector);
      l.anchors.length || (l.anchors = n.filter("[data-anchor]").map(function() {
        return e(this).data("anchor").toString()
      }).get()), l.navigationTooltips.length || (l.navigationTooltips = n.filter("[data-tooltip]").map(function() {
        return e(this).data("tooltip").toString()
      }).get())
    }

    function Se() {
      St.css({
        height: "100%",
        position: "relative"
      }), St.addClass(a), e("html").addClass(u), yt = ne.height(), St.removeClass(f), Ce(), e(y).each(function(n) {
        var t = e(this),
          o = t.find(z),
          i = o.length;
        be(t, n), xe(t, n), i > 0 ? ye(t, o, i) : l.verticalCentered && Hn(t)
      }), l.fixedElements && l.css3 && e(l.fixedElements).appendTo(dt), l.navigation && ke(), Le(), l.scrollOverflow ? ("complete" === t.readyState && Ie(), ne.on("load", Ie)) : Oe()
    }

    function ye(n, t, o) {
      var i = 100 * o,
        a = 100 / o;
      t.wrapAll('<div class="' + F + '" />'), t.parent().wrap('<div class="' + P + '" />'), n.find(V).css("width", i + "%"), o > 1 && (l.controlArrows && Te(n), l.slidesNavigation && Vn(n, o)), t.each(function(n) {
        e(this).css("width", a + "%"), l.verticalCentered && Hn(e(this))
      });
      var r = n.find(D);
      r.length && (0 !== e(b).index(y) || 0 === e(b).index(y) && 0 !== r.index()) ? et(r, "internal") : t.eq(0).addClass(p)
    }

    function be(n, t) {
      t || 0 !== e(b).length || n.addClass(p), vt = e(b), n.css("height", yt + "px"), l.paddingTop && n.css("padding-top", l.paddingTop), l.paddingBottom && n.css("padding-bottom", l.paddingBottom), "undefined" != typeof l.sectionsColor[t] && n.css("background-color", l.sectionsColor[t]), "undefined" != typeof l.anchors[t] && n.attr("data-anchor", l.anchors[t])
    }

    function xe(n, t) {
      "undefined" != typeof l.anchors[t] && n.hasClass(p) && Mn(l.anchors[t], t), l.menu && l.css3 && e(l.menu).closest(r).length && e(l.menu).appendTo(dt)
    }

    function Ce() {
      St.find(l.sectionSelector).addClass(S), St.find(l.slideSelector).addClass(B)
    }

    function Te(e) {
      e.find(q).after('<div class="' + G + '"></div><div class="' + _ + '"></div>'), "#fff" != l.controlArrowColor && (e.find(ee).css("border-color", "transparent transparent transparent " + l.controlArrowColor), e.find(J).css("border-color", "transparent " + l.controlArrowColor + " transparent transparent")), l.loopHorizontal || e.find(J).hide()
    }

    function ke() {
      dt.append('<div id="' + E + '"><ul></ul></div>');
      var n = e(M);
      n.addClass(function() {
        return l.showActiveTooltip ? R + " " + l.navigationPosition : l.navigationPosition
      });
      for (var t = 0; t < e(y).length; t++) {
        var o = "";
        l.anchors.length && (o = l.anchors[t]);
        var i = '<li><a href="#' + o + '"><span></span></a>',
          a = l.navigationTooltips[t];
        "undefined" != typeof a && "" !== a && (i += '<div class="' + O + " " + l.navigationPosition + '">' + a + "</div>"), i += "</li>", n.find("ul").append(i)
      }
      e(M).css("margin-top", "-" + e(M).height() / 2 + "px"), e(M).find("li").eq(e(b).index(y)).find("a").addClass(p)
    }

    function Ie() {
      e(y).each(function() {
        var n = e(this).find(z);
        n.length ? n.each(function() {
          Rn(e(this))
        }) : Rn(e(this))
      }), Oe()
    }

    function Le() {
      St.find('iframe[src*="youtube.com/embed/"]').each(function() {
        Ee(e(this), "enablejsapi=1")
      })
    }

    function Ee(e, n) {
      var t = e.attr("src");
      e.attr("src", t + Me(t) + n)
    }

    function Me(e) {
      return /\?/.test(e) ? "&" : "?"
    }

    function Oe() {
      var n = e(b);
      n.addClass(g), l.scrollOverflowHandler.afterRender && l.scrollOverflowHandler.afterRender(n), en(n), nn(n), l.scrollOverflowHandler.afterLoad(), Ae() && e.isFunction(l.afterLoad) && l.afterLoad.call(n, n.data("anchor"), n.index(y) + 1), e.isFunction(l.afterRender) && l.afterRender.call(St)
    }

    function Ae() {
      var e = n.location.hash.replace("#", "").split("/"),
        t = Dn(decodeURIComponent(e[0]));
      return !t.length || t.length && t.index() === vt.index()
    }

    function Re() {
      var n;
      if (!l.autoScrolling || l.scrollBar) {
        var o = ne.scrollTop(),
          i = ze(o),
          a = 0,
          r = o + ne.height() / 2,
          s = dt.height() - ne.height() === o,
          c = t.querySelectorAll(y);
        if (s) a = c.length - 1;
        else if (o)
          for (var d = 0; d < c.length; ++d) {
            var f = c[d];
            f.offsetTop <= r && (a = d)
          } else a = 0;
        if (Be(i) && (e(b).hasClass(g) || e(b).addClass(g).siblings().removeClass(g)), n = e(c).eq(a), !n.hasClass(p)) {
          zt = !0;
          var u, h, v = e(b),
            m = v.index(y) + 1,
            w = On(n),
            S = n.data("anchor"),
            x = n.index(y) + 1,
            C = n.find(D);
          C.length && (h = C.data("anchor"), u = C.index()), Ct && (n.addClass(p).siblings().removeClass(p), e.isFunction(l.onLeave) && l.onLeave.call(v, m, x, w), e.isFunction(l.afterLoad) && l.afterLoad.call(n, S, x), on(v), en(n), nn(n), Mn(S, x - 1), l.anchors.length && (ut = S), Wn(u, h, S, x)), clearTimeout(Mt), Mt = setTimeout(function() {
            zt = !1
          }, 100)
        }
        l.fitToSection && (clearTimeout(Ot), Ot = setTimeout(function() {
          l.fitToSection && He()
        }, l.fitToSectionDelay))
      }
    }

    function He() {
      Ct && (bt = !0, Ke(e(b)), bt = !1)
    }

    function Be(n) {
      var t = e(b).position().top,
        o = t + ne.height();
      return "up" == n ? o >= ne.scrollTop() + ne.height() : t <= ne.scrollTop()
    }

    function ze(e) {
      var n = e > Dt ? "down" : "up";
      return Dt = e, Ut = e, n
    }

    function De(e, n) {
      if (kt.m[e]) {
        var t = "down" === e ? "bottom" : "top",
          o = "down" === e ? ce : se;
        if (n.length > 0) {
          if (!l.scrollOverflowHandler.isScrolled(t, n)) return !0;
          o()
        } else o()
      }
    }

    function Pe(e) {
      var n = e.originalEvent;
      !Fe(e.target) && l.autoScrolling && Ve(n) && e.preventDefault()
    }

    function qe(n) {
      var t = n.originalEvent,
        i = e(t.target).closest(y);
      if (!Fe(n.target) && Ve(t)) {
        l.autoScrolling && n.preventDefault();
        var a = l.scrollOverflowHandler.scrollable(i),
          r = _n(t);
        Ft = r.y, Vt = r.x, i.find(q).length && o.abs(qt - Vt) > o.abs(Pt - Ft) ? !gt && o.abs(qt - Vt) > ne.outerWidth() / 100 * l.touchSensitivity && (qt > Vt ? kt.m.right && ue(i) : kt.m.left && he(i)) : l.autoScrolling && Ct && o.abs(Pt - Ft) > ne.height() / 100 * l.touchSensitivity && (Pt > Ft ? De("down", a) : Ft > Pt && De("up", a))
      }
    }

    function Fe(n, t) {
      t = t || 0;
      var o = e(n).parent();
      return t < l.normalScrollElementTouchThreshold && o.is(l.normalScrollElements) ? !0 : t == l.normalScrollElementTouchThreshold ? !1 : Fe(o, ++t)
    }

    function Ve(e) {
      return "undefined" == typeof e.pointerType || "mouse" != e.pointerType
    }

    function We(e) {
      var n = e.originalEvent;
      if (l.fitToSection && ct.stop(), Ve(n)) {
        var t = _n(n);
        Pt = t.y, qt = t.x
      }
    }

    function Ue(e, n) {
      for (var t = 0, i = e.slice(o.max(e.length - n, 1)), a = 0; a < i.length; a++) t += i[a];
      return o.ceil(t / n)
    }

    function Ye(t) {
      var i = (new Date).getTime(),
        a = e(m).hasClass(L);
      if (l.autoScrolling && !pt && !a) {
        t = t || n.event;
        var r = t.wheelDelta || -t.deltaY || -t.detail,
          s = o.max(-1, o.min(1, r)),
          c = "undefined" != typeof t.wheelDeltaX || "undefined" != typeof t.deltaX,
          d = o.abs(t.wheelDeltaX) < o.abs(t.wheelDelta) || o.abs(t.deltaX) < o.abs(t.deltaY) || !c;
        Tt.length > 149 && Tt.shift(), Tt.push(o.abs(r)), l.scrollBar && (t.preventDefault ? t.preventDefault() : t.returnValue = !1);
        var f = e(b),
          u = l.scrollOverflowHandler.scrollable(f),
          h = i - Wt;
        if (Wt = i, h > 200 && (Tt = []), Ct) {
          var p = Ue(Tt, 10),
            v = Ue(Tt, 70),
            g = p >= v;
          g && d && (0 > s ? De("down", u) : De("up", u))
        }
        return !1
      }
      l.fitToSection && ct.stop()
    }

    function je(n, t) {
      var o = "undefined" == typeof t ? e(b) : t,
        i = o.find(q),
        a = i.find(z).length;
      if (!(!i.length || gt || 2 > a)) {
        var r = i.find(D),
          s = null;
        if (s = "left" === n ? r.prev(z) : r.next(z), !s.length) {
          if (!l.loopHorizontal) return;
          s = "left" === n ? r.siblings(":last") : r.siblings(":first")
        }
        gt = !0, Sn(i, s, n)
      }
    }

    function Ne() {
      e(D).each(function() {
        et(e(this), "internal")
      })
    }

    function Xe(e) {
      var n = e.position(),
        t = n.top,
        o = n.top > Ut,
        i = t - yt + e.outerHeight(),
        a = l.bigSectionsDestination;
      return e.outerHeight() > yt ? (!o && !a || "bottom" === a) && (t = i) : (o || bt && e.is(":last-child")) && (t = i), Ut = t, t
    }

    function Ke(n, t, o) {
      if ("undefined" != typeof n) {
        var i, a, r = Xe(n),
          s = {
            element: n,
            callback: t,
            isMovementUp: o,
            dtop: r,
            yMovement: On(n),
            anchorLink: n.data("anchor"),
            sectionIndex: n.index(y),
            activeSlide: n.find(D),
            activeSection: e(b),
            leavingSection: e(b).index(y) + 1,
            localIsResizing: bt
          };
        s.activeSection.is(n) && !bt || l.scrollBar && ne.scrollTop() === s.dtop && !n.hasClass(I) || (s.activeSlide.length && (i = s.activeSlide.data("anchor"), a = s.activeSlide.index()), l.autoScrolling && l.continuousVertical && "undefined" != typeof s.isMovementUp && (!s.isMovementUp && "up" == s.yMovement || s.isMovementUp && "down" == s.yMovement) && (s = Je(s)), (!e.isFunction(l.onLeave) || s.localIsResizing || l.onLeave.call(s.activeSection, s.leavingSection, s.sectionIndex + 1, s.yMovement) !== !1) && (s.localIsResizing || on(s.activeSection), l.scrollOverflowHandler.beforeLeave(), n.addClass(p).siblings().removeClass(p), en(n), l.scrollOverflowHandler.onLeave(), Ct = !1, Wn(a, i, s.anchorLink, s.sectionIndex), Qe(s), ut = s.anchorLink, Mn(s.anchorLink, s.sectionIndex)))
      }
    }

    function Qe(n) {
      if (l.css3 && l.autoScrolling && !l.scrollBar) {
        var t = "translate3d(0px, -" + o.round(n.dtop) + "px, 0px)";
        zn(t, !0), l.scrollingSpeed ? (clearTimeout(Lt), Lt = setTimeout(function() {
          $e(n)
        }, l.scrollingSpeed)) : $e(n)
      } else {
        var i = Ge(n);
        e(i.element).animate(i.options, l.scrollingSpeed, l.easing).promise().done(function() {
          l.scrollBar ? setTimeout(function() {
            $e(n)
          }, 30) : $e(n)
        })
      }
    }

    function Ge(e) {
      var n = {};
      return l.autoScrolling && !l.scrollBar ? (n.options = {
        top: -e.dtop
      }, n.element = r) : (n.options = {
        scrollTop: e.dtop
      }, n.element = "html, body"), n
    }

    function Je(n) {
      return n.isMovementUp ? e(b).before(n.activeSection.nextAll(y)) : e(b).after(n.activeSection.prevAll(y).get().reverse()), nt(e(b).position().top), Ne(), n.wrapAroundElements = n.activeSection, n.dtop = n.element.position().top, n.yMovement = On(n.element), n
    }

    function Ze(n) {
      n.wrapAroundElements && n.wrapAroundElements.length && (n.isMovementUp ? e(x).before(n.wrapAroundElements) : e(C).after(n.wrapAroundElements), nt(e(b).position().top), Ne())
    }

    function $e(n) {
      Ze(n), e.isFunction(l.afterLoad) && !n.localIsResizing && l.afterLoad.call(n.element, n.anchorLink, n.sectionIndex + 1), l.scrollOverflowHandler.afterLoad(), n.localIsResizing || nn(n.element), n.element.addClass(g).siblings().removeClass(g), Ct = !0, e.isFunction(n.callback) && n.callback.call(this)
    }

    function _e(e, n) {
      e.attr(n, e.data(n)).removeAttr("data-" + n)
    }

    function en(n) {
      if (l.lazyLoading) {
        var t, o = an(n);
        o.find("img[data-src], img[data-srcset], source[data-src], audio[data-src], iframe[data-src]").each(function() {
          t = e(this), e.each(["src", "srcset"], function(e, n) {
            var o = t.attr("data-" + n);
            "undefined" != typeof o && o && _e(t, n)
          }), t.is("source") && t.closest("video").get(0).load()
        })
      }
    }

    function nn(n) {
      var t = an(n);
      t.find("video, audio").each(function() {
        var n = e(this).get(0);
        n.hasAttribute("data-autoplay") && "function" == typeof n.play && n.play()
      }), t.find('iframe[src*="youtube.com/embed/"]').each(function() {
        var n = e(this).get(0);
        n.hasAttribute("data-autoplay") && tn(n), n.onload = function() {
          n.hasAttribute("data-autoplay") && tn(n)
        }
      })
    }

    function tn(e) {
      e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
    }

    function on(n) {
      var t = an(n);
      t.find("video, audio").each(function() {
        var n = e(this).get(0);
        n.hasAttribute("data-keepplaying") || "function" != typeof n.pause || n.pause()
      }), t.find('iframe[src*="youtube.com/embed/"]').each(function() {
        var n = e(this).get(0);
        /youtube\.com\/embed\//.test(e(this).attr("src")) && !n.hasAttribute("data-keepplaying") && e(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
      })
    }

    function an(n) {
      var t = n.find(D);
      return t.length && (n = e(t)), n
    }

    function rn() {
      var e = n.location.hash.replace("#", "").split("/"),
        t = decodeURIComponent(e[0]),
        o = decodeURIComponent(e[1]);
      t && (l.animateAnchor ? qn(t, o) : de(t, o))
    }

    function ln() {
      if (!zt && !l.lockAnchors) {
        var e = n.location.hash.replace("#", "").split("/"),
          t = decodeURIComponent(e[0]),
          o = decodeURIComponent(e[1]),
          i = "undefined" == typeof ut,
          a = "undefined" == typeof ut && "undefined" == typeof o && !gt;
        t.length && (t && t !== ut && !i || a || !gt && ht != o) && qn(t, o)
      }
    }

    function sn(n) {
      clearTimeout(At);
      var t = e(":focus");
      if (!t.is("textarea") && !t.is("input") && !t.is("select") && "true" !== t.attr("contentEditable") && "" !== t.attr("contentEditable") && l.keyboardScrolling && l.autoScrolling) {
        var o = n.which,
          i = [40, 38, 32, 33, 34];
        e.inArray(o, i) > -1 && n.preventDefault(), pt = n.ctrlKey, At = setTimeout(function() {
          mn(n)
        }, 150)
      }
    }

    function cn() {
      e(this).prev().trigger("click")
    }

    function dn(e) {
      xt && (pt = e.ctrlKey)
    }

    function fn(e) {
      2 == e.which && (Yt = e.pageY, St.on("mousemove", wn))
    }

    function un(e) {
      2 == e.which && St.off("mousemove")
    }

    function hn() {
      var n = e(this).closest(y);
      e(this).hasClass(K) ? kt.m.left && he(n) : kt.m.right && ue(n)
    }

    function pn() {
      xt = !1, pt = !1
    }

    function vn(n) {
      n.preventDefault();
      var t = e(this).parent().index();
      Ke(e(y).eq(t))
    }

    function gn(n) {
      n.preventDefault();
      var t = e(this).closest(y).find(q),
        o = t.find(z).eq(e(this).closest("li").index());
      Sn(t, o)
    }

    function mn(n) {
      var t = n.shiftKey;
      if (Ct || !([37, 39].indexOf(n.which) < 0)) switch (n.which) {
        case 38:
        case 33:
          kt.k.up && se();
          break;
        case 32:
          if (t && kt.k.up) {
            se();
            break
          }
          case 40:
          case 34:
            kt.k.down && ce();
            break;
          case 36:
            kt.k.up && fe(1);
            break;
          case 35:
            kt.k.down && fe(e(y).length);
            break;
          case 37:
            kt.k.left && he();
            break;
          case 39:
            kt.k.right && ue();
            break;
          default:
            return
      }
    }

    function wn(e) {
      Ct && (e.pageY < Yt && kt.m.up ? se() : e.pageY > Yt && kt.m.down && ce()), Yt = e.pageY
    }

    function Sn(n, t, o) {
      var i = n.closest(y),
        a = {
          slides: n,
          destiny: t,
          direction: o,
          destinyPos: t.position(),
          slideIndex: t.index(),
          section: i,
          sectionIndex: i.index(y),
          anchorLink: i.data("anchor"),
          slidesNav: i.find(Y),
          slideAnchor: Yn(t),
          prevSlide: i.find(D),
          prevSlideIndex: i.find(D).index(),
          localIsResizing: bt
        };
      return a.xMovement = An(a.prevSlideIndex, a.slideIndex), a.localIsResizing || (Ct = !1), l.onSlideLeave && !a.localIsResizing && "none" !== a.xMovement && e.isFunction(l.onSlideLeave) && l.onSlideLeave.call(a.prevSlide, a.anchorLink, a.sectionIndex + 1, a.prevSlideIndex, a.xMovement, a.slideIndex) === !1 ? void(gt = !1) : (t.addClass(p).siblings().removeClass(p), a.localIsResizing || (on(a.prevSlide), en(t)), !l.loopHorizontal && l.controlArrows && (i.find(J).toggle(0 !== a.slideIndex), i.find(ee).toggle(!t.is(":last-child"))), i.hasClass(p) && !a.localIsResizing && Wn(a.slideIndex, a.slideAnchor, a.anchorLink, a.sectionIndex), void bn(n, a, !0))
    }

    function yn(n) {
      xn(n.slidesNav, n.slideIndex), n.localIsResizing || (e.isFunction(l.afterSlideLoad) && l.afterSlideLoad.call(n.destiny, n.anchorLink, n.sectionIndex + 1, n.slideAnchor, n.slideIndex), Ct = !0, nn(n.destiny)), gt = !1
    }

    function bn(e, n, t) {
      var i = n.destinyPos;
      if (l.css3) {
        var a = "translate3d(-" + o.round(i.left) + "px, 0px, 0px)";
        kn(e.find(V)).css(tt(a)), Et = setTimeout(function() {
          t && yn(n)
        }, l.scrollingSpeed, l.easing)
      } else e.animate({
        scrollLeft: o.round(i.left)
      }, l.scrollingSpeed, l.easing, function() {
        t && yn(n)
      })
    }

    function xn(e, n) {
      e.find(v).removeClass(p), e.find("li").eq(n).find("a").addClass(p)
    }

    function Cn() {
      if (Tn(), mt) {
        var n = e(t.activeElement);
        if (!n.is("textarea") && !n.is("input") && !n.is("select")) {
          var i = ne.height();
          o.abs(i - jt) > 20 * o.max(jt, i) / 100 && (pe(!0), jt = i)
        }
      } else clearTimeout(It), It = setTimeout(function() {
        pe(!0)
      }, 350)
    }

    function Tn() {
      var e = l.responsive || l.responsiveWidth,
        n = l.responsiveHeight,
        t = e && ne.outerWidth() < e,
        o = n && ne.height() < n;
      e && n ? ve(t || o) : e ? ve(t) : n && ve(o)
    }

    function kn(e) {
      var n = "all " + l.scrollingSpeed + "ms " + l.easingcss3;
      return e.removeClass(d), e.css({
        "-webkit-transition": n,
        transition: n
      })
    }

    function In(e) {
      return e.addClass(d)
    }

    function Ln(n, t) {
      l.navigation && (e(M).find(v).removeClass(p), n ? e(M).find('a[href="#' + n + '"]').addClass(p) : e(M).find("li").eq(t).find("a").addClass(p))
    }

    function En(n) {
      l.menu && (e(l.menu).find(v).removeClass(p), e(l.menu).find('[data-menuanchor="' + n + '"]').addClass(p))
    }

    function Mn(e, n) {
      En(e), Ln(e, n)
    }

    function On(n) {
      var t = e(b).index(y),
        o = n.index(y);
      return t == o ? "none" : t > o ? "up" : "down"
    }

    function An(e, n) {
      return e == n ? "none" : e > n ? "left" : "right"
    }

    function Rn(e) {
      if (!e.hasClass("fp-noscroll")) {
        e.css("overflow", "hidden");
        var n, t = l.scrollOverflowHandler,
          o = t.wrapContent(),
          i = e.closest(y),
          a = t.scrollable(e);
        a.length ? n = t.scrollHeight(e) : (n = e.get(0).scrollHeight, l.verticalCentered && (n = e.find(k).get(0).scrollHeight));
        var r = yt - parseInt(i.css("padding-bottom")) - parseInt(i.css("padding-top"));
        n > r ? a.length ? t.update(e, r) : (l.verticalCentered ? e.find(k).wrapInner(o) : e.wrapInner(o), t.create(e, r)) : t.remove(e), e.css("overflow", "")
      }
    }

    function Hn(e) {
      e.hasClass(W) || e.addClass(W).wrapInner('<div class="' + T + '" style="height:' + Bn(e) + 'px;" />')
    }

    function Bn(e) {
      var n = yt;
      if (l.paddingTop || l.paddingBottom) {
        var t = e;
        t.hasClass(S) || (t = e.closest(y));
        var o = parseInt(t.css("padding-top")) + parseInt(t.css("padding-bottom"));
        n = yt - o
      }
      return n
    }

    function zn(e, n) {
      n ? kn(St) : In(St), St.css(tt(e)), setTimeout(function() {
        St.removeClass(d)
      }, 10)
    }

    function Dn(n) {
      if (!n) return [];
      var t = St.find(y + '[data-anchor="' + n + '"]');
      return t.length || (t = e(y).eq(n - 1)), t
    }

    function Pn(e, n) {
      var t = n.find(q),
        o = t.find(z + '[data-anchor="' + e + '"]');
      return o.length || (o = t.find(z).eq(e)), o
    }

    function qn(e, n) {
      var t = Dn(e);
      t.length && ("undefined" == typeof n && (n = 0), e === ut || t.hasClass(p) ? Fn(t, n) : Ke(t, function() {
        Fn(t, n)
      }))
    }

    function Fn(e, n) {
      if ("undefined" != typeof n) {
        var t = e.find(q),
          o = Pn(n, e);
        o.length && Sn(t, o)
      }
    }

    function Vn(e, n) {
      e.append('<div class="' + U + '"><ul></ul></div>');
      var t = e.find(Y);
      t.addClass(l.slidesNavPosition);
      for (var o = 0; n > o; o++) t.find("ul").append('<li><a href="#"><span></span></a></li>');
      t.css("margin-left", "-" + t.width() / 2 + "px"), t.find("li").first().find("a").addClass(p)
    }

    function Wn(e, n, t, o) {
      var i = "";
      l.anchors.length && !l.lockAnchors && (e ? ("undefined" != typeof t && (i = t), "undefined" == typeof n && (n = e), ht = n, Un(i + "/" + n)) : "undefined" != typeof e ? (ht = n, Un(t)) : Un(t)), jn()
    }

    function Un(e) {
      if (l.recordHistory) location.hash = e;
      else if (mt || wt) n.history.replaceState(i, i, "#" + e);
      else {
        var t = n.location.href.split("#")[0];
        n.location.replace(t + "#" + e)
      }
    }

    function Yn(e) {
      var n = e.data("anchor"),
        t = e.index();
      return "undefined" == typeof n && (n = t), n
    }

    function jn() {
      var n = e(b),
        t = n.find(D),
        o = Yn(n),
        i = Yn(t),
        a = String(o);
      t.length && (a = a + "-" + i), a = a.replace("/", "-").replace("#", "");
      var r = new RegExp("\\b\\s?" + h + "-[^\\s]+\\b", "g");
      dt[0].className = dt[0].className.replace(r, ""), dt.addClass(h + "-" + a)
    }

    function Nn() {
      var e, o = t.createElement("p"),
        a = {
          webkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          msTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform"
        };
      t.body.insertBefore(o, null);
      for (var r in a) o.style[r] !== i && (o.style[r] = "translate3d(1px,1px,1px)", e = n.getComputedStyle(o).getPropertyValue(a[r]));
      return t.body.removeChild(o), e !== i && e.length > 0 && "none" !== e
    }

    function Xn() {
      t.addEventListener ? (t.removeEventListener("mousewheel", Ye, !1), t.removeEventListener("wheel", Ye, !1), t.removeEventListener("MozMousePixelScroll", Ye, !1)) : t.detachEvent("onmousewheel", Ye)
    }

    function Kn() {
      var e, o = "";
      n.addEventListener ? e = "addEventListener" : (e = "attachEvent", o = "on");
      var a = "onwheel" in t.createElement("div") ? "wheel" : t.onmousewheel !== i ? "mousewheel" : "DOMMouseScroll";
      "DOMMouseScroll" == a ? t[e](o + "MozMousePixelScroll", Ye, !1) : t[e](o + a, Ye, !1)
    }

    function Qn() {
      St.on("mousedown", fn).on("mouseup", un)
    }

    function Gn() {
      St.off("mousedown", fn).off("mouseup", un)
    }

    function Jn() {
      (mt || wt) && (l.autoScrolling && dt.off(Ht.touchmove).on(Ht.touchmove, Pe), e(r).off(Ht.touchstart).on(Ht.touchstart, We).off(Ht.touchmove).on(Ht.touchmove, qe))
    }

    function Zn() {
      (mt || wt) && e(r).off(Ht.touchstart).off(Ht.touchmove)
    }

    function $n() {
      var e;
      return e = n.PointerEvent ? {
        down: "pointerdown",
        move: "pointermove"
      } : {
        down: "MSPointerDown",
        move: "MSPointerMove"
      }
    }

    function _n(e) {
      var n = [];
      return n.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, n.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, wt && Ve(e) && l.scrollBar && (n.y = e.touches[0].pageY, n.x = e.touches[0].pageX), n
    }

    function et(e, n) {
      Q(0, "internal"), "undefined" != typeof n && (bt = !0), Sn(e.closest(q), e), "undefined" != typeof n && (bt = !1), Q(Bt.scrollingSpeed, "internal")
    }

    function nt(e) {
      var n = o.round(e);
      if (l.css3 && l.autoScrolling && !l.scrollBar) {
        var t = "translate3d(0px, -" + n + "px, 0px)";
        zn(t, !1)
      } else l.autoScrolling && !l.scrollBar ? St.css("top", -n) : ct.scrollTop(n)
    }

    function tt(e) {
      return {
        "-webkit-transform": e,
        "-moz-transform": e,
        "-ms-transform": e,
        transform: e
      }
    }

    function ot(e, n, t) {
      switch (n) {
        case "up":
          kt[t].up = e;
          break;
        case "down":
          kt[t].down = e;
          break;
        case "left":
          kt[t].left = e;
          break;
        case "right":
          kt[t].right = e;
          break;
        case "all":
          "m" == t ? re(e) : le(e)
      }
    }

    function it(n) {
      s(!1, "internal"), re(!1), le(!1), St.addClass(f), clearTimeout(Et), clearTimeout(Lt), clearTimeout(It), clearTimeout(Mt), clearTimeout(Ot), ne.off("scroll", Re).off("hashchange", ln).off("resize", Cn), te.off("click touchstart", M + " a").off("mouseenter", M + " li").off("mouseleave", M + " li").off("click touchstart", j).off("mouseover", l.normalScrollElements).off("mouseout", l.normalScrollElements), e(y).off("click touchstart", X), clearTimeout(Et), clearTimeout(Lt), n && at()
    }

    function at() {
      nt(0), St.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function() {
        _e(e(this), "src")
      }), St.find("img[data-srcset]").each(function() {
        _e(e(this), "srcset")
      }), e(M + ", " + Y + ", " + X).remove(), e(y).css({
        height: "",
        "background-color": "",
        padding: ""
      }), e(z).css({
        width: ""
      }), St.css({
        height: "",
        position: "",
        "-ms-touch-action": "",
        "touch-action": ""
      }), ct.css({
        overflow: "",
        height: ""
      }), e("html").removeClass(u), dt.removeClass(c), e.each(dt.get(0).className.split(/\s+/), function(e, n) {
        0 === n.indexOf(h) && dt.removeClass(n)
      }), e(y + ", " + z).each(function() {
        l.scrollOverflowHandler.remove(e(this)), e(this).removeClass(W + " " + p)
      }), In(St), St.find(k + ", " + V + ", " + q).each(function() {
        e(this).replaceWith(this.childNodes)
      }), St.css({
        "-webkit-transition": "none",
        transition: "none"
      }), ct.scrollTop(0);
      var n = [S, B, F];
      e.each(n, function(n, t) {
        e("." + t).removeClass(t)
      })
    }

    function rt(e, n, t) {
      l[e] = n, "internal" !== t && (Bt[e] = n)
    }

    function lt() {
      var n = ["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove", "scrollOverflowReset", "parallax"];
      return e("html").hasClass(u) ? void st("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (l.continuousVertical && (l.loopTop || l.loopBottom) && (l.continuousVertical = !1, st("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), l.scrollBar && l.scrollOverflow && st("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !l.continuousVertical || !l.scrollBar && l.autoScrolling || (l.continuousVertical = !1, st("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), e.each(n, function(e, n) {
        l[n] && st("warn", "fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: " + n)
      }), void e.each(l.anchors, function(n, t) {
        var o = te.find("[name]").filter(function() {
            return e(this).attr("name") && e(this).attr("name").toLowerCase() == t.toLowerCase()
          }),
          i = te.find("[id]").filter(function() {
            return e(this).attr("id") && e(this).attr("id").toLowerCase() == t.toLowerCase()
          });
        (i.length || o.length) && (st("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), i.length && st("error", '"' + t + '" is is being used by another element `id` property'), o.length && st("error", '"' + t + '" is is being used by another element `name` property'))
      }))
    }

    function st(e, n) {
      console && console[e] && console[e]("fullPage: " + n)
    }
    if (e("html").hasClass(u)) return void lt();
    var ct = e("html, body"),
      dt = e("body"),
      ft = e.fn.fullpage;
    l = e.extend({
      menu: !1,
      anchors: [],
      lockAnchors: !1,
      navigation: !1,
      navigationPosition: "right",
      navigationTooltips: [],
      showActiveTooltip: !1,
      slidesNavigation: !1,
      slidesNavPosition: "bottom",
      scrollBar: !1,
      hybrid: !1,
      css3: !0,
      scrollingSpeed: 700,
      autoScrolling: !0,
      fitToSection: !0,
      fitToSectionDelay: 1e3,
      easing: "easeInOutCubic",
      easingcss3: "ease",
      loopBottom: !1,
      loopTop: !1,
      loopHorizontal: !0,
      continuousVertical: !1,
      continuousHorizontal: !1,
      scrollHorizontally: !1,
      interlockedSlides: !1,
      dragAndMove: !1,
      offsetSections: !1,
      resetSliders: !1,
      fadingEffect: !1,
      normalScrollElements: null,
      scrollOverflow: !1,
      scrollOverflowReset: !1,
      scrollOverflowHandler: ie,
      scrollOverflowOptions: null,
      touchSensitivity: 5,
      normalScrollElementTouchThreshold: 5,
      bigSectionsDestination: null,
      keyboardScrolling: !0,
      animateAnchor: !0,
      recordHistory: !0,
      controlArrows: !0,
      controlArrowColor: "#fff",
      verticalCentered: !0,
      sectionsColor: [],
      paddingTop: 0,
      paddingBottom: 0,
      fixedElements: null,
      responsive: 0,
      responsiveWidth: 0,
      responsiveHeight: 0,
      responsiveSlides: !1,
      parallax: !1,
      parallaxOptions: {
        type: "reveal",
        percentage: 62,
        property: "translate"
      },
      sectionSelector: w,
      slideSelector: H,
      afterLoad: null,
      onLeave: null,
      afterRender: null,
      afterResize: null,
      afterReBuild: null,
      afterSlideLoad: null,
      onSlideLeave: null,
      afterResponsive: null,
      lazyLoading: !0
    }, l);
    var ut, ht, pt, vt, gt = !1,
      mt = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
      wt = "ontouchstart" in n || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
      St = e(this),
      yt = ne.height(),
      bt = !1,
      xt = !0,
      Ct = !0,
      Tt = [],
      kt = {};
    kt.m = {
      up: !0,
      down: !0,
      left: !0,
      right: !0
    }, kt.k = e.extend(!0, {}, kt.m);
    var It, Lt, Et, Mt, Ot, At, Rt = $n(),
      Ht = {
        touchmove: "ontouchmove" in n ? "touchmove" : Rt.move,
        touchstart: "ontouchstart" in n ? "touchstart" : Rt.down
      },
      Bt = e.extend(!0, {}, l);
    lt(), oe.click = wt, oe = e.extend(oe, l.scrollOverflowOptions), e.extend(e.easing, {
      easeInOutCubic: function(e, n, t, o, i) {
        return (n /= i / 2) < 1 ? o / 2 * n * n * n + t : o / 2 * ((n -= 2) * n * n + 2) + t
      }
    }), e(this).length && (ft.setAutoScrolling = s, ft.setRecordHistory = N, ft.setScrollingSpeed = Q, ft.setFitToSection = Z, ft.setLockAnchors = $, ft.setMouseWheelScrolling = ae, ft.setAllowScrolling = re, ft.setKeyboardScrolling = le, ft.moveSectionUp = se, ft.moveSectionDown = ce, ft.silentMoveTo = de, ft.moveTo = fe, ft.moveSlideRight = ue, ft.moveSlideLeft = he, ft.fitToSection = He, ft.reBuild = pe, ft.setResponsive = ve, ft.destroy = it, ge(), me());
    var zt = !1,
      Dt = 0,
      Pt = 0,
      qt = 0,
      Ft = 0,
      Vt = 0,
      Wt = (new Date).getTime(),
      Ut = 0,
      Yt = 0,
      jt = yt
  }, "undefined" != typeof IScroll && (IScroll.prototype.wheelOn = function() {
    this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
  }, IScroll.prototype.wheelOff = function() {
    this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
  });
  var ie = {
    refreshId: null,
    iScrollInstances: [],
    toggleWheel: function(n) {
      var t = e(b).find(s);
      t.each(function() {
        var t = e(this).data("iscrollInstance");
        "undefined" != typeof t && t && (n ? t.wheelOn() : t.wheelOff())
      })
    },
    onLeave: function() {
      ie.toggleWheel(!1)
    },
    beforeLeave: function() {
      ie.onLeave()
    },
    afterLoad: function() {
      ie.toggleWheel(!0)
    },
    create: function(n, t) {
      var o = n.find(s);
      o.height(t), o.each(function() {
        var n = e(this),
          t = n.data("iscrollInstance");
        t && e.each(ie.iScrollInstances, function() {
          e(this).destroy()
        }), t = new IScroll(n.get(0), oe), ie.iScrollInstances.push(t), t.wheelOff(), n.data("iscrollInstance", t)
      })
    },
    isScrolled: function(e, n) {
      var t = n.data("iscrollInstance");
      return t ? "top" === e ? t.y >= 0 && !n.scrollTop() : "bottom" === e ? 0 - t.y + n.scrollTop() + 1 + n.innerHeight() >= n[0].scrollHeight : void 0 : !0
    },
    scrollable: function(e) {
      return e.find(q).length ? e.find(D).find(s) : e.find(s)
    },
    scrollHeight: function(e) {
      return e.find(s).children().first().get(0).scrollHeight
    },
    remove: function(e) {
      var n = e.find(s);
      if (n.length) {
        var t = n.data("iscrollInstance");
        t.destroy(), n.data("iscrollInstance", null)
      }
      e.find(s).children().first().children().first().unwrap().unwrap()
    },
    update: function(n, t) {
      clearTimeout(ie.refreshId), ie.refreshId = setTimeout(function() {
        e.each(ie.iScrollInstances, function() {
          e(this).get(0).refresh()
        })
      }, 150), n.find(s).css("height", t + "px").parent().css("height", t + "px")
    },
    wrapContent: function() {
      return '<div class="' + l + '"><div class="fp-scroller"></div></div>'
    }
  }
});
//# sourceMappingURL=jquery.fullpage.min.js.map


/*!
 * Customized version of iScroll.js 0.0.5
 * It fixes bugs affecting its integration with fullpage.js
 */
/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
! function(t, i, e) {
  function s(e, s) {
    this.wrapper = "string" == typeof e ? i.querySelector(e) : e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
      resizeScrollbars: !0,
      mouseWheelSpeed: 20,
      snapThreshold: .334,
      disablePointer: !h.hasPointer,
      disableTouch: h.hasPointer || !h.hasTouch,
      disableMouse: h.hasPointer || h.hasTouch,
      startX: 0,
      startY: 0,
      scrollY: !0,
      directionLockThreshold: 5,
      momentum: !0,
      bounce: !0,
      bounceTime: 600,
      bounceEasing: "",
      preventDefault: !0,
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL)$/
      },
      HWCompositing: !0,
      useTransition: !0,
      useTransform: !0,
      bindToWrapper: "undefined" == typeof t.onmousedown
    };
    for (var o in s) this.options[o] = s[o];
    this.translateZ = this.options.HWCompositing && h.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = h.hasTransition && this.options.useTransition, this.options.useTransform = h.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? h.ease[this.options.bounceEasing] || h.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), this.options.useTransition || this.options.useTransform || /relative|absolute/i.test(this.scrollerStyle.position) || (this.scrollerStyle.position = "relative"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
  }

  function o(t, e, s) {
    var o = i.createElement("div"),
      n = i.createElement("div");
    return s === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (s === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (s === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", e || (o.style.pointerEvents = "none"), o.appendChild(n), o
  }

  function n(e, s) {
    this.wrapper = "string" == typeof s.el ? i.querySelector(s.el) : s.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = {
      listenX: !0,
      listenY: !0,
      interactive: !1,
      resize: !0,
      defaultScrollbars: !1,
      shrink: !1,
      fade: !1,
      speedRatioX: 0,
      speedRatioY: 0
    };
    for (var o in s) this.options[o] = s[o];
    if (this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (h.addEvent(this.indicator, "touchstart", this), h.addEvent(t, "touchend", this)), this.options.disablePointer || (h.addEvent(this.indicator, h.prefixPointerEvent("pointerdown"), this), h.addEvent(t, h.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (h.addEvent(this.indicator, "mousedown", this), h.addEvent(t, "mouseup", this))), this.options.fade) {
      this.wrapperStyle[h.style.transform] = this.scroller.translateZ;
      var n = h.style.transitionDuration;
      if (!n) return;
      this.wrapperStyle[n] = h.isBadAndroid ? "0.0001ms" : "0ms";
      var a = this;
      h.isBadAndroid && r(function() {
        "0.0001ms" === a.wrapperStyle[n] && (a.wrapperStyle[n] = "0s")
      }), this.wrapperStyle.opacity = "0"
    }
  }
  var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
      t.setTimeout(i, 1e3 / 60)
    },
    h = function() {
      function s(t) {
        return r !== !1 && ("" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1))
      }
      var o = {},
        n = i.createElement("div").style,
        r = function() {
          for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, s = i.length; e < s; e++)
            if (t = i[e] + "ransform", t in n) return i[e].substr(0, i[e].length - 1);
          return !1
        }();
      o.getTime = Date.now || function() {
        return (new Date).getTime()
      }, o.extend = function(t, i) {
        for (var e in i) t[e] = i[e]
      }, o.addEvent = function(t, i, e, s) {
        t.addEventListener(i, e, !!s)
      }, o.removeEvent = function(t, i, e, s) {
        t.removeEventListener(i, e, !!s)
      }, o.prefixPointerEvent = function(i) {
        return t.MSPointerEvent ? "MSPointer" + i.charAt(7).toUpperCase() + i.substr(8) : i
      }, o.momentum = function(t, i, s, o, n, r) {
        var h, a, l = t - i,
          c = e.abs(l) / s;
        return r = void 0 === r ? 6e-4 : r, h = t + c * c / (2 * r) * (l < 0 ? -1 : 1), a = c / r, h < o ? (h = n ? o - n / 2.5 * (c / 8) : o, l = e.abs(h - t), a = l / c) : h > 0 && (h = n ? n / 2.5 * (c / 8) : 0, l = e.abs(t) + h, a = l / c), {
          destination: e.round(h),
          duration: a
        }
      };
      var h = s("transform");
      return o.extend(o, {
        hasTransform: h !== !1,
        hasPerspective: s("perspective") in n,
        hasTouch: "ontouchstart" in t,
        hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
        hasTransition: s("transition") in n
      }), o.isBadAndroid = function() {
        var i = t.navigator.appVersion;
        if (/Android/.test(i) && !/Chrome\/\d/.test(i)) {
          var e = i.match(/Safari\/(\d+.\d)/);
          return !(e && "object" == typeof e && e.length >= 2) || parseFloat(e[1]) < 535.19
        }
        return !1
      }(), o.extend(o.style = {}, {
        transform: h,
        transitionTimingFunction: s("transitionTimingFunction"),
        transitionDuration: s("transitionDuration"),
        transitionDelay: s("transitionDelay"),
        transformOrigin: s("transformOrigin")
      }), o.hasClass = function(t, i) {
        var e = new RegExp("(^|\\s)" + i + "(\\s|$)");
        return e.test(t.className)
      }, o.addClass = function(t, i) {
        if (!o.hasClass(t, i)) {
          var e = t.className.split(" ");
          e.push(i), t.className = e.join(" ")
        }
      }, o.removeClass = function(t, i) {
        if (o.hasClass(t, i)) {
          var e = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
          t.className = t.className.replace(e, " ")
        }
      }, o.offset = function(t) {
        for (var i = -t.offsetLeft, e = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, e -= t.offsetTop;
        return {
          left: i,
          top: e
        }
      }, o.preventDefaultException = function(t, i) {
        for (var e in i)
          if (i[e].test(t[e])) return !0;
        return !1
      }, o.extend(o.eventType = {}, {
        touchstart: 1,
        touchmove: 1,
        touchend: 1,
        mousedown: 2,
        mousemove: 2,
        mouseup: 2,
        pointerdown: 3,
        pointermove: 3,
        pointerup: 3,
        MSPointerDown: 3,
        MSPointerMove: 3,
        MSPointerUp: 3
      }), o.extend(o.ease = {}, {
        quadratic: {
          style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fn: function(t) {
            return t * (2 - t)
          }
        },
        circular: {
          style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
          fn: function(t) {
            return e.sqrt(1 - --t * t)
          }
        },
        back: {
          style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          fn: function(t) {
            var i = 4;
            return (t -= 1) * t * ((i + 1) * t + i) + 1
          }
        },
        bounce: {
          style: "",
          fn: function(t) {
            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
          }
        },
        elastic: {
          style: "",
          fn: function(t) {
            var i = .22,
              s = .4;
            return 0 === t ? 0 : 1 == t ? 1 : s * e.pow(2, -10 * t) * e.sin((t - i / 4) * (2 * e.PI) / i) + 1
          }
        }
      }), o.tap = function(t, e) {
        var s = i.createEvent("Event");
        s.initEvent(e, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)
      }, o.click = function(e) {
        var s, o = e.target;
        /(SELECT|INPUT|TEXTAREA)/i.test(o.tagName) || (s = i.createEvent(t.MouseEvent ? "MouseEvents" : "Event"), s.initEvent("click", !0, !0), s.view = e.view || t, s.detail = 1, s.screenX = o.screenX || 0, s.screenY = o.screenY || 0, s.clientX = o.clientX || 0, s.clientY = o.clientY || 0, s.ctrlKey = !!e.ctrlKey, s.altKey = !!e.altKey, s.shiftKey = !!e.shiftKey, s.metaKey = !!e.metaKey, s.button = 0, s.relatedTarget = null, s._constructed = !0, o.dispatchEvent(s))
      }, o
    }();
  s.prototype = {
    version: "5.2.0",
    _init: function() {
      this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
    },
    destroy: function() {
      this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
    },
    _transitionEnd: function(t) {
      t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
    },
    _start: function(t) {
      if (1 != h.eventType[t.type]) {
        var i;
        if (i = t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2, 0 !== i) return
      }
      if (this.enabled && (!this.initiated || h.eventType[t.type] === this.initiated)) {
        !this.options.preventDefault || h.isBadAndroid || h.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
        var s, o = t.touches ? t.touches[0] : t;
        this.initiated = h.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this.startTime = h.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, s = this.getComputedPosition(), this._translate(e.round(s.x), e.round(s.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = o.pageX, this.pointY = o.pageY, this._execEvent("beforeScrollStart")
      }
    },
    _move: function(t) {
      if (this.enabled && h.eventType[t.type] === this.initiated) {
        this.options.preventDefault && t.preventDefault();
        var i, s, o, n, r = t.touches ? t.touches[0] : t,
          a = r.pageX - this.pointX,
          l = r.pageY - this.pointY,
          c = h.getTime();
        if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += a, this.distY += l, o = e.abs(this.distX), n = e.abs(this.distY), !(c - this.endTime > 300 && o < 10 && n < 10)) {
          if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
            l = 0
          } else if ("v" == this.directionLocked) {
            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
            a = 0
          }
          a = this.hasHorizontalScroll ? a : 0, l = this.hasVerticalScroll ? l : 0, i = this.x + a, s = this.y + l, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + a / 3 : i > 0 ? 0 : this.maxScrollX), (s > 0 || s < this.maxScrollY) && (s = this.options.bounce ? this.y + l / 3 : s > 0 ? 0 : this.maxScrollY), this.directionX = a > 0 ? -1 : a < 0 ? 1 : 0, this.directionY = l > 0 ? -1 : l < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, s), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
        }
      }
    },
    _end: function(t) {
      if (this.enabled && h.eventType[t.type] === this.initiated) {
        this.options.preventDefault && !h.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
        var i, s, o = (t.changedTouches ? t.changedTouches[0] : t, h.getTime() - this.startTime),
          n = e.round(this.x),
          r = e.round(this.y),
          a = e.abs(n - this.startX),
          l = e.abs(r - this.startY),
          c = 0,
          p = "";
        if (this.isInTransition = 0, this.initiated = 0, this.endTime = h.getTime(), !this.resetPosition(this.options.bounceTime)) {
          if (this.scrollTo(n, r), !this.moved) return this.options.tap && h.tap(t, this.options.tap), this.options.click && h.click(t), void this._execEvent("scrollCancel");
          if (this._events.flick && o < 200 && a < 100 && l < 100) return void this._execEvent("flick");
          if (this.options.momentum && o < 300 && (i = this.hasHorizontalScroll ? h.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
              destination: n,
              duration: 0
            }, s = this.hasVerticalScroll ? h.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
              destination: r,
              duration: 0
            }, n = i.destination, r = s.destination, c = e.max(i.duration, s.duration), this.isInTransition = 1), this.options.snap) {
            var d = this._nearestSnap(n, r);
            this.currentPage = d, c = this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - d.x), 1e3), e.min(e.abs(r - d.y), 1e3)), 300), n = d.x, r = d.y, this.directionX = 0, this.directionY = 0, p = this.options.bounceEasing
          }
          return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (p = h.ease.quadratic), void this.scrollTo(n, r, c, p)) : void this._execEvent("scrollEnd")
        }
      }
    },
    _resize: function() {
      var t = this;
      clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
        t.refresh()
      }, this.options.resizePolling)
    },
    resetPosition: function(t) {
      var i = this.x,
        e = this.y;
      return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY), (i != this.x || e != this.y) && (this.scrollTo(i, e, t, this.options.bounceEasing), !0)
    },
    disable: function() {
      this.enabled = !1
    },
    enable: function() {
      this.enabled = !0
    },
    refresh: function() {
      this.wrapper.offsetHeight;
      this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = h.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
    },
    on: function(t, i) {
      this._events[t] || (this._events[t] = []), this._events[t].push(i)
    },
    off: function(t, i) {
      if (this._events[t]) {
        var e = this._events[t].indexOf(i);
        e > -1 && this._events[t].splice(e, 1)
      }
    },
    _execEvent: function(t) {
      if (this._events[t]) {
        var i = 0,
          e = this._events[t].length;
        if (e)
          for (; i < e; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
      }
    },
    scrollBy: function(t, i, e, s) {
      t = this.x + t, i = this.y + i, e = e || 0, this.scrollTo(t, i, e, s)
    },
    scrollTo: function(t, i, e, s) {
      s = s || h.ease.circular, this.isInTransition = this.options.useTransition && e > 0;
      var o = this.options.useTransition && s.style;
      !e || o ? (o && (this._transitionTimingFunction(s.style), this._transitionTime(e)), this._translate(t, i)) : this._animate(t, i, e, s.fn)
    },
    scrollToElement: function(t, i, s, o, n) {
      if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
        var r = h.offset(t);
        r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, s === !0 && (s = e.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = e.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= s || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, i = void 0 === i || null === i || "auto" === i ? e.max(e.abs(this.x - r.left), e.abs(this.y - r.top)) : i, this.scrollTo(r.left, r.top, i, n)
      }
    },
    _transitionTime: function(t) {
      if (this.options.useTransition) {
        t = t || 0;
        var i = h.style.transitionDuration;
        if (i) {
          if (this.scrollerStyle[i] = t + "ms", !t && h.isBadAndroid) {
            this.scrollerStyle[i] = "0.0001ms";
            var e = this;
            r(function() {
              "0.0001ms" === e.scrollerStyle[i] && (e.scrollerStyle[i] = "0s")
            })
          }
          if (this.indicators)
            for (var s = this.indicators.length; s--;) this.indicators[s].transitionTime(t)
        }
      }
    },
    _transitionTimingFunction: function(t) {
      if (this.scrollerStyle[h.style.transitionTimingFunction] = t, this.indicators)
        for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
    },
    _translate: function(t, i) {
      if (this.options.useTransform ? this.scrollerStyle[h.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = e.round(t), i = e.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
        for (var s = this.indicators.length; s--;) this.indicators[s].updatePosition()
    },
    _initEvents: function(i) {
      var e = i ? h.removeEvent : h.addEvent,
        s = this.options.bindToWrapper ? this.wrapper : t;
      e(t, "orientationchange", this), e(t, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(s, "mousemove", this), e(s, "mousecancel", this), e(s, "mouseup", this)), h.hasPointer && !this.options.disablePointer && (e(this.wrapper, h.prefixPointerEvent("pointerdown"), this), e(s, h.prefixPointerEvent("pointermove"), this), e(s, h.prefixPointerEvent("pointercancel"), this), e(s, h.prefixPointerEvent("pointerup"), this)), h.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(s, "touchmove", this), e(s, "touchcancel", this), e(s, "touchend", this)), e(this.scroller, "transitionend", this), e(this.scroller, "webkitTransitionEnd", this), e(this.scroller, "oTransitionEnd", this), e(this.scroller, "MSTransitionEnd", this)
    },
    getComputedPosition: function() {
      var i, e, s = t.getComputedStyle(this.scroller, null);
      return this.options.useTransform ? (s = s[h.style.transform].split(")")[0].split(", "), i = +(s[12] || s[4]), e = +(s[13] || s[5])) : (i = +s.left.replace(/[^-\d.]/g, ""), e = +s.top.replace(/[^-\d.]/g, "")), {
        x: i,
        y: e
      }
    },
    _initIndicators: function() {
      function t(t) {
        if (h.indicators)
          for (var i = h.indicators.length; i--;) t.call(h.indicators[i])
      }
      var i, e = this.options.interactiveScrollbars,
        s = "string" != typeof this.options.scrollbars,
        r = [],
        h = this;
      this.indicators = [], this.options.scrollbars && (this.options.scrollY && (i = {
        el: o("v", e, this.options.scrollbars),
        interactive: e,
        defaultScrollbars: !0,
        customStyle: s,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenX: !1
      }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
        el: o("h", e, this.options.scrollbars),
        interactive: e,
        defaultScrollbars: !0,
        customStyle: s,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenY: !1
      }, this.wrapper.appendChild(i.el), r.push(i))), this.options.indicators && (r = r.concat(this.options.indicators));
      for (var a = r.length; a--;) this.indicators.push(new n(this, r[a]));
      this.options.fadeScrollbars && (this.on("scrollEnd", function() {
        t(function() {
          this.fade()
        })
      }), this.on("scrollCancel", function() {
        t(function() {
          this.fade()
        })
      }), this.on("scrollStart", function() {
        t(function() {
          this.fade(1)
        })
      }), this.on("beforeScrollStart", function() {
        t(function() {
          this.fade(1, !0)
        })
      })), this.on("refresh", function() {
        t(function() {
          this.refresh()
        })
      }), this.on("destroy", function() {
        t(function() {
          this.destroy()
        }), delete this.indicators
      })
    },
    _initWheel: function() {
      h.addEvent(this.wrapper, "wheel", this), h.addEvent(this.wrapper, "mousewheel", this), h.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
        clearTimeout(this.wheelTimeout), this.wheelTimeout = null, h.removeEvent(this.wrapper, "wheel", this), h.removeEvent(this.wrapper, "mousewheel", this), h.removeEvent(this.wrapper, "DOMMouseScroll", this)
      })
    },
    _wheel: function(t) {
      if (this.enabled) {
        var i, s, o, n, r = this;
        if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
            r.options.snap || r._execEvent("scrollEnd"), r.wheelTimeout = void 0
          }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, s = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, s = -t.deltaY);
        else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, s = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
        else if ("wheelDelta" in t) i = s = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
        else {
          if (!("detail" in t)) return;
          i = s = -t.detail / 3 * this.options.mouseWheelSpeed
        }
        if (i *= this.options.invertWheelDirection, s *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = s, s = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, s > 0 ? n-- : s < 0 && n++, void this.goToPage(o, n);
        o = this.x + e.round(this.hasHorizontalScroll ? i : 0), n = this.y + e.round(this.hasVerticalScroll ? s : 0), this.directionX = i > 0 ? -1 : i < 0 ? 1 : 0, this.directionY = s > 0 ? -1 : s < 0 ? 1 : 0, o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
      }
    },
    _initSnap: function() {
      this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
        var t, i, s, o, n, r, h = 0,
          a = 0,
          l = 0,
          c = this.options.snapStepX || this.wrapperWidth,
          p = this.options.snapStepY || this.wrapperHeight;
        if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
          if (this.options.snap === !0)
            for (s = e.round(c / 2), o = e.round(p / 2); l > -this.scrollerWidth;) {
              for (this.pages[h] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[h][t] = {
                x: e.max(l, this.maxScrollX),
                y: e.max(n, this.maxScrollY),
                width: c,
                height: p,
                cx: l - s,
                cy: n - o
              }, n -= p, t++;
              l -= c, h++
            } else
              for (r = this.options.snap, t = r.length, i = -1; h < t; h++)(0 === h || r[h].offsetLeft <= r[h - 1].offsetLeft) && (a = 0, i++), this.pages[a] || (this.pages[a] = []), l = e.max(-r[h].offsetLeft, this.maxScrollX), n = e.max(-r[h].offsetTop, this.maxScrollY), s = l - e.round(r[h].offsetWidth / 2), o = n - e.round(r[h].offsetHeight / 2), this.pages[a][i] = {
                x: l,
                y: n,
                width: r[h].offsetWidth,
                height: r[h].offsetHeight,
                cx: s,
                cy: o
              }, l > this.maxScrollX && a++;
          this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
        }
      }), this.on("flick", function() {
        var t = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1e3), e.min(e.abs(this.y - this.startY), 1e3)), 300);
        this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
      })
    },
    _nearestSnap: function(t, i) {
      if (!this.pages.length) return {
        x: 0,
        y: 0,
        pageX: 0,
        pageY: 0
      };
      var s = 0,
        o = this.pages.length,
        n = 0;
      if (e.abs(t - this.absStartX) < this.snapThresholdX && e.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
      for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); s < o; s++)
        if (t >= this.pages[s][0].cx) {
          t = this.pages[s][0].x;
          break
        } for (o = this.pages[s].length; n < o; n++)
        if (i >= this.pages[0][n].cy) {
          i = this.pages[0][n].y;
          break
        } return s == this.currentPage.pageX && (s += this.directionX, s < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n == this.currentPage.pageY && (n += this.directionY, n < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
        x: t,
        y: i,
        pageX: s,
        pageY: n
      }
    },
    goToPage: function(t, i, s, o) {
      o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
      var n = this.pages[t][i].x,
        r = this.pages[t][i].y;
      s = void 0 === s ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - this.x), 1e3), e.min(e.abs(r - this.y), 1e3)), 300) : s, this.currentPage = {
        x: n,
        y: r,
        pageX: t,
        pageY: i
      }, this.scrollTo(n, r, s, o)
    },
    next: function(t, i) {
      var e = this.currentPage.pageX,
        s = this.currentPage.pageY;
      e++, e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this.goToPage(e, s, t, i)
    },
    prev: function(t, i) {
      var e = this.currentPage.pageX,
        s = this.currentPage.pageY;
      e--, e < 0 && this.hasVerticalScroll && (e = 0, s--), this.goToPage(e, s, t, i)
    },
    _initKeys: function(i) {
      var e, s = {
        pageUp: 33,
        pageDown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };
      if ("object" == typeof this.options.keyBindings)
        for (e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
      else this.options.keyBindings = {};
      for (e in s) this.options.keyBindings[e] = this.options.keyBindings[e] || s[e];
      h.addEvent(t, "keydown", this), this.on("destroy", function() {
        h.removeEvent(t, "keydown", this)
      })
    },
    _key: function(t) {
      if (this.enabled) {
        var i, s = this.options.snap,
          o = s ? this.currentPage.pageX : this.x,
          n = s ? this.currentPage.pageY : this.y,
          r = h.getTime(),
          a = this.keyTime || 0,
          l = .25;
        switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this.isInTransition = !1), this.keyAcceleration = r - a < 200 ? e.min(this.keyAcceleration + l, 50) : 0, t.keyCode) {
          case this.options.keyBindings.pageUp:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? o += s ? 1 : this.wrapperWidth : n += s ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.pageDown:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= s ? 1 : this.wrapperWidth : n -= s ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.end:
            o = s ? this.pages.length - 1 : this.maxScrollX, n = s ? this.pages[0].length - 1 : this.maxScrollY;
            break;
          case this.options.keyBindings.home:
            o = 0, n = 0;
            break;
          case this.options.keyBindings.left:
            o += s ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.up:
            n += s ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.right:
            o -= s ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.down:
            n -= s ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          default:
            return
        }
        if (s) return void this.goToPage(o, n);
        o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, n, 0), this.keyTime = r
      }
    },
    _animate: function(t, i, e, s) {
      function o() {
        var d, u, f, m = h.getTime();
        return m >= p ? (n.isAnimating = !1, n._translate(t, i), void(n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (m = (m - c) / e, f = s(m), d = (t - a) * f + a, u = (i - l) * f + l, n._translate(d, u), void(n.isAnimating && r(o)))
      }
      var n = this,
        a = this.x,
        l = this.y,
        c = h.getTime(),
        p = c + e;
      this.isAnimating = !0, o()
    },
    handleEvent: function(t) {
      switch (t.type) {
        case "touchstart":
        case "pointerdown":
        case "MSPointerDown":
        case "mousedown":
          this._start(t);
          break;
        case "touchmove":
        case "pointermove":
        case "MSPointerMove":
        case "mousemove":
          this._move(t);
          break;
        case "touchend":
        case "pointerup":
        case "MSPointerUp":
        case "mouseup":
        case "touchcancel":
        case "pointercancel":
        case "MSPointerCancel":
        case "mousecancel":
          this._end(t);
          break;
        case "orientationchange":
        case "resize":
          this._resize();
          break;
        case "transitionend":
        case "webkitTransitionEnd":
        case "oTransitionEnd":
        case "MSTransitionEnd":
          this._transitionEnd(t);
          break;
        case "wheel":
        case "DOMMouseScroll":
        case "mousewheel":
          this._wheel(t);
          break;
        case "keydown":
          this._key(t);
          break;
        case "click":
          this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
      }
    }
  }, n.prototype = {
    handleEvent: function(t) {
      switch (t.type) {
        case "touchstart":
        case "pointerdown":
        case "MSPointerDown":
        case "mousedown":
          this._start(t);
          break;
        case "touchmove":
        case "pointermove":
        case "MSPointerMove":
        case "mousemove":
          this._move(t);
          break;
        case "touchend":
        case "pointerup":
        case "MSPointerUp":
        case "mouseup":
        case "touchcancel":
        case "pointercancel":
        case "MSPointerCancel":
        case "mousecancel":
          this._end(t)
      }
    },
    destroy: function() {
      this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null), this.options.interactive && (h.removeEvent(this.indicator, "touchstart", this), h.removeEvent(this.indicator, h.prefixPointerEvent("pointerdown"), this), h.removeEvent(this.indicator, "mousedown", this), h.removeEvent(t, "touchmove", this), h.removeEvent(t, h.prefixPointerEvent("pointermove"), this), h.removeEvent(t, "mousemove", this), h.removeEvent(t, "touchend", this), h.removeEvent(t, h.prefixPointerEvent("pointerup"), this), h.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
    },
    _start: function(i) {
      var e = i.touches ? i.touches[0] : i;
      i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = h.getTime(), this.options.disableTouch || h.addEvent(t, "touchmove", this), this.options.disablePointer || h.addEvent(t, h.prefixPointerEvent("pointermove"), this), this.options.disableMouse || h.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
    },
    _move: function(t) {
      var i, e, s, o, n = t.touches ? t.touches[0] : t;
      h.getTime();
      this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = n.pageX - this.lastPointX, this.lastPointX = n.pageX, e = n.pageY - this.lastPointY, this.lastPointY = n.pageY, s = this.x + i, o = this.y + e, this._pos(s, o), t.preventDefault(), t.stopPropagation()
    },
    _end: function(i) {
      if (this.initiated) {
        if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), h.removeEvent(t, "touchmove", this), h.removeEvent(t, h.prefixPointerEvent("pointermove"), this), h.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
          var s = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
            o = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - s.x), 1e3), e.min(e.abs(this.scroller.y - s.y), 1e3)), 300);
          this.scroller.x == s.x && this.scroller.y == s.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = s, this.scroller.scrollTo(s.x, s.y, o, this.scroller.options.bounceEasing))
        }
        this.moved && this.scroller._execEvent("scrollEnd")
      }
    },
    transitionTime: function(t) {
      t = t || 0;
      var i = h.style.transitionDuration;
      if (i && (this.indicatorStyle[i] = t + "ms", !t && h.isBadAndroid)) {
        this.indicatorStyle[i] = "0.0001ms";
        var e = this;
        r(function() {
          "0.0001ms" === e.indicatorStyle[i] && (e.indicatorStyle[i] = "0s")
        })
      }
    },
    transitionTimingFunction: function(t) {
      this.indicatorStyle[h.style.transitionTimingFunction] = t
    },
    refresh: function() {
      this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (h.addClass(this.wrapper, "iScrollBothScrollbars"), h.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (h.removeClass(this.wrapper, "iScrollBothScrollbars"), h.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
      this.wrapper.offsetHeight;
      this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
    },
    updatePosition: function() {
      var t = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
        i = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
      this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = e.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = e.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = e.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = e.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8),
        this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[h.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
    },
    _pos: function(t, i) {
      t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? e.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? e.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
    },
    fade: function(t, i) {
      if (!i || this.visible) {
        clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
        var e = t ? 250 : 500,
          s = t ? 0 : 300;
        t = t ? "1" : "0", this.wrapperStyle[h.style.transitionDuration] = e + "ms", this.fadeTimeout = setTimeout(function(t) {
          this.wrapperStyle.opacity = t, this.visible = +t
        }.bind(this, t), s)
      }
    }
  }, s.utils = h, "undefined" != typeof module && module.exports ? module.exports = s : "function" == typeof define && define.amd ? define(function() {
    return s
  }) : t.IScroll = s
}(window, document, Math),
/*!
 * fullPage ScrollOverflow
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
function(t, i) {
  var e = "active",
    s = "." + e,
    o = "fp-section",
    n = "." + o,
    r = n + s,
    h = "fp-slide",
    a = "." + h,
    l = a + s,
    c = "fp-slides",
    p = "." + c,
    d = "fp-scrollable",
    u = "." + d;
  "undefined" != typeof IScroll && (IScroll.prototype.wheelOn = function() {
    this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
  }, IScroll.prototype.wheelOff = function() {
    this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
  }), t.iscrollHandler = {
    refreshId: null,
    iScrollInstances: [],
    toggleWheel: function(t) {
      var e = i(r).find(u);
      e.each(function() {
        var e = i(this).data("iscrollInstance");
        "undefined" != typeof e && e && (t ? e.wheelOn() : e.wheelOff())
      })
    },
    onLeave: function() {
      iscrollHandler.toggleWheel(!1)
    },
    beforeLeave: function() {
      iscrollHandler.onLeave()
    },
    afterLoad: function() {
      iscrollHandler.toggleWheel(!0)
    },
    create: function(t, e, s) {
      var o = t.find(u);
      o.height(e), o.each(function() {
        var t = i(this),
          e = t.data("iscrollInstance");
        e && i.each(iscrollHandler.iScrollInstances, function() {
          i(this).destroy()
        }), e = new IScroll(t.get(0), s), e.on("scrollEnd", function() {
          this.fp_isAtTop = this.y > -30, this.fp_isAtEnd = this.y - this.maxScrollY < 30
        }), iscrollHandler.iScrollInstances.push(e), e.wheelOff(), t.data("iscrollInstance", e)
      })
    },
    isScrolled: function(t, i) {
      var e = i.data("iscrollInstance");
      return !e || ("top" === t ? e.y >= 0 && !i.scrollTop() : "bottom" === t ? 0 - e.y + i.scrollTop() + 1 + i.innerHeight() >= i[0].scrollHeight : void 0)
    },
    scrollable: function(t) {
      return t.find(p).length ? t.find(l).find(u) : t.find(u)
    },
    scrollHeight: function(t) {
      return t.find(u).children().first().get(0).scrollHeight
    },
    remove: function(t) {
      var i = t.find(u);
      if (i.length) {
        var e = i.data("iscrollInstance");
        e && e.destroy(), i.data("iscrollInstance", null)
      }
      t.find(u).children().first().children().first().unwrap().unwrap()
    },
    update: function(t, e) {
      clearTimeout(iscrollHandler.refreshId), iscrollHandler.refreshId = setTimeout(function() {
        i.each(iscrollHandler.iScrollInstances, function() {
          i(this).get(0).refresh()
        })
      }, 150), t.find(u).css("height", e + "px").parent().css("height", e + "px")
    },
    wrapContent: function() {
      return '<div class="' + d + '"><div class="fp-scroller"></div></div>'
    }
  }
}(window, jQuery),
function(t, i, e) {
  e.fn.fp_scrolloverflow = function() {
    function s() {
      function s() {
        e("body").hasClass(y) ? h() : r(n)
      }

      function o(t) {
        var i = t.closest(l);
        return i.length ? parseInt(i.css("padding-bottom")) + parseInt(i.css("padding-top")) : 0
      }

      function n(i) {
        if (!i.hasClass("fp-noscroll")) {
          i.css("overflow", "hidden");
          var s, n = a.options.scrollOverflowHandler,
            r = n.wrapContent(),
            h = i.closest(l),
            c = n.scrollable(i),
            p = o(h);
          c.length ? s = n.scrollHeight(i) : (s = i.get(0).scrollHeight - p, a.options.verticalCentered && (s = i.find(g).get(0).scrollHeight - p));
          var d = e(t).height() - p;
          s > d ? c.length ? n.update(i, d) : (a.options.verticalCentered ? i.find(g).wrapInner(r) : i.wrapInner(r), n.create(i, d, a.iscrollOptions)) : n.remove(i), i.css("overflow", "")
        }
      }

      function r(t) {
        e(l).each(function() {
          var i = e(this).find(d);
          i.length ? i.each(function() {
            t(e(this))
          }) : t(e(this))
        })
      }

      function h() {
        var t = a.options.scrollOverflowHandler;
        r(function(i) {
          i.closest(l).hasClass(x) && t.remove(i)
        })
      }
      var a = this;
      a.options = null, a.init = function(o, n) {
        return a.options = o, a.iscrollOptions = n, "complete" === i.readyState && (s(), e.fn.fullpage.shared.afterRenderActions()), e(t).on("load", function() {
          s(), e.fn.fullpage.shared.afterRenderActions()
        }), a
      }, a.createScrollBarForAll = s
    }
    var o = "fp-scrollable",
      n = "." + o,
      r = "active",
      h = "." + r,
      a = "fp-section",
      l = "." + a,
      c = l + h,
      p = "fp-slide",
      d = "." + p,
      u = d + h,
      f = "fp-slides",
      m = "." + f,
      v = "fp-tableCell",
      g = "." + v,
      y = "fp-responsive",
      x = "fp-auto-height-responsive";
    IScroll.prototype.wheelOn = function() {
      this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
    }, IScroll.prototype.wheelOff = function() {
      this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
    };
    var S = {
      refreshId: null,
      iScrollInstances: [],
      iscrollOptions: {
        scrollbars: !0,
        mouseWheel: !0,
        hideScrollbars: !1,
        fadeScrollbars: !1,
        disableMouse: !0,
        interactiveScrollbars: !0
      },
      init: function(i) {
        var o = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
        return S.iscrollOptions.click = o, S.iscrollOptions = e.extend(S.iscrollOptions, i.scrollOverflowOptions), (new s).init(i, S.iscrollOptions)
      },
      toggleWheel: function(t) {
        var i = e(c).find(n);
        i.each(function() {
          var i = e(this).data("iscrollInstance");
          "undefined" != typeof i && i && (t ? i.wheelOn() : i.wheelOff())
        })
      },
      onLeave: function() {
        S.toggleWheel(!1)
      },
      beforeLeave: function() {
        S.onLeave()
      },
      afterLoad: function() {
        S.toggleWheel(!0)
      },
      create: function(t, i, s) {
        var o = t.find(n);
        o.height(i), o.each(function() {
          var t = e(this),
            i = t.data("iscrollInstance");
          i && e.each(S.iScrollInstances, function() {
            e(this).destroy()
          }), i = new IScroll(t.get(0), s), S.iScrollInstances.push(i), i.wheelOff(), t.data("iscrollInstance", i)
        })
      },
      isScrolled: function(t, i) {
        var e = i.data("iscrollInstance");
        return !e || ("top" === t ? e.y >= 0 && !i.scrollTop() : "bottom" === t ? 0 - e.y + i.scrollTop() + 1 + i.innerHeight() >= i[0].scrollHeight : void 0)
      },
      scrollable: function(t) {
        return t.find(m).length ? t.find(u).find(n) : t.find(n)
      },
      scrollHeight: function(t) {
        return t.find(n).children().first().get(0).scrollHeight
      },
      remove: function(t) {
        var i = t.find(n);
        if (i.length) {
          var e = i.data("iscrollInstance");
          e.destroy(), i.data("iscrollInstance", null)
        }
        t.find(n).children().first().children().first().unwrap().unwrap()
      },
      update: function(t, i) {
        clearTimeout(S.refreshId), S.refreshId = setTimeout(function() {
          e.each(S.iScrollInstances, function() {
            e(this).get(0).refresh(), e.fn.fullpage.silentMoveTo(e(c).index() + 1)
          })
        }, 150), t.find(n).css("height", i + "px").parent().css("height", i + getPaddings(t) + "px")
      },
      wrapContent: function() {
        return '<div class="' + o + '"><div class="fp-scroller"></div></div>'
      }
    };
    return {
      iscrollHandler: S
    }
  }()
}(window, document, jQuery);
//# sourceMappingURL=scrolloverflow.min.js.map


/**
 * Swiper 4.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 14, 2018
 */
! function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
}(this, function() {
  "use strict";
  var f = "undefined" == typeof document ? {
      body: {},
      addEventListener: function() {},
      removeEventListener: function() {},
      activeElement: {
        blur: function() {},
        nodeName: ""
      },
      querySelector: function() {
        return null
      },
      querySelectorAll: function() {
        return []
      },
      getElementById: function() {
        return null
      },
      createEvent: function() {
        return {
          initEvent: function() {}
        }
      },
      createElement: function() {
        return {
          children: [],
          childNodes: [],
          style: {},
          setAttribute: function() {},
          getElementsByTagName: function() {
            return []
          }
        }
      },
      location: {
        hash: ""
      }
    } : document,
    Y = "undefined" == typeof window ? {
      document: f,
      navigator: {
        userAgent: ""
      },
      location: {},
      history: {},
      CustomEvent: function() {
        return this
      },
      addEventListener: function() {},
      removeEventListener: function() {},
      getComputedStyle: function() {
        return {
          getPropertyValue: function() {
            return ""
          }
        }
      },
      Image: function() {},
      Date: function() {},
      screen: {},
      setTimeout: function() {},
      clearTimeout: function() {}
    } : window,
    l = function(e) {
      for (var t = 0; t < e.length; t += 1) this[t] = e[t];
      return this.length = e.length, this
    };

  function L(e, t) {
    var a = [],
      i = 0;
    if (e && !t && e instanceof l) return e;
    if (e)
      if ("string" == typeof e) {
        var s, r, n = e.trim();
        if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
          var o = "div";
          for (0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select"), (r = f.createElement(o)).innerHTML = n, i = 0; i < r.childNodes.length; i += 1) a.push(r.childNodes[i])
        } else
          for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])], i = 0; i < s.length; i += 1) s[i] && a.push(s[i])
      } else if (e.nodeType || e === Y || e === f) a.push(e);
    else if (0 < e.length && e[0].nodeType)
      for (i = 0; i < e.length; i += 1) a.push(e[i]);
    return new l(a)
  }

  function r(e) {
    for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]);
    return t
  }
  L.fn = l.prototype, L.Class = l, L.Dom7 = l;
  var t = {
    addClass: function(e) {
      if (void 0 === e) return this;
      for (var t = e.split(" "), a = 0; a < t.length; a += 1)
        for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
      return this
    },
    removeClass: function(e) {
      for (var t = e.split(" "), a = 0; a < t.length; a += 1)
        for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
      return this
    },
    hasClass: function(e) {
      return !!this[0] && this[0].classList.contains(e)
    },
    toggleClass: function(e) {
      for (var t = e.split(" "), a = 0; a < t.length; a += 1)
        for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
      return this
    },
    attr: function(e, t) {
      var a = arguments;
      if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
      for (var i = 0; i < this.length; i += 1)
        if (2 === a.length) this[i].setAttribute(e, t);
        else
          for (var s in e) this[i][s] = e[s], this[i].setAttribute(s, e[s]);
      return this
    },
    removeAttr: function(e) {
      for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this
    },
    data: function(e, t) {
      var a;
      if (void 0 !== t) {
        for (var i = 0; i < this.length; i += 1)(a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t;
        return this
      }
      if (a = this[0]) {
        if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage) return a.dom7ElementDataStorage[e];
        var s = a.getAttribute("data-" + e);
        return s || void 0
      }
    },
    transform: function(e) {
      for (var t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        a.webkitTransform = e, a.transform = e
      }
      return this
    },
    transition: function(e) {
      "string" != typeof e && (e += "ms");
      for (var t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        a.webkitTransitionDuration = e, a.transitionDuration = e
      }
      return this
    },
    on: function() {
      for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
      var i = t[0],
        r = t[1],
        n = t[2],
        s = t[3];

      function o(e) {
        var t = e.target;
        if (t) {
          var a = e.target.dom7EventData || [];
          if (a.indexOf(e) < 0 && a.unshift(e), L(t).is(r)) n.apply(t, a);
          else
            for (var i = L(t).parents(), s = 0; s < i.length; s += 1) L(i[s]).is(r) && n.apply(i[s], a)
        }
      }

      function l(e) {
        var t = e && e.target && e.target.dom7EventData || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
      }
      "function" == typeof t[1] && (i = (e = t)[0], n = e[1], s = e[2], r = void 0), s || (s = !1);
      for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (r)
          for (d = 0; d < p.length; d += 1) {
            var h = p[d];
            u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({
              listener: n,
              proxyListener: o
            }), u.addEventListener(h, o, s)
          } else
            for (d = 0; d < p.length; d += 1) {
              var v = p[d];
              u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({
                listener: n,
                proxyListener: l
              }), u.addEventListener(v, l, s)
            }
      }
      return this
    },
    off: function() {
      for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
      var i = t[0],
        s = t[1],
        r = t[2],
        n = t[3];
      "function" == typeof t[1] && (i = (e = t)[0], r = e[1], n = e[2], s = void 0), n || (n = !1);
      for (var o = i.split(" "), l = 0; l < o.length; l += 1)
        for (var d = o[l], p = 0; p < this.length; p += 1) {
          var c = this[p],
            u = void 0;
          if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length)
            for (var h = u.length - 1; 0 <= h; h -= 1) {
              var v = u[h];
              r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1))
            }
        }
      return this
    },
    trigger: function() {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
        for (var r = a[s], n = 0; n < this.length; n += 1) {
          var o = this[n],
            l = void 0;
          try {
            l = new Y.CustomEvent(r, {
              detail: i,
              bubbles: !0,
              cancelable: !0
            })
          } catch (e) {
            (l = f.createEvent("Event")).initEvent(r, !0, !0), l.detail = i
          }
          o.dom7EventData = e.filter(function(e, t) {
            return 0 < t
          }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData
        }
      return this
    },
    transitionEnd: function(t) {
      var a, i = ["webkitTransitionEnd", "transitionend"],
        s = this;

      function r(e) {
        if (e.target === this)
          for (t.call(this, e), a = 0; a < i.length; a += 1) s.off(i[a], r)
      }
      if (t)
        for (a = 0; a < i.length; a += 1) s.on(i[a], r);
      return this
    },
    outerWidth: function(e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
        }
        return this[0].offsetWidth
      }
      return null
    },
    outerHeight: function(e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
        }
        return this[0].offsetHeight
      }
      return null
    },
    offset: function() {
      if (0 < this.length) {
        var e = this[0],
          t = e.getBoundingClientRect(),
          a = f.body,
          i = e.clientTop || a.clientTop || 0,
          s = e.clientLeft || a.clientLeft || 0,
          r = e === Y ? Y.scrollY : e.scrollTop,
          n = e === Y ? Y.scrollX : e.scrollLeft;
        return {
          top: t.top + r - i,
          left: t.left + n - s
        }
      }
      return null
    },
    css: function(e, t) {
      var a;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (var i in e) this[a].style[i] = e[i];
          return this
        }
        if (this[0]) return Y.getComputedStyle(this[0], null).getPropertyValue(e)
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this
      }
      return this
    },
    each: function(e) {
      if (!e) return this;
      for (var t = 0; t < this.length; t += 1)
        if (!1 === e.call(this[t], t, this[t])) return this;
      return this
    },
    html: function(e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this
    },
    text: function(e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this
    },
    is: function(e) {
      var t, a, i = this[0];
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (t = L(e), a = 0; a < t.length; a += 1)
          if (t[a] === i) return !0;
        return !1
      }
      if (e === f) return i === f;
      if (e === Y) return i === Y;
      if (e.nodeType || e instanceof l) {
        for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
          if (t[a] === i) return !0;
        return !1
      }
      return !1
    },
    index: function() {
      var e, t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
        return e
      }
    },
    eq: function(e) {
      if (void 0 === e) return this;
      var t, a = this.length;
      return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]])
    },
    append: function() {
      for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
      for (var i = 0; i < t.length; i += 1) {
        e = t[i];
        for (var s = 0; s < this.length; s += 1)
          if ("string" == typeof e) {
            var r = f.createElement("div");
            for (r.innerHTML = e; r.firstChild;) this[s].appendChild(r.firstChild)
          } else if (e instanceof l)
          for (var n = 0; n < e.length; n += 1) this[s].appendChild(e[n]);
        else this[s].appendChild(e)
      }
      return this
    },
    prepend: function(e) {
      var t, a, i = this;
      for (t = 0; t < this.length; t += 1)
        if ("string" == typeof e) {
          var s = f.createElement("div");
          for (s.innerHTML = e, a = s.childNodes.length - 1; 0 <= a; a -= 1) i[t].insertBefore(s.childNodes[a], i[t].childNodes[0])
        } else if (e instanceof l)
        for (a = 0; a < e.length; a += 1) i[t].insertBefore(e[a], i[t].childNodes[0]);
      else i[t].insertBefore(e, i[t].childNodes[0]);
      return this
    },
    next: function(e) {
      return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([])
    },
    nextAll: function(e) {
      var t = [],
        a = this[0];
      if (!a) return new l([]);
      for (; a.nextElementSibling;) {
        var i = a.nextElementSibling;
        e ? L(i).is(e) && t.push(i) : t.push(i), a = i
      }
      return new l(t)
    },
    prev: function(e) {
      if (0 < this.length) {
        var t = this[0];
        return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([])
      }
      return new l([])
    },
    prevAll: function(e) {
      var t = [],
        a = this[0];
      if (!a) return new l([]);
      for (; a.previousElementSibling;) {
        var i = a.previousElementSibling;
        e ? L(i).is(e) && t.push(i) : t.push(i), a = i
      }
      return new l(t)
    },
    parent: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
      return L(r(t))
    },
    parents: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (var i = this[a].parentNode; i;) e ? L(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
      return L(r(t))
    },
    closest: function(e) {
      var t = this;
      return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
    },
    find: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]);
      return new l(t)
    },
    children: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (var i = this[a].childNodes, s = 0; s < i.length; s += 1) e ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
      return new l(r(t))
    },
    remove: function() {
      for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this
    },
    add: function() {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      var a, i;
      for (a = 0; a < e.length; a += 1) {
        var s = L(e[a]);
        for (i = 0; i < s.length; i += 1) this[this.length] = s[i], this.length += 1
      }
      return this
    },
    styles: function() {
      return this[0] ? Y.getComputedStyle(this[0], null) : {}
    }
  };
  Object.keys(t).forEach(function(e) {
    L.fn[e] = t[e]
  });
  var e, a, i, V = {
      deleteProps: function(e) {
        var t = e;
        Object.keys(t).forEach(function(e) {
          try {
            t[e] = null
          } catch (e) {}
          try {
            delete t[e]
          } catch (e) {}
        })
      },
      nextTick: function(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t)
      },
      now: function() {
        return Date.now()
      },
      getTranslate: function(e, t) {
        var a, i, s;
        void 0 === t && (t = "x");
        var r = Y.getComputedStyle(e, null);
        return Y.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function(e) {
          return e.replace(",", ".")
        }).join(", ")), s = new Y.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = Y.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = Y.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
      },
      parseUrlQuery: function(e) {
        var t, a, i, s, r = {},
          n = e || Y.location.href;
        if ("string" == typeof n && n.length)
          for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
              return "" !== e
            })).length, t = 0; t < s; t += 1) i = a[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
        return r
      },
      isObject: function(e) {
        return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
      },
      extend: function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
          var s = e[i];
          if (null != s)
            for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
              var l = r[n],
                d = Object.getOwnPropertyDescriptor(s, l);
              void 0 !== d && d.enumerable && (V.isObject(a[l]) && V.isObject(s[l]) ? V.extend(a[l], s[l]) : !V.isObject(a[l]) && V.isObject(s[l]) ? (a[l] = {}, V.extend(a[l], s[l])) : a[l] = s[l])
            }
        }
        return a
      }
    },
    R = (i = f.createElement("div"), {
      touch: Y.Modernizr && !0 === Y.Modernizr.touch || !!("ontouchstart" in Y || Y.DocumentTouch && f instanceof Y.DocumentTouch),
      pointerEvents: !(!Y.navigator.pointerEnabled && !Y.PointerEvent),
      prefixedPointerEvents: !!Y.navigator.msPointerEnabled,
      transition: (a = i.style, "transition" in a || "webkitTransition" in a || "MozTransition" in a),
      transforms3d: Y.Modernizr && !0 === Y.Modernizr.csstransforms3d || (e = i.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
      flexbox: function() {
        for (var e = i.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1)
          if (t[a] in e) return !0;
        return !1
      }(),
      observer: "MutationObserver" in Y || "WebkitMutationObserver" in Y,
      passiveListener: function() {
        var e = !1;
        try {
          var t = Object.defineProperty({}, "passive", {
            get: function() {
              e = !0
            }
          });
          Y.addEventListener("testPassiveListener", null, t)
        } catch (e) {}
        return e
      }(),
      gestures: "ongesturestart" in Y
    }),
    s = function(e) {
      void 0 === e && (e = {});
      var t = this;
      t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
        t.on(e, t.params.on[e])
      })
    },
    n = {
      components: {
        configurable: !0
      }
    };
  s.prototype.on = function(e, t, a) {
    var i = this;
    if ("function" != typeof t) return i;
    var s = a ? "unshift" : "push";
    return e.split(" ").forEach(function(e) {
      i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t)
    }), i
  }, s.prototype.once = function(i, s, e) {
    var r = this;
    if ("function" != typeof s) return r;
    return r.on(i, function e() {
      for (var t = [], a = arguments.length; a--;) t[a] = arguments[a];
      s.apply(r, t), r.off(i, e)
    }, e)
  }, s.prototype.off = function(e, i) {
    var s = this;
    return s.eventsListeners && e.split(" ").forEach(function(a) {
      void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a] && s.eventsListeners[a].length && s.eventsListeners[a].forEach(function(e, t) {
        e === i && s.eventsListeners[a].splice(t, 1)
      })
    }), s
  }, s.prototype.emit = function() {
    for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
    var a, i, s, r = this;
    return r.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0], i = e.slice(1, e.length), s = r) : (a = e[0].events, i = e[0].data, s = e[0].context || r), (Array.isArray(a) ? a : a.split(" ")).forEach(function(e) {
      if (r.eventsListeners && r.eventsListeners[e]) {
        var t = [];
        r.eventsListeners[e].forEach(function(e) {
          t.push(e)
        }), t.forEach(function(e) {
          e.apply(s, i)
        })
      }
    })), r
  }, s.prototype.useModulesParams = function(a) {
    var i = this;
    i.modules && Object.keys(i.modules).forEach(function(e) {
      var t = i.modules[e];
      t.params && V.extend(a, t.params)
    })
  }, s.prototype.useModules = function(i) {
    void 0 === i && (i = {});
    var s = this;
    s.modules && Object.keys(s.modules).forEach(function(e) {
      var a = s.modules[e],
        t = i[e] || {};
      a.instance && Object.keys(a.instance).forEach(function(e) {
        var t = a.instance[e];
        s[e] = "function" == typeof t ? t.bind(s) : t
      }), a.on && s.on && Object.keys(a.on).forEach(function(e) {
        s.on(e, a.on[e])
      }), a.create && a.create.bind(s)(t)
    })
  }, n.components.set = function(e) {
    this.use && this.use(e)
  }, s.installModule = function(t) {
    for (var e = [], a = arguments.length - 1; 0 < a--;) e[a] = arguments[a + 1];
    var i = this;
    i.prototype.modules || (i.prototype.modules = {});
    var s = t.name || Object.keys(i.prototype.modules).length + "_" + V.now();
    return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function(e) {
      i.prototype[e] = t.proto[e]
    }), t.static && Object.keys(t.static).forEach(function(e) {
      i[e] = t.static[e]
    }), t.install && t.install.apply(i, e), i
  }, s.use = function(e) {
    for (var t = [], a = arguments.length - 1; 0 < a--;) t[a] = arguments[a + 1];
    var i = this;
    return Array.isArray(e) ? (e.forEach(function(e) {
      return i.installModule(e)
    }), i) : i.installModule.apply(i, [e].concat(t))
  }, Object.defineProperties(s, n);
  var o = {
    updateSize: function() {
      var e, t, a = this,
        i = a.$el;
      e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), V.extend(a, {
        width: e,
        height: t,
        size: a.isHorizontal() ? e : t
      }))
    },
    updateSlides: function() {
      var e = this,
        t = e.params,
        a = e.$wrapperEl,
        i = e.size,
        s = e.rtlTranslate,
        r = e.wrongRTL,
        n = e.virtual && t.virtual.enabled,
        o = n ? e.virtual.slides.length : e.slides.length,
        l = a.children("." + e.params.slideClass),
        d = n ? e.virtual.slides.length : l.length,
        p = [],
        c = [],
        u = [],
        h = t.slidesOffsetBefore;
      "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
      var v = t.slidesOffsetAfter;
      "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
      var f = e.snapGrid.length,
        m = e.snapGrid.length,
        g = t.spaceBetween,
        b = -h,
        w = 0,
        y = 0;
      if (void 0 !== i) {
        var x, T;
        "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i), e.virtualSize = -g, s ? l.css({
          marginLeft: "",
          marginTop: ""
        }) : l.css({
          marginRight: "",
          marginBottom: ""
        }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
        for (var E, S = t.slidesPerColumn, C = x / S, M = C - (t.slidesPerColumn * C - d), k = 0; k < d; k += 1) {
          T = 0;
          var z = l.eq(k);
          if (1 < t.slidesPerColumn) {
            var P = void 0,
              $ = void 0,
              L = void 0;
            "column" === t.slidesPerColumnFill ? (L = k - ($ = Math.floor(k / S)) * S, (M < $ || $ === M && L === S - 1) && S <= (L += 1) && (L = 0, $ += 1), P = $ + L * x / S, z.css({
              "-webkit-box-ordinal-group": P,
              "-moz-box-ordinal-group": P,
              "-ms-flex-order": P,
              "-webkit-order": P,
              order: P
            })) : $ = k - (L = Math.floor(k / C)) * C, z.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== L && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", L)
          }
          if ("none" !== z.css("display")) {
            if ("auto" === t.slidesPerView) {
              var I = Y.getComputedStyle(z[0], null),
                D = z[0].style.transform,
                O = z[0].style.webkitTransform;
              D && (z[0].style.transform = "none"), O && (z[0].style.webkitTransform = "none"), T = t.roundLengths ? e.isHorizontal() ? z.outerWidth(!0) : z.outerHeight(!0) : e.isHorizontal() ? z[0].getBoundingClientRect().width + parseFloat(I.getPropertyValue("margin-left")) + parseFloat(I.getPropertyValue("margin-right")) : z[0].getBoundingClientRect().height + parseFloat(I.getPropertyValue("margin-top")) + parseFloat(I.getPropertyValue("margin-bottom")), D && (z[0].style.transform = D), O && (z[0].style.webkitTransform = O), t.roundLengths && (T = Math.floor(T))
            } else T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), l[k] && (e.isHorizontal() ? l[k].style.width = T + "px" : l[k].style.height = T + "px");
            l[k] && (l[k].swiperSlideSize = T), u.push(T), t.centeredSlides ? (b = b + T / 2 + w / 2 + g, 0 === w && 0 !== k && (b = b - i / 2 - g), 0 === k && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b), b = b + T + g), e.virtualSize += T + g, w = T, y += 1
          }
        }
        if (e.virtualSize = Math.max(e.virtualSize, i) + v, s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({
            width: e.virtualSize + t.spaceBetween + "px"
          }), R.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({
            width: e.virtualSize + t.spaceBetween + "px"
          }) : a.css({
            height: e.virtualSize + t.spaceBetween + "px"
          })), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? a.css({
            width: e.virtualSize + t.spaceBetween + "px"
          }) : a.css({
            height: e.virtualSize + t.spaceBetween + "px"
          }), t.centeredSlides)) {
          E = [];
          for (var A = 0; A < p.length; A += 1) {
            var H = p[A];
            t.roundLengths && (H = Math.floor(H)), p[A] < e.virtualSize + p[0] && E.push(H)
          }
          p = E
        }
        if (!t.centeredSlides) {
          E = [];
          for (var B = 0; B < p.length; B += 1) {
            var G = p[B];
            t.roundLengths && (G = Math.floor(G)), p[B] <= e.virtualSize - i && E.push(G)
          }
          p = E, 1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i)
        }
        if (0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({
            marginLeft: g + "px"
          }) : l.css({
            marginRight: g + "px"
          }) : l.css({
            marginBottom: g + "px"
          })), t.centerInsufficientSlides) {
          var N = 0;
          if (u.forEach(function(e) {
              N += e + (t.spaceBetween ? t.spaceBetween : 0)
            }), (N -= t.spaceBetween) < i) {
            var X = (i - N) / 2;
            p.forEach(function(e, t) {
              p[t] = e - X
            }), c.forEach(function(e, t) {
              c[t] = e + X
            })
          }
        }
        V.extend(e, {
          slides: l,
          snapGrid: p,
          slidesGrid: c,
          slidesSizesGrid: u
        }), d !== o && e.emit("slidesLengthChange"), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), c.length !== m && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
      }
    },
    updateAutoHeight: function(e) {
      var t, a = this,
        i = [],
        s = 0;
      if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
        for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
          var r = a.activeIndex + t;
          if (r > a.slides.length) break;
          i.push(a.slides.eq(r)[0])
        } else i.push(a.slides.eq(a.activeIndex)[0]);
      for (t = 0; t < i.length; t += 1)
        if (void 0 !== i[t]) {
          var n = i[t].offsetHeight;
          s = s < n ? n : s
        } s && a.$wrapperEl.css("height", s + "px")
    },
    updateSlidesOffset: function() {
      for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
    },
    updateSlidesProgress: function(e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this,
        a = t.params,
        i = t.slides,
        s = t.rtlTranslate;
      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        var r = -e;
        s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
        for (var n = 0; n < i.length; n += 1) {
          var o = i[n],
            l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
          if (a.watchSlidesVisibility) {
            var d = -(r - o.swiperSlideOffset),
              p = d + t.slidesSizesGrid[n];
            (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass))
          }
          o.progress = s ? -l : l
        }
        t.visibleSlides = L(t.visibleSlides)
      }
    },
    updateProgress: function(e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this,
        a = t.params,
        i = t.maxTranslate() - t.minTranslate(),
        s = t.progress,
        r = t.isBeginning,
        n = t.isEnd,
        o = r,
        l = n;
      0 === i ? n = r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0, n = 1 <= s), V.extend(t, {
        progress: s,
        isBeginning: r,
        isEnd: n
      }), (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !l && t.emit("reachEnd toEdge"), (o && !r || l && !n) && t.emit("fromEdge"), t.emit("progress", s)
    },
    updateSlidesClasses: function() {
      var e, t = this,
        a = t.slides,
        i = t.params,
        s = t.$wrapperEl,
        r = t.activeIndex,
        n = t.realIndex,
        o = t.virtual && i.virtual.enabled;
      a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
      var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
      var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
      i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
    },
    updateActiveIndex: function(e) {
      var t, a = this,
        i = a.rtlTranslate ? a.translate : -a.translate,
        s = a.slidesGrid,
        r = a.snapGrid,
        n = a.params,
        o = a.activeIndex,
        l = a.realIndex,
        d = a.snapIndex,
        p = e;
      if (void 0 === p) {
        for (var c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
        n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
      }
      if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1), p !== o) {
        var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
        V.extend(a, {
          snapIndex: t,
          realIndex: u,
          previousIndex: o,
          activeIndex: p
        }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), l !== u && a.emit("realIndexChange"), a.emit("slideChange")
      } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"))
    },
    updateClickedSlide: function(e) {
      var t = this,
        a = t.params,
        i = L(e.target).closest("." + a.slideClass)[0],
        s = !1;
      if (i)
        for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0);
      if (!i || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
      t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
    }
  };
  var d = {
    getTranslate: function(e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params,
        a = this.rtlTranslate,
        i = this.translate,
        s = this.$wrapperEl;
      if (t.virtualTranslate) return a ? -i : i;
      var r = V.getTranslate(s[0], e);
      return a && (r = -r), r || 0
    },
    setTranslate: function(e, t) {
      var a = this,
        i = a.rtlTranslate,
        s = a.params,
        r = a.$wrapperEl,
        n = a.progress,
        o = 0,
        l = 0;
      a.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.virtualTranslate || (R.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : l;
      var d = a.maxTranslate() - a.minTranslate();
      (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e), a.emit("setTranslate", a.translate, t)
    },
    minTranslate: function() {
      return -this.snapGrid[0]
    },
    maxTranslate: function() {
      return -this.snapGrid[this.snapGrid.length - 1]
    }
  };
  var p = {
    setTransition: function(e, t) {
      this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
    },
    transitionStart: function(e, t) {
      void 0 === e && (e = !0);
      var a = this,
        i = a.activeIndex,
        s = a.params,
        r = a.previousIndex;
      s.autoHeight && a.updateAutoHeight();
      var n = t;
      if (n || (n = r < i ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
        if ("reset" === n) return void a.emit("slideResetTransitionStart");
        a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
      }
    },
    transitionEnd: function(e, t) {
      void 0 === e && (e = !0);
      var a = this,
        i = a.activeIndex,
        s = a.previousIndex;
      a.animating = !1, a.setTransition(0);
      var r = t;
      if (r || (r = s < i ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
        if ("reset" === r) return void a.emit("slideResetTransitionEnd");
        a.emit("slideChangeTransitionEnd"), "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
      }
    }
  };
  var c = {
    slideTo: function(e, t, a, i) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
      var s = this,
        r = e;
      r < 0 && (r = 0);
      var n = s.params,
        o = s.snapGrid,
        l = s.slidesGrid,
        d = s.previousIndex,
        p = s.activeIndex,
        c = s.rtlTranslate;
      if (s.animating && n.preventInteractionOnTransition) return !1;
      var u = Math.floor(r / n.slidesPerGroup);
      u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart");
      var h, v = -o[u];
      if (s.updateProgress(v), n.normalizeSlideIndex)
        for (var f = 0; f < l.length; f += 1) - Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
      if (s.initialized && r !== p) {
        if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1;
        if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1
      }
      return h = p < r ? "next" : r < p ? "prev" : "reset", c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r), n.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== n.effect && s.setTranslate(v), "reset" !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)), !1) : (0 !== t && R.transition ? (s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) {
        s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(a, h))
      }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.transitionEnd(a, h)), !0)
    },
    slideToLoop: function(e, t, a, i) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
      var s = e;
      return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i)
    },
    slideNext: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
        s = i.params,
        r = i.animating;
      return s.loop ? !r && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)
    },
    slidePrev: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
        s = i.params,
        r = i.animating,
        n = i.snapGrid,
        o = i.slidesGrid,
        l = i.rtlTranslate;
      if (s.loop) {
        if (r) return !1;
        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
      }

      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
      }
      var p, c = d(l ? i.translate : -i.translate),
        u = n.map(function(e) {
          return d(e)
        }),
        h = (o.map(function(e) {
          return d(e)
        }), n[u.indexOf(c)], n[u.indexOf(c) - 1]);
      return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a)
    },
    slideReset: function(e, t, a) {
      return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a)
    },
    slideToClosest: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
        s = i.activeIndex,
        r = Math.floor(s / i.params.slidesPerGroup);
      if (r < i.snapGrid.length - 1) {
        var n = i.rtlTranslate ? i.translate : -i.translate,
          o = i.snapGrid[r];
        (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup)
      }
      return i.slideTo(s, e, t, a)
    },
    slideToClickedSlide: function() {
      var e, t = this,
        a = t.params,
        i = t.$wrapperEl,
        s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
        r = t.clickedIndex;
      if (a.loop) {
        if (t.animating) return;
        e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), V.nextTick(function() {
          t.slideTo(r)
        })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), V.nextTick(function() {
          t.slideTo(r)
        })) : t.slideTo(r)
      } else t.slideTo(r)
    }
  };
  var u = {
    loopCreate: function() {
      var i = this,
        e = i.params,
        t = i.$wrapperEl;
      t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
      var s = t.children("." + e.slideClass);
      if (e.loopFillGroupWithBlank) {
        var a = e.slidesPerGroup - s.length % e.slidesPerGroup;
        if (a !== e.slidesPerGroup) {
          for (var r = 0; r < a; r += 1) {
            var n = L(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
            t.append(n)
          }
          s = t.children("." + e.slideClass)
        }
      }
      "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length), i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), i.loopedSlides += e.loopAdditionalSlides, i.loopedSlides > s.length && (i.loopedSlides = s.length);
      var o = [],
        l = [];
      s.each(function(e, t) {
        var a = L(t);
        e < i.loopedSlides && l.push(t), e < s.length && e >= s.length - i.loopedSlides && o.push(t), a.attr("data-swiper-slide-index", e)
      });
      for (var d = 0; d < l.length; d += 1) t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
      for (var p = o.length - 1; 0 <= p; p -= 1) t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass))
    },
    loopFix: function() {
      var e, t = this,
        a = t.params,
        i = t.activeIndex,
        s = t.slides,
        r = t.loopedSlides,
        n = t.allowSlidePrev,
        o = t.allowSlideNext,
        l = t.snapGrid,
        d = t.rtlTranslate;
      t.allowSlidePrev = !0, t.allowSlideNext = !0;
      var p = -l[i] - t.getTranslate();
      i < r ? (e = s.length - 3 * r + i, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) && (e = -s.length + i + r, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p));
      t.allowSlidePrev = n, t.allowSlideNext = o
    },
    loopDestroy: function() {
      var e = this.$wrapperEl,
        t = this.params,
        a = this.slides;
      e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), a.removeAttr("data-swiper-slide-index")
    }
  };
  var h = {
    setGrabCursor: function(e) {
      if (!(R.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
        var t = this.el;
        t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
      }
    },
    unsetGrabCursor: function() {
      R.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
    }
  };
  var v = {
      appendSlide: function(e) {
        var t = this,
          a = t.$wrapperEl,
          i = t.params;
        if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
          for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
        else a.append(e);
        i.loop && t.loopCreate(), i.observer && R.observer || t.update()
      },
      prependSlide: function(e) {
        var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
        a.loop && t.loopDestroy();
        var r = s + 1;
        if ("object" == typeof e && "length" in e) {
          for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
          r = s + e.length
        } else i.prepend(e);
        a.loop && t.loopCreate(), a.observer && R.observer || t.update(), t.slideTo(r, 0, !1)
      },
      addSlide: function(e, t) {
        var a = this,
          i = a.$wrapperEl,
          s = a.params,
          r = a.activeIndex;
        s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
        var n = a.slides.length;
        if (e <= 0) a.prependSlide(t);
        else if (n <= e) a.appendSlide(t);
        else {
          for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
            var p = a.slides.eq(d);
            p.remove(), l.unshift(p)
          }
          if ("object" == typeof t && "length" in t) {
            for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
            o = e < r ? r + t.length : r
          } else i.append(t);
          for (var u = 0; u < l.length; u += 1) i.append(l[u]);
          s.loop && a.loopCreate(), s.observer && R.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1)
        }
      },
      removeSlide: function(e) {
        var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
        a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
        var r, n = s;
        if ("object" == typeof e && "length" in e) {
          for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
          n = Math.max(n, 0)
        } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
        a.loop && t.loopCreate(), a.observer && R.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
      },
      removeAllSlides: function() {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e)
      }
    },
    m = function() {
      var e = Y.navigator.userAgent,
        t = {
          ios: !1,
          android: !1,
          androidChrome: !1,
          desktop: !1,
          windows: !1,
          iphone: !1,
          ipod: !1,
          ipad: !1,
          cordova: Y.cordova || Y.phonegap,
          phonegap: Y.cordova || Y.phonegap
        },
        a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
        i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        s = e.match(/(iPad).*OS\s([\d_]+)/),
        r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (a && (t.os = "windows", t.osVersion = a[2], t.windows = !0), i && !a && (t.os = "android", t.osVersion = i[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (s || n || r) && (t.os = "ios", t.ios = !0), n && !r && (t.osVersion = n[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
        var o = t.osVersion.split("."),
          l = f.querySelector('meta[name="viewport"]');
        t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
      }
      return t.pixelRatio = Y.devicePixelRatio || 1, t
    }();

  function g() {
    var e = this,
      t = e.params,
      a = e.el;
    if (!a || 0 !== a.offsetWidth) {
      t.breakpoints && e.setBreakpoint();
      var i = e.allowSlideNext,
        s = e.allowSlidePrev,
        r = e.snapGrid;
      if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
        var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
        e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight()
      } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
      e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }
  }
  var b = {
    attachEvents: function() {
      var e = this,
        t = e.params,
        a = e.touchEvents,
        i = e.el,
        s = e.wrapperEl;
      e.onTouchStart = function(e) {
        var t = this,
          a = t.touchEventsData,
          i = t.params,
          s = t.touches;
        if (!t.animating || !i.preventInteractionOnTransition) {
          var r = e;
          if (r.originalEvent && (r = r.originalEvent), a.isTouchEvent = "touchstart" === r.type, (a.isTouchEvent || !("which" in r) || 3 !== r.which) && !(!a.isTouchEvent && "button" in r && 0 < r.button || a.isTouched && a.isMoved))
            if (i.noSwiping && L(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0]) t.allowClick = !0;
            else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) {
            s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
            var n = s.currentX,
              o = s.currentY,
              l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
              d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
            if (!l || !(n <= d || n >= Y.screen.width - d)) {
              if (V.extend(a, {
                  isTouched: !0,
                  isMoved: !1,
                  allowTouchCallbacks: !0,
                  isScrolling: void 0,
                  startMoving: void 0
                }), s.startX = n, s.startY = o, a.touchStartTime = V.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < i.threshold && (a.allowThresholdMove = !1), "touchstart" !== r.type) {
                var p = !0;
                L(r.target).is(a.formElements) && (p = !1), f.activeElement && L(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur(), p && t.allowTouchMove && i.touchStartPreventDefault && r.preventDefault()
              }
              t.emit("touchStart", r)
            }
          }
        }
      }.bind(e), e.onTouchMove = function(e) {
        var t = this,
          a = t.touchEventsData,
          i = t.params,
          s = t.touches,
          r = t.rtlTranslate,
          n = e;
        if (n.originalEvent && (n = n.originalEvent), a.isTouched) {
          if (!a.isTouchEvent || "mousemove" !== n.type) {
            var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
              l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
            if (n.preventedByNestedSwiper) return s.startX = o, void(s.startY = l);
            if (!t.allowTouchMove) return t.allowClick = !1, void(a.isTouched && (V.extend(s, {
              startX: o,
              startY: l,
              currentX: o,
              currentY: l
            }), a.touchStartTime = V.now()));
            if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
              if (t.isVertical()) {
                if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate()) return a.isTouched = !1, void(a.isMoved = !1)
              } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate()) return;
            if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && L(n.target).is(a.formElements)) return a.isMoved = !0, void(t.allowClick = !1);
            if (a.allowTouchCallbacks && t.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) {
              s.currentX = o, s.currentY = l;
              var d, p = s.currentX - s.startX,
                c = s.currentY - s.startY;
              if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) < t.params.threshold))
                if (void 0 === a.isScrolling && (t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= p * p + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(p)) / Math.PI, a.isScrolling = t.isHorizontal() ? d > i.touchAngle : 90 - d > i.touchAngle)), a.isScrolling && t.emit("touchMoveOpposite", n), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1;
                else if (a.startMoving) {
                t.allowClick = !1, n.preventDefault(), i.touchMoveStopPropagation && !i.nested && n.stopPropagation(), a.isMoved || (i.loop && t.loopFix(), a.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", n)), t.emit("sliderMove", n), a.isMoved = !0;
                var u = t.isHorizontal() ? p : c;
                s.diff = u, u *= i.touchRatio, r && (u = -u), t.swipeDirection = 0 < u ? "prev" : "next", a.currentTranslate = u + a.startTranslate;
                var h = !0,
                  v = i.resistanceRatio;
                if (i.touchReleaseOnEdges && (v = 0), 0 < u && a.currentTranslate > t.minTranslate() ? (h = !1, i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1, i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))), h && (n.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < i.threshold) {
                  if (!(Math.abs(u) > i.threshold || a.allowThresholdMove)) return void(a.currentTranslate = a.startTranslate);
                  if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void(s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                }
                i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && (0 === a.velocities.length && a.velocities.push({
                  position: s[t.isHorizontal() ? "startX" : "startY"],
                  time: a.touchStartTime
                }), a.velocities.push({
                  position: s[t.isHorizontal() ? "currentX" : "currentY"],
                  time: V.now()
                })), t.updateProgress(a.currentTranslate), t.setTranslate(a.currentTranslate))
              }
            }
          }
        } else a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n)
      }.bind(e), e.onTouchEnd = function(e) {
        var t = this,
          a = t.touchEventsData,
          i = t.params,
          s = t.touches,
          r = t.rtlTranslate,
          n = t.$wrapperEl,
          o = t.slidesGrid,
          l = t.snapGrid,
          d = e;
        if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
        i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p, c = V.now(),
          u = c - a.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout), a.clickTimeout = V.nextTick(function() {
            t && !t.destroyed && t.emit("click", d)
          }, 300)), u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout), t.emit("doubleTap", d))), a.lastClickTime = V.now(), V.nextTick(function() {
            t.destroyed || (t.allowClick = !0)
          }), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1);
        if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, i.freeMode) {
          if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
          if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
          if (i.freeModeMomentum) {
            if (1 < a.velocities.length) {
              var h = a.velocities.pop(),
                v = a.velocities.pop(),
                f = h.position - v.position,
                m = h.time - v.time;
              t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < V.now() - h.time) && (t.velocity = 0)
            } else t.velocity = 0;
            t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
            var g = 1e3 * i.freeModeMomentumRatio,
              b = t.velocity * g,
              w = t.translate + b;
            r && (w = -w);
            var y, x, T = !1,
              E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
            if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E), y = t.maxTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (x = !0);
            else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E), y = t.minTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (x = !0);
            else if (i.freeModeSticky) {
              for (var S, C = 0; C < l.length; C += 1)
                if (l[C] > -w) {
                  S = C;
                  break
                } w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1])
            }
            if (x && t.once("transitionEnd", function() {
                t.loopFix()
              }), 0 !== t.velocity) g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
            else if (i.freeModeSticky) return void t.slideToClosest();
            i.freeModeMomentumBounce && T ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function() {
              t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), t.setTranslate(y), n.transitionEnd(function() {
                t && !t.destroyed && t.transitionEnd()
              }))
            })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function() {
              t && !t.destroyed && t.transitionEnd()
            }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
          } else if (i.freeModeSticky) return void t.slideToClosest();
          (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
        } else {
          for (var M = 0, k = t.slidesSizesGrid[0], z = 0; z < o.length; z += i.slidesPerGroup) void 0 !== o[z + i.slidesPerGroup] ? p >= o[z] && p < o[z + i.slidesPerGroup] && (k = o[(M = z) + i.slidesPerGroup] - o[z]) : p >= o[z] && (M = z, k = o[o.length - 1] - o[o.length - 2]);
          var P = (p - o[M]) / k;
          if (u > i.longSwipesMs) {
            if (!i.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (P >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (P > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M))
          } else {
            if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M)
          }
        }
      }.bind(e), e.onClick = function(e) {
        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
      }.bind(e);
      var r = "container" === t.touchEventsTarget ? i : s,
        n = !!t.nested;
      if (R.touch || !R.pointerEvents && !R.prefixedPointerEvents) {
        if (R.touch) {
          var o = !("touchstart" !== a.start || !R.passiveListener || !t.passiveListeners) && {
            passive: !0,
            capture: !1
          };
          r.addEventListener(a.start, e.onTouchStart, o), r.addEventListener(a.move, e.onTouchMove, R.passiveListener ? {
            passive: !1,
            capture: n
          } : n), r.addEventListener(a.end, e.onTouchEnd, o)
        }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !R.touch && m.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, n), f.addEventListener("mouseup", e.onTouchEnd, !1))
      } else r.addEventListener(a.start, e.onTouchStart, !1), f.addEventListener(a.move, e.onTouchMove, n), f.addEventListener(a.end, e.onTouchEnd, !1);
      (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), e.on(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g, !0)
    },
    detachEvents: function() {
      var e = this,
        t = e.params,
        a = e.touchEvents,
        i = e.el,
        s = e.wrapperEl,
        r = "container" === t.touchEventsTarget ? i : s,
        n = !!t.nested;
      if (R.touch || !R.pointerEvents && !R.prefixedPointerEvents) {
        if (R.touch) {
          var o = !("onTouchStart" !== a.start || !R.passiveListener || !t.passiveListeners) && {
            passive: !0,
            capture: !1
          };
          r.removeEventListener(a.start, e.onTouchStart, o), r.removeEventListener(a.move, e.onTouchMove, n), r.removeEventListener(a.end, e.onTouchEnd, o)
        }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !R.touch && m.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, n), f.removeEventListener("mouseup", e.onTouchEnd, !1))
      } else r.removeEventListener(a.start, e.onTouchStart, !1), f.removeEventListener(a.move, e.onTouchMove, n), f.removeEventListener(a.end, e.onTouchEnd, !1);
      (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), e.off(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g)
    }
  };
  var w, y = {
      setBreakpoint: function() {
        var e = this,
          t = e.activeIndex,
          a = e.initialized,
          i = e.loopedSlides;
        void 0 === i && (i = 0);
        var s = e.params,
          r = s.breakpoints;
        if (r && (!r || 0 !== Object.keys(r).length)) {
          var n = e.getBreakpoint(r);
          if (n && e.currentBreakpoint !== n) {
            var o = n in r ? r[n] : e.originalParams,
              l = s.loop && o.slidesPerView !== s.slidesPerView;
            V.extend(e.params, o), V.extend(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev
            }), e.currentBreakpoint = n, l && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", o)
          }
        }
      },
      getBreakpoint: function(e) {
        if (e) {
          var t = !1,
            a = [];
          Object.keys(e).forEach(function(e) {
            a.push(e)
          }), a.sort(function(e, t) {
            return parseInt(e, 10) - parseInt(t, 10)
          });
          for (var i = 0; i < a.length; i += 1) {
            var s = a[i];
            this.params.breakpointsInverse ? s <= Y.innerWidth && (t = s) : s >= Y.innerWidth && !t && (t = s)
          }
          return t || "max"
        }
      }
    },
    I = {
      isIE: !!Y.navigator.userAgent.match(/Trident/g) || !!Y.navigator.userAgent.match(/MSIE/g),
      isEdge: !!Y.navigator.userAgent.match(/Edge/g),
      isSafari: (w = Y.navigator.userAgent.toLowerCase(), 0 <= w.indexOf("safari") && w.indexOf("chrome") < 0 && w.indexOf("android") < 0),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(Y.navigator.userAgent)
    };
  var x = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      preventInteractionOnTransition: !1,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: .02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsInverse: !1,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchStartPreventDefault: !0,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0
    },
    T = {
      update: o,
      translate: d,
      transition: p,
      slide: c,
      loop: u,
      grabCursor: h,
      manipulation: v,
      events: b,
      breakpoints: y,
      checkOverflow: {
        checkOverflow: function() {
          var e = this,
            t = e.isLocked;
          e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
        }
      },
      classes: {
        addClasses: function() {
          var t = this.classNames,
            a = this.params,
            e = this.rtl,
            i = this.$el,
            s = [];
          s.push(a.direction), a.freeMode && s.push("free-mode"), R.flexbox || s.push("no-flexbox"), a.autoHeight && s.push("autoheight"), e && s.push("rtl"), 1 < a.slidesPerColumn && s.push("multirow"), m.android && s.push("android"), m.ios && s.push("ios"), (I.isIE || I.isEdge) && (R.pointerEvents || R.prefixedPointerEvents) && s.push("wp8-" + a.direction), s.forEach(function(e) {
            t.push(a.containerModifierClass + e)
          }), i.addClass(t.join(" "))
        },
        removeClasses: function() {
          var e = this.$el,
            t = this.classNames;
          e.removeClass(t.join(" "))
        }
      },
      images: {
        loadImage: function(e, t, a, i, s, r) {
          var n;

          function o() {
            r && r()
          }
          e.complete && s ? o() : t ? ((n = new Y.Image).onload = o, n.onerror = o, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : o()
        },
        preloadImages: function() {
          var e = this;

          function t() {
            null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
          }
          e.imagesToLoad = e.$el.find("img");
          for (var a = 0; a < e.imagesToLoad.length; a += 1) {
            var i = e.imagesToLoad[a];
            e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
          }
        }
      }
    },
    E = {},
    S = function(u) {
      function h() {
        for (var e, t, s, a = [], i = arguments.length; i--;) a[i] = arguments[i];
        1 === a.length && a[0].constructor && a[0].constructor === Object ? s = a[0] : (t = (e = a)[0], s = e[1]), s || (s = {}), s = V.extend({}, s), t && !s.el && (s.el = t), u.call(this, s), Object.keys(T).forEach(function(t) {
          Object.keys(T[t]).forEach(function(e) {
            h.prototype[e] || (h.prototype[e] = T[t][e])
          })
        });
        var r = this;
        void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function(e) {
          var t = r.modules[e];
          if (t.params) {
            var a = Object.keys(t.params)[0],
              i = t.params[a];
            if ("object" != typeof i || null === i) return;
            if (!(a in s && "enabled" in i)) return;
            !0 === s[a] && (s[a] = {
              enabled: !0
            }), "object" != typeof s[a] || "enabled" in s[a] || (s[a].enabled = !0), s[a] || (s[a] = {
              enabled: !1
            })
          }
        });
        var n = V.extend({}, x);
        r.useModulesParams(n), r.params = V.extend({}, n, E, s), r.originalParams = V.extend({}, r.params), r.passedParams = V.extend({}, s);
        var o = (r.$ = L)(r.params.el);
        if (t = o[0]) {
          if (1 < o.length) {
            var l = [];
            return o.each(function(e, t) {
              var a = V.extend({}, s, {
                el: t
              });
              l.push(new h(a))
            }), l
          }
          t.swiper = r, o.data("swiper", r);
          var d, p, c = o.children("." + r.params.wrapperClass);
          return V.extend(r, {
            $el: o,
            el: t,
            $wrapperEl: c,
            wrapperEl: c[0],
            classNames: [],
            slides: L(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: function() {
              return "horizontal" === r.params.direction
            },
            isVertical: function() {
              return "vertical" === r.params.direction
            },
            rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
            rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
            wrongRTL: "-webkit-box" === c.css("display"),
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: r.params.allowSlideNext,
            allowSlidePrev: r.params.allowSlidePrev,
            touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], R.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : R.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), r.touchEventsTouch = {
              start: d[0],
              move: d[1],
              end: d[2]
            }, r.touchEventsDesktop = {
              start: p[0],
              move: p[1],
              end: p[2]
            }, R.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              formElements: "input, select, option, textarea, button, video",
              lastClickTime: V.now(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0
            },
            allowClick: !0,
            allowTouchMove: r.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
          }), r.useModules(), r.params.init && r.init(), r
        }
      }
      u && (h.__proto__ = u);
      var e = {
        extendedDefaults: {
          configurable: !0
        },
        defaults: {
          configurable: !0
        },
        Class: {
          configurable: !0
        },
        $: {
          configurable: !0
        }
      };
      return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function() {
        var e = this,
          t = e.params,
          a = e.slides,
          i = e.slidesGrid,
          s = e.size,
          r = e.activeIndex,
          n = 1;
        if (t.centeredSlides) {
          for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !o && (n += 1, s < (l += a[d].swiperSlideSize) && (o = !0));
          for (var p = r - 1; 0 <= p; p -= 1) a[p] && !o && (n += 1, s < (l += a[p].swiperSlideSize) && (o = !0))
        } else
          for (var c = r + 1; c < a.length; c += 1) i[c] - i[r] < s && (n += 1);
        return n
      }, h.prototype.update = function() {
        var a = this;
        if (a && !a.destroyed) {
          var e = a.snapGrid,
            t = a.params;
          t.breakpoints && a.setBreakpoint(), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses(), a.params.freeMode ? (i(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(), t.watchOverflow && e !== a.snapGrid && a.checkOverflow(), a.emit("update")
        }

        function i() {
          var e = a.rtlTranslate ? -1 * a.translate : a.translate,
            t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
          a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses()
        }
      }, h.prototype.init = function() {
        var e = this;
        e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
      }, h.prototype.destroy = function(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        var a = this,
          i = a.params,
          s = a.$el,
          r = a.$wrapperEl,
          n = a.slides;
        return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), i.loop && a.loopDestroy(), t && (a.removeClasses(), s.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach(function(e) {
          a.off(e)
        }), !1 !== e && (a.$el[0].swiper = null, a.$el.data("swiper", null), V.deleteProps(a)), a.destroyed = !0), null
      }, h.extendDefaults = function(e) {
        V.extend(E, e)
      }, e.extendedDefaults.get = function() {
        return E
      }, e.defaults.get = function() {
        return x
      }, e.Class.get = function() {
        return u
      }, e.$.get = function() {
        return L
      }, Object.defineProperties(h, e), h
    }(s),
    C = {
      name: "device",
      proto: {
        device: m
      },
      static: {
        device: m
      }
    },
    M = {
      name: "support",
      proto: {
        support: R
      },
      static: {
        support: R
      }
    },
    k = {
      name: "browser",
      proto: {
        browser: I
      },
      static: {
        browser: I
      }
    },
    z = {
      name: "resize",
      create: function() {
        var e = this;
        V.extend(e, {
          resize: {
            resizeHandler: function() {
              e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
            },
            orientationChangeHandler: function() {
              e && !e.destroyed && e.initialized && e.emit("orientationchange")
            }
          }
        })
      },
      on: {
        init: function() {
          Y.addEventListener("resize", this.resize.resizeHandler), Y.addEventListener("orientationchange", this.resize.orientationChangeHandler)
        },
        destroy: function() {
          Y.removeEventListener("resize", this.resize.resizeHandler), Y.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
        }
      }
    },
    P = {
      func: Y.MutationObserver || Y.WebkitMutationObserver,
      attach: function(e, t) {
        void 0 === t && (t = {});
        var a = this,
          i = new P.func(function(e) {
            if (1 !== e.length) {
              var t = function() {
                a.emit("observerUpdate", e[0])
              };
              Y.requestAnimationFrame ? Y.requestAnimationFrame(t) : Y.setTimeout(t, 0)
            } else a.emit("observerUpdate", e[0])
          });
        i.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData
        }), a.observer.observers.push(i)
      },
      init: function() {
        var e = this;
        if (R.observer && e.params.observer) {
          if (e.params.observeParents)
            for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
          e.observer.attach(e.$el[0], {
            childList: !1
          }), e.observer.attach(e.$wrapperEl[0], {
            attributes: !1
          })
        }
      },
      destroy: function() {
        this.observer.observers.forEach(function(e) {
          e.disconnect()
        }), this.observer.observers = []
      }
    },
    $ = {
      name: "observer",
      params: {
        observer: !1,
        observeParents: !1
      },
      create: function() {
        V.extend(this, {
          observer: {
            init: P.init.bind(this),
            attach: P.attach.bind(this),
            destroy: P.destroy.bind(this),
            observers: []
          }
        })
      },
      on: {
        init: function() {
          this.observer.init()
        },
        destroy: function() {
          this.observer.destroy()
        }
      }
    },
    D = {
      update: function(e) {
        var t = this,
          a = t.params,
          i = a.slidesPerView,
          s = a.slidesPerGroup,
          r = a.centeredSlides,
          n = t.params.virtual,
          o = n.addSlidesBefore,
          l = n.addSlidesAfter,
          d = t.virtual,
          p = d.from,
          c = d.to,
          u = d.slides,
          h = d.slidesGrid,
          v = d.renderSlide,
          f = d.offset;
        t.updateActiveIndex();
        var m, g, b, w = t.activeIndex || 0;
        m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (g = Math.floor(i / 2) + s + o, b = Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o, b = s + l);
        var y = Math.max((w || 0) - b, 0),
          x = Math.min((w || 0) + g, u.length - 1),
          T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);

        function E() {
          t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
        }
        if (V.extend(t.virtual, {
            from: y,
            to: x,
            offset: T,
            slidesGrid: t.slidesGrid
          }), p === y && c === x && !e) return t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"), void t.updateProgress();
        if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
          offset: T,
          from: y,
          to: x,
          slides: function() {
            for (var e = [], t = y; t <= x; t += 1) e.push(u[t]);
            return e
          }()
        }), void E();
        var S = [],
          C = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
        else
          for (var M = p; M <= c; M += 1)(M < y || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove();
        for (var k = 0; k < u.length; k += 1) y <= k && k <= x && (void 0 === c || e ? C.push(k) : (c < k && C.push(k), k < p && S.push(k)));
        C.forEach(function(e) {
          t.$wrapperEl.append(v(u[e], e))
        }), S.sort(function(e, t) {
          return e < t
        }).forEach(function(e) {
          t.$wrapperEl.prepend(v(u[e], e))
        }), t.$wrapperEl.children(".swiper-slide").css(m, T + "px"), E()
      },
      renderSlide: function(e, t) {
        var a = this,
          i = a.params.virtual;
        if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
        var s = i.renderSlide ? L(i.renderSlide.call(a, e, t)) : L('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
        return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
      },
      appendSlide: function(e) {
        this.virtual.slides.push(e), this.virtual.update(!0)
      },
      prependSlide: function(e) {
        var t = this;
        if (t.virtual.slides.unshift(e), t.params.virtual.cache) {
          var a = t.virtual.cache,
            i = {};
          Object.keys(a).forEach(function(e) {
            i[e + 1] = a[e]
          }), t.virtual.cache = i
        }
        t.virtual.update(!0), t.slideNext(0)
      }
    },
    O = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          addSlidesBefore: 0,
          addSlidesAfter: 0
        }
      },
      create: function() {
        var e = this;
        V.extend(e, {
          virtual: {
            update: D.update.bind(e),
            appendSlide: D.appendSlide.bind(e),
            prependSlide: D.prependSlide.bind(e),
            renderSlide: D.renderSlide.bind(e),
            slides: e.params.virtual.slides,
            cache: {}
          }
        })
      },
      on: {
        beforeInit: function() {
          var e = this;
          if (e.params.virtual.enabled) {
            e.classNames.push(e.params.containerModifierClass + "virtual");
            var t = {
              watchSlidesProgress: !0
            };
            V.extend(e.params, t), V.extend(e.originalParams, t), e.virtual.update()
          }
        },
        setTranslate: function() {
          this.params.virtual.enabled && this.virtual.update()
        }
      }
    },
    A = {
      handle: function(e) {
        var t = this,
          a = t.rtlTranslate,
          i = e;
        i.originalEvent && (i = i.originalEvent);
        var s = i.keyCode || i.charCode;
        if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s)) return !1;
        if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s)) return !1;
        if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
          if (t.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
            var r = !1;
            if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
            var n = Y.innerWidth,
              o = Y.innerHeight,
              l = t.$el.offset();
            a && (l.left -= t.$el[0].scrollLeft);
            for (var d = [
                [l.left, l.top],
                [l.left + t.width, l.top],
                [l.left, l.top + t.height],
                [l.left + t.width, l.top + t.height]
              ], p = 0; p < d.length; p += 1) {
              var c = d[p];
              0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0)
            }
            if (!r) return
          }
          t.isHorizontal() ? (37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (39 === s && !a || 37 === s && a) && t.slideNext(), (37 === s && !a || 39 === s && a) && t.slidePrev()) : (38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 40 === s && t.slideNext(), 38 === s && t.slidePrev()), t.emit("keyPress", s)
        }
      },
      enable: function() {
        this.keyboard.enabled || (L(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
      },
      disable: function() {
        this.keyboard.enabled && (L(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
      }
    },
    H = {
      name: "keyboard",
      params: {
        keyboard: {
          enabled: !1,
          onlyInViewport: !0
        }
      },
      create: function() {
        V.extend(this, {
          keyboard: {
            enabled: !1,
            enable: A.enable.bind(this),
            disable: A.disable.bind(this),
            handle: A.handle.bind(this)
          }
        })
      },
      on: {
        init: function() {
          this.params.keyboard.enabled && this.keyboard.enable()
        },
        destroy: function() {
          this.keyboard.enabled && this.keyboard.disable()
        }
      }
    };
  var B = {
      lastScrollTime: V.now(),
      event: -1 < Y.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
        var e = "onwheel",
          t = e in f;
        if (!t) {
          var a = f.createElement("div");
          a.setAttribute(e, "return;"), t = "function" == typeof a[e]
        }
        return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")), t
      }() ? "wheel" : "mousewheel",
      normalize: function(e) {
        var t = 0,
          a = 0,
          i = 0,
          s = 0;
        return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
          spinX: t,
          spinY: a,
          pixelX: i,
          pixelY: s
        }
      },
      handleMouseEnter: function() {
        this.mouseEntered = !0
      },
      handleMouseLeave: function() {
        this.mouseEntered = !1
      },
      handle: function(e) {
        var t = e,
          a = this,
          i = a.params.mousewheel;
        if (!a.mouseEntered && !i.releaseOnEdges) return !0;
        t.originalEvent && (t = t.originalEvent);
        var s = 0,
          r = a.rtlTranslate ? -1 : 1,
          n = B.normalize(t);
        if (i.forceToAxis)
          if (a.isHorizontal()) {
            if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
            s = n.pixelX * r
          } else {
            if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
            s = n.pixelY
          }
        else s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
        if (0 === s) return !0;
        if (i.invert && (s = -s), a.params.freeMode) {
          a.params.loop && a.loopFix();
          var o = a.getTranslate() + s * i.sensitivity,
            l = a.isBeginning,
            d = a.isEnd;
          if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), a.setTransition(0), a.setTranslate(o), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = V.nextTick(function() {
              a.slideToClosest()
            }, 300)), a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), o === a.minTranslate() || o === a.maxTranslate()) return !0
        } else {
          if (60 < V.now() - a.mousewheel.lastScrollTime)
            if (s < 0)
              if (a.isEnd && !a.params.loop || a.animating) {
                if (i.releaseOnEdges) return !0
              } else a.slideNext(), a.emit("scroll", t);
          else if (a.isBeginning && !a.params.loop || a.animating) {
            if (i.releaseOnEdges) return !0
          } else a.slidePrev(), a.emit("scroll", t);
          a.mousewheel.lastScrollTime = (new Y.Date).getTime()
        }
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
      },
      enable: function() {
        var e = this;
        if (!B.event) return !1;
        if (e.mousewheel.enabled) return !1;
        var t = e.$el;
        return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(B.event, e.mousewheel.handle), e.mousewheel.enabled = !0
      },
      disable: function() {
        var e = this;
        if (!B.event) return !1;
        if (!e.mousewheel.enabled) return !1;
        var t = e.$el;
        return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.off(B.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1)
      }
    },
    G = {
      update: function() {
        var e = this,
          t = e.params.navigation;
        if (!e.params.loop) {
          var a = e.navigation,
            i = a.$nextEl,
            s = a.$prevEl;
          s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
        }
      },
      init: function() {
        var e, t, a = this,
          i = a.params.navigation;
        (i.nextEl || i.prevEl) && (i.nextEl && (e = L(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = L(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", function(e) {
          e.preventDefault(), a.isEnd && !a.params.loop || a.slideNext()
        }), t && 0 < t.length && t.on("click", function(e) {
          e.preventDefault(), a.isBeginning && !a.params.loop || a.slidePrev()
        }), V.extend(a.navigation, {
          $nextEl: e,
          nextEl: e && e[0],
          $prevEl: t,
          prevEl: t && t[0]
        }))
      },
      destroy: function() {
        var e = this.navigation,
          t = e.$nextEl,
          a = e.$prevEl;
        t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), a && a.length && (a.off("click"), a.removeClass(this.params.navigation.disabledClass))
      }
    },
    N = {
      update: function() {
        var e = this,
          t = e.rtl,
          s = e.params.pagination;
        if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
          var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            i = e.pagination.$el,
            n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
          if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides), n - 1 < r && (r -= n), r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
            var o, l, d, p = e.pagination.bullets;
            if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"), 1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"), 1 < i.length) p.each(function(e, t) {
              var a = L(t),
                i = a.index();
              i === r && a.addClass(s.bulletActiveClass), s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"), i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"))
            });
            else if (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets) {
              for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1) p.eq(h).addClass(s.bulletActiveClass + "-main");
              c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")
            }
            if (s.dynamicBullets) {
              var v = Math.min(p.length, s.dynamicMainBullets + 4),
                f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                m = t ? "right" : "left";
              p.css(e.isHorizontal() ? m : "top", f + "px")
            }
          }
          if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)), i.find("." + s.totalClass).text(s.formatFractionTotal(n))), "progressbar" === s.type) {
            var g;
            g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
            var b = (r + 1) / n,
              w = 1,
              y = 1;
            "horizontal" === g ? w = b : y = b, i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
          }
          "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)), e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass)
        }
      },
      render: function() {
        var e = this,
          t = e.params.pagination;
        if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
          var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            i = e.pagination.$el,
            s = "";
          if ("bullets" === t.type) {
            for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
            i.html(s), e.pagination.bullets = i.find("." + t.bulletClass)
          }
          "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
        }
      },
      init: function() {
        var a = this,
          e = a.params.pagination;
        if (e.el) {
          var t = L(e.el);
          0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), a.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function(e) {
            e.preventDefault();
            var t = L(this).index() * a.params.slidesPerGroup;
            a.params.loop && (t += a.loopedSlides), a.slideTo(t)
          }), V.extend(a.pagination, {
            $el: t,
            el: t[0]
          }))
        }
      },
      destroy: function() {
        var e = this,
          t = e.params.pagination;
        if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
          var a = e.pagination.$el;
          a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass)
        }
      }
    },
    X = {
      setTranslate: function() {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = e.rtlTranslate,
            i = e.progress,
            s = t.dragSize,
            r = t.trackSize,
            n = t.$dragEl,
            o = t.$el,
            l = e.params.scrollbar,
            d = s,
            p = (r - s) * i;
          a ? 0 < (p = -p) ? (d = s - p, p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p, p = 0) : r < p + s && (d = r - p), e.isHorizontal() ? (R.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"), n[0].style.width = d + "px") : (R.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function() {
            o[0].style.opacity = 0, o.transition(400)
          }, 1e3))
        }
      },
      setTransition: function(e) {
        this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
      },
      updateSize: function() {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = t.$dragEl,
            i = t.$el;
          a[0].style.width = "", a[0].style.height = "";
          var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            n = e.size / e.virtualSize,
            o = n * (r / e.size);
          s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = 1 <= n ? "none" : "", e.params.scrollbarHide && (i[0].style.opacity = 0), V.extend(t, {
            trackSize: r,
            divider: n,
            moveDivider: o,
            dragSize: s
          }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
        }
      },
      setDragPosition: function(e) {
        var t, a = this,
          i = a.scrollbar,
          s = a.rtlTranslate,
          r = i.$el,
          n = i.dragSize,
          o = i.trackSize;
        t = ((a.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[a.isHorizontal() ? "left" : "top"] - n / 2) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
        var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
        a.updateProgress(l), a.setTranslate(l), a.updateActiveIndex(), a.updateSlidesClasses()
      },
      onDragStart: function(e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar,
          s = t.$wrapperEl,
          r = i.$el,
          n = i.$dragEl;
        t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e)
      },
      onDragMove: function(e) {
        var t = this.scrollbar,
          a = this.$wrapperEl,
          i = t.$el,
          s = t.$dragEl;
        this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), a.transition(0), i.transition(0), s.transition(0), this.emit("scrollbarDragMove", e))
      },
      onDragEnd: function(e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar.$el;
        t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = V.nextTick(function() {
          i.css("opacity", 0), i.transition(400)
        }, 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
      },
      enableDraggable: function() {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            a = e.touchEvents,
            i = e.touchEventsDesktop,
            s = e.params,
            r = t.$el[0],
            n = !(!R.passiveListener || !s.passiveListeners) && {
              passive: !1,
              capture: !1
            },
            o = !(!R.passiveListener || !s.passiveListeners) && {
              passive: !0,
              capture: !1
            };
          R.touch || !R.pointerEvents && !R.prefixedPointerEvents ? (R.touch && (r.addEventListener(a.start, e.scrollbar.onDragStart, n), r.addEventListener(a.move, e.scrollbar.onDragMove, n), r.addEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !m.ios && !m.android || s.simulateTouch && !R.touch && m.ios) && (r.addEventListener("mousedown", e.scrollbar.onDragStart, n), f.addEventListener("mousemove", e.scrollbar.onDragMove, n), f.addEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n), f.addEventListener(i.move, e.scrollbar.onDragMove, n), f.addEventListener(i.end, e.scrollbar.onDragEnd, o))
        }
      },
      disableDraggable: function() {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            a = e.touchEvents,
            i = e.touchEventsDesktop,
            s = e.params,
            r = t.$el[0],
            n = !(!R.passiveListener || !s.passiveListeners) && {
              passive: !1,
              capture: !1
            },
            o = !(!R.passiveListener || !s.passiveListeners) && {
              passive: !0,
              capture: !1
            };
          R.touch || !R.pointerEvents && !R.prefixedPointerEvents ? (R.touch && (r.removeEventListener(a.start, e.scrollbar.onDragStart, n), r.removeEventListener(a.move, e.scrollbar.onDragMove, n), r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !m.ios && !m.android || s.simulateTouch && !R.touch && m.ios) && (r.removeEventListener("mousedown", e.scrollbar.onDragStart, n), f.removeEventListener("mousemove", e.scrollbar.onDragMove, n), f.removeEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n), f.removeEventListener(i.move, e.scrollbar.onDragMove, n), f.removeEventListener(i.end, e.scrollbar.onDragEnd, o))
        }
      },
      init: function() {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            a = e.$el,
            i = e.params.scrollbar,
            s = L(i.el);
          e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
          var r = s.find("." + e.params.scrollbar.dragClass);
          0 === r.length && (r = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), V.extend(t, {
            $el: s,
            el: s[0],
            $dragEl: r,
            dragEl: r[0]
          }), i.draggable && t.enableDraggable()
        }
      },
      destroy: function() {
        this.scrollbar.disableDraggable()
      }
    },
    F = {
      setTransform: function(e, t) {
        var a = this.rtl,
          i = L(e),
          s = a ? -1 : 1,
          r = i.attr("data-swiper-parallax") || "0",
          n = i.attr("data-swiper-parallax-x"),
          o = i.attr("data-swiper-parallax-y"),
          l = i.attr("data-swiper-parallax-scale"),
          d = i.attr("data-swiper-parallax-opacity");
        if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
          var p = d - (d - 1) * (1 - Math.abs(t));
          i[0].style.opacity = p
        }
        if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");
        else {
          var c = l - (l - 1) * (1 - Math.abs(t));
          i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
        }
      },
      setTranslate: function() {
        var i = this,
          e = i.$el,
          t = i.slides,
          s = i.progress,
          r = i.snapGrid;
        e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
          i.parallax.setTransform(t, s)
        }), t.each(function(e, t) {
          var a = t.progress;
          1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
            i.parallax.setTransform(t, a)
          })
        })
      },
      setTransition: function(s) {
        void 0 === s && (s = this.params.speed);
        this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
          var a = L(t),
            i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
          0 === s && (i = 0), a.transition(i)
        })
      }
    },
    q = {
      getDistanceBetweenTouches: function(e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
          a = e.targetTouches[0].pageY,
          i = e.targetTouches[1].pageX,
          s = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
      },
      onGestureStart: function(e) {
        var t = this,
          a = t.params.zoom,
          i = t.zoom,
          s = i.gesture;
        if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !R.gestures) {
          if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
          i.fakeGestureTouched = !0, s.scaleStart = q.getDistanceBetweenTouches(e)
        }
        s.$slideEl && s.$slideEl.length || (s.$slideEl = L(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), t.zoom.isScaling = !0) : s.$imageEl = void 0
      },
      onGestureChange: function(e) {
        var t = this.params.zoom,
          a = this.zoom,
          i = a.gesture;
        if (!R.gestures) {
          if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
          a.fakeGestureMoved = !0, i.scaleMove = q.getDistanceBetweenTouches(e)
        }
        i.$imageEl && 0 !== i.$imageEl.length && (R.gestures ? this.zoom.scale = e.scale * a.currentScale : a.scale = i.scaleMove / i.scaleStart * a.currentScale, a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)), a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)), i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
      },
      onGestureEnd: function(e) {
        var t = this.params.zoom,
          a = this.zoom,
          i = a.gesture;
        if (!R.gestures) {
          if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
          if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !m.android) return;
          a.fakeGestureTouched = !1, a.fakeGestureMoved = !1
        }
        i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio), i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (i.$slideEl = void 0))
      },
      onTouchStart: function(e) {
        var t = this.zoom,
          a = t.gesture,
          i = t.image;
        a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (m.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
      },
      onTouchMove: function(e) {
        var t = this,
          a = t.zoom,
          i = a.gesture,
          s = a.image,
          r = a.velocity;
        if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
          s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = V.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = V.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
          var n = s.width * a.scale,
            o = s.height * a.scale;
          if (!(n < i.slideWidth && o < i.slideHeight)) {
            if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
              if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
              if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
            }
            e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
          }
        }
      },
      onTouchEnd: function() {
        var e = this.zoom,
          t = e.gesture,
          a = e.image,
          i = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
          a.isTouched = !1, a.isMoved = !1;
          var s = 300,
            r = 300,
            n = i.x * s,
            o = a.currentX + n,
            l = i.y * r,
            d = a.currentY + l;
          0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
          var p = Math.max(s, r);
          a.currentX = o, a.currentY = d;
          var c = a.width * e.scale,
            u = a.height * e.scale;
          a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
        }
      },
      onTransitionEnd: function() {
        var e = this.zoom,
          t = e.gesture;
        t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1)
      },
      toggle: function(e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e)
      },
      in: function(e) {
        var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this,
          b = g.zoom,
          w = g.params.zoom,
          y = b.gesture,
          x = b.image;
        (y.$slideEl || (y.$slideEl = g.clickedSlide ? L(g.clickedSlide) : g.slides.eq(g.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, a = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, m = y.$slideEl[0].offsetHeight, i = y.$slideEl.offset().left + f / 2 - t, s = y.$slideEl.offset().top + m / 2 - a, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * b.scale, p = l * b.scale, h = -(c = Math.min(f / 2 - d / 2, 0)), v = -(u = Math.min(m / 2 - p / 2, 0)), (r = i * b.scale) < c && (r = c), h < r && (r = h), (n = s * b.scale) < u && (n = u), v < n && (n = v)) : n = r = 0, y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
      },
      out: function() {
        var e = this,
          t = e.zoom,
          a = e.params.zoom,
          i = t.gesture;
        i.$slideEl || (i.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
      },
      enable: function() {
        var e = this,
          t = e.zoom;
        if (!t.enabled) {
          t.enabled = !0;
          var a = !("touchstart" !== e.touchEvents.start || !R.passiveListener || !e.params.passiveListeners) && {
            passive: !0,
            capture: !1
          };
          R.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
        }
      },
      disable: function() {
        var e = this,
          t = e.zoom;
        if (t.enabled) {
          e.zoom.enabled = !1;
          var a = !("touchstart" !== e.touchEvents.start || !R.passiveListener || !e.params.passiveListeners) && {
            passive: !0,
            capture: !1
          };
          R.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
        }
      }
    },
    W = {
      loadInSlide: function(e, l) {
        void 0 === l && (l = !0);
        var d = this,
          p = d.params.lazy;
        if (void 0 !== e && 0 !== d.slides.length) {
          var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
            t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
          !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function(e, t) {
            var i = L(t);
            i.addClass(p.loadingClass);
            var s = i.attr("data-background"),
              r = i.attr("data-src"),
              n = i.attr("data-srcset"),
              o = i.attr("data-sizes");
            d.loadImage(i[0], r || s, n, o, !1, function() {
              if (null != d && d && (!d || d.params) && !d.destroyed) {
                if (s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (n && (i.attr("srcset", n), i.removeAttr("data-srcset")), o && (i.attr("sizes", o), i.removeAttr("data-sizes")), r && (i.attr("src", r), i.removeAttr("data-src"))), i.addClass(p.loadedClass).removeClass(p.loadingClass), c.find("." + p.preloaderClass).remove(), d.params.loop && l) {
                  var e = c.attr("data-swiper-slide-index");
                  if (c.hasClass(d.params.slideDuplicateClass)) {
                    var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                    d.lazy.loadInSlide(t.index(), !1)
                  } else {
                    var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                    d.lazy.loadInSlide(a.index(), !1)
                  }
                }
                d.emit("lazyImageReady", c[0], i[0])
              }
            }), d.emit("lazyImageLoad", c[0], i[0])
          })
        }
      },
      load: function() {
        var i = this,
          t = i.$wrapperEl,
          a = i.params,
          s = i.slides,
          e = i.activeIndex,
          r = i.virtual && a.virtual.enabled,
          n = a.lazy,
          o = a.slidesPerView;

        function l(e) {
          if (r) {
            if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
          } else if (s[e]) return !0;
          return !1
        }

        function d(e) {
          return r ? L(e).attr("data-swiper-slide-index") : L(e).index()
        }
        if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each(function(e, t) {
          var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
          i.lazy.loadInSlide(a)
        });
        else if (1 < o)
          for (var p = e; p < e + o; p += 1) l(p) && i.lazy.loadInSlide(p);
        else i.lazy.loadInSlide(e);
        if (n.loadPrevNext)
          if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
            for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1) l(f) && i.lazy.loadInSlide(f);
            for (var m = v; m < e; m += 1) l(m) && i.lazy.loadInSlide(m)
          } else {
            var g = t.children("." + a.slideNextClass);
            0 < g.length && i.lazy.loadInSlide(d(g));
            var b = t.children("." + a.slidePrevClass);
            0 < b.length && i.lazy.loadInSlide(d(b))
          }
      }
    },
    j = {
      LinearSpline: function(e, t) {
        var a, i, s, r, n, o = function(e, t) {
          for (i = -1, a = e.length; 1 < a - i;) e[s = a + i >> 1] <= t ? i = s : a = s;
          return a
        };
        return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
          return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
        }, this
      },
      getInterpolateFunction: function(e) {
        var t = this;
        t.controller.spline || (t.controller.spline = t.params.loop ? new j.LinearSpline(t.slidesGrid, e.slidesGrid) : new j.LinearSpline(t.snapGrid, e.snapGrid))
      },
      setTranslate: function(e, t) {
        var a, i, s = this,
          r = s.controller.control;

        function n(e) {
          var t = s.rtlTranslate ? -s.translate : s.translate;
          "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
        }
        if (Array.isArray(r))
          for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof S && n(r[o]);
        else r instanceof S && t !== r && n(r)
      },
      setTransition: function(t, e) {
        var a, i = this,
          s = i.controller.control;

        function r(e) {
          e.setTransition(t, i), 0 !== t && (e.transitionStart(), e.params.autoHeight && V.nextTick(function() {
            e.updateAutoHeight()
          }), e.$wrapperEl.transitionEnd(function() {
            s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(), e.transitionEnd())
          }))
        }
        if (Array.isArray(s))
          for (a = 0; a < s.length; a += 1) s[a] !== e && s[a] instanceof S && r(s[a]);
        else s instanceof S && e !== s && r(s)
      }
    },
    U = {
      makeElFocusable: function(e) {
        return e.attr("tabIndex", "0"), e
      },
      addElRole: function(e, t) {
        return e.attr("role", t), e
      },
      addElLabel: function(e, t) {
        return e.attr("aria-label", t), e
      },
      disableEl: function(e) {
        return e.attr("aria-disabled", !0), e
      },
      enableEl: function(e) {
        return e.attr("aria-disabled", !1), e
      },
      onEnterKey: function(e) {
        var t = this,
          a = t.params.a11y;
        if (13 === e.keyCode) {
          var i = L(e.target);
          t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click()
        }
      },
      notify: function(e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e))
      },
      updateNavigation: function() {
        var e = this;
        if (!e.params.loop) {
          var t = e.navigation,
            a = t.$nextEl,
            i = t.$prevEl;
          i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)), a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a))
        }
      },
      updatePagination: function() {
        var i = this,
          s = i.params.a11y;
        i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function(e, t) {
          var a = L(t);
          i.a11y.makeElFocusable(a), i.a11y.addElRole(a, "button"), i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
        })
      },
      init: function() {
        var e = this;
        e.$el.append(e.a11y.liveRegion);
        var t, a, i = e.params.a11y;
        e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), a && (e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.prevSlideMessage), a.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
      },
      destroy: function() {
        var e, t, a = this;
        a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey)
      }
    },
    K = {
      init: function() {
        var e = this;
        if (e.params.history) {
          if (!Y.history || !Y.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
          var t = e.history;
          t.initialized = !0, t.paths = K.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || Y.addEventListener("popstate", e.history.setHistoryPopState))
        }
      },
      destroy: function() {
        this.params.history.replaceState || Y.removeEventListener("popstate", this.history.setHistoryPopState)
      },
      setHistoryPopState: function() {
        this.history.paths = K.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
      },
      getPathValues: function() {
        var e = Y.location.pathname.slice(1).split("/").filter(function(e) {
            return "" !== e
          }),
          t = e.length;
        return {
          key: e[t - 2],
          value: e[t - 1]
        }
      },
      setHistory: function(e, t) {
        if (this.history.initialized && this.params.history.enabled) {
          var a = this.slides.eq(t),
            i = K.slugify(a.attr("data-history"));
          Y.location.pathname.includes(e) || (i = e + "/" + i);
          var s = Y.history.state;
          s && s.value === i || (this.params.history.replaceState ? Y.history.replaceState({
            value: i
          }, null, i) : Y.history.pushState({
            value: i
          }, null, i))
        }
      },
      slugify: function(e) {
        return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
      },
      scrollToSlide: function(e, t, a) {
        var i = this;
        if (t)
          for (var s = 0, r = i.slides.length; s < r; s += 1) {
            var n = i.slides.eq(s);
            if (K.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
              var o = n.index();
              i.slideTo(o, e, a)
            }
          } else i.slideTo(0, e, a)
      }
    },
    _ = {
      onHashCange: function() {
        var e = this,
          t = f.location.hash.replace("#", "");
        if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
          var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
          if (void 0 === a) return;
          e.slideTo(a)
        }
      },
      setHash: function() {
        var e = this;
        if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
          if (e.params.hashNavigation.replaceState && Y.history && Y.history.replaceState) Y.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
          else {
            var t = e.slides.eq(e.activeIndex),
              a = t.attr("data-hash") || t.attr("data-history");
            f.location.hash = a || ""
          }
      },
      init: function() {
        var e = this;
        if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
          e.hashNavigation.initialized = !0;
          var t = f.location.hash.replace("#", "");
          if (t)
            for (var a = 0, i = e.slides.length; a < i; a += 1) {
              var s = e.slides.eq(a);
              if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
                var r = s.index();
                e.slideTo(r, 0, e.params.runCallbacksOnInit, !0)
              }
            }
          e.params.hashNavigation.watchState && L(Y).on("hashchange", e.hashNavigation.onHashCange)
        }
      },
      destroy: function() {
        this.params.hashNavigation.watchState && L(Y).off("hashchange", this.hashNavigation.onHashCange)
      }
    },
    Z = {
      run: function() {
        var e = this,
          t = e.slides.eq(e.activeIndex),
          a = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = V.nextTick(function() {
          e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
        }, a)
      },
      start: function() {
        var e = this;
        return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
      },
      stop: function() {
        var e = this;
        return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
      },
      pause: function(e) {
        var t = this;
        t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
      }
    },
    Q = {
      setTranslate: function() {
        for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
          var i = e.slides.eq(a),
            s = -i[0].swiperSlideOffset;
          e.params.virtualTranslate || (s -= e.translate);
          var r = 0;
          e.isHorizontal() || (r = s, s = 0);
          var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({
            opacity: n
          }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
        }
      },
      setTransition: function(e) {
        var a = this,
          t = a.slides,
          i = a.$wrapperEl;
        if (t.transition(e), a.params.virtualTranslate && 0 !== e) {
          var s = !1;
          t.transitionEnd(function() {
            if (!s && a && !a.destroyed) {
              s = !0, a.animating = !1;
              for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) i.trigger(e[t])
            }
          })
        }
      }
    },
    J = {
      setTranslate: function() {
        var e, t = this,
          a = t.$el,
          i = t.$wrapperEl,
          s = t.slides,
          r = t.width,
          n = t.height,
          o = t.rtlTranslate,
          l = t.size,
          d = t.params.cubeEffect,
          p = t.isHorizontal(),
          c = t.virtual && t.params.virtual.enabled,
          u = 0;
        d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
          height: r + "px"
        })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), a.append(e)));
        for (var h = 0; h < s.length; h += 1) {
          var v = s.eq(h),
            f = h;
          c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
          var m = 90 * f,
            g = Math.floor(m / 360);
          o && (m = -m, g = Math.floor(-m / 360));
          var b = Math.max(Math.min(v[0].progress, 1), -1),
            w = 0,
            y = 0,
            x = 0;
          f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), p || (y = w, w = 0);
          var T = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
          if (b <= 1 && -1 < b && (u = 90 * f + 90 * b, o && (u = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) {
            var E = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
              S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
            0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0))
          }
        }
        if (i.css({
            "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
            "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
            "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
            "transform-origin": "50% 50% -" + l / 2 + "px"
          }), d.shadow)
          if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
          else {
            var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
              M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
              k = d.shadowScale,
              z = d.shadowScale / M,
              P = d.shadowOffset;
            e.transform("scale3d(" + k + ", 1, " + z + ") translate3d(0px, " + (n / 2 + P) + "px, " + -n / 2 / z + "px) rotateX(-90deg)")
          } var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
        i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
      },
      setTransition: function(e) {
        var t = this.$el;
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
      }
    },
    ee = {
      setTranslate: function() {
        for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
          var s = t.eq(i),
            r = s[0].progress;
          e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
          var n = -180 * r,
            o = 0,
            l = -s[0].swiperSlideOffset,
            d = 0;
          if (e.isHorizontal() ? a && (n = -n) : (d = l, o = -n, n = l = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
            var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
              c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
            0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
          }
          s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
        }
      },
      setTransition: function(e) {
        var a = this,
          t = a.slides,
          i = a.activeIndex,
          s = a.$wrapperEl;
        if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), a.params.virtualTranslate && 0 !== e) {
          var r = !1;
          t.eq(i).transitionEnd(function() {
            if (!r && a && !a.destroyed) {
              r = !0, a.animating = !1;
              for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) s.trigger(e[t])
            }
          })
        }
      }
    },
    te = {
      setTranslate: function() {
        for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
          var v = i.eq(u),
            f = r[u],
            m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier,
            g = o ? p * m : 0,
            b = o ? 0 : p * m,
            w = -c * Math.abs(m),
            y = o ? 0 : n.stretch * m,
            x = o ? n.stretch * m : 0;
          Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0);
          var T = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";
          if (v.transform(T), v[0].style.zIndex = 1 - Math.abs(Math.round(m)), n.slideShadows) {
            var E = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
              S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
            0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = 0 < m ? m : 0), S.length && (S[0].style.opacity = 0 < -m ? -m : 0)
          }
        }(R.pointerEvents || R.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%")
      },
      setTransition: function(e) {
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
      }
    },
    ae = {
      init: function() {
        var e = this,
          t = e.params.thumbs,
          a = e.constructor;
        t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, V.extend(e.thumbs.swiper.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        }), V.extend(e.thumbs.swiper.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        })) : V.isObject(t.swiper) && (e.thumbs.swiper = new a(V.extend({}, t.swiper, {
          watchSlidesVisibility: !0,
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
      },
      onThumbClick: function() {
        var e = this,
          t = e.thumbs.swiper;
        if (t) {
          var a = t.clickedIndex;
          if (null != a) {
            var i;
            if (i = t.params.loop ? parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) {
              var s = e.activeIndex;
              e.slides.eq(s).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, s = e.activeIndex);
              var r = e.slides.eq(s).prevAll('[data-swiper-slide-index="' + i + '"]').eq(0).index(),
                n = e.slides.eq(s).nextAll('[data-swiper-slide-index="' + i + '"]').eq(0).index();
              i = void 0 === r ? n : void 0 === n ? r : n - s < s - r ? n : r
            }
            e.slideTo(i)
          }
        }
      },
      update: function(e) {
        var t = this,
          a = t.thumbs.swiper;
        if (a) {
          var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView;
          if (t.realIndex !== a.realIndex) {
            var s, r = a.activeIndex;
            if (a.params.loop) {
              a.slides.eq(r).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, r = a.activeIndex);
              var n = a.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                o = a.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
              s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
            } else s = t.realIndex;
            a.visibleSlidesIndexes.indexOf(s) < 0 && (a.params.centeredSlides ? s = r < s ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : r < s && (s = s - i + 1), a.slideTo(s, e ? 0 : void 0))
          }
          var l = 1,
            d = t.params.thumbs.slideThumbActiveClass;
          if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), a.slides.removeClass(d), a.params.loop)
            for (var p = 0; p < l; p += 1) a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(d);
          else
            for (var c = 0; c < l; c += 1) a.slides.eq(t.realIndex + c).addClass(d)
        }
      }
    },
    ie = [C, M, k, z, $, O, H, {
      name: "mousewheel",
      params: {
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarged: "container"
        }
      },
      create: function() {
        var e = this;
        V.extend(e, {
          mousewheel: {
            enabled: !1,
            enable: B.enable.bind(e),
            disable: B.disable.bind(e),
            handle: B.handle.bind(e),
            handleMouseEnter: B.handleMouseEnter.bind(e),
            handleMouseLeave: B.handleMouseLeave.bind(e),
            lastScrollTime: V.now()
          }
        })
      },
      on: {
        init: function() {
          this.params.mousewheel.enabled && this.mousewheel.enable()
        },
        destroy: function() {
          this.mousewheel.enabled && this.mousewheel.disable()
        }
      }
    }, {
      name: "navigation",
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock"
        }
      },
      create: function() {
        V.extend(this, {
          navigation: {
            init: G.init.bind(this),
            update: G.update.bind(this),
            destroy: G.destroy.bind(this)
          }
        })
      },
      on: {
        init: function() {
          this.navigation.init(), this.navigation.update()
        },
        toEdge: function() {
          this.navigation.update()
        },
        fromEdge: function() {
          this.navigation.update()
        },
        destroy: function() {
          this.navigation.destroy()
        },
        click: function(e) {
          var t = this.navigation,
            a = t.$nextEl,
            i = t.$prevEl;
          !this.params.navigation.hideOnClick || L(e.target).is(i) || L(e.target).is(a) || (a && a.toggleClass(this.params.navigation.hiddenClass), i && i.toggleClass(this.params.navigation.hiddenClass))
        }
      }
    }, {
      name: "pagination",
      params: {
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: function(e) {
            return e
          },
          formatFractionTotal: function(e) {
            return e
          },
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          modifierClass: "swiper-pagination-",
          currentClass: "swiper-pagination-current",
          totalClass: "swiper-pagination-total",
          hiddenClass: "swiper-pagination-hidden",
          progressbarFillClass: "swiper-pagination-progressbar-fill",
          progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
          clickableClass: "swiper-pagination-clickable",
          lockClass: "swiper-pagination-lock"
        }
      },
      create: function() {
        var e = this;
        V.extend(e, {
          pagination: {
            init: N.init.bind(e),
            render: N.render.bind(e),
            update: N.update.bind(e),
            destroy: N.destroy.bind(e),
            dynamicBulletIndex: 0
          }
        })
      },
      on: {
        init: function() {
          this.pagination.init(), this.pagination.render(), this.pagination.update()
        },
        activeIndexChange: function() {
          this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
        },
        snapIndexChange: function() {
          this.params.loop || this.pagination.update()
        },
        slidesLengthChange: function() {
          this.params.loop && (this.pagination.render(), this.pagination.update())
        },
        snapGridLengthChange: function() {
          this.params.loop || (this.pagination.render(), this.pagination.update())
        },
        destroy: function() {
          this.pagination.destroy()
        },
        click: function(e) {
          var t = this;
          t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && t.pagination.$el.toggleClass(t.params.pagination.hiddenClass)
        }
      }
    }, {
      name: "scrollbar",
      params: {
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag"
        }
      },
      create: function() {
        var e = this;
        V.extend(e, {
          scrollbar: {
            init: X.init.bind(e),
            destroy: X.destroy.bind(e),
            updateSize: X.updateSize.bind(e),
            setTranslate: X.setTranslate.bind(e),
            setTransition: X.setTransition.bind(e),
            enableDraggable: X.enableDraggable.bind(e),
            disableDraggable: X.disableDraggable.bind(e),
            setDragPosition: X.setDragPosition.bind(e),
            onDragStart: X.onDragStart.bind(e),
            onDragMove: X.onDragMove.bind(e),
            onDragEnd: X.onDragEnd.bind(e),
            isTouched: !1,
            timeout: null,
            dragTimeout: null
          }
        })
      },
      on: {
        init: function() {
          this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
        },
        update: function() {
          this.scrollbar.updateSize()
        },
        resize: function() {
          this.scrollbar.updateSize()
        },
        observerUpdate: function() {
          this.scrollbar.updateSize()
        },
        setTranslate: function() {
          this.scrollbar.setTranslate()
        },
        setTransition: function(e) {
          this.scrollbar.setTransition(e)
        },
        destroy: function() {
          this.scrollbar.destroy()
        }
      }
    }, {
      name: "parallax",
      params: {
        parallax: {
          enabled: !1
        }
      },
      create: function() {
        V.extend(this, {
          parallax: {
            setTransform: F.setTransform.bind(this),
            setTranslate: F.setTranslate.bind(this),
            setTransition: F.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function() {
          this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
        },
        init: function() {
          this.params.parallax && this.parallax.setTranslate()
        },
        setTranslate: function() {
          this.params.parallax && this.parallax.setTranslate()
        },
        setTransition: function(e) {
          this.params.parallax && this.parallax.setTransition(e)
        }
      }
    }, {
      name: "zoom",
      params: {
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed"
        }
      },
      create: function() {
        var t = this,
          a = {
            enabled: !1,
            scale: 1,
            currentScale: 1,
            isScaling: !1,
            gesture: {
              $slideEl: void 0,
              slideWidth: void 0,
              slideHeight: void 0,
              $imageEl: void 0,
              $imageWrapEl: void 0,
              maxRatio: 3
            },
            image: {
              isTouched: void 0,
              isMoved: void 0,
              currentX: void 0,
              currentY: void 0,
              minX: void 0,
              minY: void 0,
              maxX: void 0,
              maxY: void 0,
              width: void 0,
              height: void 0,
              startX: void 0,
              startY: void 0,
              touchesStart: {},
              touchesCurrent: {}
            },
            velocity: {
              x: void 0,
              y: void 0,
              prevPositionX: void 0,
              prevPositionY: void 0,
              prevTime: void 0
            }
          };
        "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(e) {
          a[e] = q[e].bind(t)
        }), V.extend(t, {
          zoom: a
        })
      },
      on: {
        init: function() {
          this.params.zoom.enabled && this.zoom.enable()
        },
        destroy: function() {
          this.zoom.disable()
        },
        touchStart: function(e) {
          this.zoom.enabled && this.zoom.onTouchStart(e)
        },
        touchEnd: function(e) {
          this.zoom.enabled && this.zoom.onTouchEnd(e)
        },
        doubleTap: function(e) {
          this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
        },
        transitionEnd: function() {
          this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
        }
      }
    }, {
      name: "lazy",
      params: {
        lazy: {
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader"
        }
      },
      create: function() {
        V.extend(this, {
          lazy: {
            initialImageLoaded: !1,
            load: W.load.bind(this),
            loadInSlide: W.loadInSlide.bind(this)
          }
        })
      },
      on: {
        beforeInit: function() {
          this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
        },
        init: function() {
          this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
        },
        scroll: function() {
          this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
        },
        resize: function() {
          this.params.lazy.enabled && this.lazy.load()
        },
        scrollbarDragMove: function() {
          this.params.lazy.enabled && this.lazy.load()
        },
        transitionStart: function() {
          var e = this;
          e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
        },
        transitionEnd: function() {
          this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
        }
      }
    }, {
      name: "controller",
      params: {
        controller: {
          control: void 0,
          inverse: !1,
          by: "slide"
        }
      },
      create: function() {
        var e = this;
        V.extend(e, {
          controller: {
            control: e.params.controller.control,
            getInterpolateFunction: j.getInterpolateFunction.bind(e),
            setTranslate: j.setTranslate.bind(e),
            setTransition: j.setTransition.bind(e)
          }
        })
      },
      on: {
        update: function() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        },
        resize: function() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        },
        observerUpdate: function() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        },
        setTranslate: function(e, t) {
          this.controller.control && this.controller.setTranslate(e, t)
        },
        setTransition: function(e, t) {
          this.controller.control && this.controller.setTransition(e, t)
        }
      }
    }, {
      name: "a11y",
      params: {
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}"
        }
      },
      create: function() {
        var t = this;
        V.extend(t, {
          a11y: {
            liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
          }
        }), Object.keys(U).forEach(function(e) {
          t.a11y[e] = U[e].bind(t)
        })
      },
      on: {
        init: function() {
          this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
        },
        toEdge: function() {
          this.params.a11y.enabled && this.a11y.updateNavigation()
        },
        fromEdge: function() {
          this.params.a11y.enabled && this.a11y.updateNavigation()
        },
        paginationUpdate: function() {
          this.params.a11y.enabled && this.a11y.updatePagination()
        },
        destroy: function() {
          this.params.a11y.enabled && this.a11y.destroy()
        }
      }
    }, {
      name: "history",
      params: {
        history: {
          enabled: !1,
          replaceState: !1,
          key: "slides"
        }
      },
      create: function() {
        var e = this;
        V.extend(e, {
          history: {
            init: K.init.bind(e),
            setHistory: K.setHistory.bind(e),
            setHistoryPopState: K.setHistoryPopState.bind(e),
            scrollToSlide: K.scrollToSlide.bind(e),
            destroy: K.destroy.bind(e)
          }
        })
      },
      on: {
        init: function() {
          this.params.history.enabled && this.history.init()
        },
        destroy: function() {
          this.params.history.enabled && this.history.destroy()
        },
        transitionEnd: function() {
          this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
        }
      }
    }, {
      name: "hash-navigation",
      params: {
        hashNavigation: {
          enabled: !1,
          replaceState: !1,
          watchState: !1
        }
      },
      create: function() {
        var e = this;
        V.extend(e, {
          hashNavigation: {
            initialized: !1,
            init: _.init.bind(e),
            destroy: _.destroy.bind(e),
            setHash: _.setHash.bind(e),
            onHashCange: _.onHashCange.bind(e)
          }
        })
      },
      on: {
        init: function() {
          this.params.hashNavigation.enabled && this.hashNavigation.init()
        },
        destroy: function() {
          this.params.hashNavigation.enabled && this.hashNavigation.destroy()
        },
        transitionEnd: function() {
          this.hashNavigation.initialized && this.hashNavigation.setHash()
        }
      }
    }, {
      name: "autoplay",
      params: {
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1
        }
      },
      create: function() {
        var t = this;
        V.extend(t, {
          autoplay: {
            running: !1,
            paused: !1,
            run: Z.run.bind(t),
            start: Z.start.bind(t),
            stop: Z.stop.bind(t),
            pause: Z.pause.bind(t),
            onTransitionEnd: function(e) {
              t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
            }
          }
        })
      },
      on: {
        init: function() {
          this.params.autoplay.enabled && this.autoplay.start()
        },
        beforeTransitionStart: function(e, t) {
          this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
        },
        sliderFirstMove: function() {
          this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
        },
        destroy: function() {
          this.autoplay.running && this.autoplay.stop()
        }
      }
    }, {
      name: "effect-fade",
      params: {
        fadeEffect: {
          crossFade: !1
        }
      },
      create: function() {
        V.extend(this, {
          fadeEffect: {
            setTranslate: Q.setTranslate.bind(this),
            setTransition: Q.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function() {
          var e = this;
          if ("fade" === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + "fade");
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            V.extend(e.params, t), V.extend(e.originalParams, t)
          }
        },
        setTranslate: function() {
          "fade" === this.params.effect && this.fadeEffect.setTranslate()
        },
        setTransition: function(e) {
          "fade" === this.params.effect && this.fadeEffect.setTransition(e)
        }
      }
    }, {
      name: "effect-cube",
      params: {
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: .94
        }
      },
      create: function() {
        V.extend(this, {
          cubeEffect: {
            setTranslate: J.setTranslate.bind(this),
            setTransition: J.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function() {
          var e = this;
          if ("cube" === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0
            };
            V.extend(e.params, t), V.extend(e.originalParams, t)
          }
        },
        setTranslate: function() {
          "cube" === this.params.effect && this.cubeEffect.setTranslate()
        },
        setTransition: function(e) {
          "cube" === this.params.effect && this.cubeEffect.setTransition(e)
        }
      }
    }, {
      name: "effect-flip",
      params: {
        flipEffect: {
          slideShadows: !0,
          limitRotation: !0
        }
      },
      create: function() {
        V.extend(this, {
          flipEffect: {
            setTranslate: ee.setTranslate.bind(this),
            setTransition: ee.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function() {
          var e = this;
          if ("flip" === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            V.extend(e.params, t), V.extend(e.originalParams, t)
          }
        },
        setTranslate: function() {
          "flip" === this.params.effect && this.flipEffect.setTranslate()
        },
        setTransition: function(e) {
          "flip" === this.params.effect && this.flipEffect.setTransition(e)
        }
      }
    }, {
      name: "effect-coverflow",
      params: {
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0
        }
      },
      create: function() {
        V.extend(this, {
          coverflowEffect: {
            setTranslate: te.setTranslate.bind(this),
            setTransition: te.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function() {
          var e = this;
          "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
        },
        setTranslate: function() {
          "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
        },
        setTransition: function(e) {
          "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
        }
      }
    }, {
      name: "thumbs",
      params: {
        thumbs: {
          swiper: null,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-container-thumbs"
        }
      },
      create: function() {
        V.extend(this, {
          thumbs: {
            swiper: null,
            init: ae.init.bind(this),
            update: ae.update.bind(this),
            onThumbClick: ae.onThumbClick.bind(this)
          }
        })
      },
      on: {
        beforeInit: function() {
          var e = this.params.thumbs;
          e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
        },
        slideChange: function() {
          this.thumbs.swiper && this.thumbs.update()
        },
        update: function() {
          this.thumbs.swiper && this.thumbs.update()
        },
        resize: function() {
          this.thumbs.swiper && this.thumbs.update()
        },
        observerUpdate: function() {
          this.thumbs.swiper && this.thumbs.update()
        },
        setTransition: function(e) {
          var t = this.thumbs.swiper;
          t && t.setTransition(e)
        },
        beforeDestroy: function() {
          var e = this.thumbs.swiper;
          e && this.thumbs.swiperCreated && e && e.destroy()
        }
      }
    }];
  return void 0 === S.use && (S.use = S.Class.use, S.installModule = S.Class.installModule), S.use(ie), S
});
//# sourceMappingURL=swiper.min.js.map


/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.9.4.min
 ================================================================================*/
(function(b) {
  b.fn.bPopup = function(z, F) {
    function K() {
      a.contentContainer = b(a.contentContainer || c);
      switch (a.content) {
        case "iframe":
          var h = b('<iframe class="b-iframe" ' + a.iframeAttr + "></iframe>");
          h.appendTo(a.contentContainer);
          r = c.outerHeight(!0);
          s = c.outerWidth(!0);
          A();
          h.attr("src", a.loadUrl);
          k(a.loadCallback);
          break;
        case "image":
          A();
          b("<img />").load(function() {
            k(a.loadCallback);
            G(b(this))
          }).attr("src", a.loadUrl).hide().appendTo(a.contentContainer);
          break;
        default:
          A(), b('<div class="b-ajax-wrapper"></div>').load(a.loadUrl, a.loadData, function() {
            k(a.loadCallback);
            G(b(this))
          }).hide().appendTo(a.contentContainer)
      }
    }

    function A() {
      a.modal && b('<div class="b-modal ' + e + '"></div>').css({
        backgroundColor: a.modalColor,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0,
        zIndex: a.zIndex + t
      }).appendTo(a.appendTo).fadeTo(a.speed, a.opacity);
      D();
      c.data("bPopup", a).data("id", e).css({
        left: "slideIn" == a.transition || "slideBack" == a.transition ? "slideBack" == a.transition ? g.scrollLeft() + u : -1 * (v + s) : l(!(!a.follow[0] && m || f)),
        position: a.positionStyle || "absolute",
        top: "slideDown" == a.transition || "slideUp" == a.transition ? "slideUp" == a.transition ? g.scrollTop() + w : x + -1 * r : n(!(!a.follow[1] && p || f)),
        "z-index": a.zIndex + t + 1
      }).each(function() {
        a.appending && b(this).appendTo(a.appendTo)
      });
      H(!0)
    }

    function q() {
      a.modal && b(".b-modal." + c.data("id")).fadeTo(a.speed, 0, function() {
        b(this).remove()
      });
      a.scrollBar || b("html").css("overflow", "auto");
      b(".b-modal." + e).unbind("click");
      g.unbind("keydown." + e);
      d.unbind("." + e).data("bPopup", 0 < d.data("bPopup") - 1 ? d.data("bPopup") - 1 : null);
      c.undelegate(".bClose, ." + a.closeClass, "click." + e, q).data("bPopup", null);
      H();
      return !1
    }

    function G(h) {
      var b = h.width(),
        e = h.height(),
        d = {};
      a.contentContainer.css({
        height: e,
        width: b
      });
      e >= c.height() && (d.height = c.height());
      b >= c.width() && (d.width = c.width());
      r = c.outerHeight(!0);
      s = c.outerWidth(!0);
      D();
      a.contentContainer.css({
        height: "auto",
        width: "auto"
      });
      d.left = l(!(!a.follow[0] && m || f));
      d.top = n(!(!a.follow[1] && p || f));
      c.animate(d, 250, function() {
        h.show();
        B = E()
      })
    }

    function L() {
      d.data("bPopup", t);
      c.delegate(".bClose, ." + a.closeClass, "click." + e, q);
      a.modalClose && b(".b-modal." + e).css("cursor", "pointer").bind("click", q);
      M || !a.follow[0] && !a.follow[1] || d.bind("scroll." + e, function() {
        B && c.dequeue().animate({
          left: a.follow[0] ? l(!f) : "auto",
          top: a.follow[1] ? n(!f) : "auto"
        }, a.followSpeed, a.followEasing)
      }).bind("resize." + e, function() {
        w = y.innerHeight || d.height();
        u = y.innerWidth || d.width();
        if (B = E()) clearTimeout(I), I = setTimeout(function() {
          D();
          c.dequeue().each(function() {
            f ? b(this).css({
              left: v,
              top: x
            }) : b(this).animate({
              left: a.follow[0] ? l(!0) : "auto",
              top: a.follow[1] ? n(!0) : "auto"
            }, a.followSpeed, a.followEasing)
          })
        }, 50)
      });
      a.escClose && g.bind("keydown." + e, function(a) {
        27 == a.which && q()
      })
    }

    function H(b) {
      function d(e) {
        c.css({
          display: "block",
          opacity: 1
        }).animate(e, a.speed, a.easing, function() {
          J(b)
        })
      }
      switch (b ? a.transition : a.transitionClose || a.transition) {
        case "slideIn":
          d({
            left: b ? l(!(!a.follow[0] && m || f)) : g.scrollLeft() - (s || c.outerWidth(!0)) - C
          });
          break;
        case "slideBack":
          d({
            left: b ? l(!(!a.follow[0] && m || f)) : g.scrollLeft() + u + C
          });
          break;
        case "slideDown":
          d({
            top: b ? n(!(!a.follow[1] && p || f)) : g.scrollTop() - (r || c.outerHeight(!0)) - C
          });
          break;
        case "slideUp":
          d({
            top: b ? n(!(!a.follow[1] && p || f)) : g.scrollTop() + w + C
          });
          break;
        default:
          c.stop().fadeTo(a.speed, b ? 1 : 0, function() {
            J(b)
          })
      }
    }

    function J(b) {
      b ? (L(), k(F), a.autoClose && setTimeout(q, a.autoClose)) : (c.hide(), k(a.onClose), a.loadUrl && (a.contentContainer.empty(), c.css({
        height: "auto",
        width: "auto"
      })))
    }

    function l(a) {
      return a ? v + g.scrollLeft() : v
    }

    function n(a) {
      return a ? x + g.scrollTop() : x
    }

    function k(a) {
      b.isFunction(a) && a.call(c)
    }

    function D() {
      x = p ? a.position[1] : Math.max(0, (w - c.outerHeight(!0)) / 2 - a.amsl);
      v = m ? a.position[0] : (u - c.outerWidth(!0)) / 2;
      B = E()
    }

    function E() {
      return w > c.outerHeight(!0) && u > c.outerWidth(!0)
    }
    b.isFunction(z) && (F = z, z = null);
    var a = b.extend({}, b.fn.bPopup.defaults, z);
    a.scrollBar || b("html").css("overflow", "hidden");
    var c = this,
      g = b(document),
      y = window,
      d = b(y),
      w = y.innerHeight || d.height(),
      u = y.innerWidth || d.width(),
      M = /OS 6(_\d)+/i.test(navigator.userAgent),
      C = 200,
      t = 0,
      e, B, p, m, f, x, v, r, s, I;
    c.close = function() {
      a = this.data("bPopup");
      e = "__b-popup" + d.data("bPopup") + "__";
      q()
    };
    return c.each(function() {
      b(this).data("bPopup") || (k(a.onOpen), t = (d.data("bPopup") || 0) + 1, e = "__b-popup" + t + "__", p = "auto" !== a.position[1], m = "auto" !== a.position[0], f = "fixed" === a.positionStyle, r = c.outerHeight(!0), s = c.outerWidth(!0), a.loadUrl ? K() : A())
    })
  };
  b.fn.bPopup.defaults = {
    amsl: 50,
    appending: !0,
    appendTo: "body",
    autoClose: !1,
    closeClass: "b-close",
    content: "ajax",
    contentContainer: !1,
    easing: "swing",
    escClose: !0,
    follow: [!0, !0],
    followEasing: "swing",
    followSpeed: 500,
    iframeAttr: 'scrolling="no" frameborder="0"',
    loadCallback: !1,
    loadData: !1,
    loadUrl: !1,
    modal: !0,
    modalClose: !0,
    modalColor: "#000",
    onClose: !1,
    onOpen: !1,
    opacity: 0.7,
    position: ["auto", "auto"],
    positionStyle: "absolute",
    scrollBar: !0,
    speed: 250,
    transition: "fadeIn",
    transitionClose: !1,
    zIndex: 9997
  }
})(jQuery);


/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
! function(e) {
  e.fn.niceSelect = function(t) {
    function s(t) {
      t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
      var s = t.next(),
        n = t.find("option"),
        i = t.find("option:selected");
      s.find(".current").html(i.data("display") || i.text()), n.each(function(t) {
        var n = e(this),
          i = n.data("display");
        s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
      })
    }
    if ("string" == typeof t) return "update" == t ? this.each(function() {
      var t = e(this),
        n = e(this).next(".nice-select"),
        i = n.hasClass("open");
      n.length && (n.remove(), s(t), i && t.next().trigger("click"))
    }) : "destroy" == t ? (this.each(function() {
      var t = e(this),
        s = e(this).next(".nice-select");
      s.length && (s.remove(), t.css("display", ""))
    }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
    this.hide(), this.each(function() {
      var t = e(this);
      t.next().hasClass("nice-select") || s(t)
    }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
      var s = e(this);
      e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
    }), e(document).on("click.nice_select", function(t) {
      0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option")
    }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
      var s = e(this),
        n = s.closest(".nice-select");
      n.find(".selected").removeClass("selected"), s.addClass("selected");
      var i = s.data("display") || s.text();
      n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
    }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
      var s = e(this),
        n = e(s.find(".focus") || s.find(".list .option.selected"));
      if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
      if (40 == t.keyCode) {
        if (s.hasClass("open")) {
          var i = n.nextAll(".option:not(.disabled)").first();
          i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
        } else s.trigger("click");
        return !1
      }
      if (38 == t.keyCode) {
        if (s.hasClass("open")) {
          var l = n.prevAll(".option:not(.disabled)").first();
          l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
        } else s.trigger("click");
        return !1
      }
      if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
      else if (9 == t.keyCode && s.hasClass("open")) return !1
    });
    var n = document.createElement("a").style;
    return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
  }
}(jQuery);


/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
! function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function(e) {
  ! function(t) {
    var o = "function" == typeof define && define.amd,
      a = "undefined" != typeof module && module.exports,
      n = "https:" == document.location.protocol ? "https:" : "http:",
      i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
    o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))), t()
  }(function() {
    var t, o = "mCustomScrollbar",
      a = "mCS",
      n = ".mCustomScrollbar",
      i = {
        setTop: 0,
        setLeft: 0,
        axis: "y",
        scrollbarPosition: "inside",
        scrollInertia: 950,
        autoDraggerLength: !0,
        alwaysShowScrollbar: 0,
        snapOffset: 0,
        mouseWheel: {
          enable: !0,
          scrollAmount: "auto",
          axis: "y",
          deltaFactor: "auto",
          disableOver: ["select", "option", "keygen", "datalist", "textarea"]
        },
        scrollButtons: {
          scrollType: "stepless",
          scrollAmount: "auto"
        },
        keyboard: {
          enable: !0,
          scrollType: "stepless",
          scrollAmount: "auto"
        },
        contentTouchScroll: 25,
        documentTouchScroll: !0,
        advanced: {
          autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          updateOnContentResize: !0,
          updateOnImageLoad: "auto",
          autoUpdateTimeout: 60
        },
        theme: "light",
        callbacks: {
          onTotalScrollOffset: 0,
          onTotalScrollBackOffset: 0,
          alwaysTriggerOffsets: !0
        }
      },
      r = 0,
      l = {},
      s = window.attachEvent && !window.addEventListener ? 1 : 0,
      c = !1,
      d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
      u = {
        init: function(t) {
          var t = e.extend(!0, {}, i, t),
            o = f.call(this);
          if (t.live) {
            var s = t.liveSelector || this.selector || n,
              c = e(s);
            if ("off" === t.live) return void m(s);
            l[s] = setTimeout(function() {
              c.mCustomScrollbar(t), "once" === t.live && c.length && m(s)
            }, 500)
          } else m(s);
          return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
            enable: !0,
            scrollAmount: "auto",
            axis: "y",
            preventDefault: !1,
            deltaFactor: "auto",
            normalizeDelta: !1,
            invert: !1
          }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each(function() {
            var o = e(this);
            if (!o.data(a)) {
              o.data(a, {
                idx: ++r,
                opt: t,
                scrollRatio: {
                  y: null,
                  x: null
                },
                overflowed: null,
                contentReset: {
                  y: null,
                  x: null
                },
                bindEvents: !1,
                tweenRunning: !1,
                sequential: {},
                langDir: o.css("direction"),
                cbOffsets: null,
                trigger: null,
                poll: {
                  size: {
                    o: 0,
                    n: 0
                  },
                  img: {
                    o: 0,
                    n: 0
                  },
                  change: {
                    o: 0,
                    n: 0
                  }
                }
              });
              var n = o.data(a),
                i = n.opt,
                l = o.data("mcs-axis"),
                s = o.data("mcs-scrollbar-position"),
                c = o.data("mcs-theme");
              l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o)
            }
          })
        },
        update: function(t, o) {
          var n = t || f.call(this);
          return e(n).each(function() {
            var t = e(this);
            if (t.data(a)) {
              var n = t.data(a),
                i = n.opt,
                r = e("#mCSB_" + n.idx + "_container"),
                l = e("#mCSB_" + n.idx),
                s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
              if (!r.length) return;
              n.tweenRunning && Q(t), o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), _.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)), n.overflowed = y.call(this), M.call(this), i.autoDraggerLength && S.call(this), b.call(this), T.call(this);
              var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
              "x" !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (G(t, c[0].toString(), {
                dir: "y",
                dur: 0,
                overwrite: "none"
              }), n.contentReset.y = null) : (B.call(this), "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && G(t, c[1].toString(), {
                dir: "x",
                dur: 0,
                overwrite: "none"
              }))), "y" !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (G(t, c[1].toString(), {
                dir: "x",
                dur: 0,
                overwrite: "none"
              }), n.contentReset.x = null) : (B.call(this), "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && G(t, c[0].toString(), {
                dir: "y",
                dur: 0,
                overwrite: "none"
              }))), o && n && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), N.call(this)
            }
          })
        },
        scrollTo: function(t, o) {
          if ("undefined" != typeof t && null != t) {
            var n = f.call(this);
            return e(n).each(function() {
              var n = e(this);
              if (n.data(a)) {
                var i = n.data(a),
                  r = i.opt,
                  l = {
                    trigger: "external",
                    scrollInertia: r.scrollInertia,
                    scrollEasing: "mcsEaseInOut",
                    moveDragger: !1,
                    timeout: 60,
                    callbacks: !0,
                    onStart: !0,
                    onUpdate: !0,
                    onComplete: !0
                  },
                  s = e.extend(!0, {}, l, o),
                  c = Y.call(this, t),
                  d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                c[0] = X.call(this, c[0], "y"), c[1] = X.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = ne() ? 0 : d, setTimeout(function() {
                  null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", G(n, c[0].toString(), s)), null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", G(n, c[1].toString(), s))
                }, s.timeout)
              }
            })
          }
        },
        stop: function() {
          var t = f.call(this);
          return e(t).each(function() {
            var t = e(this);
            t.data(a) && Q(t)
          })
        },
        disable: function(t) {
          var o = f.call(this);
          return e(o).each(function() {
            var o = e(this);
            if (o.data(a)) {
              o.data(a);
              N.call(this, "remove"), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3])
            }
          })
        },
        destroy: function() {
          var t = f.call(this);
          return e(t).each(function() {
            var n = e(this);
            if (n.data(a)) {
              var i = n.data(a),
                r = i.opt,
                l = e("#mCSB_" + i.idx),
                s = e("#mCSB_" + i.idx + "_container"),
                c = e(".mCSB_" + i.idx + "_scrollbar");
              r.live && m(r.liveSelector || e(t).selector), N.call(this, "remove"), k.call(this), B.call(this), n.removeData(a), $(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
            }
          })
        }
      },
      f = function() {
        return "object" != typeof e(this) || e(this).length < 1 ? n : this
      },
      h = function(t) {
        var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
          a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
          n = ["minimal", "minimal-dark"],
          i = ["minimal", "minimal-dark"],
          r = ["minimal", "minimal-dark"];
        t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
      },
      m = function(e) {
        l[e] && (clearTimeout(l[e]), $(l, e))
      },
      p = function(e) {
        return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
      },
      g = function(e) {
        return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
      },
      v = function() {
        var t = e(this),
          n = t.data(a),
          i = n.opt,
          r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
          l = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
          s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
          c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
          u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
          f = i.autoHideScrollbar ? " " + d[6] : "",
          h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
        i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft, t.addClass(o + " _" + a + "_" + n.idx + f + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + n.langDir + "' /></div>");
        var m = e("#mCSB_" + n.idx),
          p = e("#mCSB_" + n.idx + "_container");
        "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)), w.call(this);
        var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
        g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
      },
      x = function(t) {
        var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
            return e(this).outerWidth(!0)
          }).get())],
          a = t.parent().width();
        return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%"
      },
      _ = function() {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx + "_container");
        if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
          i.css({
            width: "auto",
            "min-width": 0,
            "overflow-x": "scroll"
          });
          var r = Math.ceil(i[0].scrollWidth);
          3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
            width: r,
            "min-width": "100%",
            "overflow-x": "inherit"
          }) : i.css({
            "overflow-x": "inherit",
            position: "absolute"
          }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
            width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
            "min-width": "100%",
            position: "relative"
          }).unwrap()
        }
      },
      w = function() {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e(".mCSB_" + o.idx + "_scrollbar:first"),
          r = oe(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "",
          l = ["<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />"],
          s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];
        n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
      },
      S = function() {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
          l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
          c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())],
          d = s && c[1] < c[0] ? c[0] : c[1],
          u = s && c[3] < c[2] ? c[2] : c[3];
        r[0].css({
          height: d,
          "max-height": r[0].parent().height() - 10
        }).find(".mCSB_dragger_bar").css({
          "line-height": c[0] + "px"
        }), r[1].css({
          width: u,
          "max-width": r[1].parent().width() - 10
        })
      },
      b = function() {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
          l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
          s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
        o.scrollRatio = {
          y: s[0],
          x: s[1]
        }
      },
      C = function(e, t, o) {
        var a = o ? d[0] + "_expanded" : "",
          n = e.closest(".mCSB_scrollTools");
        "active" === t ? (e.toggleClass(d[0] + " " + a), n.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])))
      },
      y = function() {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = null == o.overflowed ? i.height() : i.outerHeight(!1),
          l = null == o.overflowed ? i.width() : i.outerWidth(!1),
          s = i[0].scrollHeight,
          c = i[0].scrollWidth;
        return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()]
      },
      B = function() {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx),
          r = e("#mCSB_" + o.idx + "_container"),
          l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
        if (Q(t), ("x" !== n.axis && !o.overflowed[0] || "y" === n.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), G(t, "_resetY")), "y" !== n.axis && !o.overflowed[1] || "x" === n.axis && o.overflowed[1]) {
          var s = dx = 0;
          "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), G(t, "_resetX")
        }
      },
      T = function() {
        function t() {
          r = setTimeout(function() {
            e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t()
          }, 100)
        }
        var o = e(this),
          n = o.data(a),
          i = n.opt;
        if (!n.bindEvents) {
          if (I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable) {
            var r;
            t()
          }
          P.call(this), U.call(this), i.advanced.autoScrollOnFocus && H.call(this), i.scrollButtons.enable && F.call(this), i.keyboard.enable && q.call(this), n.bindEvents = !0
        }
      },
      k = function() {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = ".mCSB_" + o.idx + "_scrollbar",
          l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"),
          s = e("#mCSB_" + o.idx + "_container");
        n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!A() || top.document)).unbind("." + i), l.each(function() {
          e(this).unbind("." + i)
        }), clearTimeout(t[0]._focusTimeout), $(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), $(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), $(s[0], "onCompleteTimeout"), o.bindEvents = !1)
      },
      M = function(t) {
        var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = e("#mCSB_" + n.idx + "_container_wrapper"),
          l = r.length ? r : e("#mCSB_" + n.idx + "_container"),
          s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")],
          c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
        "x" !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), "y" !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
      },
      O = function(t) {
        var o = t.type,
          a = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
          n = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
        switch (o) {
          case "pointerdown":
          case "MSPointerDown":
          case "pointermove":
          case "MSPointerMove":
          case "pointerup":
          case "MSPointerUp":
            return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
          case "touchstart":
          case "touchmove":
          case "touchend":
            var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
              r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
            return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
          default:
            return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1]
        }
      },
      I = function() {
        function t(e, t, a, n) {
          if (h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, o.attr("id") === f[1]) var i = "x",
            s = (o[0].offsetLeft - t + n) * l.scrollRatio.x;
          else var i = "y",
            s = (o[0].offsetTop - e + a) * l.scrollRatio.y;
          G(r, s.toString(), {
            dir: i,
            drag: !0
          })
        }
        var o, n, i, r = e(this),
          l = r.data(a),
          d = l.opt,
          u = a + "_" + l.idx,
          f = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
          h = e("#mCSB_" + l.idx + "_container"),
          m = e("#" + f[0] + ",#" + f[1]),
          p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
          g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);
        m.bind("contextmenu." + u, function(e) {
          e.preventDefault()
        }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(t) {
          if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
            c = !0, s && (document.onselectstart = function() {
              return !1
            }), L.call(h, !1), Q(r), o = e(this);
            var a = o.offset(),
              l = O(t)[0] - a.top,
              u = O(t)[1] - a.left,
              f = o.height() + a.top,
              m = o.width() + a.left;
            f > l && l > 0 && m > u && u > 0 && (n = l, i = u), C(o, "active", d.autoExpandScrollbar)
          }
        }).bind("touchmove." + u, function(e) {
          e.stopImmediatePropagation(), e.preventDefault();
          var a = o.offset(),
            r = O(e)[0] - a.top,
            l = O(e)[1] - a.left;
          t(n, i, r, l)
        }), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(e) {
          if (o) {
            var a = o.offset(),
              r = O(e)[0] - a.top,
              l = O(e)[1] - a.left;
            if (n === r && i === l) return;
            t(n, i, r, l)
          }
        }).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
          o && (C(o, "active", d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), L.call(h, !0)
        })
      },
      D = function() {
        function o(e) {
          if (!te(e) || c || O(e)[2]) return void(t = 0);
          t = 1, b = 0, C = 0, d = 1, y.removeClass("mCS_touch_action");
          var o = I.offset();
          u = O(e)[0] - o.top, f = O(e)[1] - o.left, z = [O(e)[0], O(e)[1]]
        }

        function n(e) {
          if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
            g = K();
            var t = M.offset(),
              o = O(e)[0] - t.top,
              a = O(e)[1] - t.left,
              n = "mcsLinearOut";
            if (E.push(o), W.push(a), z[2] = Math.abs(O(e)[0] - z[0]), z[3] = Math.abs(O(e)[1] - z[1]), B.overflowed[0]) var i = D[0].parent().height() - D[0].height(),
              r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || "yx" === T.axis);
            if (B.overflowed[1]) var l = D[1].parent().width() - D[1].width(),
              h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || "yx" === T.axis);
            r || h ? (U || e.preventDefault(), b = 1) : (C = 1, y.addClass("mCS_touch_action")), U && e.preventDefault(), w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null], I[0].idleTimer = 250, B.overflowed[0] && s(w[0], R, n, "y", "all", !0), B.overflowed[1] && s(w[1], R, n, "x", L, !0)
          }
        }

        function i(e) {
          if (!te(e) || c || O(e)[2]) return void(t = 0);
          t = 1, e.stopImmediatePropagation(), Q(y), p = K();
          var o = M.offset();
          h = O(e)[0] - o.top, m = O(e)[1] - o.left, E = [], W = []
        }

        function r(e) {
          if (te(e) && !c && !O(e)[2]) {
            d = 0, e.stopImmediatePropagation(), b = 0, C = 0, v = K();
            var t = M.offset(),
              o = O(e)[0] - t.top,
              a = O(e)[1] - t.left;
            if (!(v - g > 30)) {
              _ = 1e3 / (v - p);
              var n = "mcsEaseOut",
                i = 2.5 > _,
                r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];
              x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
              var u = [Math.abs(x[0]), Math.abs(x[1])];
              _ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
              var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
              w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null], S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
              var y = parseInt(T.contentTouchScroll) || 0;
              w[0] = u[0] > y ? w[0] : 0, w[1] = u[1] > y ? w[1] : 0, B.overflowed[0] && s(w[0], S[0], n, "y", L, !1), B.overflowed[1] && s(w[1], S[1], n, "x", L, !1)
            }
          }
        }

        function l(e, t) {
          var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
          return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
        }

        function s(e, t, o, a, n, i) {
          e && G(y, e.toString(), {
            dur: t,
            scrollEasing: o,
            dir: a,
            overwrite: n,
            drag: i
          })
        }
        var d, u, f, h, m, p, g, v, x, _, w, S, b, C, y = e(this),
          B = y.data(a),
          T = B.opt,
          k = a + "_" + B.idx,
          M = e("#mCSB_" + B.idx),
          I = e("#mCSB_" + B.idx + "_container"),
          D = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")],
          E = [],
          W = [],
          R = 0,
          L = "yx" === T.axis ? "none" : "all",
          z = [],
          P = I.find("iframe"),
          H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k],
          U = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
        I.bind(H[0], function(e) {
          o(e)
        }).bind(H[1], function(e) {
          n(e)
        }), M.bind(H[0], function(e) {
          i(e)
        }).bind(H[2], function(e) {
          r(e)
        }), P.length && P.each(function() {
          e(this).bind("load", function() {
            A(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function(e) {
              o(e), i(e)
            }).bind(H[1], function(e) {
              n(e)
            }).bind(H[2], function(e) {
              r(e)
            })
          })
        })
      },
      E = function() {
        function o() {
          return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
        }

        function n(e, t, o) {
          d.type = o && i ? "stepped" : "stepless", d.scrollAmount = 10, j(r, e, t, "mcsLinearOut", o ? 60 : null)
        }
        var i, r = e(this),
          l = r.data(a),
          s = l.opt,
          d = l.sequential,
          u = a + "_" + l.idx,
          f = e("#mCSB_" + l.idx + "_container"),
          h = f.parent();
        f.bind("mousedown." + u, function() {
          t || i || (i = 1, c = !0)
        }).add(document).bind("mousemove." + u, function(e) {
          if (!t && i && o()) {
            var a = f.offset(),
              r = O(e)[0] - a.top + f[0].offsetTop,
              c = O(e)[1] - a.left + f[0].offsetLeft;
            r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)), "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)))
          }
        }).bind("mouseup." + u + " dragend." + u, function() {
          t || (i && (i = 0, n("off", null)), c = !1)
        })
      },
      W = function() {
        function t(t, a) {
          if (Q(o), !z(o, t.target)) {
            var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
              d = i.scrollInertia;
            if ("x" === i.axis || "x" === i.mouseWheel.axis) var u = "x",
              f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
              h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0],
              m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft),
              p = c[1][0].offsetLeft,
              g = c[1].parent().width() - c[1].width(),
              v = "y" === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;
            else var u = "y",
              f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
              h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0],
              m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop),
              p = c[0][0].offsetTop,
              g = c[0].parent().height() - c[0].height(),
              v = t.deltaY || a;
            "y" === u && !n.overflowed[0] || "x" === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), G(o, (m - v * h).toString(), {
              dir: u,
              dur: d
            }))
          }
        }
        if (e(this).data(a)) {
          var o = e(this),
            n = o.data(a),
            i = n.opt,
            r = a + "_" + n.idx,
            l = e("#mCSB_" + n.idx),
            c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
            d = e("#mCSB_" + n.idx + "_container").find("iframe");
          d.length && d.each(function() {
            e(this).bind("load", function() {
              A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function(e, o) {
                t(e, o)
              })
            })
          }), l.bind("mousewheel." + r, function(e, o) {
            t(e, o)
          })
        }
      },
      R = new Object,
      A = function(t) {
        var o = !1,
          a = !1,
          n = null;
        if (void 0 === t ? a = "#empty" : void 0 !== e(t).attr("id") && (a = e(t).attr("id")), a !== !1 && void 0 !== R[a]) return R[a];
        if (t) {
          try {
            var i = t.contentDocument || t.contentWindow.document;
            n = i.body.innerHTML
          } catch (r) {}
          o = null !== n
        } else {
          try {
            var i = top.document;
            n = i.body.innerHTML
          } catch (r) {}
          o = null !== n
        }
        return a !== !1 && (R[a] = o), o
      },
      L = function(e) {
        var t = this.find("iframe");
        if (t.length) {
          var o = e ? "auto" : "none";
          t.css("pointer-events", o)
        }
      },
      z = function(t, o) {
        var n = o.nodeName.toLowerCase(),
          i = t.data(a).opt.mouseWheel.disableOver,
          r = ["select", "textarea"];
        return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
      },
      P = function() {
        var t, o = e(this),
          n = o.data(a),
          i = a + "_" + n.idx,
          r = e("#mCSB_" + n.idx + "_container"),
          l = r.parent(),
          s = e(".mCSB_" + n.idx + "_scrollbar ." + d[12]);
        s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function(o) {
          c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1)
        }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function() {
          c = !1
        }).bind("click." + i, function(a) {
          if (t && (t = 0, e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail"))) {
            Q(o);
            var i = e(this),
              s = i.find(".mCSB_dragger");
            if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
              if (!n.overflowed[1]) return;
              var c = "x",
                u = a.pageX > s.offset().left ? -1 : 1,
                f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width())
            } else {
              if (!n.overflowed[0]) return;
              var c = "y",
                u = a.pageY > s.offset().top ? -1 : 1,
                f = Math.abs(r[0].offsetTop) - u * (.9 * l.height())
            }
            G(o, f.toString(), {
              dir: c,
              scrollEasing: "mcsEaseInOut"
            })
          }
        })
      },
      H = function() {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = e("#mCSB_" + o.idx + "_container"),
          l = r.parent();
        r.bind("focusin." + i, function() {
          var o = e(document.activeElement),
            a = r.find(".mCustomScrollBox").length,
            i = 0;
          o.is(n.advanced.autoScrollOnFocus) && (Q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = a ? (i + 17) * a : 0, t[0]._focusTimeout = setTimeout(function() {
            var e = [ae(o)[0], ae(o)[1]],
              a = [r[0].offsetTop, r[0].offsetLeft],
              s = [a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1), a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1)],
              c = "yx" !== n.axis || s[0] || s[1] ? "all" : "none";
            "x" === n.axis || s[0] || G(t, e[0].toString(), {
              dir: "y",
              scrollEasing: "mcsEaseInOut",
              overwrite: c,
              dur: i
            }), "y" === n.axis || s[1] || G(t, e[1].toString(), {
              dir: "x",
              scrollEasing: "mcsEaseInOut",
              overwrite: c,
              dur: i
            })
          }, t[0]._focusTimer))
        })
      },
      U = function() {
        var t = e(this),
          o = t.data(a),
          n = a + "_" + o.idx,
          i = e("#mCSB_" + o.idx + "_container").parent();
        i.bind("scroll." + n, function() {
          0 === i.scrollTop() && 0 === i.scrollLeft() || e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
        })
      },
      F = function() {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = o.sequential,
          r = a + "_" + o.idx,
          l = ".mCSB_" + o.idx + "_scrollbar",
          s = e(l + ">a");
        s.bind("contextmenu." + r, function(e) {
          e.preventDefault()
        }).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function(a) {
          function r(e, o) {
            i.scrollAmount = n.scrollButtons.scrollAmount, j(t, e, o)
          }
          if (a.preventDefault(), ee(a)) {
            var l = e(this).attr("class");
            switch (i.type = n.scrollButtons.scrollType, a.type) {
              case "mousedown":
              case "touchstart":
              case "pointerdown":
              case "MSPointerDown":
                if ("stepped" === i.type) return;
                c = !0, o.tweenRunning = !1, r("on", l);
                break;
              case "mouseup":
              case "touchend":
              case "pointerup":
              case "MSPointerUp":
              case "mouseout":
              case "pointerout":
              case "MSPointerOut":
                if ("stepped" === i.type) return;
                c = !1, i.dir && r("off", l);
                break;
              case "click":
                if ("stepped" !== i.type || o.tweenRunning) return;
                r("on", l)
            }
          }
        })
      },
      q = function() {
        function t(t) {
          function a(e, t) {
            r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && n.tweenRunning || j(o, e, t)
          }
          switch (t.type) {
            case "blur":
              n.tweenRunning && r.dir && a("off", null);
              break;
            case "keydown":
            case "keyup":
              var l = t.keyCode ? t.keyCode : t.which,
                s = "on";
              if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1]) return;
                "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l))
              } else if (33 === l || 34 === l) {
                if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                  Q(o);
                  var f = 34 === l ? -1 : 1;
                  if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                    m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());
                  else var h = "y",
                    m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());
                  G(o, m.toString(), {
                    dir: h,
                    scrollEasing: "mcsEaseInOut"
                  })
                }
              } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                  m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                else var h = "y",
                  m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                G(o, m.toString(), {
                  dir: h,
                  scrollEasing: "mcsEaseInOut"
                })
              }
          }
        }
        var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = n.sequential,
          l = a + "_" + n.idx,
          s = e("#mCSB_" + n.idx),
          c = e("#mCSB_" + n.idx + "_container"),
          d = c.parent(),
          u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
          f = c.find("iframe"),
          h = ["blur." + l + " keydown." + l + " keyup." + l];
        f.length && f.each(function() {
          e(this).bind("load", function() {
            A(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function(e) {
              t(e)
            })
          })
        }), s.attr("tabindex", "0").bind(h[0], function(e) {
          t(e)
        })
      },
      j = function(t, o, n, i, r) {
        function l(e) {
          u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? "x" === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
          var o = "stepped" !== f.type,
            a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60,
            n = e ? o ? 7.5 : 40 : 2.5,
            s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
            d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
            m = "x" === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n),
            v = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount),
            x = "auto" !== f.scrollAmount ? v : m,
            _ = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
            w = !!e;
          return e && 17 > a && (x = "x" === f.dir[0] ? s[1] : s[0]), G(t, x.toString(), {
            dir: f.dir[0],
            scrollEasing: _,
            dur: a,
            onComplete: w
          }), e ? void(f.dir = !1) : (clearTimeout(f.step), void(f.step = setTimeout(function() {
            l()
          }, a)))
        }

        function s() {
          clearTimeout(f.step), $(f, "step"), Q(t)
        }
        var c = t.data(a),
          u = c.opt,
          f = c.sequential,
          h = e("#mCSB_" + c.idx + "_container"),
          m = "stepped" === f.type,
          p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
          g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
        switch (o) {
          case "on":
            if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1], Q(t), oe(n) && "stepped" === f.type) return;
            l(m);
            break;
          case "off":
            s(), (m || c.tweenRunning && f.dir) && l(!0)
        }
      },
      Y = function(t) {
        var o = e(this).data(a).opt,
          n = [];
        return "function" == typeof t && (t = t()), t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof n[0] && (n[0] = n[0]()), "function" == typeof n[1] && (n[1] = n[1]()), n
      },
      X = function(t, o) {
        if (null != t && "undefined" != typeof t) {
          var n = e(this),
            i = n.data(a),
            r = i.opt,
            l = e("#mCSB_" + i.idx + "_container"),
            s = l.parent(),
            c = typeof t;
          o || (o = "x" === r.axis ? "x" : "y");
          var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
            f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
            h = "x" === o ? "left" : "top";
          switch (c) {
            case "function":
              return t();
            case "object":
              var m = t.jquery ? t : e(t);
              if (!m.length) return;
              return "x" === o ? ae(m)[1] : ae(m)[0];
            case "string":
            case "number":
              if (oe(t)) return Math.abs(t);
              if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
              if (-1 !== t.indexOf("-=")) return Math.abs(f - parseInt(t.split("-=")[1]));
              if (-1 !== t.indexOf("+=")) {
                var p = f + parseInt(t.split("+=")[1]);
                return p >= 0 ? 0 : Math.abs(p)
              }
              if (-1 !== t.indexOf("px") && oe(t.split("px")[0])) return Math.abs(t.split("px")[0]);
              if ("top" === t || "left" === t) return 0;
              if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
              if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
              if ("first" === t || "last" === t) {
                var m = l.find(":" + t);
                return "x" === o ? ae(m)[1] : ae(m)[0]
              }
              return e(t).length ? "x" === o ? ae(e(t))[1] : ae(e(t))[0] : (l.css(h, t), void u.update.call(null, n[0]))
          }
        }
      },
      N = function(t) {
        function o() {
          return clearTimeout(f[0].autoUpdate), 0 === l.parents("html").length ? void(l = null) : void(f[0].autoUpdate = setTimeout(function() {
            return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length, s.poll.img.n === s.poll.img.o) ? void((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n, void f.find("img").each(function() {
              n(this)
            }))
          }, c.advanced.autoUpdateTimeout))
        }

        function n(t) {
          function o(e, t) {
            return function() {
              return t.apply(e, arguments)
            }
          }

          function a() {
            this.onload = null, e(t).addClass(d[2]), r(2)
          }
          if (e(t).hasClass(d[2])) return void r();
          var n = new Image;
          n.onload = o(n, a), n.src = t.src
        }

        function i() {
          c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
          var e = 0,
            t = f.find(c.advanced.updateOnSelectorChange);
          return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
            e += this.offsetHeight + this.offsetWidth
          }), e
        }

        function r(e) {
          clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e)
        }
        var l = e(this),
          s = l.data(a),
          c = s.opt,
          f = e("#mCSB_" + s.idx + "_container");
        return t ? (clearTimeout(f[0].autoUpdate), void $(f[0], "autoUpdate")) : void o()
      },
      V = function(e, t, o) {
        return Math.round(e / t) * t - o
      },
      Q = function(t) {
        var o = t.data(a),
          n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
        n.each(function() {
          Z.call(this)
        })
      },
      G = function(t, o, n) {
        function i(e) {
          return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
        }

        function r() {
          return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w]
        }

        function l() {
          var e = [h[0].offsetTop, h[0].offsetLeft],
            o = [x[0].offsetTop, x[0].offsetLeft],
            a = [h.outerHeight(!1), h.outerWidth(!1)],
            i = [f.height(), f.width()];
          t[0].mcs = {
            content: h,
            top: e[0],
            left: e[1],
            draggerTop: o[0],
            draggerLeft: o[1],
            topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])),
            leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])),
            direction: n.dir
          }
        }
        var s = t.data(a),
          c = s.opt,
          d = {
            trigger: "internal",
            dir: "y",
            scrollEasing: "mcsEaseOut",
            drag: !1,
            dur: c.scrollInertia,
            overwrite: "all",
            callbacks: !0,
            onStart: !0,
            onUpdate: !0,
            onComplete: !0
          },
          n = e.extend(d, n),
          u = [n.dur, n.drag ? 0 : n.dur],
          f = e("#mCSB_" + s.idx),
          h = e("#mCSB_" + s.idx + "_container"),
          m = h.parent(),
          p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
          g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
        if (s.trigger = n.trigger, 0 === m.scrollTop() && 0 === m.scrollLeft() || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
          if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
            var v = c.snapAmount instanceof Array ? "x" === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
            o = V(o, v, c.snapOffset)
          }
          switch (n.dir) {
            case "x":
              var x = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                _ = "left",
                w = h[0].offsetLeft,
                S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()],
                b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                y = p[1],
                B = g[1],
                T = y > 0 ? y / s.scrollRatio.x : 0,
                k = B > 0 ? B / s.scrollRatio.x : 0;
              break;
            case "y":
              var x = e("#mCSB_" + s.idx + "_dragger_vertical"),
                _ = "top",
                w = h[0].offsetTop,
                S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()],
                b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                y = p[0],
                B = g[0],
                T = y > 0 ? y / s.scrollRatio.y : 0,
                k = B > 0 ? B / s.scrollRatio.y : 0
          }
          b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0], t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(h[0].onCompleteTimeout), J(x[0], _, Math.round(b[1]), u[1], n.scrollEasing), !s.tweenRunning && (0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0]) || J(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
            onStart: function() {
              n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r())
            },
            onUpdate: function() {
              n.callbacks && n.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]))
            },
            onComplete: function() {
              if (n.callbacks && n.onComplete) {
                "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                var e = h[0].idleTimer || 0;
                h[0].onCompleteTimeout = setTimeout(function() {
                  i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, h[0].idleTimer = 0, C(x, "hide")
                }, e)
              }
            }
          })
        }
      },
      J = function(e, t, o, a, n, i, r) {
        function l() {
          S.stop || (x || m.call(), x = K() - v, s(), x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1, S.time < x + 1 && (S.time = x + 1)), S.time < a ? S.id = h(l) : g.call())
        }

        function s() {
          a > 0 ? (S.currVal = u(S.time, _, b, a, n), w[t] = Math.round(S.currVal) + "px") : w[t] = o + "px", p.call()
        }

        function c() {
          f = 1e3 / 60, S.time = x + f, h = window.requestAnimationFrame ? window.requestAnimationFrame : function(e) {
            return s(), setTimeout(e, .01)
          }, S.id = h(l)
        }

        function d() {
          null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), S.id = null)
        }

        function u(e, t, o, a, n) {
          switch (n) {
            case "linear":
            case "mcsLinear":
              return o * e / a + t;
            case "mcsLinearOut":
              return e /= a, e--, o * Math.sqrt(1 - e * e) + t;
            case "easeInOutSmooth":
              return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);
            case "easeInOutStrong":
              return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
            case "easeInOut":
            case "mcsEaseInOut":
              return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
            case "easeOutSmooth":
              return e /= a, e--, -o * (e * e * e * e - 1) + t;
            case "easeOutStrong":
              return o * (-Math.pow(2, -10 * e / a) + 1) + t;
            case "easeOut":
            case "mcsEaseOut":
            default:
              var i = (e /= a) * e,
                r = i * e;
              return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
          }
        }
        e._mTween || (e._mTween = {
          top: {},
          left: {}
        });
        var f, h, r = r || {},
          m = r.onStart || function() {},
          p = r.onUpdate || function() {},
          g = r.onComplete || function() {},
          v = K(),
          x = 0,
          _ = e.offsetTop,
          w = e.style,
          S = e._mTween[t];
        "left" === t && (_ = e.offsetLeft);
        var b = o - _;
        S.stop = 0, "none" !== i && d(), c()
      },
      K = function() {
        return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
      },
      Z = function() {
        var e = this;
        e._mTween || (e._mTween = {
          top: {},
          left: {}
        });
        for (var t = ["top", "left"], o = 0; o < t.length; o++) {
          var a = t[o];
          e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id), e._mTween[a].id = null, e._mTween[a].stop = 1)
        }
      },
      $ = function(e, t) {
        try {
          delete e[t]
        } catch (o) {
          e[t] = null
        }
      },
      ee = function(e) {
        return !(e.which && 1 !== e.which)
      },
      te = function(e) {
        var t = e.originalEvent.pointerType;
        return !(t && "touch" !== t && 2 !== t)
      },
      oe = function(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
      },
      ae = function(e) {
        var t = e.parents(".mCSB_container");
        return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
      },
      ne = function() {
        function e() {
          var e = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden";
          for (var t = 0; t < e.length; t++)
            if (e[t] + "Hidden" in document) return e[t] + "Hidden";
          return null
        }
        var t = e();
        return t ? document[t] : !1
      };
    e.fn[o] = function(t) {
      return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
    }, e[o] = function(t) {
      return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
    }, e[o].defaults = i, window[o] = !0, e(window).bind("load", function() {
      e(n)[o](), e.extend(e.expr[":"], {
        mcsInView: e.expr[":"].mcsInView || function(t) {
          var o, a, n = e(t),
            i = n.parents(".mCSB_container");
          if (i.length) return o = i.parent(), a = [i[0].offsetTop, i[0].offsetLeft], a[0] + ae(n)[0] >= 0 && a[0] + ae(n)[0] < o.height() - n.outerHeight(!1) && a[1] + ae(n)[1] >= 0 && a[1] + ae(n)[1] < o.width() - n.outerWidth(!1)
        },
        mcsInSight: e.expr[":"].mcsInSight || function(t, o, a) {
          var n, i, r, l, s = e(t),
            c = s.parents(".mCSB_container"),
            d = "exact" === a[3] ? [
              [1, 0],
              [1, 0]
            ] : [
              [.9, .1],
              [.6, .4]
            ];
          if (c.length) return n = [s.outerHeight(!1), s.outerWidth(!1)], r = [c[0].offsetTop + ae(s)[0], c[0].offsetLeft + ae(s)[1]], i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], l = [n[0] < i[0] ? d[0] : d[1], n[1] < i[1] ? d[0] : d[1]], r[0] - i[0] * l[0][0] < 0 && r[0] + n[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + n[1] - i[1] * l[1][1] >= 0
        },
        mcsOverflow: e.expr[":"].mcsOverflow || function(t) {
          var o = e(t).data(a);
          if (o) return o.overflowed[0] || o.overflowed[1]
        }
      })
    })
  })
});
