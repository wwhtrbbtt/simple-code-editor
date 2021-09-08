"use strict";var CopyCode={props:{content:{type:String},width:{type:String,default:"20px"},height:{type:String,default:"20px"},color:{type:String,default:"#aaa"}},data:function(){return{message:"Copy code"}},methods:{selectContent:function(){this.$refs.textarea.select(),document.execCommand("copy")},copy:function(e){this.selectContent(),e.target.focus(),this.message="Copied!"},resetMessage:function(){this.message="Copy code"}},template:'\n<div\n    class="copy_code"\n    @click="copy"\n    @focusout="resetMessage"\n    tabindex="0"\n    :style="{ width: width, height: height }"\n>\n<div class="tooltip">{{ message }}</div>\n<textarea ref="textarea" :value="content"></textarea>\n<svg\n    xmlns="http://www.w3.org/2000/svg"\n    width="100%"\n    height="100%"\n    viewBox="0 0 24 24"\n    fill="none"\n    :stroke="color"\n    stroke-width="2"\n    stroke-linecap="round"\n    stroke-linejoin="round"\n    class="feather feather-copy"\n>\n    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>\n    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>\n</svg>\n</div>\n    '},Dropdown={props:{width:{type:String,default:"80px"},height:{type:String,default:"auto"},mark:{type:String,default:""},disabled:{type:Boolean,default:!1},color:{type:String,default:"#aaa"},defaultDisplay:{type:Boolean,default:!1}},data:function(){return{show:this.defaultDisplay}},computed:{showArrow:function(){return 1!=this.disabled}},methods:{toggleDropdown:function(){0==this.disabled&&(1==this.show?this.show=!1:this.show=!0)},hideDropdown:function(){this.show=!1}},template:'\n<div\n    class="dropdown"\n    :class="{ disabled: disabled }"\n    @click="toggleDropdown"\n    @focusout="hideDropdown"\n    tabindex="0"\n>\n<div class="mark">\n    <div :style="{color: color}">{{ mark }}</div>\n    <svg\n    v-if="showArrow"\n    xmlns="http://www.w3.org/2000/svg"\n    width="16"\n    height="16"\n    viewBox="0 0 24 24"\n    fill="none"\n    :stroke="color"\n    stroke-width="2"\n    stroke-linecap="round"\n    stroke-linejoin="round"\n    class="feather feather-chevron-down"\n    >\n    <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n</div>\n<transition name="fade">\n    <div class="panel" :style="{ width: width, height: height }" v-if="show">\n        <slot></slot>\n    </div>\n</transition>\n</div>\n    '},CodeEditor={components:{"copy-code":CopyCode,dropdown:Dropdown},props:{modelValue:{},width:{type:String,default:"540px"},height:{type:String,default:"140px"},borderRadius:{type:String,default:"12px"},languages:{type:Array,default:function(){return[["javascript","JS"],["cpp","C++"],["java","Java"],["python","Python"],["html","HTML"]]}},disableEdit:{type:Boolean,default:!1},dropdownWidth:{type:String,default:"110px"},dropdownHeight:{type:String,default:"auto"},languageSelect:{type:Boolean,default:!0},activeSelect:{type:Boolean,default:!0},themeSwitch:{type:Boolean,default:!0},copyCode:{type:Boolean,default:!0},defaultDropdownDisplay:{type:Boolean,default:!1},darkTheme:{type:Boolean,default:!0},readOnly:{type:Boolean,default:!1},zIndex:{type:String,default:""},fontSize:{type:String,default:"17px"}},data:function(){return{top:0,left:0,languageClass:this.languages[0][0],mark:void 0===this.languages[0][1]?this.languages[0][0]:this.languages[0][1],languageList:this.languages,content:this.modelValue,isDark:this.darkTheme}},computed:{canCopyCode:function(){return 1!=this.readOnly&&this.copyCode},canSelect:function(){return 1!=this.readOnly&&this.activeSelect},disabledEdit:function(){return 1==this.readOnly||this.disableEdit},disableDropdown:function(){return 0==this.languageSelect&&0==this.themeSwitch},showHeader:function(){return 0!=this.canSelect||0!=this.canCopyCode},isReadOnly:function(){return 0==this.canSelect&&0==this.canCopyCode},activeTextarea:function(){return 0!=this.canSelect||0!=this.canCopyCode||1!=this.disabledEdit},isLight:function(){return 1!=this.isDark}},methods:{tab:function(){document.execCommand("insertText",!1,"    ")},scroll:function(e){this.top=-e.target.scrollTop,this.left=-e.target.scrollLeft},switchThemeToDark:function(){this.isDark=!0},switchThemeToLight:function(){this.isDark=!1}},mounted:function(){this.$nextTick(function(){hljs.highlightAll(),hljs.configure({ignoreUnescapedHTML:!0})})},updated:function(){this.$nextTick(function(){hljs.highlightAll(),this.content=this.modelValue})},template:'\n<div\n    class="code_editor"\n    :class="{ dark: isDark, light: isLight, read_only: isReadOnly }"\n    :style="{ width: width, height: height, borderRadius: borderRadius, zIndex: zIndex }"\n>\n<div class="header" v-if="showHeader">\n    <dropdown\n    :width="dropdownWidth"\n    :mark="mark"\n    :disabled="disableDropdown"\n    v-if="canSelect"\n    :defaultDisplay="defaultDropdownDisplay"\n    >\n    <div class="panel">\n        <ul\n        class="lang_list"\n        :style="{ height: dropdownHeight }"\n        v-if="languageSelect"\n        >\n        <li\n            v-for="lang in languageList"\n            :key="lang"\n            @click="\n                this.mark = lang[1] === undefined ? lang[0] : lang[1];\n                this.languageClass = \'language-\' + lang[0];\n            "\n        >\n          {{ lang[1] === undefined ? lang[0] : lang[1] }}\n        </li>\n        </ul>\n        <ul class="switch_theme" v-if="themeSwitch">\n        <li\n            class="dark"\n            :class="{ selected: isDark }"\n            @click="switchThemeToDark"\n        >\n            Dark\n        </li>\n        <li\n            class="light"\n            :class="{ selected: isLight }"\n            @click="switchThemeToLight"\n        >\n            Light\n        </li>\n        </ul>\n    </div>\n    </dropdown>\n    <copy-code\n    width="16px"\n    height="16px"\n    :content="content"\n    v-if="canCopyCode"\n    ></copy-code>\n</div>\n<div\n    class="code_area"\n    :style="{\n    borderTopLeftRadius: readOnly == true ? borderRadius : 0,\n    borderTopRightRadius: readOnly == true ? borderRadius : 0,\n    borderBottomLeftRadius: borderRadius,\n    borderBottomRightRadius: borderRadius,\n    fontSize: fontSize\n    }"\n>\n    <textarea\n    v-if="activeTextarea"\n    @keydown.tab.prevent="tab"\n    v-on:scroll="scroll"\n    :disabled="disabledEdit"\n    :value="modelValue"\n    @input="$emit(\'update:modelValue\', $event.target.value)"\n    ></textarea>\n    <pre>\n    <code\n        :class="languageClass"\n        :style="{ top: top + \'px\', left: left + \'px\' }"\n    >{{ modelValue }}</code>\n    </pre>\n</div>\n</div>\n'};