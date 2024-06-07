<script lang="ts">
  import { Runtime } from '@xpbox/sdk'
  import { onMount } from 'svelte'
  import { Base64 } from 'js-base64'

  const runtime = new Runtime()

  let input = ""
  let output = ""
  let failed = false

  onMount(() => {
    runtime.app.ready()
  })

  const encode = () => {
    failed = false
    output = Base64.encode(input)
  }

  const decode = () => {
    failed = false
    try {
      output = Base64.decode(input)
    } catch (e) {
      failed = true
    }
  }

</script>

<div class="main">
  <div class="block">
    <div class="title">编码前
      {#if failed}
        <span class="failed">编解码失败</span>
      {/if}
    </div>
    <textarea class="input" bind:value={input} />
  </div>
  <div class="action">
    <div class="btn" on:click={encode}>编码</div>
    <div class="btn" on:click={decode}>解码</div>
    <div class="name">Base64编码</div>
  </div>
  <div class="block">
    <div class="title">编码后</div>
    <textarea class="input" bind:value={output} />
  </div>
</div>

<style>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
    padding: 12px;
    box-sizing: border-box;
  }
  .block {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .title {
    width: 100%;
    line-height: 26px;
    font-size: 12px;
    color: #666;
    user-select: none;
  }
  .input {
    background: #efefef85;
    width: 100%;
    flex: 1;
    border: none;
    outline: none;
    resize: none;
    border-radius: 8px;
    padding: 12px;
    transition: box-shadow 0.3s;

    &:focus-within {
      box-shadow: inset 0 0 3px #33333366;
    }
  }
  .action {
    display: flex;
    padding: 8px 0;
    align-items: center;
  }
  .name {
    color: #ccc;
    text-align: right;
    flex: 1;
    font-size: 16px;
    user-select: none;
  }
  .btn {
    padding: 4px 12px;
    font-size: 14px;
    border-radius: 4px;
    margin-right: 8px;
    background: #efefef85;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s;
    user-select: none;

    &:hover {
      background: #efefef;
    }
  }
  .failed {
    color: red;
  }
</style>
