export interface ThermalProject {
  id: string;
  name: string;
  location: string;
  depthMeters: number;
  temperatureCelsius: number;
  outputMW: number | string;
  type: string;
}

export const thermalProjects2026: ThermalProject[] = [
  {
    id: 'fervo-cape',
    name: 'Project Cape Geothermal',
    location: 'Utah, USA',
    depthMeters: 4000,
    temperatureCelsius: 220,
    outputMW: 400,
    type: 'Enhanced Geothermal Systems (EGS)',
  },
  {
    id: 'quaise-mmw',
    name: 'Quaise Millimeter-Wave',
    location: 'Pilot Site',
    depthMeters: 10000,
    temperatureCelsius: 500,
    outputMW: 'Supercritical Base',
    type: 'Gyrotron Vaporization',
  },
  {
    id: 'neom-solarwater',
    name: 'NEOM Solar Dome',
    location: 'Saudi Arabia',
    depthMeters: 0,
    temperatureCelsius: 1000,
    outputMW: 'Desalination',
    type: 'Concentrated Solar Thermal',
  },
];

export const MAX_DEPTH = 10000;
export const MAX_TEMP = 1000;
export const MAX_OUTPUT_MW = 400;

export function formatOutput(output: number | string): string {
  return typeof output === 'number' ? `${output} MW` : output;
}

export function outputToNumeric(output: number | string): number {
  return typeof output === 'number' ? output : 0;
}
