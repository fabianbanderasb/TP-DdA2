import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'devices',
    pathMatch: 'full',
  },
  {
    path: 'devices',
    loadComponent: () => import('./pages/devices/devices.page').then( m => m.DevicesPage)
  },
  {
    path: 'devices/:id',
    loadComponent: () => import('./pages/device-detail/device-detail.page').then( m => m.DeviceDetailPage)
  },
  {
    path: 'measurements/:id',
    loadComponent: () => import('./pages/measurements/measurements.page').then( m => m.MeasurementsPage)
  },
  {
    path: 'logs/:id',
    loadComponent: () => import('./pages/logs/logs.page').then( m => m.LogsPage)
  }

];

