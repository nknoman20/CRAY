import { Address, toNano } from '@ton/core';
import { SampleJetton } from '../wrappers/SampleJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: 'Crayzilla',
        description: 'Official token of the nknoman20 :) https://t.me/latest_airdrop24',
        symbol: 'CRAY',
        image: 'https://coffee-magic-hummingbird-79.mypinata.cloud/ipfs/bafybeihjekqthst46423qe2rfblvvs6is3se6cj7glpxbfm3peefhhsfpm',
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const sampleJetton = provider.open(
        await SampleJetton.fromInit(provider.sender().address as Address, content, 1000000000n),
    );

    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 1000000000n,
            receiver: provider.sender().address as Address,
        },
    );

    await provider.waitForDeploy(sampleJetton.address);

    // run methods on `sampleJetton`
}
