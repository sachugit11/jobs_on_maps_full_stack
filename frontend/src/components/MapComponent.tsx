'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Company } from '@/types';
import { useStore } from '@/store/useStore';

// Company colors for markers
const COMPANY_COLORS: Record<string, string> = {
  Google: '#4285F4',
  Amazon: '#FF9900',
  Microsoft: '#00A4EF',
  Cisco: '#049FD9',
  Flipkart: '#F7D516',
  Intuit: '#365EBF',
  IBM: '#054ADA',
  Oracle: '#F80000',
  SAP: '#0FAAFF',
  PayPal: '#003087',
  Apple: '#A2AAAD',
  Adobe: '#FF0000',
  Walmart: '#0071CE',
  Intel: '#0071C5',
  Nvidia: '#76B900',
  Qualcomm: '#3253DC',
  Freshworks: '#F36C21',
  Swiggy: '#FC8019',
  Zomato: '#E23744',
  Razorpay: '#2B84EA',
};

function getCompanyColor(name: string): string {
  return COMPANY_COLORS[name] || `hsl(${(name.charCodeAt(0) * 37) % 360}, 70%, 55%)`;
}

function createCompanyIcon(company: Company) {
  const color = getCompanyColor(company.name);
  const initial = company.name.charAt(0).toUpperCase();
  const jobCount = company.jobs.length;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container" style="--marker-color: ${color}">
        <div class="marker-pin">
          <span class="marker-initial">${initial}</span>
          ${jobCount > 1 ? `<span class="marker-badge">${jobCount}</span>` : ''}
        </div>
        <div class="marker-pulse"></div>
      </div>
    `,
    iconSize: [44, 56],
    iconAnchor: [22, 56],
    popupAnchor: [0, -52],
  });
}

function createPopupContent(company: Company): string {
  const color = getCompanyColor(company.name);
  const jobsHtml = company.jobs
    .map(
      (job) => `
      <div class="popup-job">
        <div class="popup-job-title">${job.title}</div>
        <div class="popup-job-meta">
          <span class="popup-job-category">${job.role_category}</span>
          <span class="popup-job-posted">${job.posted_on}</span>
        </div>
        <a href="${job.apply_link}" target="_blank" rel="noopener noreferrer" class="popup-apply-btn" style="background: ${color}">
          Apply Now →
        </a>
      </div>
    `
    )
    .join('');

  return `
    <div class="popup-container">
      <div class="popup-header" style="border-color: ${color}">
        <div class="popup-company-icon" style="background: ${color}">${company.name.charAt(0)}</div>
        <div style="flex: 1">
          <div class="popup-company-name">${company.name}</div>
          <div class="popup-company-address">${company.address}</div>
        </div>
      </div>
      <div class="popup-jobs-label">${company.jobs.length} Open Position${company.jobs.length > 1 ? 's' : ''}</div>
      <div class="popup-jobs-list">${jobsHtml}</div>
    </div>
  `;
}

interface MapComponentProps {
  companies: Company[];
}

export default function MapComponent({ companies }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const setSelectedCompany = useStore((s) => s.setSelectedCompany);
  const mapCenter = useStore((s) => s.mapCenter);
  const mapZoom = useStore((s) => s.mapZoom);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: mapCenter,
      zoom: mapZoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark themed map tiles
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
      }
    ).addTo(map);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Attribution
    L.control
      .attribution({ position: 'bottomleft' })
      .addAttribution('© <a href="https://carto.com/">CARTO</a> | © <a href="https://www.openstreetmap.org/">OSM</a>')
      .addTo(map);

    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);
    setIsMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // Update markers when companies change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current || !isMapReady) return;

    markersRef.current.clearLayers();

    if (companies.length === 0) return;

    const bounds = L.latLngBounds([]);

    companies.forEach((company) => {
      if (!company.latitude || !company.longitude) return;

      const icon = createCompanyIcon(company);
      const marker = L.marker([company.latitude, company.longitude], { icon });

      const popup = L.popup({
        maxWidth: 360,
        minWidth: 300,
        className: 'custom-popup',
        closeButton: true,
      }).setContent(createPopupContent(company));

      marker.bindPopup(popup);

      marker.on('click', () => {
        setSelectedCompany(company);
      });

      markersRef.current!.addLayer(marker);
      bounds.extend([company.latitude, company.longitude]);
    });

    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }
  }, [companies, isMapReady, setSelectedCompany]);

  return (
    <div ref={containerRef} id="map-container" className="w-full h-full" />
  );
}
