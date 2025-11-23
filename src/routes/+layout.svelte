<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";
import { Button } from "$lib/components/ui/button/index.js";
import {
  getConnectedAddress,
  getIsConnected,
  connectWallet,
  disconnectWallet,
  isWalletAvailable,
  getEnsName,
} from "$lib/states/client.svelte.ts";

let { children } = $props();

async function handleConnect() {
  await connectWallet();
}

function handleDisconnect() {
  disconnectWallet();
}
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col">
    <header class="border-b">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-8">
                <a href="/" class="text-xl font-semibold hover:opacity-80 transition-opacity">Deep Sentiment</a>

                <nav class="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href="/spec" class="hover:text-foreground transition-colors">Spec</a>
                </nav>
            </div>

            <div>
                {#if isWalletAvailable() && getIsConnected()}
                    <Button onclick={handleDisconnect} variant="outline" size="sm">
                        {getEnsName() ?? getConnectedAddress()?.slice(0, 6) + '...' + getConnectedAddress()?.slice(-4)}
                    </Button>
                {:else if isWalletAvailable()}
                    <Button onclick={handleConnect} size="sm">Connect Wallet</Button>
                {/if}
            </div>
        </div>
    </header>

    <main class="flex-1 container mx-auto px-4 py-8">
        {@render children()}
    </main>

    <footer class="border-t mt-auto">
        <div class="container mx-auto px-4 py-4 text-sm text-muted-foreground">
            <div class="flex items-center justify-between gap-4">
                <p>Accelerating Ethereum social consensus</p>
                <a
                    href="https://github.com/futurekittylabs/deep-sentiment"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-foreground transition-colors"
                    aria-label="View source on GitHub"
                >
                    GitHub
                </a>
            </div>
        </div>
    </footer>
</div>
