<script lang="ts">
import * as Card from "$lib/components/ui/card";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "$lib/components/ui/card";
import { Badge } from "$lib/components/ui/badge";
import { Button } from "$lib/components/ui/button";
import type { Snippet } from "svelte";

interface Props {
  id: number;
  title: string;
  description: string;
  creator_address: string;
  bounty: number | null;
  created_at: string;
  detailed?: boolean;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  deleting?: boolean;
}

let {
  id,
  title,
  description,
  creator_address,
  bounty,
  created_at,
  detailed = false,
  showActions = false,
  onEdit,
  onDelete,
  deleting = false,
}: Props = $props();

function formatDate(dateString: string, long = false) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(
    "en-US",
    long
      ? {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      : {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
  ).format(date);
}

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
</script>

{#if detailed}
  <Card.Root>
    <CardHeader>
      <div class="flex items-start justify-between gap-2">
        <CardTitle class="text-3xl flex-1">{title}</CardTitle>
        {#if bounty !== null && bounty > 0}
          <Badge class="bg-green-600 hover:bg-green-700 text-white shrink-0">
            {bounty} ETH
          </Badge>
        {/if}
      </div>
      <CardDescription class="space-y-2">
        <p class="text-lg">{description}</p>
        <div class="text-xs text-muted-foreground flex items-center justify-between">
          <span>By {formatAddress(creator_address)}</span>
          <span>{formatDate(created_at)}</span>
        </div>
      </CardDescription>
    </CardHeader>
    {#if showActions}
      <CardContent>
        <div class="flex gap-2">
          <Button variant="outline" onclick={onEdit}>
            Edit
          </Button>
          <Button variant="destructive" onclick={onDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    {/if}
  </Card.Root>
{:else}
  <a href="/topics/{id}" class="block transition-transform hover:scale-[1.02]">
    <Card.Root class="h-full cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader>
        <div class="flex items-start justify-between gap-2">
          <CardTitle class="flex-1">{title}</CardTitle>
          {#if bounty !== null && bounty > 0}
            <Badge class="bg-green-600 hover:bg-green-700 text-white shrink-0">
              {bounty} ETH
            </Badge>
          {/if}
        </div>
        <CardDescription class="space-y-2">
          <p>{description}</p>
          <div class="text-xs text-muted-foreground flex items-center justify-between">
            <span>By {formatAddress(creator_address)}</span>
            <span>{formatDate(created_at)}</span>
          </div>
        </CardDescription>
      </CardHeader>
    </Card.Root>
  </a>
{/if}
