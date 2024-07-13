import { body } from 'express-validator';

const inputValidation = async (req, res, next) => {
  if (req.body.title || typeof reqBodyTitle === 'string') {
    body('title')
      .trim()
      .isLength({ min: 1 })
      .withMessage('title cannot be empty')
      .escape();
  }
  if (req.body.name || typeof req.body.name === 'string') {
    body('name')
      .trim()
      .isLength({ min: 1 })
      .withMessage(' name cannot be empty')
      .escape();
  }
  if (req.body.displayName || typeof req.body.displayName === 'string') {
    body('displayName')
      .trim()
      .isLength({ min: 1 })
      .withMessage(' displayName cannot be empty')
      .escape();
  }
  if (req.body.password || typeof req.body.password === 'string') {
    body('displayName')
      .trim()
      .isLength({ min: 1 })
      .withMessage(' password cannot be empty')
      .escape();
  }
  if (req.body.username || typeof req.body.username === 'string') {
    body('username')
      .trim()
      .isLength({ min: 1 })
      .withMessage(' password cannot be empty')
      .escape();
  }
  if (req.body.message || typeof req.body.message === 'string') {
    body('message')
      .trim()
      .isLength({ min: 1 })
      .withMessage(' message cannot be empty')
      .escape();
  }
  next();
};
export default inputValidation;
