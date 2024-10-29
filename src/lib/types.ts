import type { NeuroFetalMrStudies$result } from "$houdini";

type Studies = NeuroFetalMrStudies$result["pacsfile"];
type Study = Studies[0];

type Series = {
  folder: string;
  SeriesDescription: string;
};

type ChrisPlugin = {
  id: number;
  name: string;
  instances: string;
};

type Pipeline = {
  id: number;
  name: string;
  workflows: string;
};

type PluginInstance = {
  id: number;
  title: string;
  plugin_id: number;
  plugin_name: string;
  feed: string;
};

type Workflow = {
  title: string;
};

type Feed = {
  url: string;
  id: number;
  name: string;
  public: boolean;
  note: string;
};

type FeedAndWorkflow = {
  feed: Feed;
  workflow: Workflow;
};

export type {
  Study,
  Series,
  Feed,
  PluginInstance,
  ChrisPlugin,
  Workflow,
  Pipeline,
  FeedAndWorkflow,
};
