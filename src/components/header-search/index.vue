<script>
import dictMixin from "@/mixins/dict";

export default {
  name: "headerSearch",
  mixins: [dictMixin],
  props: {
    searchItem: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    change(data) {
      console.log(date);
    },
  },
  render() {
    return (
      <div
        class="search_box"
        style="display: flex;justify-content: space-between;align-items: center;"
      >
        <el-form ref="basicFormRef" inline={true} model={this.searchData}>
          {this.searchItem.map((item) => {
            if (item.type === "Input") {
              return (
                <el-form-item
                  key={item.prop}
                  label={item.label}
                  prop={item.prop}
                >
                  <el-input
                    v-model={this.searchData[item.prop]}
                    disabled={item.disabled}
                    placeholder={item.placeholder}
                    style={{ width: item.width }}
                    clearable
                  ></el-input>
                </el-form-item>
              );
            }
            if (item.type === "Select") {
              return (
                <el-form-item
                  key={item.prop}
                  label={item.label}
                  prop={item.prop}
                >
                  <el-select
                    v-model={this.searchData[item.prop]}
                    placeholder={item.placeholder}
                    style={{ width: item.width }}
                    clearable
                  >
                    {item.children.map((option) => {
                      return (
                        <el-option
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        ></el-option>
                      );
                    })}
                  </el-select>
                </el-form-item>
              );
            }
            if (item.type === "SelectDict") {
              return (
                <el-form-item
                  key={item.prop}
                  label={item.label}
                  prop={item.prop}
                >
                  <el-select
                    v-model={this.searchData[item.prop]}
                    placeholder={item.placeholder}
                    style={{ width: item.width }}
                    clearable
                  >
                    {this[item.children].map((dict) => {
                      return (
                        <el-option
                          key={dict.id}
                          label={dict.dictValueName}
                          value={dict.dictValue}
                        ></el-option>
                      );
                    })}
                  </el-select>
                </el-form-item>
              );
            }
            if (item.type === "Date") {
              return (
                <el-form-item
                  key={item.prop}
                  label={item.label}
                  prop={item.prop}
                >
                  <el-date-picker
                    v-model={this.searchData[item.prop]}
                    placeholder={item.placeholder}
                    style={{ width: item.width }}
                    clearable
                    type={item.dateType ? item.dateType : "date"}
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format={
                      item.valueFormat ? item.valueFormat : "yyyy-MM-dd"
                    }
                  ></el-date-picker>
                </el-form-item>
              );
            }
            if (item.type === "Cascader") {
              return (
                <el-form-item
                  key={item.prop}
                  label={item.label}
                  prop={item.prop}
                >
                  <el-cascader
                    v-model={this.searchData[item.prop]}
                    options={item.children}
                    style={{ width: item.width }}
                    clearable
                  ></el-cascader>
                </el-form-item>
              );
            }
            if (item.type === "Radio") {
              return (
                <el-form-item
                  key={item.prop}
                  label={item.label}
                  prop={item.prop}
                >
                  <el-radio-group
                    v-model={this.searchData[item.prop]}
                    style={{ width: item.width }}
                  >
                    {item.children.map((radio) => {
                      return (
                        <el-radio key={radio.value} label={radio.value}>
                          {" "}
                          {radio.label}
                        </el-radio>
                      );
                    })}
                  </el-radio-group>
                </el-form-item>
              );
            }
          })}
        </el-form>
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-form-item {
  margin: 0;
}

/deep/ .el-form-item__content {
  margin-right: 5px;
}
</style>
