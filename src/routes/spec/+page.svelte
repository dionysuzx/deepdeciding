<svelte:head>
    <title>Deep Sentiment</title>
</svelte:head>

<div class="space-y-10">
    <header class="space-y-2">
        <h1 class="text-3xl font-bold">Deep Sentiment</h1>
        <p class="text-sm text-muted-foreground">
            Collaborators: dionysuz.eth, Devansh Mehta
        </p>
    </header>

    <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Motivation</h2>
        <p>
            Many ideas within the Ethereum ecosystem, specifically Ethereum upgrades require deep deliberation
            before coming to social consensus on a decision. Some examples of contentious EIPs / ideas that
            require particularly deep deliberation include:
        </p>
        <ul class="list-disc pl-6 space-y-2">
            <li>EOF</li>
            <li>FOCIL</li>
            <li>Changing the issuance curve</li>
        </ul>
        <p>
            For Ethereum to successfully reach its goal, we must make high quality decisions quickly. The motivation
            of this experiment is to accelerate a specific idea to its terminus: modifying the issuance curve.
        </p>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-semibold">The idea (DRAFT – IN PROGRESS)</h2>
        <p>This section includes the idea. If you are helping/reviewing, this section is the working area for the mechanism design.</p>
        <div class="space-y-3">
            <h3 class="text-xl font-semibold">Devansh&apos;s idea:</h3>
            <ul class="list-disc pl-6 space-y-3">
                <li>We start with a question, the only answers are yes/no. Example: &quot;Should we implement EOF?&quot;</li>
                <li>
                    A curated group of experts collects all the for and against propositions. A proposition is a character-limited
                    reason string, with an optional image, and a required type &quot;for&quot; or &quot;against&quot;.
                    <ul class="list-disc pl-6 space-y-2">
                        <li class="font-mono text-sm">Example 1: &#123;type: &quot;for&quot;, &quot;reason&quot;: &quot;EOF improves the effectiveness of security analysis tools&quot;, &quot;image&quot;: null&#125;</li>
                        <li class="font-mono text-sm">Example 2: &#123;type: &quot;against&quot;, &quot;reason&quot;: &quot;EOF is a distraction from a bigger VM change like RISC-V&quot;, &quot;image&quot;: null&#125;</li>
                    </ul>
                </li>
                <li>The target node is the question, and the child nodes (only a two-level tree) are the propositions. The edges between each proposition and the target node represent the score.</li>
                <li>A curated group of jurors are given a sequence of randomized proposition pairs, and select which they agree with more and by what multiplier, this fills out the edge of the graph </li>
                <li>The score represents the <strong>relative agreement</strong> of a proposition to the question; relative to the agreement of all other propositions. Scores use Deep Funding&rsquo;s pairwise-multiplier method: from juror comparisons like &ldquo;I agree with A 2&times; more than B&rdquo; we infer a latent score for each proposition, then normalize them so all scores sum to 1.</li>
                <li>An open group of AI models compete for solving the rest of the edges, the winning model is the one that minimizes the error against the juror selected edges.</li>
                <li>A prediction market will exist for each proposition, where traders can predict the score (relative agreement) of each proposition. AI models that feel confident in their implementation can of course arbitrage / make money on markets, which should be truth resolving.</li>
                <li>Only the top 128 propositions by score will be selected, but anyone can propose a new proposition with a bond. If it doesn&apos;t achieve the top 128 the bond is slashed. This allows the opportunity for new propositions to come in and exhaust the solution space.</li>
            </ul>
        </div>
        <div class="space-y-3">
            <h3 class="text-xl font-semibold">Additional notes from Dionysuz:</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li>We&apos;ll integrate with opengraph social cards so that people can easily participate in this system embedded inside of X and Farcaster</li>
                <li>Is there an issue with pairwise comparisons? For example comparing two &quot;for&quot; comparisons feels easier than comparing a &quot;for&quot; versus an &quot;against&quot; because the multiplier grows too large to where it may become inaccurate.</li>
                <li>What is the incentive mechanism to get high quality jury decisions and seed propositions?</li>
                <li>Is &quot;For&quot; and &quot;Against&quot; score in a majority sense correct, or can we fold in the Polis algorithm which maps jurors into groups (we can also label groups like client team A, B, C; institutional staker; home node operator, etc. or use some type of attestations)</li>
                <li>How do we handle privacy? Do we integrate with ENS? Should people be able to vote on AI models that are publicly trading (if they see the market size getting traded on an edge from reallygoodmodel.eth, more people can vote on it)</li>
                <li>Do we even need a &quot;for&quot; / &quot;against&quot; field because it may make the axis of comparison more difficult cognitively and harder to get a multiplier, on the other hand if we remove it then it becomes less tractable for resolving a decision market; and we end up creating is more of a &quot;sentiment finder&quot; (and another mechanism can interpret sentiment and turn it into a decision). This would mean we can reframe the target mode from being an explicit question, to a general topic.</li>
            </ul>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Social feed signal management</h2>
        <p>
            It&apos;s important to tap into the liquidity of cognition that exists on X / Farcaster / Discord / Forums. We need people to easily propagate their signal and participate in the system without creating a whole new silo&apos;d island with no liquidity.
        </p>
        <p>We will use opengraph.</p>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Signal propagation tools</h2>
        <p>
            Signal propagation tools listed here are used by cognitive actors to express high quality signals on how they feel about the issuance curve:
        </p>
        <div class="space-y-2">
            <h3 class="text-xl font-semibold">Polis-style yes/no/skip over character restricted statements</h3>
            <p>This propagation tool is taken from the Polis project. Here is an image example:</p>
            <img
                src="https://hackmd.io/_uploads/Sy55pKRgZl.png"
                alt="Polis-style comparison example"
                class="w-full max-w-4xl rounded-lg border"
            />
        </div>
        <div class="space-y-2">
            <h3 class="text-xl font-semibold">Multiplier comparisons</h3>
            <p>This tool is taken from the Deep Funding project. It takes two items and an expert compares them, and selects a multiplier between them:</p>
            <img
                src="https://hackmd.io/_uploads/Byke0YAlZl.png"
                alt="Multiplier comparison example"
                class="w-full max-w-4xl rounded-lg border"
            />
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Signal interpretation tools</h2>
        <p>
            Signal interpretation tools are interfaces that allow some actor (individual or collective) to interpret signals and apply some algorithm to it which produces an action.
        </p>
        <p>A simple example would help:</p>
        <img
            src="https://hackmd.io/_uploads/ryD26FAxbl.png"
            alt="Signal interpretation example"
            class="w-full max-w-4xl rounded-lg border"
        />
        <p>The above tool demonstrates computes a score that rank statements highest when they have both high support and similarity across groups.</p>
        <p>Other examples include:</p>
        <ul class="list-disc pl-6 space-y-2">
            <li>Sort the list of statements by number of votes in favor of.</li>
        </ul>
        <p>
            It seems that while we can use different tools such as color coded diagrams, etc., that these cannot be measured algorithmically as a selection mechanism. They can be used by agents to interpret data but it feels difficult to &ldquo;put it in code&rdquo;.
        </p>
    </section>

    <section class="space-y-3">
        <h2 class="text-2xl font-semibold">Seed comments</h2>
        <ul class="list-disc pl-6 space-y-2">
            <li>Deciding to change or ossify the current issuance curve is an important issue.</li>
            <li>Deciding to change or ossify the current issuance curve is more important than X issue by Y multiplier.</li>
            <li>
                Issuance is something that will never ossify in terms of proposals, because researchers will base their
                PhDs off of coming up with new designs. What we can come up with is an adjustment, and agree to that;
                while accepting that tweaks in the future will always come and we can reject those.
            </li>
        </ul>
    </section>
</div>
