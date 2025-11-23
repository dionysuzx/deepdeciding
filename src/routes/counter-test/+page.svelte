<script lang="ts">
let count = $state(0);
let loading = $state(false);
let error = $state<string | null>(null);

async function fetchCount() {
  loading = true;
  error = null;
  try {
    const response = await fetch("/api/counter");
    if (!response.ok) {
      throw new Error("Failed to fetch counter");
    }
    const data = await response.json();
    count = data.count;
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  } finally {
    loading = false;
  }
}

async function incrementCounter() {
  loading = true;
  error = null;
  try {
    const response = await fetch("/api/counter", { method: "POST" });
    if (!response.ok) {
      throw new Error("Failed to increment counter");
    }
    const data = await response.json();
    count = data.count;
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  } finally {
    loading = false;
  }
}

async function resetCounter() {
  loading = true;
  error = null;
  try {
    const response = await fetch("/api/counter", { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Failed to reset counter");
    }
    const data = await response.json();
    count = data.count;
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  } finally {
    loading = false;
  }
}

// Fetch count on mount
$effect(() => {
  fetchCount();
});
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
	<div class="text-center">
		<h1 class="mb-2 text-4xl font-bold">D1 Counter Test</h1>
		<p class="text-gray-600">Testing Cloudflare D1 database integration</p>
	</div>

	<div class="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
		<div class="mb-6 text-center">
			<div class="text-sm font-medium text-gray-500">Current Count</div>
			<div class="text-6xl font-bold text-blue-600">{count}</div>
		</div>

		{#if error}
			<div class="mb-4 rounded border border-red-400 bg-red-50 p-3 text-sm text-red-700">
				{error}
			</div>
		{/if}

		<div class="flex gap-3">
			<button
				onclick={incrementCounter}
				disabled={loading}
				class="flex-1 rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Loading...' : 'Increment'}
			</button>

			<button
				onclick={resetCounter}
				disabled={loading}
				class="flex-1 rounded bg-gray-600 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Loading...' : 'Reset'}
			</button>

			<button
				onclick={fetchCount}
				disabled={loading}
				class="rounded bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Loading...' : 'Refresh'}
			</button>
		</div>
	</div>

	<div class="text-center text-sm text-gray-500">
		<p>This counter is stored in a Cloudflare D1 database.</p>
		<p>Try opening this in multiple tabs to see it sync!</p>
	</div>
</div>
