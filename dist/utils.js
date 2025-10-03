import { watch as h } from "vue";
function i(o, t, f) {
  t.forEach((r) => {
    h(
      () => o.hasError(r),
      (a, c) => {
        a === !0 && c === !1 && f(r);
      }
    );
  });
}
export {
  i as watchActionErrors
};
