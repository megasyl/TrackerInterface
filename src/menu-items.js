export default {
    items: [
        {
            id: 'tracker',
            title: 'Tracker',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'journey',
                    title: 'Trajets',
                    type: 'item',
                    url: '/tracker/journey',
                    icon: 'fa fa-road',
                },
                {
                    id: 'realtime',
                    title: 'Temps réel',
                    type: 'item',
                    url: '/tracker/realtime',
                    icon: ' fa fa-crosshairs',
                }
            ]
        },
        /*{
            id: 'fleet',
            title: 'Fleet',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'fleet-vehicles',
                    title: 'Vehicules',
                    type: 'item',
                    url: '/tracker/journey',
                    icon: 'fa fa-car'
                },
                {
                    id: 'fleet_tracker',
                    title: 'Boîtiers',
                    type: 'item',
                    icon: 'fa fa-hdd-o',
                    url: '/tracker/journey'
                }
            ]
        },
        {
            id: 'admin',
            title: 'Administration',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'admin-users',
                    title: 'Users',
                    type: 'item',
                    icon: 'fa fa-users',
                    url: '/tracker/journey'
                }
            ]
        },*/
    ]
}
