/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 谁最懂我相关

// 列表
export function supplierList(query) {
    return axios({
        url: "/admin/supplier/supplier/index",
        method: "get",
        params: query
    });
}

// 列表 ()
export function supplierAList(query) {
    return axios({
        url: "/admin/supplier/supplier/supplierList",
        method: "get",
        params: query
    });
}

// 保存
export function supplierSave(data, formName, method = "post") {
    var url =
        formName === "add" ? "/admin/supplier/supplier/save" : "/admin/supplier/supplier/edit";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除
export function supplierDelete(data) {
    return axios({
        url: "/admin/supplier/supplier/delete",
        method: "post",
        data: data
    });
}
