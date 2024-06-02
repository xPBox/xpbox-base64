<script lang="ts">
  import { Runtime } from '@xpbox/sdk'
  import { onMount } from 'svelte'

  const runtime = new Runtime()

  let showJson = {}
  let isReady = false

  onMount(() => {
    const ready = () => {
      if (!isReady) {
        isReady = true
        // 程序准备好了才显示，如果没有调用这个命令，页面上的组件不会被显示
        runtime.app.ready()
      }
    }

    // 获取配置信息
    runtime.config.get().then(({ data, isReady }) => {
      if (isReady) {
        showJson = data
        ready()
      }
    })
    // 应用加载的时候可能还没有拉到最新的配置，也就是说上面的get不一定能拉到真正的配置，
    // 所以需要监听配置更新事件，当xPBox拉取到配置信息的时候会下发通知。这个通知不仅是程
    // 序拉取到最新的配置，也可能是当前App或者其他App修改了配置也会触发更新通知。
    runtime.config.onUpdate(({ data }) => {
      showJson = data
      ready()
    })
  })

  const onSetExtraData = () => {
    // 使用update只会更新提供的字段
    runtime.config.update({ extra: 1 })
  }

  const onSetRandomData = () => {
    // 使用replace会替换掉整个配置
    runtime.config.replace({ random: Math.random() })
  }


</script>

<div class="main">
  <div class="title">
    Hello xPBox
  </div>

  <div class="json">
    {JSON.stringify(showJson, undefined, 4)}
  </div>

  <button class="btn" on:click={onSetRandomData}>
    设置随机数据
  </button>

  <button class="btn" on:click={onSetExtraData}>
    更新其他数据
  </button>
</div>

<style>
  .main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }

  .title {
    font-size: 26px;
    font-weight: 500;
    color: #333;
  }

  .json {
    margin-top: 12px;
    padding: 12px 24px;
    border-radius: 12px;
    background: #cccccc80;
    word-break: break-word;
    white-space: pre-line;
  }

  .btn {
    margin-top: 12px;
  }
</style>
