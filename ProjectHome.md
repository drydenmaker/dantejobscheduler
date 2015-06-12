**NOTE** : current implementation is early proof of concept

Dante Job Scheduler allows for the registering of jobs via direct PHP API or REST.  Triggers include date/time, server load, and server events.

Currently Dante only runs on Windows.

Dante provides an API for asynchronous/parallel execution of PHP or command-line jobs.

The Web UI makes it convenient to manage and monitor jobs. The idea is simple and familiar to those who have used systems like Cron, Windows Scheduler or even products like Zend Job Queue.

The base functionality Dante fills is:

  * general queue and delete jobs
  * allow for the passing of parameters to the script
  * allow for various methods of scheduling (relative, absolute, reoccurring)
  * check the status of a scheduled job
  * retrieve the results of a job

As the project develops we want to add the following functionality:

  * advanced job querying
  * control weather a job is active or not
  * queue a job on metrics other than time
    * ASAP
    * server load
    * when another job is finished
    * priority
  * job dependencies
  * managing multiple servers from one Web UI
  * detailed reporting

We are completely open to other features.