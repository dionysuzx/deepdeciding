<script lang="ts">
import {
  getConnectionError,
  isWalletAvailable,
} from "$lib/states/client.svelte.ts";
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h2 class="text-2xl font-bold">Welcome</h2>
        <p class="text-muted-foreground">
            A platform for deep deliberation on Ethereum ecosystem decisions
        </p>
    </div>

    {#if !isWalletAvailable()}
        <div class="rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-4">
            <p class="text-orange-600 dark:text-orange-400 text-sm">
                No Ethereum provider detected. Please install MetaMask or another Web3 wallet.
            </p>
        </div>
    {:else if getConnectionError()}
        <div class="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
            <p class="text-destructive text-sm">{getConnectionError()}</p>
        </div>
    {/if}
</div>
