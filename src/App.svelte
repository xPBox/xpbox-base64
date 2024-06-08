<script lang="ts">
  import { Runtime } from '@xpbox/sdk'
  import copy from 'copy-to-clipboard'
  import { onMount } from 'svelte'
  import { Base64 } from 'js-base64'
  import { md5, sha256, sha512, sha1, sha224, sha384, sha3, hexEncode, hexDecode } from './hash'


  const runtime = new Runtime()

  let input = ""
  let output = ""
  let failed = false
  let showList = false

  const coderList = [
    {
      name: '编解码',
      list: [
        {
          name: 'Base64编码',
          encode: Base64.encode,
          decode: Base64.decode
        },
        {
          name: 'Hex (utf8)',
          encode: hexEncode,
          decode: hexDecode
        },
        {
          name: 'URL编码',
          encode: encodeURI,
          decode: decodeURI
        },
        {
          name: 'URL编码 (包含特殊字符)',
          encode: encodeURIComponent,
          decode: decodeURIComponent
        }
      ]
    },
    {
      name: '哈希 (Hash)',
      list: [
        {
          name: 'MD5',
          encode: md5,
        },
        {
          name: 'SHA1',
          encode: sha1,
        },
        {
          name: 'SHA3',
          encode: sha3,
        },
        {
          name: 'SHA224',
          encode: sha224,
        },
        {
          name: 'SHA256',
          encode: sha256,
        },
        {
          name: 'SHA384',
          encode: sha384,
        },
        {
          name: 'SHA512',
          encode: sha512,
        }
      ]
    }
  ]

  let current : {
    name: string,
    encode: (input: string) => string,
    decode?: (input: string) => string
  } = coderList[0].list[0]

  onMount(() => {
    runtime.app.ready()
  })

  const encode = () => {
    failed = false
    output = current.encode(input)
  }

  const decode = () => {
    failed = false
    try {
      output = current.decode?.(input) || ''
    } catch (e) {
      failed = true
    }
  }

  const selectCoder = (coder) => {
    current = coder
    showList = false
  }
</script>

<div class="main">
  <div class="block">
    <div class="title">编码前
      {#if failed}
        <span class="failed">编解码失败</span>
      {/if}
      <div class="flex-1"></div>
      <div class="link" on:click={() => copy(input)}>复制</div>
    </div>
    <textarea class="input" bind:value={input} />
  </div>
  <div class="action">
    {#if !!current.encode}
      <div class="btn" on:click={encode}>编码</div>
    {/if}
    {#if current.decode}
      <div class="btn" on:click={decode}>解码</div>
    {/if}
    <div class="flex-1" />
    <div class="name" on:click={() => showList = true}>{ current.name }<span class="arrow"></span></div>
  </div>
  <div class="block">
    <div class="title">编码后
      <div class="flex-1"></div>
      <div class="link" on:click={() => copy(output)}>复制</div>
    </div>
    <textarea class="input" bind:value={output} />
  </div>
  <div class="mask" class:show={showList} on:click={() => showList = false}></div>
  <div class="select" class:show={showList}>
    {#each coderList as group}
      <div class="group">
        <div class="group-title">{group.name}</div>
        {#each group.list as item}
          <div class="group-item" on:click={() => selectCoder(item)}>{item.name}</div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .flex-1 {
    flex: 1;
  }
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
    line-height: 16px;
    font-size: 12px;
    color: #666;
    user-select: none;
    display: flex;
    margin-bottom: 8px;

    .link {
      margin-left: 8px;
      color: #0080ee;
      cursor: pointer;
    }
  }
  .input {
    background: #efefef85;
    width: 100%;
    flex: 1;
    border: 1px solid transparent;
    outline: none;
    resize: none;
    border-radius: 8px;
    padding: 12px;
    transition: border 0.3s;

    &:focus-within {
      border: 1px solid #999;
    }
  }
  .action {
    display: flex;
    padding: 8px 0;
    align-items: center;
  }
  .name {
    color: #666;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    .arrow {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #666;
      margin-left: 4px;
    }
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

  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    transition: backdrop-filter 0.3s;

    &.show {
      pointer-events: auto;
      backdrop-filter: blur(4px);
    }
  }

  .select {
    position: absolute;
    right: 0;
    top: 0;
    width: 190px;
    bottom: 0;
    background: #f2f2f299;
    padding: 8px;
    transition: transform 0.3s;
    transform: translateX(100%);
    overflow-y: auto;
    overflow-x: hidden;

    &.show {
      transform: none;
      box-shadow: 0 0 12px #ddd;
    }
    .group {
      margin-bottom: 12px;
    }
    .group-title {
      width: 100%;
      line-height: 26px;
      font-size: 12px;
      color: #666;
      user-select: none;
      padding: 0 8px;
    }
    .group-item {
      padding: 4px 8px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      transition: background-color 0.3s;
      border-radius: 4px;

      &:hover {
        background: #e3e3e3;
      }
    }
  }

</style>
