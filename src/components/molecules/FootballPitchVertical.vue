<script setup lang="ts"></script>

<template>
  <div
    class="relative w-[320px] h-[500px] bg-green-600 border-[6px] border-white mx-auto rounded-lg overflow-hidden shadow-xl"
  >
    <div id="escalacao">
        <div style="height: 115px;"></div>
        <div id="atacantes" style="margin: auto; width: 210px; height: 35px; margin-bottom: 52px; display: flex;">
            <div class="player">
                <div class="numero-camisa">91</div>
            </div>
            <div class="player">
                <div class="numero-camisa">20</div>
            </div>
        </div>
        <div id="meias" style="margin: auto; height: 35px; margin-bottom: 28px; display: flex;">
            <div class="player">
                <div class="numero-camisa">93</div>
            </div>
            <div class="player">
                <div class="numero-camisa">55</div>
            </div>
        </div>
        <div id="volantes" style="margin: auto; width: 155px; height: 35px; margin-bottom: 37px; display: flex;">
            <div class="player">
                <div class="numero-camisa">13</div>
            </div>
            <div class="player">
                <div class="numero-camisa">9</div>
            </div>
        </div>
        <div id="laterais" style="margin: auto; height: 35px; margin-bottom: 0px; display: flex;">
            <div class="player">
                <div class="numero-camisa">19</div>
            </div>
            <div style="margin: auto; width: 110px;">

            </div>
            <div class="player">
                <div class="numero-camisa">16</div>
            </div>
        </div>
        <div id="zagueiros" style="margin: auto; width: 200px; height: 35px; margin-bottom: 35px; display: flex;">
            <div class="player">
                <div class="numero-camisa">4</div>
            </div>
            <div class="player">
                <div class="numero-camisa">17</div>
            </div>
        </div>
        <div id="goleiro" style="margin: auto; display: flex;">
            <div class="player">
                <div class="numero-camisa">90</div>
            </div>
        </div>
    </div>
    <div id="stadium_layout">
        <div class="absolute inset-2 border-2 border-white rounded-lg" />
        <div class="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[2px] bg-white" />

        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] border-2 border-white rounded-full" />
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-white rounded-full" />

        <div class="absolute top-2 left-[20%] w-[60%] h-[75px] border-2 border-white" />
        <div class="absolute top-2 left-[35%] w-[30%] h-[30px] border-2 border-white" />
        <div class="absolute top-[55px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-white rounded-full" />

        <div class="absolute top-[82px] left-1/2 -translate-x-1/2 w-[70px] h-[40px] overflow-hidden rotate-180">
            <div class="absolute left-0 bottom-0 w-full h-full border-2 border-white rounded-full translate-y-1/2" />
        </div>

        <div class="absolute bottom-2 left-[20%] w-[60%] h-[75px] border-2 border-white" />
        <div class="absolute bottom-2 left-[35%] w-[30%] h-[30px] border-2 border-white" />
        <div class="absolute bottom-[55px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-white rounded-full" />

        <div class="absolute bottom-[82px] left-1/2 -translate-x-1/2 w-[70px] h-[40px] overflow-hidden">
            <div class="absolute left-0 bottom-0 w-full h-full border-2 border-white rounded-full translate-y-1/2" />
        </div>

        <div class="absolute left-2 top-2 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-full" />
        <div class="absolute right-2 top-2 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-full" />
        <div class="absolute left-2 bottom-2 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-full" />
        <div class="absolute right-2 bottom-2 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-full" />
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-3 border-t-2 border-white" />
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90px] h-3 border-b-2 border-white" />
    </div>
  </div>
</template>

<style scoped lang="scss">
#escalacao {
    --primary: #7580ff;

    height: 489px;
    width: 308px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;

    .player {
        margin: auto;
        width: 35px;
        height: 35px;
        border-width: 3px;
        border-style: solid;
        border-color: #000;
        background: var(--primary);
        border-radius: 50%;
        text-align: center;
        z-index: 1;

        .numero-camisa {
            margin: 4px;
            font-size: 0.9rem;
        }

        &:hover {
            transform: scale(1.15);
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
        }
    }
}
</style>