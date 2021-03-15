import { Web3Provider } from '@ethersproject/providers';
import { isAddress } from 'ethers/lib/utils';
import { getContractForPropertyCall } from '../App';

export const fetcher = (library: Web3Provider | undefined, abi?: any) => (...args: any) => {
    const [arg1, arg2, ...params] = args;

    if (isAddress(arg1)) {
        const address = arg1;
        const property = arg2;
        const contract = getContractForPropertyCall(address, library?.getSigner());
        try {
            return contract[property].call();
        } catch (e) {
            console.log(e);
        }
    }

    const method = arg1;
    // @ts-ignore
    return library[method](arg2, ...params);
};
