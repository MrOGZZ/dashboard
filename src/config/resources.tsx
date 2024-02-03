import { DashboardOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
        name: 'dashboard',
        list: '/',
        meta: {
            label: 'Dashboard',
            icon: <DashboardOutlined />
        }
    },
    {
        name: 'website links',
        list: '/websitelinks',
        show: '/websites/:id',
        create: '/websites/create',
        edit: '/websites/edit/:id',
        meta: {
            label: 'Website Links',
            icon: <ShopOutlined/>,

        }


    },
    {
        name: 'DMCA Claims',
        list: '/DMCA',
        create: '/DMCA/new',
        edit: '/DMCA/edit/:id',
        meta: {
            label: 'DMCA Claims',
            icon: <ShopOutlined/>,

        }
    }
]