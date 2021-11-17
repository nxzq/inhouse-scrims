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
    elo: yup.string().required().matches(/(iron|bronze|silver|gold|platinum|diamond|master|grandmaster|challenger)/),
    roles: yup.array().required().min(0).max(2).of(yup.string().matches(/(top|jug|mid|bot|sup)/))
  }),
)
