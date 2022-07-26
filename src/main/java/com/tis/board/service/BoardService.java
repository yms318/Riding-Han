package com.tis.board.service;

import java.util.List;

import com.tis.board.model.BoardVO;
import com.tis.board.model.PagingVO;
import com.tis.board.model.ReplyVO;

public interface BoardService {

   int insertBoard(BoardVO board);

   int getTotalCount();

   List<BoardVO> getAllBoardList(int start, int end);

   List<BoardVO> getAllBoardList(PagingVO paging);

   BoardVO selectBoardView(int bidx);

   BoardVO findBoardByIdx(String idx);

   BoardVO findBoardByUserid(int board_user_no);

   int editBoard(BoardVO boardVo);

   int deleteBoard(int board_idx);

   int getTotalCount(PagingVO paging);

   List<BoardVO> getSearchList(PagingVO paging);

   int updateReadnum(int board_idx);

   List<BoardVO> getTop5BoardList(PagingVO paging);

   int insertReply(ReplyVO reply);

   List<ReplyVO> getReplyList(int board_idx);

   int countReply(int board_idx);

   int delReply(int board_idx, int reply_idx);

    ReplyVO selectReply(int reply_idx);

}