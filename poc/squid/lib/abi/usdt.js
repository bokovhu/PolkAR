"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.functions = exports.events = exports.abi = void 0;
const ethers = __importStar(require("ethers"));
const abi_support_1 = require("./abi.support");
const usdt_abi_1 = require("./usdt.abi");
exports.abi = new ethers.Interface(usdt_abi_1.ABI_JSON);
exports.events = {
    Issue: new abi_support_1.LogEvent(exports.abi, '0xcb8241adb0c3fdb35b70c24ce35c5eb0c17af7431c99f827d44a445ca624176a'),
    Redeem: new abi_support_1.LogEvent(exports.abi, '0x702d5967f45f6513a38ffc42d6ba9bf230bd40e8f53b16363c7eb4fd2deb9a44'),
    Deprecate: new abi_support_1.LogEvent(exports.abi, '0xcc358699805e9a8b7f77b522628c7cb9abd07d9efb86b6fb616af1609036a99e'),
    Params: new abi_support_1.LogEvent(exports.abi, '0xb044a1e409eac5c48e5af22d4af52670dd1a99059537a78b31b48c6500a6354e'),
    DestroyedBlackFunds: new abi_support_1.LogEvent(exports.abi, '0x61e6e66b0d6339b2980aecc6ccc0039736791f0ccde9ed512e789a7fbdd698c6'),
    AddedBlackList: new abi_support_1.LogEvent(exports.abi, '0x42e160154868087d6bfdc0ca23d96a1c1cfa32f1b72ba9ba27b69b98a0d819dc'),
    RemovedBlackList: new abi_support_1.LogEvent(exports.abi, '0xd7e9ec6e6ecd65492dce6bf513cd6867560d49544421d0783ddf06e76c24470c'),
    Approval: new abi_support_1.LogEvent(exports.abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'),
    Transfer: new abi_support_1.LogEvent(exports.abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'),
    Pause: new abi_support_1.LogEvent(exports.abi, '0x6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff625'),
    Unpause: new abi_support_1.LogEvent(exports.abi, '0x7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b33'),
};
exports.functions = {
    name: new abi_support_1.Func(exports.abi, '0x06fdde03'),
    deprecate: new abi_support_1.Func(exports.abi, '0x0753c30c'),
    approve: new abi_support_1.Func(exports.abi, '0x095ea7b3'),
    deprecated: new abi_support_1.Func(exports.abi, '0x0e136b19'),
    addBlackList: new abi_support_1.Func(exports.abi, '0x0ecb93c0'),
    totalSupply: new abi_support_1.Func(exports.abi, '0x18160ddd'),
    transferFrom: new abi_support_1.Func(exports.abi, '0x23b872dd'),
    upgradedAddress: new abi_support_1.Func(exports.abi, '0x26976e3f'),
    balances: new abi_support_1.Func(exports.abi, '0x27e235e3'),
    decimals: new abi_support_1.Func(exports.abi, '0x313ce567'),
    maximumFee: new abi_support_1.Func(exports.abi, '0x35390714'),
    _totalSupply: new abi_support_1.Func(exports.abi, '0x3eaaf86b'),
    unpause: new abi_support_1.Func(exports.abi, '0x3f4ba83a'),
    getBlackListStatus: new abi_support_1.Func(exports.abi, '0x59bf1abe'),
    allowed: new abi_support_1.Func(exports.abi, '0x5c658165'),
    paused: new abi_support_1.Func(exports.abi, '0x5c975abb'),
    balanceOf: new abi_support_1.Func(exports.abi, '0x70a08231'),
    pause: new abi_support_1.Func(exports.abi, '0x8456cb59'),
    getOwner: new abi_support_1.Func(exports.abi, '0x893d20e8'),
    owner: new abi_support_1.Func(exports.abi, '0x8da5cb5b'),
    symbol: new abi_support_1.Func(exports.abi, '0x95d89b41'),
    transfer: new abi_support_1.Func(exports.abi, '0xa9059cbb'),
    setParams: new abi_support_1.Func(exports.abi, '0xc0324c77'),
    issue: new abi_support_1.Func(exports.abi, '0xcc872b66'),
    redeem: new abi_support_1.Func(exports.abi, '0xdb006a75'),
    allowance: new abi_support_1.Func(exports.abi, '0xdd62ed3e'),
    basisPointsRate: new abi_support_1.Func(exports.abi, '0xdd644f72'),
    isBlackListed: new abi_support_1.Func(exports.abi, '0xe47d6060'),
    removeBlackList: new abi_support_1.Func(exports.abi, '0xe4997dc5'),
    MAX_UINT: new abi_support_1.Func(exports.abi, '0xe5b5019a'),
    transferOwnership: new abi_support_1.Func(exports.abi, '0xf2fde38b'),
    destroyBlackFunds: new abi_support_1.Func(exports.abi, '0xf3bdc228'),
};
class Contract extends abi_support_1.ContractBase {
    name() {
        return this.eth_call(exports.functions.name, []);
    }
    deprecated() {
        return this.eth_call(exports.functions.deprecated, []);
    }
    totalSupply() {
        return this.eth_call(exports.functions.totalSupply, []);
    }
    upgradedAddress() {
        return this.eth_call(exports.functions.upgradedAddress, []);
    }
    balances(arg0) {
        return this.eth_call(exports.functions.balances, [arg0]);
    }
    decimals() {
        return this.eth_call(exports.functions.decimals, []);
    }
    maximumFee() {
        return this.eth_call(exports.functions.maximumFee, []);
    }
    _totalSupply() {
        return this.eth_call(exports.functions._totalSupply, []);
    }
    getBlackListStatus(_maker) {
        return this.eth_call(exports.functions.getBlackListStatus, [_maker]);
    }
    allowed(arg0, arg1) {
        return this.eth_call(exports.functions.allowed, [arg0, arg1]);
    }
    paused() {
        return this.eth_call(exports.functions.paused, []);
    }
    balanceOf(who) {
        return this.eth_call(exports.functions.balanceOf, [who]);
    }
    getOwner() {
        return this.eth_call(exports.functions.getOwner, []);
    }
    owner() {
        return this.eth_call(exports.functions.owner, []);
    }
    symbol() {
        return this.eth_call(exports.functions.symbol, []);
    }
    allowance(_owner, _spender) {
        return this.eth_call(exports.functions.allowance, [_owner, _spender]);
    }
    basisPointsRate() {
        return this.eth_call(exports.functions.basisPointsRate, []);
    }
    isBlackListed(arg0) {
        return this.eth_call(exports.functions.isBlackListed, [arg0]);
    }
    MAX_UINT() {
        return this.eth_call(exports.functions.MAX_UINT, []);
    }
}
exports.Contract = Contract;
