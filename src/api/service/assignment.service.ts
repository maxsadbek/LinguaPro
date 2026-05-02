import { apiClient } from '@/api/client'
import {
  ASSIGNMENTS,
  ASSIGNMENT_BY_ID,
  ASSIGNMENT_GRADE,
  ASSIGNMENT_SUBMIT,
} from '@/constants/assignmentEndPoints'
import type {
  Assignment,
  AssignmentListParams,
  AssignmentListResponse,
  CreateAssignmentPayload,
  GradeAssignmentPayload,
  Submission,
  SubmitAssignmentPayload,
  UpdateAssignmentPayload,
} from './assignment.type'

export const getAssignments = (
  params?: AssignmentListParams
): Promise<Assignment[]> => {
  return apiClient.get<Assignment[]>(ASSIGNMENTS, { params })
}

export const createAssignment = (
  payload: CreateAssignmentPayload
): Promise<Assignment> => {
  return apiClient.post<Assignment>(ASSIGNMENTS, payload)
}

export const getAssignmentById = (id: number): Promise<Assignment> => {
  return apiClient.get<Assignment>(ASSIGNMENT_BY_ID(id))
}

export const updateAssignment = (
  id: number,
  payload: UpdateAssignmentPayload
): Promise<Assignment> => {
  return apiClient.put<Assignment>(ASSIGNMENT_BY_ID(id), payload)
}

export const deleteAssignment = (id: number): Promise<{ detail?: string }> => {
  return apiClient.delete<{ detail?: string }>(ASSIGNMENT_BY_ID(id))
}

export const submitAssignment = (
  id: number,
  payload: SubmitAssignmentPayload
): Promise<Submission> => {
  return apiClient.post<Submission>(ASSIGNMENT_SUBMIT(id), payload)
}

export const gradeAssignment = (
  id: number,
  payload: GradeAssignmentPayload
): Promise<Submission> => {
  return apiClient.put<Submission>(ASSIGNMENT_GRADE(id), payload)
}

export const getAssignmentsList = (
  params?: AssignmentListParams
): Promise<AssignmentListResponse> => {
  return apiClient.get<AssignmentListResponse>(ASSIGNMENTS, { params })
}
