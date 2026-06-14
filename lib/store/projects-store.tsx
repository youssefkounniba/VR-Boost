"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import data from "@/lib/data/data.json";
import type { Project } from "@/lib/types";

/**
 * Client-side project store.
 *
 * There is no backend in this MVP, so "CRUD" is simulated: projects are seeded
 * from `lib/data/data.json` and then kept in React state, mirrored to
 * localStorage so creations / edits / deletes survive a page reload.
 */

const STORAGE_KEY = "vrboost.projects.v1";

const SEED = data.projects as Project[];

interface ProjectsContextValue {
  projects: Project[];
  ready: boolean;
  addProject: (input: Omit<Project, "id" | "createdAt">) => Project;
  updateProject: (id: string, patch: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function loadInitial(): Project[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Project[];
  } catch {
    /* corrupted storage — fall back to seed */
  }
  return SEED;
}

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  // Start from the seed for a stable SSR/first paint, then hydrate from
  // localStorage on mount to avoid a hydration mismatch.
  const [projects, setProjects] = useState<Project[]>(SEED);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProjects(loadInitial());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      /* storage full / unavailable — ignore */
    }
  }, [projects, ready]);

  const addProject = useCallback(
    (input: Omit<Project, "id" | "createdAt">) => {
      const project: Project = {
        ...input,
        id: String(Math.floor(10000 + Math.random() * 89999)),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setProjects((prev) => [project, ...prev]);
      return project;
    },
    []
  );

  const updateProject = useCallback((id: string, patch: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects]
  );

  return (
    <ProjectsContext.Provider
      value={{ projects, ready, addProject, updateProject, deleteProject, getProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return ctx;
}
