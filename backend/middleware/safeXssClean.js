import xss from "xss";

const sanitizeValue = (v) => {
  if (v == null) return v;
  if (typeof v === "string") {
    return xss(v);
  }
  if (Array.isArray(v)) return v.map(sanitizeValue);
  if (typeof v === "object") {
    const out = {};
    for (const k of Object.keys(v)) out[k] = sanitizeValue(v[k]);
    return out;
  }
  return v;
};

const safeAssignOrMutate = (req, propName, sanitizedObj) => {
  try {
    const desc = Object.getOwnPropertyDescriptor(req, propName)
      || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(req), propName);

    if (!desc || desc.writable || desc.set) {
      if (desc && desc.set && !desc.writable) {
        const current = req[propName];
        if (current && typeof current === "object") {
          for (const k of Object.keys(current)) delete current[k];
          Object.assign(current, sanitizedObj);
          return;
        }
      } else {
        req[propName] = sanitizedObj;
        return;
      }
    }

    const current = req[propName];
    if (current && typeof current === "object") {
      for (const k of Object.keys(current)) delete current[k];
      Object.assign(current, sanitizedObj);
    } else {
      try {
        Object.defineProperty(req, propName, {
          value: sanitizedObj,
          configurable: true,
          writable: true,
        });
      } catch (e) {
      }
    }
  } catch (err) {
  }
};

export const safeXssClean = (req, res, next) => {
  try {
    if (req.body) {
      const sanitized = sanitizeValue(req.body);
      safeAssignOrMutate(req, "body", sanitized);
    }
    if (req.query) {
      const sanitized = sanitizeValue(req.query);
      safeAssignOrMutate(req, "query", sanitized);
    }
    if (req.params) {
      const sanitized = sanitizeValue(req.params);
      safeAssignOrMutate(req, "params", sanitized);
    }
  } catch (err) {
    console.error("safeXssClean error:", err);
  }
  return next();
};

export default safeXssClean;
