const yup = require('yup')

/**
 * yup validation schema for input
 */
module.exports = yup.array()
.length(10)
.required()
.min(10)
.max(10)
.of(
  yup.object({
    name: yup.string().required(),
    elo: yup.string().lowercase().required().matches(/(iron(\d{0}[1-4])?|bronze(\d{0}[1-4])?|silver(\d{0}[1-4])?|gold(\d{0}[1-4])?|platinum(\d{0}[1-4])?|diamond(\d{0}[1-4])?|master|grandmaster|challenger)/),
    roles: yup.array().required().min(0).max(2).of(yup.string().lowercase().matches(/(top|jug|mid|bot|sup)/))
  }),
)
