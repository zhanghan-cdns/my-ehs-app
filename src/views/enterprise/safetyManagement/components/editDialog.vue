<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="850px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <form-base-info
          :dictConfig="{ entAccidentType }"
          ref="baseFormRef"
        ></form-base-info>
        <form-special-add-info
          v-if="menu === 'specialEquipment'"
          ref="specialFormRef"
        ></form-special-add-info>
        <form-production-add-info
          v-if="menu === 'productionEquipment'"
          ref="productionFormRef"
        ></form-production-add-info>
        <form-safety-add-info
          v-if="menu === 'safetyFacilities'"
          ref="safetyFormRef"
        ></form-safety-add-info>
        <form-storage-add-info
          v-if="menu === 'storageTank'"
          ref="storageFormRef"
        ></form-storage-add-info>
        <div style="width: 99%; text-align: right">
          <el-button type="primary" size="small" @click="submitBaseInfo"
            >保存</el-button
          >
          <el-button type="success" @click="reset" size="small"
            >重置
          </el-button>
        </div>
        <form-add-info
          ref="form-add-info"
          :row="row"
          :type="type"
          :menu="menu"
        ></form-add-info>
      </template>
      <!-- <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存 </el-button>
          <el-button type="success" @click="reset">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template> -->
    </basic-dialog>
  </div>
</template>

<script>
import formBaseInfo from "./addForm/formBaseInfo.vue";
import formAddInfo from "./addForm/formAddInfo.vue";
import formSpecialAddInfo from "./addForm/formSpecialAddInfo.vue";
import formProductionAddInfo from "./addForm/formProductionAddInfo.vue";
import formSafetyAddInfo from "./addForm/formSafetyAddInfo.vue";
import formStorageAddInfo from "./addForm/formStorageAddInfo.vue";
import {
  informationCreateAPI,
  informationViewAPI,
  informationUpdateAPI,
} from "@/api/enterprise/safetyManagement/information/index";
import {
  specialEquipmentCreateAPI,
  specialEquipmentViewAPI,
  specialEquipmentUpdateAPI,
} from "@/api/enterprise/safetyManagement/specialEquipment/index";
import {
  productionEquipmentCreateAPI,
  productionEquipmentViewAPI,
  productionEquipmentUpdateAPI,
} from "@/api/enterprise/safetyManagement/productionEquipment/index";
import {
  safetyFacilitiesCreateAPI,
  safetyFacilitiesViewAPI,
  safetyFacilitiesUpdateAPI,
} from "@/api/enterprise/safetyManagement/safetyFacilities/index";
import {
  storageTankCreateAPI,
  storageTankViewAPI,
  storageTankUpdateAPI,
} from "@/api/enterprise/safetyManagement/storageTank/index";

export default {
  components: {
    formBaseInfo,
    formAddInfo,
    formSpecialAddInfo,
    formProductionAddInfo,
    formSafetyAddInfo,
    formStorageAddInfo,
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      icon: "icon-bianji",
      title: "新增设备设施信息",
      openEdit: false,
      row: {},
      type: "",
      menu: "",
      menuList: [
        "specialEquipment",
        "productionEquipment",
        "safetyFacilities",
        "storageTank",
      ],
    };
  },
  methods: {
    open(row, type, menu) {
      console.log(row, "row", type, "type", menu, "menu");
      this.openEdit = true;
      this.type = type;
      this.menu = menu;
      if (row && row.id) {
        this.row = row;
        this.getDetail(row.id);
      }
    },

    // 验证表单
    submitBaseInfo() {
      let baseFormCheck = "";
      let specialFormCheck = "";
      let productionFormCheck = "";
      let safetyFormCheck = "";
      let storageFormCheck = "";
      this.$refs.baseFormRef.$refs.baseFormRef.validate((valid) => {
        baseFormCheck = valid;
      });
      if (baseFormCheck) {
        switch (this.menu) {
          case "information":
            this.submitForm();
            break;
          case "specialEquipment":
            this.$refs.specialFormRef.$refs.specialFormRef.validate((valid) => {
              specialFormCheck = valid;
            });
            if (specialFormCheck === true) {
              this.submitForm();
            }
            break;
          case "productionEquipment":
            this.$refs.productionFormRef.$refs.productionFormRef.validate(
              (valid) => {
                productionFormCheck = valid;
              }
            );
            if (productionFormCheck === true) {
              this.submitForm();
            }
            break;
          case "safetyFacilities":
            this.$refs.safetyFormRef.$refs.safetyFormRef.validate((valid) => {
              safetyFormCheck = valid;
            });
            if (safetyFormCheck === true) {
              this.submitForm();
            }
            break;
          case "storageTank":
            this.$refs.storageFormRef.$refs.storageFormRef.validate((valid) => {
              storageFormCheck = valid;
            });
            if (storageFormCheck === true) {
              this.submitForm();
            }
            break;
        }
      }
    },

    // 提交表单
    submitForm() {
      if (this.type === "bianji") this.modify();
      else this.add();
    },

    // 新增
    async add() {
      let baseForm = this.$refs.baseFormRef.baseForm;
      let res = {};
      if (this.menu === "information") {
        let params = { ...baseForm };
        res = await informationCreateAPI(params);
      } else if (this.menu === "specialEquipment") {
        let specialForm = this.$refs.specialFormRef.specialForm;
        let params = { productionFacilities: { ...baseForm }, ...specialForm };
        res = await specialEquipmentCreateAPI(params);
      } else if (this.menu === "productionEquipment") {
        let productionForm = this.$refs.productionFormRef.productionForm;
        let params = {
          productionFacilities: { ...baseForm },
          ...productionForm,
        };
        res = await productionEquipmentCreateAPI(params);
      } else if (this.menu === "safetyFacilities") {
        let safetyForm = this.$refs.safetyFormRef.safetyForm;
        let params = { productionFacilities: { ...baseForm }, ...safetyForm };
        res = await safetyFacilitiesCreateAPI(params);
      } else if (this.menu === "storageTank") {
        let storageForm = this.$refs.storageFormRef.storageForm;
        let params = { productionFacilities: { ...baseForm }, ...storageForm };
        res = await storageTankCreateAPI(params);
      }

      if (res && res.code !== 200) {
        return this.$message.error("保存失败");
      }
      if (res.data) {
        // 处理其他菜单的传值格式
        if (this.menuList.includes(this.menu)) {
          this.row = res.data.productionFacilities;
        } else {
          this.row = res.data;
        }
        this.$message.success("保存成功");
        this.$emit("refresh");
      }
    },

    // 编辑
    async modify() {
      let baseForm = this.$refs.baseFormRef.baseForm;
      let res = {};
      if (this.menu === "information") {
        let params = { ...baseForm };
        res = await informationUpdateAPI(params);
      } else if (this.menu === "specialEquipment") {
        let specialForm = this.$refs.specialFormRef.specialForm;
        let params = { productionFacilities: { ...baseForm }, ...specialForm };
        res = await specialEquipmentUpdateAPI(params);
      } else if (this.menu === "productionEquipment") {
        let productionForm = this.$refs.productionFormRef.productionForm;
        let params = {
          productionFacilities: { ...baseForm },
          ...productionForm,
        };
        res = await productionEquipmentUpdateAPI(params);
      } else if (this.menu === "safetyFacilities") {
        let safetyForm = this.$refs.safetyFormRef.safetyForm;
        let params = { productionFacilities: { ...baseForm }, ...safetyForm };
        res = await safetyFacilitiesUpdateAPI(params);
      } else if (this.menu === "storageTank") {
        let storageForm = this.$refs.storageFormRef.storageForm;
        let params = { productionFacilities: { ...baseForm }, ...storageForm };
        res = await storageTankUpdateAPI(params);
      }

      if (res && res.code !== 200) {
        return this.$message.error("编辑失败");
      }
      if (res.data) {
        // 处理其他菜单的传值格式
        if (this.menuList.includes(this.menu)) {
          this.row = res.data.productionFacilities;
        } else {
          this.row = res.data;
        }
        this.$message.success("编辑成功");
        this.$emit("refresh");
      }
    },

    // 获取基本信息详情
    async getDetail(id) {
      let res = {};
      if (this.menu === "information") {
        res = await informationViewAPI({ id });
      } else if (this.menu === "specialEquipment") {
        res = await specialEquipmentViewAPI({ id });
      } else if (this.menu === "productionEquipment") {
        res = await productionEquipmentViewAPI({ id });
      } else if (this.menu === "safetyFacilities") {
        res = await safetyFacilitiesViewAPI({ id });
      } else if (this.menu === "storageTank") {
        res = await storageTankViewAPI({ id });
      }

      if (res && res.code !== 200)
        return this.$message.error("获取详情信息失败");

      if (res.data) {
        // 回显基础信息
        if (this.menuList.includes(this.menu)) {
          this.$refs.baseFormRef.baseForm = res.data.productionFacilities;
          this.setBaseFormSelect(
            this.$refs.baseFormRef.baseForm,
            res.data.productionFacilities
          );
        } else {
          this.$refs.baseFormRef.baseForm = res.data;
          this.setBaseFormSelect(this.$refs.baseFormRef.baseForm, res.data);
        }

        // 回显附加信息
        if (this.menu === "specialEquipment") {
          this.$refs.specialFormRef.specialForm = res.data;
          this.setSpecialFormSelect(
            this.$refs.specialFormRef.specialForm,
            res.data
          );
        } else if (this.menu === "productionEquipment") {
          this.$refs.productionFormRef.productionForm = res.data;
          this.setProductionFormSelect(
            this.$refs.productionFormRef.productionForm,
            res.data
          );
        } else if (this.menu === "safetyFacilities") {
          this.$refs.safetyFormRef.safetyForm = res.data;
          this.setSafetyFormSelect(
            this.$refs.safetyFormRef.safetyForm,
            res.data
          );
          console.log(res.data.categories.key, "cagtegory");
        } else if (this.menu === "storageTank") {
          this.$refs.storageFormRef.storageForm = res.data;
          this.setStorageFormSelect(
            this.$refs.storageFormRef.storageForm,
            res.data
          );
          // 储罐关联表单字段回显
          if (res.data.tankFarmDevice && res.data.material) {
            this.$refs.storageFormRef.tankFarmDevice =
              res.data.tankFarmDevice.storageName;
            this.$refs.storageFormRef.storageMedium =
              res.data.material.materialName;
            this.$refs.storageFormRef.casNumber = res.data.material.casNumber;
            this.$refs.storageFormRef.materialState = res.data.material
              .materialForm
              ? res.data.material.materialForm.key
              : "";
            this.$refs.storageFormRef.subCategory = res.data.material.category
              ? res.data.material.category.key
              : "";
          }
        }
      }
    },

    // 设置基本信息下拉回显
    setBaseFormSelect(form, data) {
      form.menuDifferent = data.menuDifferent ? data.menuDifferent.key : "";
    },

    setSpecialFormSelect(form, data) {
      form.equipmentType = data.equipmentType ? data.equipmentType.key : "";
    },

    setProductionFormSelect(form, data) {
      form.equipmentCategory = data.equipmentCategory
        ? data.equipmentCategory.key
        : "";
    },

    setSafetyFormSelect(form, data) {
      console.log(data, "safeformdata");
      form.categories = data.categories ? data.categories.key : "";
      // 安全设施小类回显
      this.$refs.safetyFormRef.smallClassListKey = data.categories;
      form.smallClass = data.smallClass ? data.smallClass.key : "";
      form.theAttachment = data.theAttachment.map((item) => {
        return {
          ...item,
          name: item.originalFilename,
        };
      });
    },

    setStorageFormSelect(form, data) {
      form.storageForm = data.storageForm ? data.storageForm.key : "";
      form.storageStructure = data.storageStructure
        ? data.storageStructure.key
        : "";
      form.locationCla = data.locationCla ? data.locationCla.key : "";
    },

    // 重置表单
    reset() {
      this.$refs.baseFormRef.$refs.baseFormRef.resetFields();
      if (this.menu === "specialEquipment") {
        this.$refs.specialFormRef.$refs.specialFormRef.resetFields();
      } else if (this.menu === "productionEquipment") {
        this.$refs.productionFormRef.$refs.productionFormRef.resetFields();
      } else if (this.menu === "safetyFacilities") {
        this.$refs.safetyFormRef.$refs.safetyFormRef.resetFields();
      } else if (this.menu === "storageTank") {
        this.$refs.storageFormRef.$refs.storageFormRef.resetFields();
      }
    },

    close() {
      this.row = {};
      this.reset();
      this.openEdit = false;
    },
  },
};
</script>

<style></style>
