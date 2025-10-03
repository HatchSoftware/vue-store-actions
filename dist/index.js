import { reactive as c } from "vue";
function x(s) {
  const t = E(s.actions), n = p(s.actions);
  function f(e, r) {
    return r ? n[e].includes(r) : n[e].length > 0;
  }
  function a(e, r) {
    return r ? t[e].get(r) : t[e].values().next().value;
  }
  function l(e, r) {
    return r ? !!t[e].get(r) : t[e].size > 0;
  }
  async function i(e, r, g) {
    const o = r || e;
    try {
      return t[e].delete(o), n[e].push(o), { success: !0, result: await g() };
    } catch (u) {
      return t[e].set(o, u), { success: !1, error: u };
    } finally {
      if (r) {
        const u = n[e].findIndex((h) => h === r);
        u !== -1 && n[e].splice(u, 1);
      } else
        n[e].pop();
    }
  }
  return {
    base: {
      isLoading: f,
      getError: a,
      hasError: l
    },
    handleAction: i
  };
}
function p(s) {
  const t = {};
  return s.forEach((n) => {
    t[n] = [];
  }), c(t);
}
function E(s) {
  const t = {};
  return s.forEach((n) => {
    t[n] = /* @__PURE__ */ new Map();
  }), c(t);
}
export {
  x as useStoreActions
};
