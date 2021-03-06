<template>
  <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div
      v-show="visible"
      class="el-picker-panel el-date-range-picker el-popper"
      :class="[
        {
          'has-sidebar': $slots.sidebar || shortcuts,
          'has-time': showTime,
        },
        popperClass,
      ]"
    >
      <div class="el-picker-panel__body-wrapper">
        <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
        <div class="el-picker-panel__sidebar" v-if="shortcuts">
          <button
            type="button"
            class="el-picker-panel__shortcut"
            v-for="(shortcut, key) in shortcuts"
            :key="key"
            @click="handleShortcutClick(shortcut)"
          >
            {{ shortcut.text }}
          </button>
        </div>
        <div class="el-picker-panel__body">
          <div class="el-date-range-picker__time-header" v-if="showTime">
            <span class="el-date-range-picker__editors-wrap">
              <span class="el-date-range-picker__time-picker-wrap">
                <el-input
                  size="small"
                  :disabled="rangeState.selecting"
                  ref="minInput"
                  :placeholder="t('el.datepicker.startDate')"
                  class="el-date-range-picker__editor"
                  :value="minVisibleDate"
                  @input="(val) => handleDateInput(val, 'min')"
                  @change="(val) => handleDateChange(val, 'min')"
                />
              </span>
              <span
                class="el-date-range-picker__time-picker-wrap"
                v-clickoutside="handleMinTimeClose"
              >
                <el-input
                  size="small"
                  class="el-date-range-picker__editor"
                  :disabled="rangeState.selecting"
                  :placeholder="t('el.datepicker.startTime')"
                  :value="minVisibleTime"
                  @focus="minTimePickerVisible = true"
                  @input="(val) => handleTimeInput(val, 'min')"
                  @change="(val) => handleTimeChange(val, 'min')"
                />
                <time-picker
                  ref="minTimePicker"
                  @pick="handleMinTimePick"
                  :time-arrow-control="arrowControl"
                  :visible="minTimePickerVisible"
                  @mounted="$refs.minTimePicker.format = timeFormat"
                >
                </time-picker>
              </span>
            </span>
            <span class="el-icon-arrow-right"></span>
            <span class="el-date-range-picker__editors-wrap is-right">
              <span class="el-date-range-picker__time-picker-wrap">
                <el-input
                  size="small"
                  class="el-date-range-picker__editor"
                  :disabled="rangeState.selecting"
                  :placeholder="t('el.datepicker.endDate')"
                  :value="maxVisibleDate"
                  :readonly="!minDate"
                  @input="(val) => handleDateInput(val, 'max')"
                  @change="(val) => handleDateChange(val, 'max')"
                />
              </span>
              <span
                class="el-date-range-picker__time-picker-wrap"
                v-clickoutside="handleMaxTimeClose"
              >
                <el-input
                  size="small"
                  class="el-date-range-picker__editor"
                  :disabled="rangeState.selecting"
                  :placeholder="t('el.datepicker.endTime')"
                  :value="maxVisibleTime"
                  :readonly="!minDate"
                  @focus="minDate && (maxTimePickerVisible = true)"
                  @input="(val) => handleTimeInput(val, 'max')"
                  @change="(val) => handleTimeChange(val, 'max')"
                />
                <time-picker
                  ref="maxTimePicker"
                  @pick="handleMaxTimePick"
                  :time-arrow-control="arrowControl"
                  :visible="maxTimePickerVisible"
                  @mounted="$refs.maxTimePicker.format = timeFormat"
                >
                </time-picker>
              </span>
            </span>
          </div>
          <div>
            <div class="el-date-range-picker__content is-left">Start Date</div>
            <div class="el-date-range-picker__content is-right">End Date</div>
            <div
              class="el-picker-panel__content el-date-range-picker__content is-left"
            >
              <div class="el-date-range-picker__header">
                <button
                  type="button"
                  @click="leftPrevYear"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="leftPrevMonth"
                  class="el-picker-panel__icon-btn el-icon-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="leftNextYear"
                  v-if="unlinkPanels"
                  :disabled="!enableYearArrow"
                  :class="{ 'is-disabled': !enableYearArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                ></button>
                <button
                  type="button"
                  @click="leftNextMonth"
                  v-if="unlinkPanels"
                  :disabled="!enableMonthArrow"
                  :class="{ 'is-disabled': !enableMonthArrow }"
                  class="el-picker-panel__icon-btn el-icon-arrow-right"
                ></button>
                <div>{{ leftLabel }}</div>
              </div>
              <cu-date-table
                selection-mode="range"
                :date="leftDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                setStateKey="minDate"
                :disabled-date="disabledDate"
                :cell-class-name="cellClassName"
                @changerange="handleChangeRange"
                :first-day-of-week="firstDayOfWeek"
                @pick="handleRangePick"
              >
              </cu-date-table>
            </div>
            <div
              class="el-picker-panel__content el-date-range-picker__content is-right"
            >
              <div class="el-date-range-picker__header">
                <button
                  type="button"
                  @click="rightPrevYear"
                  v-if="unlinkPanels"
                  :disabled="!enableYearArrow"
                  :class="{ 'is-disabled': !enableYearArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="rightPrevMonth"
                  v-if="unlinkPanels"
                  :disabled="!enableMonthArrow"
                  :class="{ 'is-disabled': !enableMonthArrow }"
                  class="el-picker-panel__icon-btn el-icon-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="rightNextYear"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                ></button>
                <button
                  type="button"
                  @click="rightNextMonth"
                  class="el-picker-panel__icon-btn el-icon-arrow-right"
                ></button>
                <div>{{ rightLabel }}</div>
              </div>
              <cu-date-table
                selection-mode="range"
                :date="rightDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                setStateKey="maxDate"
                :disabled-date="disabledDate"
                :cell-class-name="cellClassName"
                @changerange="handleChangeRange"
                :first-day-of-week="firstDayOfWeek"
                @pick="handleRangePick"
              >
              </cu-date-table>
            </div>
          </div>
        </div>
      </div>
      <div class="el-picker-panel__footer" v-if="showTime">
        <el-button
          size="mini"
          type="text"
          class="el-picker-panel__link-btn"
          @click="handleClear"
        >
          {{ t("el.datepicker.clear") }}
        </el-button>
        <el-button
          plain
          size="mini"
          class="el-picker-panel__link-btn"
          :disabled="btnDisabled"
          @click="handleConfirm(false)"
        >
          {{ t("el.datepicker.confirm") }}
        </el-button>
      </div>
    </div>
  </transition>
</template>
<script>
import dateRange from "element-ui/packages/date-picker/src/panel/date-range";
import cuDateTable from "@/components/picker/cuDateTable";
import {
  formatDate,
  parseDate,
  isDate,
  modifyDate,
  modifyTime,
  modifyWithTimeString,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  nextDate,
} from "element-ui/src/utils/date-util";
import Clickoutside from "element-ui/src/utils/clickoutside";
import Locale from "element-ui/src/mixins/locale";
import ElInput from "element-ui/packages/input";
import ElButton from "element-ui/packages/button";
const calcDefaultValue = (defaultValue) => {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), nextDate(new Date(defaultValue), 1)];
  } else {
    return [new Date(), nextDate(new Date(), 1)];
  }
};
const extractDateFormat = function (format) {
  return format
    .replace(/\W?m{1,2}|\W?ZZ/g, "")
    .replace(/(\W+)?h{1,2}|\W?s{1,3}|\W?a/gi, "")
    .trim();
};
const extractTimeFormat = function (format) {
  return format
    .replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}\W+/g, "")
    .trim();
};
export default {
  extends: dateRange,
  components: {
    cuDateTable,
  },
  data() {
    return {
      visible: true,
    };
  },
  watch: {
    value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(newVal)) {
        this.minDate = isDate(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = isDate(newVal[1]) ? new Date(newVal[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            const minDateYear = this.minDate.getFullYear();
            const minDateMonth = this.minDate.getMonth();
            const maxDateYear = this.maxDate.getFullYear();
            const maxDateMonth = this.maxDate.getMonth();
            this.rightDate = this.maxDate;
            // minDateYear === maxDateYear && minDateMonth === maxDateMonth
            //   ? nextMonth(this.maxDate)
            //   : this.maxDate;
          } else {
            this.rightDate = this.leftDate;
          }
        } else {
          this.leftDate = calcDefaultValue(this.defaultValue)[0];
          this.rightDate = nextMonth(this.leftDate);
        }
      }
    },
  },
  computed: {
    dateFormat() {
      if (this.format) {
        return extractDateFormat(this.format);
      }
      return "yyyy-MM-dd";
    },
    timeFormat() {
      if (this.format) {
        return extractTimeFormat(this.format);
      }
      console.log("asdf");
      return "HH:mm:ss";
    },
    enableMonthArrow() {
      const nextMonth = (this.leftMonth + 1) % 12;
      const yearOffset = this.leftMonth + 1 >= 12 ? 1 : 0;
      return (
        this.unlinkPanels &&
        new Date(this.leftYear + yearOffset, nextMonth) <=
          new Date(this.rightYear, this.rightMonth)
      );
    },
    enableYearArrow() {
      return (
        this.unlinkPanels &&
        this.rightYear * 12 +
          this.rightMonth -
          (this.leftYear * 12 + this.leftMonth + 1) >=
          12
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
