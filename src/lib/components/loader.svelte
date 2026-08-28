<script lang="ts">

    import { onMount } from "svelte";
    import { loaderAnimationResolve } from "$lib/store";

    let loader: HTMLElement = $state()!;
    let loadingDone = $state(false);
    let loadingPercentage = $state(100);

    onMount(() => {
        // Keep only a short visual hand-off. Non-critical images and desktop
        // effects load after the first screen is already usable.
        requestAnimationFrame(() => {
            loadingDone = true;
            setTimeout(() => loaderAnimationResolve(), 300);
        });
    });

</script>


<div class="page-cover">
    <div class="loader-wrapper">
        <div 
            class="loader-background"
            class:outro={loadingDone}></div>
        <div 
            bind:this={loader}
            class="loader"
            class:outro={loadingDone}
            style="width: {loadingPercentage}%"></div>
    </div>
</div>


<style lang="sass">

.page-cover
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    left: 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    z-index: 1000
    background-color: #222224

    .loader-wrapper
        position: relative
        display: block
        height: 0.1rem
        width: 20rem

        .loader, .loader-background
            position: absolute
            top: 0
            height: 100%

        .loader-background
            width: 100%
            background-color: rgba(255, 255, 255, 0.1)

        .loader 
            background-color: white
            transition: width 0.25s ease

        .outro
            transition: width 0.25s ease
            right: 0 !important
            width: 0

</style>
