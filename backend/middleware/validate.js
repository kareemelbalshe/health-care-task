export const validate = (schema) => (req, res, next) => {
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const errors = result.error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors });
  }
  req.validated = result.value;
  next();
};
