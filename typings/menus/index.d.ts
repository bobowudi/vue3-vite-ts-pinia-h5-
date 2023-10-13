declare namespace MENU {
    /**
     * 后台返回路由
    */
    type Route = {
        addMode: number;
        description: string;
        menu: boolean;
        parentId: string;
        extendDTOs: string[];
        spaceId: string;
        createdDate: number;
        operationTypeDTOs: string[];
        resourceAddress: string;
        appId: string;
        name: string;
        id: string;
        lastModifiedDate?: number;
    }
    /**
     * 菜单
    */
    type Menu = {
        id: string;
        parentId: string;
        name:string;
        path:string;
        child?:MENU[];
    }
}