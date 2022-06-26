const discountCodeExample = require('./modules/discount-code/webpack.config');
const splitExample = require('./modules/discount-redemption-split/webpack.config');
const wechatoaTextMsgExample = require('./modules/wechatoa-send-text-msg/webpack.config');


module.exports = function(env, argv) {
    return [
        discountCodeExample(env, argv),
        splitExample(env, argv),
        wechatoaTextMsgExample(env, argv),
    ];
};
